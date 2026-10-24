'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { logActivity, createNotification } from '@/lib/notifications'
import { calculatePayroll } from '@/lib/payroll'
import { calculateGST } from '@/lib/gst'
import bcrypt from 'bcryptjs'

// ================= ENQUIRIES =================
export async function updateEnquiryStatus(enquiryId: string, status: string, notes?: string) {
  try {
    const updated = await prisma.enquiry.update({
      where: { id: enquiryId },
      data: {
        status,
        ...(notes !== undefined ? { notes } : {}),
      },
    })
    revalidatePath('/admin/enquiries')
    revalidatePath('/admin')
    return { success: true, data: updated }
  } catch (error) {
    return { success: false, error: 'Failed to update enquiry status' }
  }
}

export async function assignEnquiry(enquiryId: string, userId: string | null) {
  try {
    const updated = await prisma.enquiry.update({
      where: { id: enquiryId },
      data: { assignedToId: userId },
    })
    revalidatePath('/admin/enquiries')
    return { success: true, data: updated }
  } catch (error) {
    return { success: false, error: 'Failed to assign enquiry' }
  }
}

export async function convertEnquiryToSchool(enquiryId: string) {
  try {
    const enquiry = await prisma.enquiry.findUnique({
      where: { id: enquiryId },
    })
    if (!enquiry) return { success: false, error: 'Enquiry not found' }

    // Create new school record
    const school = await prisma.school.create({
      data: {
        name: enquiry.schoolName,
        principalName: enquiry.contactPerson,
        phone: enquiry.phone,
        email: enquiry.email,
        city: enquiry.city,
        state: 'Rajasthan',
        board: enquiry.board || 'CBSE',
        address: `${enquiry.city}, Rajasthan`,
        feePerPTI: 30000,
        status: 'ACTIVE',
        contractStart: enquiry.preferredStart || new Date(),
        notes: `Converted from website lead on ${new Date().toLocaleDateString()}`,
      },
    })

    // Update enquiry status
    await prisma.enquiry.update({
      where: { id: enquiryId },
      data: {
        status: 'WON',
        convertedSchoolId: school.id,
      },
    })

    revalidatePath('/admin/enquiries')
    revalidatePath('/admin/schools')
    revalidatePath('/admin')
    return { success: true, schoolId: school.id }
  } catch (error) {
    console.error('Convert enquiry error:', error)
    return { success: false, error: 'Failed to convert enquiry to school' }
  }
}

export async function createAdminEnquiry(data: {
  schoolName: string
  contactPerson: string
  phone: string
  email: string
  city: string
  board: string
  students: number
  ptisNeeded: number
  message?: string
  status?: string
}) {
  try {
    const created = await prisma.enquiry.create({
      data: {
        schoolName: data.schoolName,
        contactPerson: data.contactPerson,
        phone: data.phone,
        email: data.email,
        city: data.city,
        board: data.board,
        students: data.students,
        ptisNeeded: data.ptisNeeded,
        message: data.message || '',
        status: data.status || 'NEW',
        source: 'Admin Created',
      },
    })
    revalidatePath('/admin/enquiries')
    return { success: true, data: created }
  } catch (error) {
    return { success: false, error: 'Failed to create enquiry' }
  }
}

// ================= SCHOOLS =================
export async function createSchool(data: {
  name: string
  principalName: string
  phone: string
  email: string
  city: string
  state: string
  board: string
  address: string
  gstNumber?: string
  feePerPTI: number
  status?: string
  notes?: string
}) {
  try {
    const school = await prisma.school.create({
      data: {
        name: data.name,
        principalName: data.principalName,
        phone: data.phone,
        email: data.email,
        city: data.city,
        state: data.state || 'Rajasthan',
        board: data.board,
        address: data.address,
        gstNumber: data.gstNumber || '',
        feePerPTI: data.feePerPTI,
        status: data.status || 'ACTIVE',
        notes: data.notes || '',
      },
    })
    revalidatePath('/admin/schools')
    return { success: true, school }
  } catch (error) {
    return { success: false, error: 'Failed to create school' }
  }
}

export async function updateSchool(
  id: string,
  data: Partial<{
    name: string
    principalName: string
    phone: string
    email: string
    city: string
    state: string
    board: string
    address: string
    gstNumber: string
    feePerPTI: number
    status: string
    notes: string
  }>
) {
  try {
    const updated = await prisma.school.update({
      where: { id },
      data,
    })
    revalidatePath('/admin/schools')
    revalidatePath(`/admin/schools/${id}`)
    return { success: true, school: updated }
  } catch (error) {
    return { success: false, error: 'Failed to update school' }
  }
}

