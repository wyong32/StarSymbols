import fs from 'fs'
import path from 'path'
import { generateSitemapData } from '../utils/sitemapConfig.js'

// Vite插件：自动生成站点地图
export function sitemapPlugin(options = {}) {
  const { hostname = 'https://starcopy.com', outDir = 'dist', generateRobotsTxt = true } = options

  return {
    name: 'vite-plugin-sitemap-auto',
    apply: 'build',
    closeBundle() {
      // 在构建完成后生成站点地图
      generateSitemap(hostname, outDir, generateRobotsTxt)
    },
  }
}

// 生成站点地图
function generateSitemap(hostname, outDir, generateRobotsTxt) {
  try {
    console.log('🗺️ Generating sitemap...')

    // 获取站点地图数据
    const sitemapData = generateSitemapData()

    // 生成XML内容
    const urlElements = sitemapData
      .map(
        (item) => `
  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
      )
      .join('')

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`

    // 确保输出目录存在
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }

    // 写入sitemap.xml
    const sitemapPath = path.join(outDir, 'sitemap.xml')
    fs.writeFileSync(sitemapPath, sitemapXml, 'utf8')
    console.log(`✅ Sitemap generated: ${sitemapPath}`)

    // 生成robots.txt
    if (generateRobotsTxt) {
      generateRobotsFile(hostname, outDir)
    }

    console.log(`📊 Generated ${sitemapData.length} URLs in sitemap`)
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message)
  }
}

// 生成robots.txt
function generateRobotsFile(hostname, outDir) {
  const robotsContent = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /*.json

Sitemap: ${hostname}/sitemap.xml`

  const robotsPath = path.join(outDir, 'robots.txt')
  fs.writeFileSync(robotsPath, robotsContent, 'utf8')
  console.log(`✅ Robots.txt generated: ${robotsPath}`)
}
