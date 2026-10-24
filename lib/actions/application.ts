'use server'

import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { sendEmail } from '@/lib/email'
import { createNotification, logActivity } from '@/lib/notifications'
import { z } from 'zod'

const ApplicationSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  email: z.string().email('Valid email address is required'),
  dateOfBirth: z.string().optional(),
  address: z.string().min(5, 'Residential address is required'),
  qualification: z.enum(['DPED', 'BPED', 'MPED', 'OTHER'] as const),
  experience: z.coerce.number().min(0).default(0),
  sportsAchievements: z.string().optional().default(''),
  preferredCity: z.string().min(2, 'Preferred city is required'),
  expectedSalary: z.coerce.number().min(5000, 'Expected salary must be at least 5000'),
  resumeUrl: z.string().optional().default(''),
  certificatesUrl: z.string().optional().default(''),
  aadhaarUrl: z.string().optional().default(''),
  photoUrl: z.string().optional().default(''),
  consent: z.boolean().refine((val) => val === true, 'You must agree to the background verification terms'),
})

export async function submitApplication(formData: unknown) {
  const isAllowed = rateLimit('application_submission', 10, 60000)
  if (!isAllowed) {
    return {
      success: false,
      error: 'Too many submissions. Please wait a minute and try again.',
    }
  }

  const result = ApplicationSchema.safeParse(formData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || 'Invalid form input',
    }
  }

  const data = result.data

  try {
    const totalCount = await prisma.pTIApplication.count()
    const applicationId = `APP-${new Date().getFullYear()}-${String(totalCount + 1).padStart(4, '0')}`

    const application = await prisma.pTIApplication.create({
      data: {
        applicationId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        address: data.address,
        qualification: data.qualification,
        experience: data.experience,
        sportsAchievements: data.sportsAchievements,
        preferredCity: data.preferredCity,
        expectedSalary: data.expectedSalary,
        resumeUrl: data.resumeUrl,
        certificatesUrl: data.certificatesUrl,
        aadhaarUrl: data.aadhaarUrl,
        photoUrl: data.photoUrl,
        status: 'PENDING',
      },
    })

    // Admin notification
    await createNotification({
      type: 'APPLICATION',
      title: 'New PTI Job Application',
      message: `${data.name} (${data.qualification}, ${data.experience} yrs exp) applied for ${data.preferredCity}. Application ID: ${applicationId}`,
      link: '/admin/applications',
    })

    // Activity log
    await logActivity({
      action: 'CREATE_APPLICATION',
      entity: 'PTIApplication',
      entityId: application.id,
      after: { applicationId, name: data.name, qualification: data.qualification },
    })

    // Send confirmation email
    await sendEmail({
      to: data.email,
      subject: `FitKids Staffing Application Received – ${applicationId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0A0A0B; color: #E8EAF0; border-radius: 12px; border: 1px solid #1F2128;">
          <h2 style="color: #FF2D8A; margin-bottom: 8px;">FitKids Staffing Careers</h2>
          <p style="color: #9AA0AE; font-size: 14px; margin-top: 0;">Application Confirmation</p>
          <hr style="border: 0; border-top: 1px solid #1F2128; margin: 20px 0;" />
          <p>Dear ${data.name},</p>
          <p>Thank you for applying to join the FitKids Staffing instructor network across Rajasthan.</p>
          <div style="background-color: #14151A; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #1F2128;">
            <p style="margin: 4px 0;"><strong>Application Reference:</strong> <span style="color: #1E9BE8; font-weight: bold;">${applicationId}</span></p>
            <p style="margin: 4px 0;"><strong>Qualification:</strong> ${data.qualification}</p>
            <p style="margin: 4px 0;"><strong>Preferred City:</strong> ${data.preferredCity}</p>
          </div>
          <p>Our recruitment desk is reviewing your credentials. If shortlisted, you will receive an invitation for a telephonic screening followed by an in-person physical education demonstration session.</p>
          <p style="margin-top: 30px;">Best regards,<br/><strong>FitKids Staffing HR Team</strong><br/>Jaipur, Rajasthan</p>
        </div>
      `,
    })

    return {
      success: true,
      applicationId,
      message: 'Your application has been submitted successfully!',
    }
  } catch (error) {
    console.error('Application submission failed:', error)
    return {
      success: false,
      error: 'Failed to submit application. Please check your inputs and try again.',
    }
  }
}