// ================= PTIs =================
export async function createPTI(data: {
  name: string
  phone: string
  email: string
  qualification: string
  experience: number
  preferredCity: string
  expectedSalary: number
  currentSalary?: number
  address?: string
  sportsAchievements?: string
  bankName?: string
  accountNumber?: string
  ifscCode?: string
  pfNumber?: string
  esiNumber?: string
  aadhaarNumber?: string
  panNumber?: string
}) {
  try {
    const pti = await prisma.pTI.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        qualification: data.qualification,
        experience: data.experience,
        preferredCity: data.preferredCity,
        expectedSalary: data.expectedSalary,
        currentSalary: data.currentSalary || 0,
        address: data.address || '',
        sportsAchievements: data.sportsAchievements || '',
        bankName: data.bankName || '',
        accountNumber: data.accountNumber || '',
        ifscCode: data.ifscCode || '',
        pfNumber: data.pfNumber || '',
        esiNumber: data.esiNumber || '',
        aadhaarNumber: data.aadhaarNumber || '',
        panNumber: data.panNumber || '',
        employmentStatus: 'ACTIVE',
      },
    })
    revalidatePath('/admin/ptis')
    return { success: true, pti }
  } catch (error) {
    return { success: false, error: 'Failed to create PTI record' }
  }
}

export async function updatePTI(id: string, data: Record<string, any>) {
  try {
    const updated = await prisma.pTI.update({
      where: { id },
      data,
    })
    revalidatePath('/admin/ptis')
    revalidatePath(`/admin/ptis/${id}`)
    return { success: true, pti: updated }
  } catch (error) {
    return { success: false, error: 'Failed to update PTI' }
  }
}

export async function togglePTIVerification(
  id: string,
  field: 'policeVerified' | 'medicalFitness',
  value: boolean
) {
  try {
    const updated = await prisma.pTI.update({
      where: { id },
      data: { [field]: value },
    })
    revalidatePath('/admin/ptis')
    return { success: true, pti: updated }
  } catch (error) {
    return { success: false, error: 'Failed to update verification status' }
  }
}

// ================= APPLICATIONS =================
export async function updateApplicationStatus(
  id: string,
  status: string,
  notes?: string,
  rejectionReason?: string
) {
  try {
    const updated = await prisma.pTIApplication.update({
      where: { id },
      data: {
        status,
        ...(notes !== undefined ? { notes } : {}),
        ...(rejectionReason !== undefined ? { rejectionReason } : {}),
      },
    })
    revalidatePath('/admin/applications')
    return { success: true, application: updated }
  } catch (error) {
    return { success: false, error: 'Failed to update application status' }
  }
}

export async function approveApplication(applicationId: string) {
  try {
    const app = await prisma.pTIApplication.findUnique({
      where: { id: applicationId },
    })
    if (!app) return { success: false, error: 'Application not found' }

    // Create PTI record from application data
    const pti = await prisma.pTI.create({
      data: {
        name: app.name,
        phone: app.phone,
        email: app.email,
        dateOfBirth: app.dateOfBirth,
        qualification: app.qualification,
        experience: app.experience,
        sportsAchievements: app.sportsAchievements,
        preferredCity: app.preferredCity,
        expectedSalary: app.expectedSalary,
        currentSalary: app.expectedSalary,
        address: app.address,
        photoUrl: app.photoUrl,
        employmentStatus: 'ACTIVE',
        policeVerified: false,
        medicalFitness: false,
      },
    })

    // Update application to APPROVED
    await prisma.pTIApplication.update({
      where: { id: applicationId },
      data: { status: 'APPROVED' },
    })

    revalidatePath('/admin/applications')
    revalidatePath('/admin/ptis')
    revalidatePath('/admin')
    return { success: true, ptiId: pti.id }
  } catch (error) {
    console.error('Approve application error:', error)
    return { success: false, error: 'Failed to approve application' }
  }
}

