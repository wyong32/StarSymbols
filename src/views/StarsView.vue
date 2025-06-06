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

    <!-- Stars Collection Section -->
    <section class="stars-section">
      <div class="section-container">
        <!-- Stars Categories -->
        <div class="categories-grid">
          <div v-for="category in categories" :key="category.slug" class="category-module">
            <div class="category-header">
              <h2 class="category-title">{{ category.name }} Stars</h2>
              <p class="category-count">{{ category.count }} symbols</p>
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

    <!-- Footer -->
    <AppFooter />

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast" :class="{ show: showToast }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { copyProtection } from '@/utils/copyProtection.js'
import { getAllCategories, getStarsByCategory } from '@/data/starDetails.js'

// Router
const router = useRouter()

// Reactive data
const showToast = ref(false)
const toastMessage = ref('')
const categories = ref([])

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

const formatUsageCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}

// Set up copy protection toast callback and load data
onMounted(() => {
  copyProtection.setToastCallback(showToastMessage)
  categories.value = getAllCategories()
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

/* Section Styles */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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

/* Stars Section */
.stars-section {
  padding: 0 0 4rem 0;
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

.category-count {
  color: #666;
  font-size: 1rem;
}

.stars-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
}

.star-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.5rem;
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
  color: #667eea;
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

  .section-container {
    padding: 0 1.5rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .section-header p {
    font-size: 1rem;
  }

  .stars-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .star-item {
    padding: 1rem;
  }

  .star-symbol {
    font-size: 2.5rem;
    margin-right: 1rem;
    min-width: 50px;
  }

  .star-name {
    font-size: 1.1rem;
  }

  .star-description {
    font-size: 0.85rem;
  }

  .category-module {
    padding: 1.5rem;
  }

  .category-title {
    font-size: 1.8rem;
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
