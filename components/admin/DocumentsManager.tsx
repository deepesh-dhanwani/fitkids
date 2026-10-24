'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDate } from '@/lib/utils'
import {
  FileText,
  FileSignature,
  ShieldCheck,
  Download,
  Eye,
  CheckCircle2,
  Building,
  User,
  ExternalLink,
} from 'lucide-react'

interface DocumentItem {
  id: string
  entityType: string
  name: string
  type: string
  url: string
  verified: boolean
  createdAt: Date | string
  school?: { name: string } | null
  pti?: { name: string } | null
}

interface AgreementItem {
  id: string
  entityType: string
  templateType: string
  signedAt: Date | string | null
  generatedPdfUrl: string
  signedPdfUrl: string
  createdAt: Date | string
  school?: { name: string } | null
  pti?: { name: string } | null
}

export function DocumentsManager({
  initialDocuments,
  initialAgreements,
}: {
  initialDocuments: DocumentItem[]
  initialAgreements: AgreementItem[]
}) {
  const [selectedAgreement, setSelectedAgreement] = useState<AgreementItem | null>(null)
  const [activeTab, setActiveTab] = useState<'agreements' | 'compliance'>('agreements')

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 border-b border-border pb-4">
        <button
          onClick={() => setActiveTab('agreements')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'agreements'
              ? 'bg-cerulean text-white shadow-sm'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Institutional Agreements ({initialAgreements.length})
        </button>
        <button
          onClick={() => setActiveTab('compliance')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'compliance'
              ? 'bg-cerulean text-white shadow-sm'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Compliance & Verification Docs ({initialDocuments.length})
        </button>
      </div>

      {activeTab === 'agreements' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-border bg-card">
              <span className="text-xs text-cerulean font-bold uppercase tracking-wider block">
                Standard Template #1
              </span>
              <h3 className="text-base font-bold text-text-primary mt-1 mb-2 font-heading">
                School Annual Staffing Agreement
              </h3>
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                12-month staffing contract covering replacement guarantees, monthly per-PTI fees, non-solicitation, and POCSO child safety covenants.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSelectedAgreement({
                    id: 'sample-1',
                    entityType: 'SCHOOL',
                    templateType: 'service_agreement',
                    signedAt: new Date(),
                    generatedPdfUrl: '',
                    signedPdfUrl: '',
                    createdAt: new Date(),
                    school: { name: 'Institutional Template' },
                  })
                }
                className="text-xs"
              >
                Inspect Agreement Terms
              </Button>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card">
              <span className="text-xs text-neon-rose font-bold uppercase tracking-wider block">
                Standard Template #2
              </span>
              <h3 className="text-base font-bold text-text-primary mt-1 mb-2 font-heading">
                PTI Appointment & Code of Conduct
              </h3>
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                Instructor contract specifying on-time monthly stipend, PF/ESI registration, professional code of conduct, and background verification declaration.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSelectedAgreement({
                    id: 'sample-2',
                    entityType: 'PTI',
                    templateType: 'appointment_letter',
                    signedAt: new Date(),
                    generatedPdfUrl: '',
                    signedPdfUrl: '',
                    createdAt: new Date(),
                    pti: { name: 'Instructor Template' },
                  })
                }
                className="text-xs"
              >
                Inspect Appointment Letter
              </Button>
            </div>
          </div>

          {/* Agreements Table */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-semibold text-xs">Agreement Type</TableHead>
                  <TableHead className="font-semibold text-xs">Partner Entity</TableHead>
                  <TableHead className="font-semibold text-xs">Execution Date</TableHead>
                  <TableHead className="font-semibold text-xs">Status</TableHead>
                  <TableHead className="font-semibold text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialAgreements.map((agr) => (
                  <TableRow key={agr.id} className="hover:bg-muted/40 transition-colors">
                    <TableCell className="font-medium text-xs text-text-primary">
                      <div className="flex items-center space-x-2">
                        <FileSignature className="h-4 w-4 text-cerulean" />
                        <span>
                          {agr.templateType === 'service_agreement'
                            ? 'School Annual Service Agreement'
                            : 'PTI Appointment Contract'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-text-muted">
                      {agr.school?.name || agr.pti?.name || 'General Agreement'}
                    </TableCell>
                    <TableCell className="text-xs text-text-muted">
                      {formatDate(agr.signedAt || agr.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="success" className="text-[10px]">
                        SIGNED & ACTIVE
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAgreement(agr)}
                        className="h-7 text-xs"
                      >
                        View Full Text
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        /* Compliance & Verification Docs */
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="font-semibold text-xs">Document Name</TableHead>
                <TableHead className="font-semibold text-xs">Entity Type</TableHead>
                <TableHead className="font-semibold text-xs">Owner</TableHead>
                <TableHead className="font-semibold text-xs">Verification Check</TableHead>
                <TableHead className="font-semibold text-xs text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialDocuments.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-medium text-xs text-text-primary">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-cerulean" />
                      <span>{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-text-muted font-mono">
                    {doc.entityType}
                  </TableCell>
                  <TableCell className="text-xs text-text-muted">
                    {doc.school?.name || doc.pti?.name || 'Central Archive'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={doc.verified ? 'success' : 'warning'} className="text-[10px]">
                      {doc.verified ? 'VERIFIED' : 'PENDING'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => alert(`Accessing archived document: ${doc.name}`)}
                      className="h-7 text-xs text-cerulean hover:underline"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* AGREEMENT PREVIEW DIALOG */}
      <Dialog
        open={!!selectedAgreement}
        onOpenChange={() => setSelectedAgreement(null)}
      >
        <DialogContent className="max-w-2xl bg-card border-border">
          {selectedAgreement && (
            <div className="space-y-4">
              <DialogHeader>
                <span className="text-xs font-bold uppercase tracking-wider text-cerulean">
                  Legal Agreement Dossier
                </span>
                <DialogTitle className="text-xl font-bold font-heading text-text-primary mt-1">
                  {selectedAgreement.templateType === 'service_agreement'
                    ? 'FitKids Staffing Service Agreement'
                    : 'PTI Appointment & Code of Conduct Letter'}
                </DialogTitle>
              </DialogHeader>

              <div className="max-h-96 overflow-y-auto p-4 rounded-xl border border-border bg-card-bg text-xs space-y-4 text-text-muted leading-relaxed font-sans">
                <p>
                  <strong>PARTIES:</strong> FitKids Staffing India Private Limited ("Staffing Provider") and {selectedAgreement.school?.name || selectedAgreement.pti?.name || 'Contracting Party'} ("Institution / Employee").
                </p>
                <p>
                  <strong>1. SCOPE OF SERVICES:</strong> Provider agrees to assign qualified Physical Training Instructor(s) holding recognized NCTE degrees (D.P.Ed/B.P.Ed) for school assemblies, physical education classes, and athletic training.
                </p>
                <p>
                  <strong>2. 24-HOUR REPLACEMENT GUARANTEE:</strong> In case of instructor absence exceeding 2 consecutive days, or performance dissatisfaction communicated in writing, Provider shall deploy an equivalent pre-screened substitute instructor within 24 to 48 hours without additional sourcing fees.
                </p>
                <p>
                  <strong>3. STATUTORY COMPLIANCE:</strong> Provider affirms direct responsibility for all statutory obligations including Employees' Provident Fund (EPF), Employee State Insurance (ESIC), and professional taxes.
                </p>
                <p>
                  <strong>4. CHILD SAFEGUARDING:</strong> The assigned instructor has executed full police background clearance and completed mandatory training under the Protection of Children from Sexual Offences (POCSO) Act.
                </p>
                <p>
                  <strong>5. JURISDICTION:</strong> This agreement is governed by the laws of India and subject to the exclusive jurisdiction of the courts of Jaipur, Rajasthan.
                </p>
              </div>

              <div className="pt-2 flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                >
                  Print / Export PDF
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedAgreement(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
