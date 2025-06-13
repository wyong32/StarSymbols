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
          <!-- Page Title -->
          <h1 class="page-title">{{ star.name }}</h1>
          <p class="star-meta">2025-06-12</p>

          <!-- Star Display and Technical Info Section -->
          <div class="star-info-section">
            <!-- Left: Star Display -->
            <div class="star-display-section">
              <div
                class="star-display clickable"
                @click="copySymbol"
                :class="{ copied: showCopied }"
                :title="showCopied ? 'Copied!' : 'Click to copy'"
              >
                {{ star.symbol }}
              </div>
              <p class="copy-hint">
                {{ showCopied ? 'Copied to clipboard!' : 'Click the symbol above to copy' }}
              </p>

              <p class="star-meta">
                {{ star.unicode }} | Categories:
                {{ Array.isArray(star.categories) ? star.categories.join(', ') : star.categories }}
              </p>
            </div>

            <!-- Right: Technical Information -->
            <section class="technical-info-section" v-if="star.technicalInfo">
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
          </div>

          <!-- Creative Showcases Section (English, after about) -->
          <section
            v-if="star.creativeShowcases && star.creativeShowcases.length"
            class="creative-showcase-section"
          >
            <h2>Creative Star Showcases</h2>
            <ul class="creative-list">
              <li
                v-for="(item, idx) in star.creativeShowcases"
                :key="idx"
                class="creative-item"
                @click="copyCreativeItem(item.symbol)"
                :class="{ copied: item.copied }"
                :title="item.copied ? 'Copied!' : 'Click to copy'"
              >
                <span class="creative-symbol">{{ item.symbol }}</span>
                <span class="creative-name">{{ item.name }}</span>
              </li>
            </ul>
          </section>

          <!-- About Section -->
          <section class="about-section">
            <h2>{{ star.name }} Content</h2>
            <div class="about-content" v-html="star.htmlContent"></div>
          </section>

          <!-- Related Stars Section (English, after about) -->
          <section
            v-if="star.relatedStars && star.relatedStars.length"
            class="related-stars-section"
          >
            <h2>Related Stars</h2>
            <div class="related-list">
              <div
                v-for="item in star.relatedStars"
                :key="item.slug"
                class="related-item"
                @click="goToStarDetail(item.slug)"
                tabindex="0"
                @keydown.enter="goToStarDetail(item.slug)"
                role="button"
              >
                <span class="related-symbol">{{ item.symbol }}</span>
                <span class="related-name">{{ item.name }}</span>
              </div>
            </div>
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
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { getStarDetailBySlug } from '@/data/starDetails.js'

// Router
const route = useRoute()
const router = useRouter()

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

const goToStarDetail = (slug) => {
  router.push({ name: 'StarDetail', params: { slug } })
}

// 添加复制创意展示项的方法
const copyCreativeItem = async (symbol) => {
  try {
    await navigator.clipboard.writeText(symbol)
    // 找到对应的item并设置copied状态
    const item = star.value.creativeShowcases.find((item) => item.symbol === symbol)
    if (item) {
      item.copied = true
      showToastMessage(`Copied ${symbol} to clipboard!`)

      // 2秒后重置copied状态
      setTimeout(() => {
        item.copied = false
      }, 2000)
    }
  } catch {
    showToastMessage('Failed to copy symbol')
  }
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
  max-width: 1200px;
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
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

/* Page Title */
.page-title {
  font-size: 2.2rem;
  text-align: center;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: -0.02em;
  position: relative;
}

.star-meta {
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  font-weight: 500;
}

/* Star Info Section */
.star-info-section {
  display: flex;
  gap: 0.7rem;
  margin-bottom: 1.2rem;
  background: #fff;
  border-radius: 12px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
}

.star-info-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
}

/* Star Display Section */
.star-display-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.2rem 0.5rem 0.2rem;
  background: #fafaff;
  border-radius: 8px;
  min-width: 0;
}

.star-display-section::before {
  display: none;
}

.star-display {
  font-size: 3.2rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.star-display.clickable {
  padding: 0.7rem;
  border-radius: 8px;
  font-size: 3.2rem;
}

.star-display.clickable:hover {
  transform: scale(1.04);
  background: #f6f6ff;
  border-color: #bdb7f7;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.08);
}

.star-display.clickable.copied {
  background: #e6faed;
  border-color: #34d399;
  transform: scale(1.02);
}

.copy-hint {
  color: #8b8fa7;
  font-size: 0.85rem;
  margin-top: 0.3rem;
  font-weight: 400;
  transition: all 0.3s ease;
}

.star-meta {
  font-size: 0.85rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}

/* Technical Info Section */
.technical-info-section {
  flex: 1.2;
  padding: 0.5rem 0.2rem 0.5rem 0.2rem;
  background: #f7f8fa;
  border-radius: 8px;
  position: relative;
  min-width: 0;
}

.technical-info-section h2 {
  font-size: 1.6rem;
  margin-bottom: 0.7rem;
  color: #1e293b;
  text-align: left;
  font-weight: 700;
  position: relative;
  padding-bottom: 0.2rem;
}

.technical-info-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 18px;
  height: 2px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 1px;
}

