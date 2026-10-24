'use server'

import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { sendEmail } from '@/lib/email'
import { createNotification, logActivity } from '@/lib/notifications'
import { z } from 'zod'

const EnquirySchema = z.object({
  schoolName: z.string().min(2, 'School name is required'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  email: z.string().email('Valid email address is required'),
  city: z.string().min(2, 'City is required'),
  board: z.string().default('CBSE'),
  students: z.coerce.number().min(0).default(0),
  ptisNeeded: z.coerce.number().min(1).default(1),
  preferredStart: z.string().optional(),
  message: z.string().optional(),
})

export async function submitEnquiry(formData: unknown) {
  // Rate limit by IP or general key
  const isAllowed = rateLimit('enquiry_submission', 10, 60000)
  if (!isAllowed) {
    return {
      success: false,
      error: 'Too many submissions. Please wait a minute and try again.',
    }
  }

  const result = EnquirySchema.safeParse(formData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || 'Invalid form input',
    }
  }

  const data = result.data

  try {
    const enquiry = await prisma.enquiry.create({
      data: {
        schoolName: data.schoolName,
        contactPerson: data.contactPerson,
        phone: data.phone,
        email: data.email,
        city: data.city,
        board: data.board || 'CBSE',
        students: data.students || 0,
        ptisNeeded: data.ptisNeeded || 1,
        preferredStart: data.preferredStart ? new Date(data.preferredStart) : null,
        message: data.message || '',
        status: 'NEW',
        source: 'Website',
      },
    })

    // Create Admin Notification
    await createNotification({
      type: 'ENQUIRY',
      title: 'New School Staffing Request',
      message: `${data.schoolName} (${data.city}) requested ${data.ptisNeeded} PTI(s). Contact: ${data.contactPerson} (${data.phone})`,
      link: '/admin/enquiries',
    })

    // Log Activity
    await logActivity({
      action: 'CREATE_ENQUIRY',
      entity: 'Enquiry',
      entityId: enquiry.id,
      after: { schoolName: data.schoolName, city: data.city },
    })

    // Send confirmation email to school
    await sendEmail({
      to: data.email,
      subject: 'FitKids Staffing – We received your PTI staffing inquiry',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0A0A0B; color: #E8EAF0; border-radius: 12px; border: 1px solid #1F2128;">
          <h2 style="color: #1E9BE8; margin-bottom: 8px;">FitKids Staffing</h2>
          <p style="color: #9AA0AE; font-size: 14px; margin-top: 0;">Qualified PTI Teachers for Your School</p>
          <hr style="border: 0; border-top: 1px solid #1F2128; margin: 20px 0;" />
          <p>Dear ${data.contactPerson},</p>
          <p>Thank you for reaching out to FitKids Staffing. We have received your inquiry for <strong>${data.schoolName}</strong> in <strong>${data.city}</strong>.</p>
          <div style="background-color: #14151A; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #1F2128;">
            <p style="margin: 4px 0;"><strong>PTIs Requested:</strong> ${data.ptisNeeded}</p>
            <p style="margin: 4px 0;"><strong>Curriculum Board:</strong> ${data.board}</p>
            <p style="margin: 4px 0;"><strong>City:</strong> ${data.city}</p>
          </div>
          <p>Our staffing coordinator will call you within 24 business hours at <strong>${data.phone}</strong> to discuss instructor qualifications, schedule demo classes, and provide customized contract terms.</p>
          <p style="margin-top: 30px;">Warm regards,<br/><strong>FitKids Staffing Operations Team</strong><br/>Jaipur, Rajasthan</p>
        </div>
      `,
    })

    return {
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
    }
  } catch (error) {
    console.error('Enquiry submission failed:', error)
    return {
      success: false,
      error: 'Failed to submit enquiry. Please try again or WhatsApp us directly.',
    }
  }
}
