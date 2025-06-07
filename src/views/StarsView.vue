<template>
  <div class="stars-page hero-variant-stars">
    <!-- Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">All Star Symbols</h1>
        <div class="hero-stars">
          <span class="hero-star" style="--delay: 0s">★</span>
          <span class="hero-star" style="--delay: 0.3s">✦</span>
          <span class="hero-star" style="--delay: 0.6s">✨</span>
          <span class="hero-star" style="--delay: 0.9s">⭐</span>
          <span class="hero-star" style="--delay: 1.2s">🌟</span>
          <span class="hero-star" style="--delay: 1.5s">💫</span>
          <span class="hero-star" style="--delay: 1.8s">✧</span>
          <span class="hero-star" style="--delay: 2.1s">⚡</span>
        </div>
        <p class="hero-description">
          Explore our complete collection of Unicode star symbols. From classic stars to decorative
          sparkles, find the perfect symbol for your creative projects.
        </p>
      </div>
    </section>

    <!-- Main Content Layout -->
    <div class="main-layout">
      <!-- Sidebar Navigation -->
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <h3 class="sidebar-title">Categories</h3>
          <ul class="sidebar-list">
            <li v-for="category in categories" :key="category.slug" class="sidebar-item">
              <a
                :href="`#category-${category.slug}`"
                :class="{ active: activeCategory === category.slug }"
                @click.prevent="scrollToCategory(category.slug)"
                class="sidebar-link"
              >
                <span class="sidebar-link-text">{{ category.displayName }}</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Stars Collection Section -->
      <section class="stars-section">
        <div class="section-container">
          <!-- Stars Categories -->
          <div class="categories-grid">
            <div
              v-for="category in categories"
              :key="category.slug"
              :id="`category-${category.slug}`"
              class="category-module"
            >
              <div class="category-header">
                <h2 class="category-title">{{ category.displayName }}</h2>
                <p class="category-description">{{ category.description }}</p>
              </div>
              <div class="stars-grid">
                <div
                  v-for="star in getStarsByCategory(category.slug)"
                  :key="star.id"
                  class="star-item"
                  @click="navigateToStarDetail(star.slug)"
                >
                  <div class="star-symbol">{{ star.symbol }}</div>
                  <h3 class="star-name">{{ star.name }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <AppFooter />

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast" :class="{ show: showToast }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { copyProtection } from '@/utils/copyProtection.js'
import { starDetailsData } from '@/data/starDetails.js'

// Router
const router = useRouter()

// 预定义的分类配置 - 控制显示顺序和分类名称
const predefinedCategories = [
  {
    id: 1,
    displayName: 'Classic Dingbats stars',
    description:
      'A set of classic Unicode star symbols from the Dingbats block, perfect for decoration, emphasis, and design use',
    matchCategories: ['Classic'], // 匹配数据中的category字段
  },
  {
    id: 2,
    displayName: 'Four Pointed Stars',
    description:
      'Stylized Unicode stars with four points, often used for sparkle effects, highlights, or decorative accents.',
    matchCategories: ['four-pointed-stars'],
  },
  {
    id: 3,
    displayName: 'Asterisk & Multi-Pointed',
    description:
      'A pentagram or pentacle is a five-pointed star drawn with a single continuous line. Pentagrams mean different things to different people, but they’re closely associated with mysticism and religion.',
    matchCategories: ['asterisk-and-multi-pointed'],
  },
  {
    id: 4,
    displayName: 'Religious & Cultural',
    description:
      'A collection of star-like Unicode symbols including asterisks and stars with many points—ideal for emphasis, decoration, and symbolic use.',
    matchCategories: ['religious-and-cultural'],
  },
  {
    id: 5,
    displayName: 'Emoji Stars',
    description:
      'Colorful and expressive star emojis used to convey magic, sparkle, celebration, or nighttime scenes in digital communication.',
    matchCategories: ['emoji-stars'],
  },
]

// Reactive data
const showToast = ref(false)
const toastMessage = ref('')
const activeCategory = ref('')
let scrollTimeout = null

// 计算属性：根据预定义分类过滤和组织数据
const categories = computed(() => {
  return predefinedCategories
    .map((category) => {
      const stars = starDetailsData.filter((star) =>
        category.matchCategories.includes(star.category),
      )

      return {
        ...category,
        slug: category.id,
        count: stars.length,
        stars: stars.sort((a, b) => a.name.localeCompare(b.name)),
      }
    })
    .filter((category) => category.count > 0) // 只显示有数据的分类
})

// 根据分类ID获取星号数据
const getStarsByCategory = (categoryId) => {
  const category = categories.value.find((cat) => cat.slug === categoryId)
  return category ? category.stars : []
}

// Methods
const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const navigateToStarDetail = (slug) => {
  router.push(`/all-star-symbols/${slug}`)
}

const scrollToCategory = (slug) => {
  const element = document.getElementById(`category-${slug}`)
  if (element) {
    // 设置活动分类
    activeCategory.value = slug

    // 计算偏移量：头部高度 + 额外间距
    const headerHeight = 80
    const extraOffset = 20
    const totalOffset = headerHeight + extraOffset

    // 计算目标滚动位置
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset
    const targetPosition = elementTop - totalOffset

    // 平滑滚动
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    })
  }
}

