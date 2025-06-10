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
            <div
              class="star-display clickable"
              @click="copySymbol"
              :class="{ copied: showCopied }"
              :title="showCopied ? 'Copied!' : 'Click to copy'"
            >
              {{ star.symbol }}
            </div>
            <h1>{{ star.name }}</h1>
            <p class="star-meta">
              {{ star.unicode }} | Categories:
              {{ Array.isArray(star.categories) ? star.categories.join(', ') : star.categories }}
            </p>
            <p class="copy-hint">
              {{ showCopied ? 'Copied to clipboard!' : 'Click the symbol above to copy' }}
            </p>
          </div>

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
                <span class="tech-label">Alt Code:</span>
                <code
                  class="tech-value"
                  @click="copyTechValue(star.technicalInfo.altCode)"
                  :title="'Click to copy: ' + star.technicalInfo.altCode"
                >
                  {{ star.technicalInfo.altCode }}
                </code>
              </div>
              <div class="tech-item">
                <span class="tech-label">HTML Code:</span>
                <code
                  class="tech-value"
                  @click="copyTechValue(star.technicalInfo.htmlCode)"
                  :title="'Click to copy: ' + star.technicalInfo.htmlCode"
                >
                  {{ star.technicalInfo.htmlCode }}
                </code>
              </div>
              <div class="tech-item">
                <span class="tech-label">CSS Code:</span>
                <code
                  class="tech-value"
                  @click="copyTechValue(star.technicalInfo.cssCode)"
                  :title="'Click to copy: ' + star.technicalInfo.cssCode"
                >
                  {{ star.technicalInfo.cssCode }}
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
            </div>
          </section>

          <!-- About Section -->
          <section class="star-section">
            <h2>{{ star.name }} Content</h2>
            <div class="about-content" v-html="star.htmlContent"></div>
          </section>
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
import { ref, onMounted, onUnmounted, watch } from 'vue'
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
  } catch {
    showToastMessage('Failed to copy symbol')
  }
}

