import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FitKids Staffing - PE & PTI Staffing',
    short_name: 'FitKids Staffing',
    description: 'Premier Physical Education & PTI Staffing Across Rajasthan Schools',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0B',
    theme_color: '#1E9BE8',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
