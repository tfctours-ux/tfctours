import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.tfctours.com'

const englishRoutes: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '/',                          changeFrequency: 'daily',   priority: 1.0  },
  { path: '/umrah',                     changeFrequency: 'weekly',  priority: 0.95 },
  { path: '/umrah-calculator',          changeFrequency: 'monthly', priority: 0.8  },
  { path: '/tour-calculator',           changeFrequency: 'monthly', priority: 0.8  },
  { path: '/tours',                     changeFrequency: 'weekly',  priority: 0.9  },
  { path: '/services',                  changeFrequency: 'weekly',  priority: 0.9  },
  { path: '/about',                     changeFrequency: 'monthly', priority: 0.7  },
  { path: '/contact',                   changeFrequency: 'monthly', priority: 0.7  },
  { path: '/services/ticket-booking',   changeFrequency: 'weekly',  priority: 0.9  },
  { path: '/services/visit-visa',       changeFrequency: 'weekly',  priority: 0.8  },
  { path: '/services/tour-packages',    changeFrequency: 'weekly',  priority: 0.9  },
  { path: '/services/umrah-packages',   changeFrequency: 'weekly',  priority: 0.8  },
  { path: '/services/hotel-booking',    changeFrequency: 'weekly',  priority: 0.8  },
  { path: '/services/travel-insurance', changeFrequency: 'weekly',  priority: 0.8  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const englishEntries: MetadataRoute.Sitemap = englishRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const urduEntries: MetadataRoute.Sitemap = englishRoutes.map(({ path, changeFrequency, priority }) => {
    const urduPath = path === '/' ? '/ur' : `/ur${path}`
    return {
      url: `${BASE_URL}${urduPath}`,
      lastModified: now,
      changeFrequency,
      priority: Math.max(priority - 0.05, 0.5),
    }
  })

  return [...englishEntries, ...urduEntries]
}
