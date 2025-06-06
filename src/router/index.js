import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Star Copy And Paste - Free Star Symbols | starsymbols.io',
      description:
        'Free star symbols collection! Copy and paste Unicode star symbols instantly. Star text generator and aesthetic text tools for social media. ★☆',
      keywords:
        'star copy paste, star symbols, unicode stars, copy star symbols, star text generator, aesthetic text',
    },
  },
  {
    path: '/all-star-symbols',
    name: 'all-star-symbols',
    component: () => import('../views/StarsView.vue'),
    meta: {
      title: 'Star Symbols - Unicode Star Collection | starsymbols.io',
      description:
        'Browse complete star symbols collection. Classic stars, decorative stars, and Unicode characters. One-click copy to clipboard.',
      keywords: 'star symbols, unicode stars, star characters, copy star symbols, star emoji',
    },
  },
  {
    path: '/text-symbol-generator',
    name: 'text-symbol-generator',
    component: () => import('../views/GeneratorView.vue'),
    meta: {
      title: 'Star Text Generator - Create Star-Decorated Text | starsymbols.io',
      description:
        'Generate stunning star-decorated text with our free generator. Choose from 5 unique styles: Classic, Sparkle, Decorative, Elegant, Cosmic.',
      keywords:
        'star text generator, aesthetic text, decorated text, star text maker, social media text, fancy text',
    },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView.vue'),
    meta: {
      title: 'Star Symbols Blog - Tips & Tutorials | starsymbols.io',
      description:
        'Discover creative ways to use star symbols. Read articles about Unicode symbols, design tips, social media strategies, and typography.',
      keywords:
        'star symbols blog, unicode tutorials, design tips, social media symbols, typography blog, creative content',
    },
  },
  {
    path: '/blog/:pagename',
    name: 'blog-detail',
    component: () => import('../views/BlogDetailView.vue'),
    meta: {
      title: 'Blog Article | starsymbols.io',
      description:
        'Read our latest article about star symbols, Unicode characters, and creative design tips.',
      keywords: 'star symbols article, unicode guide, design tutorial, creative tips',
    },
  },
  {
    path: '/image-to-text',
    name: 'image-to-text',
    component: () => import('../views/ImageToStarsView.vue'),
    meta: {
      title: 'Image to Star Text Art Converter | starsymbols.io',
      description:
        'Convert images into beautiful star text art! Upload photos and transform them into ASCII art using star symbols. Free online converter.',
      keywords:
        'image to text art, ascii art generator, image converter, star text art, photo to text, image to ascii',
    },
  },
  {
    path: '/all-star-symbols/:slug',
    name: 'StarDetail',
    component: () => import('../views/StarDetailView.vue'),
    meta: {
      title: 'Star Symbol Detail | starsymbols.io',
      description:
        'Detailed information about star symbols, usage examples, and technical specifications.',
      keywords: 'star symbol detail, unicode star, symbol information, star usage examples',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'About StarCopy - Star Symbols Platform | starsymbols.io',
      description:
        'Learn about StarCopy, the leading platform for star symbols and text generation. Making Unicode symbols accessible for creative content.',
      keywords:
        'about starcopy, star symbols platform, unicode symbols, text generation tools, creative content tools',
    },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue'),
    meta: {
      title: 'Privacy Policy - How We Protect Your Data | starsymbols.io',
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
      title: 'Terms of Service - Usage Guidelines | starsymbols.io',
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
      title: 'Copyright Information - Intellectual Property | starsymbols.io',
      description:
        'Learn about copyright and intellectual property rights related to StarCopy and Unicode symbols. Understand proper usage and attribution requirements.',
      keywords:
        'copyright information, intellectual property, unicode rights, symbol usage rights, attribution, legal information',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
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

  // 更新canonical链接
  let canonicalLink = document.querySelector('link[rel="canonical"]')
  if (canonicalLink) {
    canonicalLink.setAttribute('href', window.location.origin + to.path)
  } else {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    canonicalLink.setAttribute('href', window.location.origin + to.path)
    document.head.appendChild(canonicalLink)
  }

  next()
})

export default router
