import React from 'react'
import { prisma } from '@/lib/prisma'
import { SettingsManager } from '@/components/admin/SettingsManager'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const settingsList = await prisma.siteSetting.findMany()
  const settingsMap: Record<string, string> = {}
  for (const s of settingsList) {
    settingsMap[s.key] = s.value
  }

  return <SettingsManager initialSettings={settingsMap} />
}