const copyTechValue = async (value) => {
  try {
    await navigator.clipboard.writeText(value)
    showToastMessage(`Copied ${value} to clipboard!`)
  } catch {
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

// 代码块复制功能
const setupCodeBlockCopy = () => {
  // 等待DOM更新后再添加事件监听器
  setTimeout(() => {
    const codeBlocks = document.querySelectorAll('.about-content pre')
    codeBlocks.forEach((pre) => {
      pre.addEventListener('click', handleCodeBlockClick)
    })
  }, 100)
}

const handleCodeBlockClick = async (event) => {
  const pre = event.currentTarget
  const code = pre.querySelector('code')
  if (code) {
    try {
      const text = code.textContent || code.innerText
      await navigator.clipboard.writeText(text)

      // 临时改变提示文字
      pre.style.setProperty('--before-content', '"Copied!"')

      showToastMessage('Code copied to clipboard!')

      // 2秒后恢复原始提示
      setTimeout(() => {
        pre.style.setProperty('--before-content', '"Click to copy"')
      }, 2000)
    } catch {
      showToastMessage('Failed to copy code')
    }
  }
}

// 清理事件监听器
const cleanupCodeBlockCopy = () => {
  const codeBlocks = document.querySelectorAll('.about-content pre')
  codeBlocks.forEach((pre) => {
    pre.removeEventListener('click', handleCodeBlockClick)
  })
}

// Watch route changes
onMounted(() => {
  loadStar()
  setupCodeBlockCopy()
})

// 组件卸载时清理事件监听器
onUnmounted(() => {
  cleanupCodeBlockCopy()
})

// Watch for route parameter changes
watch(
  () => route.params.slug,
  () => {
    cleanupCodeBlockCopy() // 清理旧的事件监听器
    loadStar()
    setupCodeBlockCopy() // 重新设置事件监听器
  },
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

.star-display.clickable {
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 1rem;
  border-radius: 15px;
  background: rgba(102, 126, 234, 0.05);
  border: 2px solid transparent;
  user-select: none;
}

.star-display.clickable:hover {
  transform: scale(1.02);
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.2);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.star-display.clickable.copied {
  background: rgba(76, 175, 80, 0.1);
  border-color: rgba(76, 175, 80, 0.3);
  transform: scale(1.01);
}

.copy-hint {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-style: italic;
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

/* About Content Styles */
.about-content {
  line-height: 1.7;
  color: #555;
  font-size: 1rem;
}

/* Section wrapper */
.about-content :deep(section) {
  margin: 0;
  padding: 0;
}

/* Headings */
.about-content :deep(h1) {
  font-size: 2rem;
  margin: 2.5rem 0 1.5rem 0;
  color: #333;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border-bottom: 3px solid #f0f0f0;
  padding-bottom: 0.8rem;
  text-align: center;
}

.about-content :deep(h1:first-child) {
  margin-top: 0;
}

.about-content :deep(h3) {
  font-size: 1.4rem;
  margin: 1.8rem 0 1rem 0;
  color: #444;
  font-weight: 600;
  position: relative;
  padding-left: 1rem;
}

.about-content :deep(h3::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 1.2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.about-content :deep(h4) {
  font-size: 1.2rem;
  margin: 1.5rem 0 0.8rem 0;
  color: #555;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.95rem;
}

/* Paragraphs */
.about-content :deep(p) {
  margin-bottom: 1.2rem;
  text-align: justify;
  text-justify: inter-word;
}

.about-content :deep(p:last-child) {
  margin-bottom: 0;
}

/* Lists */
.about-content :deep(ul) {
  margin: 1rem 0 1.5rem 0;
  padding: 0;
  list-style: none;
}

.about-content :deep(ol) {
  margin: 1rem 0 1.5rem 0;
  padding: 0 0 0 1.5rem;
  counter-reset: list-counter;
}

.about-content :deep(li) {
  margin-bottom: 0.6rem;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.6;
}

.about-content :deep(ul li::before) {
  content: '★';
  position: absolute;
  left: 0;
  top: 0;
  color: #667eea;
  font-size: 0.8rem;
  line-height: 1.6;
}

.about-content :deep(ol li) {
  padding-left: 0;
  counter-increment: list-counter;
  position: relative;
}

.about-content :deep(ol li::marker) {
  color: #667eea;
  font-weight: 600;
}

/* Text Formatting */
.about-content :deep(strong) {
  color: #333;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.about-content :deep(em) {
  color: #667eea;
  font-style: italic;
  font-weight: 500;
}

.about-content :deep(code) {
  background: #f8f9ff;
  color: #667eea;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  border: 1px solid #e8ecff;
}

/* Code blocks */
.about-content :deep(pre) {
  background: #f8f9ff;
  border: 1px solid #e8ecff;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.about-content :deep(pre:hover) {
  background: #f0f4ff;
  border-color: #d0dcff;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

.about-content :deep(pre code) {
  background: transparent;
  border: none;
  padding: 0;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre;
  display: block;
  user-select: all;
}

.about-content :deep(pre::before) {
  content: var(--before-content, 'Click to copy');
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 0.75rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  transition: color 0.3s ease;
  pointer-events: none;
}

.about-content :deep(pre:hover::before) {
  color: #667eea;
}

/* Blockquotes */
.about-content :deep(blockquote) {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #f8f9ff 0%, #e8ecff 100%);
  border-left: 4px solid #667eea;
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: #555;
}

.about-content :deep(blockquote p) {
  margin: 0;
}

/* Tables */
.about-content :deep(table) {
  width: 100%;
  margin: 1.5rem 0;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.about-content :deep(th) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.about-content :deep(td) {
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  color: #666;
}

.about-content :deep(tr:last-child td) {
  border-bottom: none;
}

.about-content :deep(tr:nth-child(even)) {
  background: #f8f9ff;
}

/* Images */
.about-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.about-content :deep(img:hover) {
  transform: scale(1.02);
}

/* Links */
.about-content :deep(a) {
  color: #667eea;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.about-content :deep(a:hover) {
  color: #764ba2;
  border-bottom-color: #764ba2;
}

/* Horizontal Rules */
.about-content :deep(hr) {
  margin: 2rem 0;
  border: none;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1px;
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

  .star-display {
    font-size: 4rem;
  }

  .tech-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .tech-label {
    min-width: auto;
  }

  /* About Content Mobile Styles */
  .about-content :deep(h1) {
    font-size: 1.6rem;
    margin: 2rem 0 1.2rem 0;
    padding-bottom: 0.6rem;
  }

  .about-content :deep(h2) {
    font-size: 1.5rem;
  }

  .about-content :deep(h3) {
    font-size: 1.2rem;
    margin: 1.5rem 0 0.8rem 0;
  }

  .about-content :deep(h4) {
    font-size: 1rem;
  }

  .about-content :deep(pre) {
    padding: 1rem;
    margin: 1rem 0;
    font-size: 0.85rem;
  }

  .about-content :deep(pre code) {
    font-size: 0.85rem;
  }

  .about-content :deep(table) {
    font-size: 0.9rem;
  }

  .about-content :deep(th),
  .about-content :deep(td) {
    padding: 0.6rem 0.8rem;
  }

  .about-content :deep(blockquote) {
    padding: 0.8rem 1rem;
    margin: 1rem 0;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .star-content {
    padding: 1.5rem;
  }

  .star-display {
    font-size: 3rem;
  }

  /* About Content Small Mobile Styles */
  .about-content {
    font-size: 0.95rem;
  }

  .about-content :deep(h1) {
    font-size: 1.4rem;
    margin: 1.5rem 0 1rem 0;
    padding-bottom: 0.5rem;
  }

  .about-content :deep(h2) {
    font-size: 1.3rem;
    margin: 1.5rem 0 0.8rem 0;
  }

  .about-content :deep(h3) {
    font-size: 1.1rem;
    margin: 1.2rem 0 0.6rem 0;
  }

  .about-content :deep(h3::before) {
    width: 3px;
    height: 1rem;
  }

  .about-content :deep(p) {
    margin-bottom: 1rem;
    text-align: left;
  }

  .about-content :deep(ul),
  .about-content :deep(ol) {
    margin: 0.8rem 0 1.2rem 0;
  }

  .about-content :deep(li) {
    margin-bottom: 0.5rem;
    padding-left: 1.2rem;
  }

  .about-content :deep(table) {
    font-size: 0.85rem;
    margin: 1rem 0;
  }

  .about-content :deep(th),
  .about-content :deep(td) {
    padding: 0.5rem 0.6rem;
  }

  .about-content :deep(blockquote) {
    padding: 0.6rem 0.8rem;
    margin: 0.8rem 0;
    font-size: 0.9rem;
  }

  .about-content :deep(img) {
    margin: 1rem 0;
  }

  .about-content :deep(pre) {
    padding: 0.8rem;
    margin: 0.8rem 0;
    font-size: 0.8rem;
  }

  .about-content :deep(pre code) {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .about-content :deep(pre::before) {
    font-size: 0.7rem;
    top: 0.4rem;
    right: 0.8rem;
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
