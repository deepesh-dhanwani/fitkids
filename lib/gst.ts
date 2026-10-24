export function calculateGST({
  subtotal,
  schoolState = 'Rajasthan',
  companyState = 'Rajasthan',
  tdsRate = 0,
}: {
  subtotal: number
  schoolState?: string
  companyState?: string
  tdsRate?: number
}) {
  const gstRate = 0.18
  const isSameState =
    schoolState.toLowerCase().trim() === companyState.toLowerCase().trim()

  const cgst = isSameState ? subtotal * 0.09 : 0
  const sgst = isSameState ? subtotal * 0.09 : 0
  const igst = isSameState ? 0 : subtotal * gstRate
  const tds = (subtotal * tdsRate) / 100
  const total = subtotal + cgst + sgst + igst - tds

  return {
    cgst: Math.round(cgst),
    sgst: Math.round(sgst),
    igst: Math.round(igst),
    tds: Math.round(tds),
    total: Math.round(total),
  }
}