.tech-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.tech-item {
  display: flex;
  align-items: center;
  padding: 0 0 0 1rem;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  border: 1px solid #ececff;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.8rem;
}

.tech-item:hover {
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.08);
  border-color: #bdb7f7;
}

.tech-label {
  font-weight: 600;
  color: #4b5563;
  min-width: 100px;
  font-size: 0.8rem;
}

.tech-value {
  flex: 1;
  padding: 0 0.5rem;
  background: #f7f8fa;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.92rem;
  color: #4f46e5;
  border: 1px solid #ececff;
}

.tech-value:hover {
  background: #4f46e5;
  color: white;
}

/* About Section */
.about-section {
  background: #fff;
  border-radius: 14px;
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  margin-top: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
}

.about-section h2 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: #1e293b;
  text-align: left;
  font-weight: 700;
  position: relative;
  padding-bottom: 0.3rem;
}

.about-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 24px;
  height: 2px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 1px;
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
  background: #1e293b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 500;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
}

/* Responsive Design */
@media (max-width: 900px) {
  .star-info-section {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.3rem;
  }
  .star-display-section,
  .technical-info-section {
    padding: 0.3rem 0.1rem;
  }
}

@media (max-width: 600px) {
  .page-title {
    font-size: 1.1rem;
  }
  .star-meta {
    font-size: 0.75rem;
  }
  .star-display {
    font-size: 2.1rem;
  }
  .about-section,
  .star-info-section {
    padding: 0.2rem;
    border-radius: 5px;
  }
  .about-section h2,
  .technical-info-section h2 {
    font-size: 0.9rem;
  }
  .tech-item,
  .tech-label,
  .tech-value {
    font-size: 0.85rem;
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

.creative-showcase-section {
  background: #fff;
  border-radius: 14px;
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.creative-showcase-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
}

.creative-showcase-section h2 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: #1e293b;
  text-align: left;
  font-weight: 700;
  position: relative;
  padding-bottom: 0.3rem;
}

.creative-showcase-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 24px;
  height: 2px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 1px;
}

.creative-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.creative-item {
  font-size: 1.05rem;
  background: #f8f9ff;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #4f46e5;
  border: 1px solid #ececff;
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.05);
  font-family: 'JetBrains Mono', 'Consolas', 'monospace';
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.creative-item:hover {
  transform: translateY(-2px);
  background: #f0f4ff;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
  border-color: #bdb7f7;
}

.creative-item.copied {
  background: #e6faed;
  border-color: #34d399;
  transform: scale(1.02);
}

.creative-item.copied::after {
  content: '✓';
  position: absolute;
  right: 0.8rem;
  color: #34d399;
  font-weight: bold;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.creative-symbol {
  font-size: 1.3rem;
  margin-right: 0.2rem;
  color: #7c3aed;
}

.creative-name {
  font-size: 0.95rem;
  color: #6366f1;
  font-family: inherit;
  font-weight: 500;
}

.related-stars-section {
  background: #fff;
  border-radius: 14px;
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.related-stars-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
}

.related-stars-section h2 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: #1e293b;
  text-align: left;
  font-weight: 700;
  position: relative;
  padding-bottom: 0.3rem;
}

.related-stars-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 24px;
  height: 2px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 1px;
}

.related-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.related-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: #f8f9ff;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #4f46e5;
  border: 1px solid #ececff;
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.05);
  cursor: pointer;
  font-size: 1.05rem;
  transition: all 0.3s ease;
}

.related-item:hover,
.related-item:focus {
  transform: translateY(-2px);
  background: #f0f4ff;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
  border-color: #bdb7f7;
}

.related-symbol {
  font-size: 1.3rem;
  margin-right: 0.2rem;
  color: #7c3aed;
}

.related-name {
  font-size: 1.05rem;
  font-weight: 500;
  color: #4f46e5;
}

@media (max-width: 600px) {
  .creative-showcase-section,
  .related-stars-section {
    padding: 1rem;
  }

  .creative-item,
  .related-item {
    padding: 0.4rem 0.8rem;
    font-size: 0.95rem;
  }

  .creative-symbol,
  .related-symbol {
    font-size: 1.1rem;
  }

  .creative-name,
  .related-name {
    font-size: 0.95rem;
  }
}
</style>
