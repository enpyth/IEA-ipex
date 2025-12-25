import type { MetadataRoute } from 'next'

const baseUrl = 'https://www.ozhg.com.au'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/experts`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}