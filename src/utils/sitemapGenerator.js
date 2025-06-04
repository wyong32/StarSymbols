import { blogPostsData } from '@/data/blogPosts.js'

// 站点配置
const SITE_CONFIG = {
  baseUrl: 'https://starcopy.com',
  defaultChangefreq: 'weekly',
  defaultPriority: '0.8',
}

// 静态页面配置
const STATIC_PAGES = [
  {
    path: '/',
    changefreq: 'daily',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/stars',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/generator',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/image-to-stars',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/blog',
    changefreq: 'daily',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/privacy',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/terms',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/copyright',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0],
  },
]

// 生成博客页面URL
function generateBlogUrls() {
  console.log(`📚 Generating URLs for ${blogPostsData.length} blog posts`)

  return blogPostsData.map((post) => ({
    path: `/blog/${post.id}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date(post.date).toISOString().split('T')[0],
  }))
}

// 生成XML站点地图
export function generateSitemap() {
  const staticUrls = STATIC_PAGES
  const blogUrls = generateBlogUrls()
  const allUrls = [...staticUrls, ...blogUrls]

  const urlElements = allUrls
    .map(
      (page) => `
  <url>
    <loc>${SITE_CONFIG.baseUrl}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`
}

// 生成robots.txt
export function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# 主要页面
Allow: /stars
Allow: /generator
Allow: /image-to-stars
Allow: /blog
Allow: /about

# 静态资源
Allow: /assets/
Allow: /images/
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.svg
Allow: /*.ico

# 不允许爬取的路径
Disallow: /admin/
Disallow: /api/
Disallow: /*.json
Disallow: /node_modules/
Disallow: /src/

# 站点地图
Sitemap: ${SITE_CONFIG.baseUrl}/sitemap.xml

# 爬取延迟（可选）
Crawl-delay: 1`
}

// 下载文件的辅助函数
export function downloadFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// 生成并保存到public目录的sitemap.xml
export function generateSitemapFile() {
  const sitemap = generateSitemap()
  console.log('Generated sitemap.xml:')
  console.log(sitemap)
  return sitemap
}

// 生成并下载站点地图
export function downloadSitemap() {
  const sitemap = generateSitemap()
  downloadFile(sitemap, 'sitemap.xml', 'application/xml')
}

// 生成并下载robots.txt
export function downloadRobotsTxt() {
  const robotsTxt = generateRobotsTxt()
  downloadFile(robotsTxt, 'robots.txt', 'text/plain')
}
