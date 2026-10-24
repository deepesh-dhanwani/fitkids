export interface InvoicePDFData {
  invoiceNumber: string
  date: string
  dueDate: string
  schoolName: string
  principalName: string
  schoolAddress: string
  schoolCity: string
  schoolGst: string
  month: string
  year: number
  subtotal: number
  cgst: number
  sgst: number
  igst: number
  tds: number
  total: number
  status: string
  companyName: string
  companyAddress: string
  companyGst: string
  companyPan: string
  bankName: string
  bankAccount: string
  bankIfsc: string
}

export function generateInvoiceHTML(data: InvoicePDFData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Tax Invoice - ${data.invoiceNumber}</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; margin: 0; padding: 24px; font-size: 13px; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #1E9BE8; padding-bottom: 16px; margin-bottom: 24px; }
    .brand-title { font-size: 24px; font-weight: bold; color: #1E9BE8; margin: 0; }
    .invoice-title { font-size: 20px; font-weight: bold; text-align: right; margin: 0; }
    .info-grid { display: flex; justify-content: space-between; margin-bottom: 24px; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table th { background: #f4f4f5; text-align: left; padding: 10px; border: 1px solid #e4e4e7; font-size: 12px; }
    .table td { padding: 10px; border: 1px solid #e4e4e7; font-size: 12px; }
    .totals { margin-left: auto; width: 320px; margin-bottom: 24px; }
    .totals tr td:first-child { text-align: left; padding: 6px; }
    .totals tr td:last-child { text-align: right; padding: 6px; font-family: monospace; }
    .bank-box { border: 1px solid #e4e4e7; background: #fafafa; padding: 12px; border-radius: 6px; margin-bottom: 24px; }
    .footer { text-align: center; color: #71717a; font-size: 11px; margin-top: 40px; border-top: 1px solid #e4e4e7; padding-top: 16px; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="brand-title">FITKIDS STAFFING</h1>
      <p style="margin: 4px 0; color: #555;">${data.companyAddress}</p>
      <p style="margin: 2px 0;"><strong>GSTIN:</strong> ${data.companyGst} | <strong>PAN:</strong> ${data.companyPan}</p>
    </div>
    <div style="text-align: right;">
      <h2 class="invoice-title">TAX INVOICE</h2>
      <p style="margin: 4px 0;"><strong>Invoice #:</strong> ${data.invoiceNumber}</p>
      <p style="margin: 2px 0;"><strong>Date:</strong> ${data.date}</p>
      <p style="margin: 2px 0;"><strong>Due Date:</strong> ${data.dueDate}</p>
      <p style="margin: 2px 0;"><strong>Status:</strong> <span style="color: ${data.status === 'PAID' ? 'green' : 'orange'}; font-weight: bold;">${data.status}</span></p>
    </div>
  </div>

  <div class="info-grid">
    <div>
      <h4 style="margin: 0 0 6px 0; color: #71717a; text-transform: uppercase; font-size: 11px;">Billed To:</h4>
      <p style="margin: 0; font-size: 15px; font-weight: bold;">${data.schoolName}</p>
      <p style="margin: 2px 0;">Attn: ${data.principalName}</p>
      <p style="margin: 2px 0;">${data.schoolAddress}</p>
      <p style="margin: 2px 0;">${data.schoolCity}, Rajasthan</p>
      <p style="margin: 2px 0;"><strong>GSTIN:</strong> ${data.schoolGst || 'Unregistered / Exempt'}</p>
    </div>
    <div style="text-align: right;">
      <h4 style="margin: 0 0 6px 0; color: #71717a; text-transform: uppercase; font-size: 11px;">Service Period:</h4>
      <p style="margin: 0; font-size: 14px; font-weight: bold;">${data.month} ${data.year}</p>
      <p style="margin: 2px 0; color: #555;">HSN/SAC: 998311 (PE & Sports Staffing)</p>
    </div>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th style="width: 50px;">#</th>
        <th>Description of Services</th>
        <th style="width: 100px; text-align: center;">SAC Code</th>
        <th style="width: 120px; text-align: right;">Amount (INR)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>
          <strong>Physical Education & Sports PTI Staffing</strong><br>
          <span style="color: #666; font-size: 11px;">Dedicated certified Physical Training Instructors deployed for curriculum delivery and sports administration.</span>
        </td>
        <td style="text-align: center;">998311</td>
        <td style="text-align: right; font-family: monospace;">₹${data.subtotal.toLocaleString('en-IN')}</td>
      </tr>
    </tbody>
  </table>

  <table class="totals">
    <tr>
      <td>Subtotal:</td>
      <td>₹${data.subtotal.toLocaleString('en-IN')}</td>
    </tr>
    ${data.cgst > 0 ? `
    <tr>
      <td>CGST (9.0%):</td>
      <td>₹${data.cgst.toLocaleString('en-IN')}</td>
    </tr>
    <tr>
      <td>SGST (9.0%):</td>
      <td>₹${data.cgst.toLocaleString('en-IN')}</td>
    </tr>
    ` : `
    <tr>
      <td>IGST (18.0%):</td>
      <td>₹${data.igst.toLocaleString('en-IN')}</td>
    </tr>
    `}
    <tr style="border-top: 2px solid #111; font-weight: bold; font-size: 14px;">
      <td>Total Payable:</td>
      <td style="color: #1E9BE8;">₹${data.total.toLocaleString('en-IN')}</td>
    </tr>
  </table>

  <div class="bank-box">
    <strong style="color: #111;">Electronic Remittance Details (NEFT / RTGS / IMPS):</strong><br>
    <strong>Bank:</strong> ${data.bankName} | <strong>A/C No:</strong> ${data.bankAccount} | <strong>IFSC:</strong> ${data.bankIfsc}
  </div>

  <div class="footer">
    This is a system-generated electronic tax invoice authorized by FitKids Staffing Private Limited.<br>
    Jaipur Head Office: 402, Signature Tower, Tonk Road, Jaipur, Rajasthan 302015.
  </div>
</body>
</html>
`
}

export interface PayslipPDFData {
  ptiName: string
  ptiPhone: string
  qualification: string
  assignedSchool: string
  month: string
  year: number
  grossPay: number
  absentDays: number
  deductions: number
  pfEmployee: number
  esiEmployee: number
  netPay: number
  bankAccount: string
  bankIfsc: string
  status: string
  paidAt?: string
}

export function generatePayslipHTML(data: PayslipPDFData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payslip - ${data.ptiName} - ${data.month} ${data.year}</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; margin: 0; padding: 24px; font-size: 13px; }
    .header { text-align: center; border-bottom: 2px solid #1E9BE8; padding-bottom: 16px; margin-bottom: 20px; }
    .title { font-size: 20px; font-weight: bold; margin: 0; color: #1E9BE8; }
    .subtitle { font-size: 13px; color: #555; margin: 4px 0; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; }
    .grid { display: flex; justify-content: space-between; margin-bottom: 20px; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .table th { background: #f4f4f5; text-align: left; padding: 8px; border: 1px solid #e4e4e7; font-size: 12px; }
    .table td { padding: 8px; border: 1px solid #e4e4e7; font-size: 12px; }
    .net-box { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px; border-radius: 6px; text-align: right; font-size: 16px; font-weight: bold; color: #166534; margin-bottom: 20px; }
    .footer { text-align: center; color: #71717a; font-size: 11px; margin-top: 30px; border-top: 1px solid #e4e4e7; padding-top: 12px; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">FITKIDS STAFFING PRIVATE LIMITED</div>
    <div class="subtitle">Salary & Stipend Disbursal Slip - ${data.month} ${data.year}</div>
  </div>

  <div class="grid">
    <div>
      <p style="margin: 2px 0;"><strong>Employee Name:</strong> ${data.ptiName}</p>
      <p style="margin: 2px 0;"><strong>Phone:</strong> ${data.ptiPhone}</p>
      <p style="margin: 2px 0;"><strong>Qualification:</strong> ${data.qualification}</p>
      <p style="margin: 2px 0;"><strong>Assigned School:</strong> ${data.assignedSchool}</p>
    </div>
    <div style="text-align: right;">
      <p style="margin: 2px 0;"><strong>Disbursal Month:</strong> ${data.month} ${data.year}</p>
      <p style="margin: 2px 0;"><strong>Bank A/C:</strong> ${data.bankAccount}</p>
      <p style="margin: 2px 0;"><strong>IFSC Code:</strong> ${data.bankIfsc}</p>
      <p style="margin: 2px 0;"><strong>Status:</strong> ${data.status}</p>
    </div>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th>Earnings (Credits)</th>
        <th style="text-align: right;">Amount (INR)</th>
        <th>Deductions (Debits)</th>
        <th style="text-align: right;">Amount (INR)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Gross Stipend</td>
        <td style="text-align: right; font-family: monospace;">₹${data.grossPay.toLocaleString('en-IN')}</td>
        <td>Absence Deductions (${data.absentDays} days)</td>
        <td style="text-align: right; font-family: monospace;">₹${data.deductions.toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td>Performance Allowance</td>
        <td style="text-align: right; font-family: monospace;">₹0</td>
        <td>Provident Fund (PF 12%)</td>
        <td style="text-align: right; font-family: monospace;">₹${data.pfEmployee.toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td>Travel / Equipment Allowance</td>
        <td style="text-align: right; font-family: monospace;">₹0</td>
        <td>ESI Employee Share (0.75%)</td>
        <td style="text-align: right; font-family: monospace;">₹${data.esiEmployee.toLocaleString('en-IN')}</td>
      </tr>
      <tr style="background: #fafafa; font-weight: bold;">
        <td>Total Gross Earnings</td>
        <td style="text-align: right; font-family: monospace;">₹${data.grossPay.toLocaleString('en-IN')}</td>
        <td>Total Statutory Deductions</td>
        <td style="text-align: right; font-family: monospace;">₹${(data.deductions + data.pfEmployee + data.esiEmployee).toLocaleString('en-IN')}</td>
      </tr>
    </tbody>
  </table>

  <div class="net-box">
    Net Disbursal Amount: ₹${data.netPay.toLocaleString('en-IN')}
  </div>

  <div class="footer">
    This is a confidential computer-generated pay slip and does not require a physical signature.<br>
    FitKids Staffing Private Limited • Tonk Road, Jaipur, Rajasthan 302015.
  </div>
</body>
</html>
`
}
