import React from 'react'
import { prisma } from '@/lib/prisma'
import { DocumentsManager } from '@/components/admin/DocumentsManager'

export const dynamic = 'force-dynamic'

export default async function AdminDocumentsPage() {
  const [documents, agreements] = await Promise.all([
    prisma.document.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        school: { select: { name: true } },
        pti: { select: { name: true } },
      },
    }),
    prisma.agreement.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        school: { select: { name: true } },
        pti: { select: { name: true } },
      },
    }),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
          Documents & Legal Agreements
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Archived school service agreements, instructor appointment letters, police clearance certificates, and NCTE degree verifications.
        </p>
      </div>

      <DocumentsManager
        initialDocuments={documents as any}
        initialAgreements={agreements as any}
      />
    </div>
  )
}
