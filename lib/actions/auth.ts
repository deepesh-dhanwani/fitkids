'use server'

import { signIn, signOut } from '@/lib/auth'
import { AuthError } from 'next-auth'

export async function loginAction(values: { email: string; password: string }) {
  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Invalid email or password' }
        default:
          return { success: false, error: 'Authentication failed. Please try again.' }
      }
    }
    // NextAuth throws a redirect error on success if redirect is true, but with redirect:false:
    return { success: false, error: 'Invalid credentials or inactive account' }
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: '/login' })
}