// ================= PLACEMENTS =================
export async function createPlacement(data: {
  ptiId: string
  schoolId: string
  startDate: string
  salary: number
  schoolFee: number
  workingDays?: number
  notes?: string
}) {
  try {
    const placement = await prisma.placement.create({
      data: {
        ptiId: data.ptiId,
        schoolId: data.schoolId,
        startDate: new Date(data.startDate),
        salary: data.salary,
        schoolFee: data.schoolFee,
        workingDays: data.workingDays || 26,
        status: 'ACTIVE',
        notes: data.notes || '',
      },
    })

    // Update PTI's currentSalary
    await prisma.pTI.update({
      where: { id: data.ptiId },
      data: { currentSalary: data.salary, employmentStatus: 'ACTIVE' },
    })

    revalidatePath('/admin/placements')
    revalidatePath('/admin/schools')
    revalidatePath('/admin/ptis')
    return { success: true, placement }
  } catch (error) {
    return { success: false, error: 'Failed to create placement' }
  }
}

export async function endPlacement(placementId: string, notes?: string) {
  try {
    const updated = await prisma.placement.update({
      where: { id: placementId },
      data: {
        status: 'ENDED',
        endDate: new Date(),
        ...(notes ? { notes } : {}),
      },
    })
    revalidatePath('/admin/placements')
    return { success: true, placement: updated }
  } catch (error) {
    return { success: false, error: 'Failed to end placement' }
  }
}

export async function replacePlacement(currentPlacementId: string, newPtiId: string, reason: string) {
  try {
    const current = await prisma.placement.findUnique({
      where: { id: currentPlacementId },
    })
    if (!current) return { success: false, error: 'Placement not found' }

    // End current placement
    await prisma.placement.update({
      where: { id: currentPlacementId },
      data: {
        status: 'ENDED',
        endDate: new Date(),
        notes: `Replaced by new instructor. Reason: ${reason}`,
      },
    })

    // Create replacement placement
    const newPlacement = await prisma.placement.create({
      data: {
        ptiId: newPtiId,
        schoolId: current.schoolId,
        startDate: new Date(),
        salary: current.salary,
        schoolFee: current.schoolFee,
        workingDays: current.workingDays,
        status: 'ACTIVE',
        replacementForId: currentPlacementId,
        notes: `Replacement deployment. Previous instructor: ${current.ptiId}`,
      },
    })

    revalidatePath('/admin/placements')
    return { success: true, newPlacement }
  } catch (error) {
    return { success: false, error: 'Failed to process replacement' }
  }
}

// ================= ATTENDANCE =================
export async function saveAttendanceRecord(data: {
  ptiId: string
  schoolId: string
  month: number
  year: number
  records: Record<string, string>
  presentDays: number
  absentDays: number
  halfDays: number
  leaveDays: number
}) {
  try {
    const attendance = await prisma.attendance.upsert({
      where: {
        ptiId_schoolId_month_year: {
          ptiId: data.ptiId,
          schoolId: data.schoolId,
          month: data.month,
          year: data.year,
        },
      },
      update: {
        records: JSON.stringify(data.records),
        presentDays: data.presentDays,
        absentDays: data.absentDays,
        halfDays: data.halfDays,
        leaveDays: data.leaveDays,
        approvedAt: new Date(),
      },
      create: {
        ptiId: data.ptiId,
        schoolId: data.schoolId,
        month: data.month,
        year: data.year,
        records: JSON.stringify(data.records),
        presentDays: data.presentDays,
        absentDays: data.absentDays,
        halfDays: data.halfDays,
        leaveDays: data.leaveDays,
        approvedAt: new Date(),
      },
    })
    revalidatePath('/admin/attendance')
    return { success: true, attendance }
  } catch (error) {
    console.error('Attendance save error:', error)
    return { success: false, error: 'Failed to save attendance' }
  }
}

