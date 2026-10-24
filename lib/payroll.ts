export function calculatePayroll({
  basicSalary,
  presentDays,
  workingDays = 26,
  halfDays = 0,
  bonus = 0,
  pfEnabled = true,
  esiEnabled = true,
}: {
  basicSalary: number
  presentDays: number
  workingDays?: number
  halfDays?: number
  bonus?: number
  pfEnabled?: boolean
  esiEnabled?: boolean
}) {
  const effectiveDays = presentDays + halfDays * 0.5
  const earnedSalary = (basicSalary / workingDays) * effectiveDays
  const pfDeduction = pfEnabled ? Math.round(earnedSalary * 0.12) : 0
  const esiDeduction =
    esiEnabled && earnedSalary <= 21000 ? Math.round(earnedSalary * 0.0075) : 0
  const absentDeduction = Math.max(0, basicSalary - Math.round(earnedSalary))
  const netSalary = Math.round(earnedSalary + bonus - pfDeduction - esiDeduction)

  return {
    earnedSalary: Math.round(earnedSalary),
    pfDeduction,
    esiDeduction,
    absentDeduction,
    netSalary,
  }
}
