import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import sitemap from 'vite-plugin-sitemap'
import { blogPostsData } from './src/data/blogPosts.js'
import { starDetailsData } from './src/data/starDetails.js'

// Manually list static routes to avoid build errors from importing Vue components in config
const staticRoutes = [
  '/',
  '/all-star-symbols',
  '/text-symbol-generator',
  '/blog',
  '/image-to-text',
  '/about',
  '/privacy',
  '/terms',
  '/copyright',
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
      hostname: 'https://starcopy.com',
      // Provide a complete list of routes
      dynamicRoutes: [...staticRoutes, ...dynamicBlogRoutes, ...dynamicStarRoutes],
      // Do not auto-generate robots.txt, as we have a custom one in /public
      generateRobotsTxt: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
