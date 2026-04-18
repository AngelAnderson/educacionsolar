import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

interface BillData {
  kwh_monthly: number
  bill_amount_usd: number
  rate_per_kwh: number
  municipality: string
  billing_period: string
  account_last4: string
}

interface OCRResult {
  success: boolean
  data?: BillData
  confidence: number
  raw_json: object
  error?: string
}

export async function processLumaBill(
  imageBase64: string,
  mimeType: string
): Promise<OCRResult> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: `Extract the following fields from this Puerto Rico LUMA electricity bill. Return ONLY valid JSON with these fields:
{
  "billing_period": "string (e.g. 'Mar 2026' or 'Feb 15 - Mar 14, 2026')",
  "total_kwh": number,
  "total_amount_usd": number,
  "rate_per_kwh": number (total_amount_usd / total_kwh if not explicit),
  "municipality": "string",
  "account_last4": "string (last 4 digits of account number)",
  "confidence": number (0-1, your confidence in the extraction)
}`,
            },
          ],
        },
      ],
    })

    // Extract text content from response
    const textBlock = response.content.find((b) => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      return { success: false, confidence: 0, raw_json: {}, error: 'No text in response' }
    }

    // Parse JSON from response (handle markdown code blocks)
    let jsonStr = textBlock.text.trim()
    const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1].trim()
    }

    const parsed = JSON.parse(jsonStr)

    // Validate ranges
    if (parsed.total_kwh < 50 || parsed.total_kwh > 10000) {
      return {
        success: false,
        confidence: parsed.confidence ?? 0,
        raw_json: parsed,
        error: `kWh out of range: ${parsed.total_kwh} (expected 50-10,000)`,
      }
    }
    if (parsed.total_amount_usd < 5 || parsed.total_amount_usd > 2000) {
      return {
        success: false,
        confidence: parsed.confidence ?? 0,
        raw_json: parsed,
        error: `Amount out of range: $${parsed.total_amount_usd} (expected $5-$2,000)`,
      }
    }

    return {
      success: true,
      data: {
        kwh_monthly: parsed.total_kwh,
        bill_amount_usd: parsed.total_amount_usd,
        rate_per_kwh: parsed.rate_per_kwh,
        municipality: parsed.municipality,
        billing_period: parsed.billing_period,
        account_last4: parsed.account_last4,
      },
      confidence: parsed.confidence ?? 0.5,
      raw_json: parsed,
    }
  } catch (err) {
    return {
      success: false,
      confidence: 0,
      raw_json: {},
      error: err instanceof Error ? err.message : 'Unknown OCR error',
    }
  }
}
