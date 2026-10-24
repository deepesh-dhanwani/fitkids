import React from 'react'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { generateInvoiceHTML } from '@/lib/pdf/templates'

interface Props {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function InvoicePrintPage({ params }: Props) {
  const { id } = await params
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { school: true },
  })

  if (!invoice) return notFound()

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const html = generateInvoiceHTML({
    invoiceNumber: invoice.invoiceNumber,
    date: new Date(invoice.createdAt).toLocaleDateString('en-IN'),
    dueDate: invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('en-IN') : 'N/A',
    schoolName: invoice.school.name,
    principalName: invoice.school.principalName,
    schoolAddress: invoice.school.address,
    schoolCity: invoice.school.city,
    schoolGst: invoice.school.gstNumber || '',
    month: months[invoice.month - 1] || 'Current Month',
    year: invoice.year,
    subtotal: invoice.subtotal,
    cgst: invoice.cgst,
    sgst: invoice.sgst,
    igst: invoice.igst,
    tds: invoice.tds,
    total: invoice.total,
    status: invoice.status,
    companyName: 'FitKids Staffing Private Limited',
    companyAddress: '402, Signature Tower, Tonk Road, Jaipur, Rajasthan 302015',
    companyGst: '08AABCF1234M1Z5',
    companyPan: 'AABCF1234M',
    bankName: 'HDFC Bank Ltd',
    bankAccount: '50200012345678',
    bankIfsc: 'HDFC0001234',
  })

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="p-4 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between print:hidden">
        <p className="text-sm font-semibold text-zinc-700">Tax Invoice Preview • {invoice.invoiceNumber}</p>
        <button
          onClick={() => {}}
          className="px-4 py-2 bg-blue-600 text-white rounded font-medium text-xs hover:bg-blue-700"
          id="print-btn"
        >
          Print Invoice / Save as PDF
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('print-btn')?.addEventListener('click', () => window.print());`,
        }}
      />
    </div>
  )
}