// ================= PAYROLL =================
export async function generateMonthlyPayroll(month: number, year: number) {
  try {
    const placements = await prisma.placement.findMany({
      where: { status: 'ACTIVE' },
      include: { pti: true },
    })

    let createdCount = 0
    for (const pl of placements) {
      // Find attendance for this PTI and month
      const attendance = await prisma.attendance.findFirst({
        where: { ptiId: pl.ptiId, month, year },
      })

      const presentDays = attendance ? attendance.presentDays : 26
      const halfDays = attendance ? attendance.halfDays : 0
      const calc = calculatePayroll({
        basicSalary: pl.salary,
        presentDays,
        workingDays: pl.workingDays || 26,
        halfDays,
        pfEnabled: true,
        esiEnabled: true,
      })

      await prisma.payroll.upsert({
        where: {
          ptiId_month_year: {
            ptiId: pl.ptiId,
            month,
            year,
          },
        },
        update: {
          basicSalary: pl.salary,
          presentDays,
          workingDays: pl.workingDays,
          absentDeduction: calc.absentDeduction,
          pfDeduction: calc.pfDeduction,
          esiDeduction: calc.esiDeduction,
          netSalary: calc.netSalary,
        },
        create: {
          ptiId: pl.ptiId,
          month,
          year,
          basicSalary: pl.salary,
          presentDays,
          workingDays: pl.workingDays,
          absentDeduction: calc.absentDeduction,
          pfDeduction: calc.pfDeduction,
          esiDeduction: calc.esiDeduction,
          otherDeductions: 0,
          bonus: 0,
          netSalary: calc.netSalary,
          status: 'PENDING',
        },
      })
      createdCount++
    }

    revalidatePath('/admin/payroll')
    return { success: true, count: createdCount }
  } catch (error) {
    console.error('Payroll generation error:', error)
    return { success: false, error: 'Failed to generate payroll' }
  }
}

export async function markPayrollPaid(payrollId: string, transactionRef: string) {
  try {
    const updated = await prisma.payroll.update({
      where: { id: payrollId },
      data: {
        status: 'PAID',
        transactionRef,
        paidAt: new Date(),
      },
    })
    revalidatePath('/admin/payroll')
    return { success: true, payroll: updated }
  } catch (error) {
    return { success: false, error: 'Failed to mark payroll as paid' }
  }
}

// ================= INVOICING =================
export async function createInvoice(data: {
  schoolId: string
  month: number
  year: number
  lineItems: Array<{ description: string; quantity: number; rate: number; amount: number }>
  tdsRate?: number
  notes?: string
}) {
  try {
    const school = await prisma.school.findUnique({
      where: { id: data.schoolId },
    })
    if (!school) return { success: false, error: 'School not found' }

    const subtotal = data.lineItems.reduce((acc, item) => acc + item.amount, 0)
    const gst = calculateGST({
      subtotal,
      schoolState: school.state,
      tdsRate: data.tdsRate || 0,
    })

    const invoiceNumber = `INV-${data.year}-${String(data.month).padStart(2, '0')}-${Math.floor(100 + Math.random() * 900)}`

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        schoolId: data.schoolId,
        month: data.month,
        year: data.year,
        lineItems: JSON.stringify(data.lineItems),
        subtotal,
        cgst: gst.cgst,
        sgst: gst.sgst,
        igst: gst.igst,
        tds: gst.tds,
        total: gst.total,
        status: 'SENT',
        dueDate: new Date(data.year, data.month, 10),
        notes: data.notes || '',
      },
    })

    revalidatePath('/admin/invoices')
    return { success: true, invoice }
  } catch (error) {
    console.error('Create invoice error:', error)
    return { success: false, error: 'Failed to generate invoice' }
  }
}

export async function updateInvoiceStatus(id: string, status: string, notes?: string) {
  try {
    const updated = await prisma.invoice.update({
      where: { id },
      data: {
        status,
        ...(notes !== undefined ? { notes } : {}),
      },
    })
    revalidatePath('/admin/invoices')
    return { success: true, invoice: updated }
  } catch (error) {
    return { success: false, error: 'Failed to update invoice status' }
  }
}

// ================= CMS CONTENT =================
export async function createOrUpdateTestimonial(data: {
  id?: string
  schoolName: string
  contactName: string
  designation: string
  text: string
  rating: number
  photoUrl?: string
}) {
  try {
    if (data.id) {
      await prisma.testimonial.update({
        where: { id: data.id },
        data: {
          schoolName: data.schoolName,
          contactName: data.contactName,
          designation: data.designation,
          text: data.text,
          rating: data.rating,
          photoUrl: data.photoUrl || '',
        },
      })
    } else {
      await prisma.testimonial.create({
        data: {
          schoolName: data.schoolName,
          contactName: data.contactName,
          designation: data.designation,
          text: data.text,
          rating: data.rating,
          photoUrl: data.photoUrl || '',
        },
      })
    }
    revalidatePath('/admin/content')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to save testimonial' }
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } })
    revalidatePath('/admin/content')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete testimonial' }
  }
}

