import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 读取路由配置文件
function getRoutesFromConfig() {
  const routerPath = path.resolve(__dirname, '../src/router/index.js')
  const routerContent = fs.readFileSync(routerPath, 'utf8')

  // 提取路由路径的正则表达式
  const routeRegex = /path:\s*['"`]([^'"`]+)['"`]/g
  const routes = []
  let match

  while ((match = routeRegex.exec(routerContent)) !== null) {
    const routePath = match[1]
    // 排除动态路由参数
    if (!routePath.includes(':')) {
      routes.push(routePath)
    }
  }

  return routes
}

// 读取博客数据
function getBlogPostsData() {
  try {
    const blogPath = path.resolve(__dirname, '../src/data/blogPosts.js')
    const blogContent = fs.readFileSync(blogPath, 'utf8')

    // 更精确的正则表达式来匹配博客对象
    const blogPosts = []

    // 匹配每个博客对象的完整结构
    const blogObjectRegex = /{\s*id:\s*(\d+),[\s\S]*?date:\s*['"`]([^'"`]+)['"`]/g
    let match

    while ((match = blogObjectRegex.exec(blogContent)) !== null) {
      blogPosts.push({
        id: parseInt(match[1]),
        date: match[2],
      })
    }

    // 如果正则匹配失败，尝试备用方法
    if (blogPosts.length === 0) {
      console.warn('⚠️ Primary regex failed, trying backup method...')

      const idRegex = /id:\s*(\d+)/g
      const dateRegex = /date:\s*['"`]([^'"`]+)['"`]/g

      const ids = []
      const dates = []

      let idMatch, dateMatch
      while ((idMatch = idRegex.exec(blogContent)) !== null) {
        ids.push(parseInt(idMatch[1]))
      }

      while ((dateMatch = dateRegex.exec(blogContent)) !== null) {
        dates.push(dateMatch[1])
      }

      return ids.map((id, index) => ({
        id,
        date:
          dates[index] ||
          new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
      }))
    }

    return blogPosts
  } catch (error) {
    console.error('❌ Error reading blog posts:', error.message)
    return []
  }
}

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
  const blogPosts = getBlogPostsData()
  console.log(`📚 Found ${blogPosts.length} blog posts`)

  return blogPosts.map((post) => ({
    path: `/blog/${post.id}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date(post.date).toISOString().split('T')[0],
  }))
}

// 生成XML站点地图
function generateSitemap() {
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
