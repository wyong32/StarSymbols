import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 模拟博客数据（因为无法直接导入Vue组件）
const blogPostsData = [
  {
    id: 1,
    date: 'December 15, 2024'
  },
  {
    id: 2,
    date: 'December 12, 2024'
  }
]

// 站点配置
const SITE_CONFIG = {
  baseUrl: 'https://starcopy.com',
  defaultChangefreq: 'weekly',
  defaultPriority: '0.8'
}

// 静态页面配置
const STATIC_PAGES = [
  {
    path: '/',
    changefreq: 'daily',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/stars',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/generator',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/image-to-stars',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/blog',
    changefreq: 'daily',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/privacy',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/terms',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/copyright',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0]
  }
]

// 生成博客页面URL
function generateBlogUrls() {
  return blogPostsData.map(post => ({
    path: `/blog/${post.id}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date(post.date).toISOString().split('T')[0]
  }))
}

// 生成XML站点地图
function generateSitemap() {
  const staticUrls = STATIC_PAGES
  const blogUrls = generateBlogUrls()
  const allUrls = [...staticUrls, ...blogUrls]

  const urlElements = allUrls.map(page => `
  <url>
    <loc>${SITE_CONFIG.baseUrl}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`
}

// 生成并保存sitemap.xml
function saveSitemap() {
  const sitemap = generateSitemap()
  const publicDir = path.resolve(__dirname, '../public')
  const sitemapPath = path.join(publicDir, 'sitemap.xml')
  
  // 确保public目录存在
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  // 写入sitemap.xml
  fs.writeFileSync(sitemapPath, sitemap, 'utf8')
  console.log('✅ sitemap.xml generated successfully!')
  console.log(`📍 Location: ${sitemapPath}`)
}

// 执行生成
saveSitemap()
