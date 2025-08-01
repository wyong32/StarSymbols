import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import sitemap from 'vite-plugin-sitemap'
import { VitePWA } from 'vite-plugin-pwa'
import { blogPostsData } from './src/data/blogPosts.js'
import { starDetailsData } from './src/data/starDetails.js'

// Manually list static routes to avoid build errors from importing Vue components in config
const staticRoutes = [
  '/',
  '/all-star-symbols',
  '/fancy-text-generator',
  '/blog',
  '/image-to-text',
  '/about',
  '/privacy',
  '/terms',
  '/copyright',
  '/contact',
]

const dynamicBlogRoutes = blogPostsData.map((post) => `/blog/${post.pagename}`)
const dynamicStarRoutes = starDetailsData.map((star) => `/all-star-symbols/${star.slug}`)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    sitemap({
      hostname: 'https://starsymbols.io',
      // Provide a complete list of routes
      dynamicRoutes: [...staticRoutes, ...dynamicBlogRoutes, ...dynamicStarRoutes],
      // Do not auto-generate robots.txt, as we have a custom one in /public
      generateRobotsTxt: false,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,txt,xml}'],
        cleanupOutdatedCaches: true,
      },
      includeAssets: ['favicon.ico', 'og-image.svg', 'robots.txt', 'llms.txt'],
      manifest: false, // Use existing manifest.json in public folder
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
