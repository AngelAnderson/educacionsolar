import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Educación Solar PR'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#065f46',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 900, color: '#ffffff' }}>
          ☀️ Educación Solar PR
        </div>
        <div style={{ fontSize: 32, color: '#6ee7b7', marginTop: 20 }}>
          Tu factura de luz, explicada
        </div>
        <div style={{ fontSize: 20, color: '#a7f3d0', marginTop: 80 }}>
          CaboRojo.com · Angel Anderson · 787-417-7711
        </div>
      </div>
    ),
    { ...size }
  )
}
