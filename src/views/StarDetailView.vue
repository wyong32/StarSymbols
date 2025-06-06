<template>
  <div class="star-detail-page">
    <!-- Header -->
    <AppHeader />

    <!-- Star Detail Content -->
    <main class="star-detail-main" v-if="star">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <router-link to="/" class="breadcrumb-link">Home</router-link>
          <span class="breadcrumb-separator">›</span>
          <router-link to="/all-star-symbols" class="breadcrumb-link">All Stars</router-link>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">{{ star.name }}</span>
        </nav>

        <!-- Star Content -->
        <div class="star-content">
          <!-- Star Header -->
          <div class="star-header">
            <div class="star-display">{{ star.symbol }}</div>
            <h1>{{ star.name }}</h1>
            <p class="star-meta">{{ star.unicode }} | Category: {{ star.category }} Stars</p>
          </div>

          <!-- About Section -->
          <section class="star-section">
            <h2>About {{ star.name }}</h2>
            <p v-for="paragraph in star.about" :key="paragraph" class="about-paragraph">
              {{ paragraph }}
            </p>
          </section>

          <!-- Technical Information -->
          <section class="star-section" v-if="star.technicalInfo">
            <h2>Technical Information</h2>
            <div class="tech-list">
              <div class="tech-item">
                <span class="tech-label">Unicode:</span>
                <code
                  class="tech-value"
                  @click="copyTechValue(star.technicalInfo.unicode)"
                  :title="'Click to copy: ' + star.technicalInfo.unicode"
                >
                  {{ star.technicalInfo.unicode }}
                </code>
              </div>
              <div class="tech-item">
                <span class="tech-label">HTML Entity:</span>
                <code
                  class="tech-value"
                  @click="copyTechValue(star.technicalInfo.htmlEntity)"
                  :title="'Click to copy: ' + star.technicalInfo.htmlEntity"
                >
                  {{ star.technicalInfo.htmlEntity }}
                </code>
              </div>
              <div class="tech-item">
                <span class="tech-label">CSS Content:</span>
                <code
                  class="tech-value"
                  @click="copyTechValue(star.technicalInfo.cssContent)"
                  :title="'Click to copy: ' + star.technicalInfo.cssContent"
                >
                  {{ star.technicalInfo.cssContent }}
                </code>
              </div>
              <div class="tech-item">
                <span class="tech-label">Category:</span>
                <span class="tech-value-text">{{ star.technicalInfo.category }}</span>
              </div>
              <div class="tech-item">
                <span class="tech-label">Block:</span>
                <span class="tech-value-text">{{ star.technicalInfo.block }}</span>
              </div>
            </div>
          </section>
        </div>

        <!-- Copy Button -->
        <div class="copy-section">
          <button @click="copySymbol" class="copy-button" :class="{ copied: showCopied }">
            <span class="copy-symbol">{{ star.symbol }}</span>
            <span class="copy-text">{{ showCopied ? 'Copied!' : 'Click to Copy' }}</span>
          </button>
        </div>
      </div>
    </main>

    <!-- 404 State -->
    <main class="star-detail-main" v-else>
      <div class="container">
        <div class="not-found">
          <h1>Star Not Found</h1>
          <p>The star symbol you're looking for doesn't exist.</p>
          <router-link to="/all-star-symbols" class="back-link">← Back to All Stars</router-link>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast" :class="{ show: showToast }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { getStarDetailBySlug } from '@/data/starDetails.js'

// Router
const route = useRoute()

// Reactive data
const star = ref(null)
const showToast = ref(false)
const toastMessage = ref('')
const showCopied = ref(false)

// Methods
const loadStar = () => {
  const slug = route.params.slug
  star.value = getStarDetailBySlug(slug)

  if (star.value) {
    // Update page title
    document.title = star.value.seo.title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', star.value.seo.description)
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', star.value.seo.keywords)
    }
  }
}

const copySymbol = async () => {
  try {
    await navigator.clipboard.writeText(star.value.symbol)
    showCopied.value = true
    showToastMessage(`Copied ${star.value.symbol} to clipboard!`)

    setTimeout(() => {
      showCopied.value = false
    }, 2000)
  } catch (err) {
    showToastMessage('Failed to copy symbol')
  }
}

const copyTechValue = async (value) => {
  try {
    await navigator.clipboard.writeText(value)
    showToastMessage(`Copied ${value} to clipboard!`)
  } catch (err) {
    showToastMessage('Failed to copy value')
  }
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Watch route changes
onMounted(() => {
  loadStar()
})

// Watch for route parameter changes
watch(
  () => route.params.slug,
  () => {
    loadStar()
  }
)
</script>

<style scoped>
.star-detail-page {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

.star-detail-main {
  min-height: 80vh;
  padding: 6rem 0 4rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Breadcrumb */
.breadcrumb {
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.breadcrumb-link {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #764ba2;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  color: #999;
}

.breadcrumb-current {
  color: #666;
}

/* Star Content */
.star-content {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

/* Star Header */
.star-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.star-display {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.star-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.star-meta {
  color: #666;
  font-size: 1rem;
}

/* Star Sections */
.star-section {
  margin-bottom: 2rem;
}

.star-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.star-section h3 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: #444;
}

.about-paragraph {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #555;
}

/* Technical Information */
.tech-list {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: #f8f9ff;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.tech-label {
  font-weight: 600;
  color: #333;
  min-width: 120px;
  flex-shrink: 0;
}

.tech-value {
  background: #e8ecff;
  color: #667eea;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  user-select: all;
}

.tech-value:hover {
  background: #667eea;
  color: white;
  border-color: #764ba2;
  transform: translateY(-1px);
}

.tech-value-text {
  color: #555;
  font-size: 0.95rem;
}

/* Copy Section */
.copy-section {
  text-align: center;
  margin-bottom: 3rem;
}

.copy-button {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.copy-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.copy-button.copied {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
}

.copy-symbol {
  font-size: 4rem;
  margin-bottom: 0.5rem;
}

.copy-text {
  font-size: 1.1rem;
  font-weight: 600;
}

/* Not Found */
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.not-found p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.back-link:hover {
  transform: translateY(-2px);
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
  .container {
    padding: 0 1.5rem;
  }

  .star-content {
    padding: 2rem;
  }

  .copy-symbol {
    font-size: 3rem;
  }

  .tech-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .tech-label {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .star-content {
    padding: 1.5rem;
  }

  .copy-button {
    padding: 1.5rem;
  }

  .copy-symbol {
    font-size: 2.5rem;
  }

  .toast {
    left: 1rem;
    right: 1rem;
    transform: translateX(0) translateY(100%);
  }

  .toast.show {
    transform: translateX(0) translateY(0);
  }
}
</style>
