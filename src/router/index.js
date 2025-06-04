import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'StarCopy - Free Star Symbols Copy and Paste | Unicode Stars ⭐✨',
        description:
          'Copy and paste beautiful star symbols for free! ⭐✨🌟 Access 400+ Unicode star symbols, text generators, and image-to-star converters. Perfect for social media, documents, and creative content.',
        keywords:
          'star symbols, copy paste, unicode stars, star emoji, text generator, star characters, symbols copy, aesthetic text, social media symbols, star decorations',
      },
    },
    {
      path: '/stars',
      name: 'stars',
      component: () => import('../views/StarsView.vue'),
      meta: {
        title: 'All Star Symbols - Complete Unicode Star Collection | StarCopy',
        description:
          'Browse our complete collection of 400+ star symbols and Unicode characters. Classic stars ★☆, decorative stars ✦✧, and special symbols. One-click copy to clipboard.',
        keywords:
          'star symbols collection, unicode stars, star characters, copy star symbols, star emoji list, decorative stars, outline stars, solid stars',
      },
    },
    {
      path: '/generator',
      name: 'generator',
      component: () => import('../views/GeneratorView.vue'),
      meta: {
        title: 'Star Text Generator - Create Beautiful Star-Decorated Text | StarCopy',
        description:
          'Generate stunning star-decorated text with our free text generator. Choose from 5 unique styles: Classic, Sparkle, Decorative, Elegant, and Cosmic. Perfect for social media posts.',
        keywords:
          'star text generator, aesthetic text, decorated text, star text maker, social media text, fancy text generator, text decorator, star typography',
      },
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
      meta: {
        title: 'Star Symbols Blog - Tips, Tutorials & Creative Ideas | StarCopy',
        description:
          'Discover creative ways to use star symbols in your content. Read our latest articles about Unicode symbols, design tips, social media strategies, and typography trends.',
        keywords:
          'star symbols blog, unicode tutorials, design tips, social media symbols, typography blog, creative content, symbol usage guide',
      },
    },
    {
      path: '/blog/:id',
      name: 'blog-detail',
      component: () => import('../views/BlogDetailView.vue'),
      meta: {
        title: 'Blog Article | StarCopy',
        description:
          'Read our latest article about star symbols, Unicode characters, and creative design tips.',
        keywords: 'star symbols article, unicode guide, design tutorial, creative tips',
      },
    },
    {
      path: '/image-to-stars',
      name: 'image-to-stars',
      component: () => import('../views/ImageToStarsView.vue'),
      meta: {
        title: 'Image to Star Text Art Converter - Transform Images | StarCopy',
        description:
          'Convert any image into beautiful star text art! Upload your photos and transform them into ASCII art using star symbols. Free online image to text converter with customizable settings.',
        keywords:
          'image to text art, ascii art generator, image converter, star text art, photo to text, image to ascii, text art maker, star art generator',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About StarCopy - Your Ultimate Star Symbols Resource | StarCopy',
        description:
          'Learn about StarCopy, the leading platform for star symbols and text generation. Our mission is to make beautiful Unicode symbols accessible to everyone for creative content.',
        keywords:
          'about starcopy, star symbols platform, unicode symbols, text generation tools, creative content tools, symbol resources',
      },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyView.vue'),
      meta: {
        title: 'Privacy Policy - How We Protect Your Data | StarCopy',
        description:
          'Read our comprehensive privacy policy to understand how StarCopy collects, uses, and protects your personal information. Your privacy is our priority.',
        keywords:
          'privacy policy, data protection, user privacy, information security, data usage, privacy rights',
      },
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/TermsView.vue'),
      meta: {
        title: 'Terms of Service - Usage Guidelines | StarCopy',
        description:
          'Review our terms of service and usage guidelines for StarCopy. Understand your rights and responsibilities when using our star symbols and text generation tools.',
        keywords:
          'terms of service, usage guidelines, user agreement, service terms, legal terms, website terms',
      },
    },
    {
      path: '/copyright',
      name: 'copyright',
      component: () => import('../views/CopyrightView.vue'),
      meta: {
        title: 'Copyright Information - Intellectual Property | StarCopy',
        description:
          'Learn about copyright and intellectual property rights related to StarCopy and Unicode symbols. Understand proper usage and attribution requirements.',
        keywords:
          'copyright information, intellectual property, unicode rights, symbol usage rights, attribution, legal information',
      },
    },
  ],
})

// 路由守卫：动态更新页面TDK
router.beforeEach((to, _from, next) => {
  // 更新页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 更新或创建meta标签
  const updateMetaTag = (name, content) => {
    if (!content) return

    let element = document.querySelector(`meta[name="${name}"]`)
    if (element) {
      element.setAttribute('content', content)
    } else {
      element = document.createElement('meta')
      element.setAttribute('name', name)
      element.setAttribute('content', content)
      document.head.appendChild(element)
    }
  }

  // 更新description
  updateMetaTag('description', to.meta.description)

  // 更新keywords
  updateMetaTag('keywords', to.meta.keywords)

  // 更新Open Graph标签
  const updateOGTag = (property, content) => {
    if (!content) return

    let element = document.querySelector(`meta[property="${property}"]`)
    if (element) {
      element.setAttribute('content', content)
    } else {
      element = document.createElement('meta')
      element.setAttribute('property', property)
      element.setAttribute('content', content)
      document.head.appendChild(element)
    }
  }

  // 设置Open Graph标签
  updateOGTag('og:title', to.meta.title)
  updateOGTag('og:description', to.meta.description)
  updateOGTag('og:type', 'website')
  updateOGTag('og:url', window.location.origin + to.path)

  // 设置Twitter Card标签
  const updateTwitterTag = (name, content) => {
    if (!content) return

    let element = document.querySelector(`meta[name="${name}"]`)
    if (element) {
      element.setAttribute('content', content)
    } else {
      element = document.createElement('meta')
      element.setAttribute('name', name)
      element.setAttribute('content', content)
      document.head.appendChild(element)
    }
  }

  updateTwitterTag('twitter:card', 'summary_large_image')
  updateTwitterTag('twitter:title', to.meta.title)
  updateTwitterTag('twitter:description', to.meta.description)

  next()
})

export default router
