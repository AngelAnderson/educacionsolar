// =============================================================================
// Solar Savings Calculator — Puerto Rico specific
// =============================================================================
//
// PR-specific constants (2026 market data):
//   - LUMA average rate: $0.27/kWh
//   - Installed solar cost: $2.80/watt
//   - Average peak sun hours: 5.5 hrs/day
//   - Panel degradation: 0.5%/year
// =============================================================================

const LUMA_RATE_PER_KWH = 0.27       // $/kWh — average LUMA residential rate
const COST_PER_WATT = 2.80           // $/watt installed (panels + inverter + labor)
const SUN_HOURS_PER_DAY = 5.5        // Peak sun hours in PR
const DEGRADATION_RATE = 0.005       // 0.5% annual panel degradation
const DAYS_PER_MONTH = 30.44         // Average days in a month
const SYSTEM_LIFETIME_YEARS = 25     // Standard solar warranty period

interface Scenario {
  name: string
  offset_pct: number               // Fraction of bill covered by solar (0-1)
  monthly_savings_usd: number
  annual_savings_usd: number
  estimated_system_cost: number     // Total installed cost in USD
  payback_years: number
  twenty_five_year_savings: number  // Net savings over 25 years (savings - system cost)
}

/**
 * Calculate solar savings for 3 scenarios based on actual electricity usage.
 *
 * @param kwhMonthly   - Monthly electricity consumption in kWh
 * @param billAmountUsd - Monthly electricity bill in USD
 */
export function calculateSavings(
  kwhMonthly: number,
  billAmountUsd: number
): { scenarios: Scenario[]; inputs: { kwh_monthly: number; bill_amount_usd: number; effective_rate: number } } {

  // Derive the customer's effective rate from their actual bill
  // (may differ from LUMA average due to demand charges, subsidies, etc.)
  const effectiveRate = billAmountUsd / kwhMonthly

  const configs = [
    { name: 'Pessimistic', offsetPct: 0.60, solarCostPerKwh: 0.12, paybackHorizon: 15 },
    { name: 'Realistic',   offsetPct: 0.85, solarCostPerKwh: 0.08, paybackHorizon: 10 },
    { name: 'Optimistic',  offsetPct: 1.00, solarCostPerKwh: 0.05, paybackHorizon: 7  },
  ]

  const scenarios: Scenario[] = configs.map((cfg) => {
    // kWh that solar would produce monthly
    const solarKwh = kwhMonthly * cfg.offsetPct

    // Monthly savings = kWh offset * (grid rate - solar effective cost)
    const monthlySavings = solarKwh * (effectiveRate - cfg.solarCostPerKwh)

    const annualSavings = monthlySavings * 12

    // System sizing:
    //   Daily production needed = solarKwh / 30.44 days
    //   System kW = daily kWh / sun hours
    //   System watts = kW * 1000
    const dailyKwhNeeded = solarKwh / DAYS_PER_MONTH
    const systemKw = dailyKwhNeeded / SUN_HOURS_PER_DAY
    const systemWatts = systemKw * 1000
    const systemCost = systemWatts * COST_PER_WATT

    // Payback = system cost / annual savings (simple, no financing)
    const paybackYears = annualSavings > 0 ? systemCost / annualSavings : Infinity

    // 25-year net savings accounting for panel degradation
    // Each year, production drops by DEGRADATION_RATE compounding
    let totalSavings25yr = 0
    for (let year = 1; year <= SYSTEM_LIFETIME_YEARS; year++) {
      const degradationFactor = Math.pow(1 - DEGRADATION_RATE, year)
      totalSavings25yr += annualSavings * degradationFactor
    }
    const netSavings25yr = totalSavings25yr - systemCost

    return {
      name: cfg.name,
      offset_pct: cfg.offsetPct,
      monthly_savings_usd: round2(monthlySavings),
      annual_savings_usd: round2(annualSavings),
      estimated_system_cost: round2(systemCost),
      payback_years: round2(paybackYears),
      twenty_five_year_savings: round2(netSavings25yr),
    }
  })

  return {
    scenarios,
    inputs: {
      kwh_monthly: kwhMonthly,
      bill_amount_usd: billAmountUsd,
      effective_rate: round2(effectiveRate),
    },
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}