export async function createOrUpdateFAQ(data: {
  id?: string
  question: string
  answer: string
  category: string
  order?: number
}) {
  try {
    if (data.id) {
      await prisma.fAQ.update({
        where: { id: data.id },
        data: {
          question: data.question,
          answer: data.answer,
          category: data.category,
          order: data.order || 0,
        },
      })
    } else {
      await prisma.fAQ.create({
        data: {
          question: data.question,
          answer: data.answer,
          category: data.category,
          order: data.order || 0,
        },
      })
    }
    revalidatePath('/admin/content')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to save FAQ' }
  }
}

export async function deleteFAQ(id: string) {
  try {
    await prisma.fAQ.delete({ where: { id } })
    revalidatePath('/admin/content')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete FAQ' }
  }
}

export async function createOrUpdateBlogPost(data: {
  id?: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  coverUrl?: string
  published: boolean
}) {
  try {
    if (data.id) {
      await prisma.blogPost.update({
        where: { id: data.id },
        data: {
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt,
          category: data.category,
          coverUrl: data.coverUrl || '',
          published: data.published,
          publishedAt: data.published ? new Date() : null,
        },
      })
    } else {
      await prisma.blogPost.create({
        data: {
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt,
          category: data.category,
          coverUrl: data.coverUrl || '',
          published: data.published,
          publishedAt: data.published ? new Date() : null,
        },
      })
    }
    revalidatePath('/admin/content')
    revalidatePath('/blog')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to save blog post' }
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({ where: { id } })
    revalidatePath('/admin/content')
    revalidatePath('/blog')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete blog post' }
  }
}

export async function createGalleryItem(data: {
  title: string
  category: string
  url: string
  type?: string
}) {
  try {
    await prisma.galleryItem.create({
      data: {
        title: data.title,
        category: data.category,
        url: data.url,
        type: data.type || 'IMAGE',
      },
    })
    revalidatePath('/admin/content')
    revalidatePath('/gallery')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to create gallery item' }
  }
}

export async function deleteGalleryItem(id: string) {
  try {
    await prisma.galleryItem.delete({ where: { id } })
    revalidatePath('/admin/content')
    revalidatePath('/gallery')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete gallery item' }
  }
}

export async function createOrUpdateSchoolLogo(data: {
  id?: string
  name: string
  logoUrl: string
  order?: number
}) {
  try {
    if (data.id) {
      await prisma.schoolLogo.update({
        where: { id: data.id },
        data: {
          schoolName: data.name,
          logoUrl: data.logoUrl,
          order: data.order || 0,
        },
      })
    } else {
      await prisma.schoolLogo.create({
        data: {
          schoolName: data.name,
          logoUrl: data.logoUrl,
          order: data.order || 0,
        },
      })
    }
    revalidatePath('/admin/content')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to save school logo' }
  }
}

export async function deleteSchoolLogo(id: string) {
  try {
    await prisma.schoolLogo.delete({ where: { id } })
    revalidatePath('/admin/content')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete school logo' }
  }
}

// ================= SITE SETTINGS =================
export async function updateSiteSettings(settings: Record<string, string>) {
  try {
    for (const [key, value] of Object.entries(settings)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    }
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to update site settings' }
  }
}

// ================= USERS & ROLES =================
export async function createAdminUser(data: {
  name: string
  email: string
  password: string
  role: string
}) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        hashedPassword,
        role: data.role,
        isActive: true,
      },
    })
    revalidatePath('/admin/users')
    return { success: true, user }
  } catch (error) {
    return { success: false, error: 'Failed to create user or email already exists' }
  }
}

export async function updateUserRole(userId: string, role: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    })
    revalidatePath('/admin/users')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to update user role' }
  }
}

export async function toggleUserStatus(userId: string, isActive: boolean) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isActive },
    })
    revalidatePath('/admin/users')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to toggle user status' }
  }
}

export async function resetUserPassword(userId: string) {
  try {
    const tempPassword = `Temp@${Math.floor(100000 + Math.random() * 900000)}`
    const hashedPassword = await bcrypt.hash(tempPassword, 10)
    await prisma.user.update({
      where: { id: userId },
      data: { hashedPassword },
    })
    revalidatePath('/admin/users')
    return { success: true, tempPassword }
  } catch (error) {
    return { success: false, error: 'Failed to reset password' }
  }
}

// ================= NOTIFICATIONS =================
export async function markNotificationAsRead(id: string) {
  try {
    await prisma.notification.update({
      where: { id },
      data: { read: true },
    })
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to mark notification read' }
  }
}