// 检查当前可见的分类
const checkVisibleCategory = () => {
  const headerHeight = 100 // 头部高度
  let currentCategory = null
  let minDistance = Infinity

  // 找到距离顶部最近的分类
  categories.value.forEach((category) => {
    const element = document.getElementById(`category-${category.slug}`)
    if (element) {
      const rect = element.getBoundingClientRect()
      const distance = Math.abs(rect.top - headerHeight)

      // 如果元素在视口中，且距离顶部最近
      if (rect.top <= headerHeight + 50 && rect.bottom > headerHeight && distance < minDistance) {
        minDistance = distance
        currentCategory = category.slug
      }
    }
  })

  // 如果没有找到合适的分类，默认选择第一个
  if (!currentCategory && categories.value.length > 0) {
    currentCategory = categories.value[0].slug
  }

  if (currentCategory && currentCategory !== activeCategory.value) {
    activeCategory.value = currentCategory
  }
}

// 滚动事件处理
const handleScroll = () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }

  scrollTimeout = setTimeout(() => {
    checkVisibleCategory()
  }, 100) // 节流，100ms后执行，减少跳动
}

// Lifecycle Hooks
onMounted(() => {
  copyProtection.setToastCallback(showToastMessage)

  // 等待DOM更新后设置初始状态和滚动监听
  setTimeout(() => {
    checkVisibleCategory()
    window.addEventListener('scroll', handleScroll, { passive: true })
  }, 100)
})

onUnmounted(() => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@import '@/styles/hero.css';

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.stars-page {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-header p {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

/* Main Layout */
.main-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
}

/* Sidebar Styles */
.sidebar {
  position: sticky;
  top: calc(80px + 2rem); /* 头部高度 + 间距 */
  height: fit-content;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.sidebar-nav {
  padding: 1.5rem;
}

.sidebar-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-item {
  margin-bottom: 0.5rem;
}

.sidebar-link {
  display: block;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #666;
  border-radius: 8px;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.sidebar-link:hover {
  background: #f8f9ff;
  color: #667eea;
  border-left-color: #667eea;
}

.sidebar-link.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-left-color: transparent;
  font-weight: 600;
}

.sidebar-link-text {
  font-weight: 500;
}

/* Stars Section */
.stars-section {
  padding: 0;
}

.section-container {
  max-width: 100%;
  margin: 0;
  padding: 0;
}

/* Categories Grid */
.categories-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.category-module {
  background: white;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.category-module:hover {
  transform: translateY(-5px);
}

.category-header {
  text-align: center;
  margin-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

.category-title {
  font-size: 1.6rem;
  line-height: 1.2;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.category-description {
  color: #777;
  font-size: 0.95rem;
  margin: 0.5rem 0;
  font-style: italic;
}

.stars-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}

.star-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background: #f8f9ff;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.star-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
  border-color: #667eea;
}

.star-symbol {
  font-size: 2rem;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.star-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
}

.star-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.star-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

.unicode {
  background: #e8ecff;
  color: #667eea;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  font-family: monospace;
}

.usage-count {
  color: #999;
}

/* Toast Notification */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  background: #667eea;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  z-index: 1001;
  white-space: nowrap;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 6rem 1.5rem 3rem;
    min-height: 80vh;
  }

  .hero-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .hero-description {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }

  .hero-stars {
    font-size: 2rem;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .main-layout {
    padding: 1rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .section-header p {
    font-size: 1rem;
  }

  .categories-grid {
    gap: 1.5rem;
  }

  .category-module {
    padding: 1.2rem;
    border-radius: 15px;
  }

  .category-title {
    font-size: 1.5rem;
  }

  .category-description {
    font-size: 0.9rem;
  }

  .stars-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.8rem;
  }

  .star-item {
    padding: 0.8rem 0.5rem;
  }

  .star-symbol {
    font-size: 1.8rem;
    margin-bottom: 0.3rem;
  }

  .star-name {
    font-size: 0.75rem;
    line-height: 1.2;
  }

  .toast {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    transform: translateX(0) translateY(100%);
  }

  .toast.show {
    transform: translateX(0) translateY(0);
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 5rem 1rem 2rem;
    min-height: 70vh;
  }

  .hero-title {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }

  .main-layout {
    padding: 0.8rem;
  }

  .categories-grid {
    gap: 1rem;
  }

  .category-module {
    padding: 1rem;
    border-radius: 12px;
  }

  .category-header {
    margin-bottom: 0.8rem;
    padding-bottom: 0.4rem;
  }

  .category-title {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
  }

  .category-description {
    font-size: 0.85rem;
    margin: 0.3rem 0;
  }

  .stars-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
  }

  .star-item {
    padding: 0.6rem 0.4rem;
    border-radius: 10px;
  }

  .star-symbol {
    font-size: 1.5rem;
    margin-bottom: 0.2rem;
  }

  .star-name {
    font-size: 0.7rem;
    line-height: 1.1;
  }

  .hero-description {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .hero-stars {
    font-size: 1.8rem;
    gap: 0.6rem;
  }

  .section-container {
    padding: 0 1rem;
  }

  .section-header h2 {
    font-size: 1.8rem;
  }

  .section-header p {
    font-size: 0.9rem;
  }

  .star-item {
    padding: 0.8rem;
    flex-direction: column;
    text-align: center;
  }

  .star-symbol {
    font-size: 2rem;
    margin-right: 0;
    margin-bottom: 0.5rem;
    min-width: auto;
  }

  .star-name {
    font-size: 1rem;
  }

  .star-description {
    font-size: 0.8rem;
  }

  .category-module {
    padding: 1rem;
  }

  .category-title {
    font-size: 1.5rem;
  }

  .star-meta {
    flex-direction: column;
    gap: 0.3rem;
  }
}
</style>
