export const UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  HR: 'HR',
  ACCOUNTS: 'ACCOUNTS',
} as const
export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export const SchoolStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PROSPECT: 'PROSPECT',
} as const
export type SchoolStatus = (typeof SchoolStatus)[keyof typeof SchoolStatus]

export const PTIStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ON_LEAVE: 'ON_LEAVE',
  TERMINATED: 'TERMINATED',
} as const
export type PTIStatus = (typeof PTIStatus)[keyof typeof PTIStatus]

export const ApplicationStatus = {
  PENDING: 'PENDING',
  SHORTLISTED: 'SHORTLISTED',
  INTERVIEWED: 'INTERVIEWED',
  DEMO_SCHEDULED: 'DEMO_SCHEDULED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const
export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]

export const EnquiryStatus = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  DEMO_SCHEDULED: 'DEMO_SCHEDULED',
  PROPOSAL_SENT: 'PROPOSAL_SENT',
  WON: 'WON',
  LOST: 'LOST',
} as const
export type EnquiryStatus = (typeof EnquiryStatus)[keyof typeof EnquiryStatus]

export const PlacementStatus = {
  ACTIVE: 'ACTIVE',
  ENDED: 'ENDED',
  ON_HOLD: 'ON_HOLD',
} as const
export type PlacementStatus = (typeof PlacementStatus)[keyof typeof PlacementStatus]

export const PayrollStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
} as const
export type PayrollStatus = (typeof PayrollStatus)[keyof typeof PayrollStatus]

export const InvoiceStatus = {
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  PAID: 'PAID',
  OVERDUE: 'OVERDUE',
} as const
export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus]

export const Qualification = {
  DPED: 'DPED',
  BPED: 'BPED',
  MPED: 'MPED',
  OTHER: 'OTHER',
} as const
export type Qualification = (typeof Qualification)[keyof typeof Qualification]

export const AttendanceStatus = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  HALF_DAY: 'HALF_DAY',
  LEAVE: 'LEAVE',
} as const
export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus]
