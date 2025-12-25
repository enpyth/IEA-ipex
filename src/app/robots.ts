import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: [
        '/auth/',
        '/dashboard/',
        '/api/',
        '/chatkit/'
      ]
    },
    sitemap: 'https://www.ozhg.com.au/sitemap.xml',
    host: 'https://www.ozhg.com.au'
  }
}