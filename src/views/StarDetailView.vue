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
          <p class="star-meta">{{ star.date }}</p>

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

              <p class="star-meta" v-if="star.isUnicode">
                <strong>
                  If you see '□', please refer to
                  <a
                    href="https://starsymbols.io/blog/fix-missing-characters-ascii-art"
                    target="_blank"
                    >fix missing characters ascii art</a
                  >
                  for a solution.</strong
                >
              </p>
            </div>

            <!-- Right: Technical Information -->
            <section class="technical-info-section" v-if="star.technicalInfo">
              <h2>Technical Information</h2>
              <div class="tech-list">
                <div class="tech-item" v-if="star.technicalInfo.unicode">
                  <span class="tech-label">Unicode:</span>
                  <code
                    class="tech-value"
                    @click="copyTechValue(star.technicalInfo.unicode)"
                    :title="'Click to copy: ' + star.technicalInfo.unicode"
                  >
                    {{ star.technicalInfo.unicode }}
                  </code>
                </div>
                <div class="tech-item" v-if="star.technicalInfo.altCode">
                  <span class="tech-label">Alt Code:</span>
                  <code
                    class="tech-value"
                    @click="copyTechValue(star.technicalInfo.altCode)"
                    :title="'Click to copy: ' + star.technicalInfo.altCode"
                  >
                    {{ star.technicalInfo.altCode }}
                  </code>
                </div>
                <div class="tech-item" v-if="star.technicalInfo.htmlCode">
                  <span class="tech-label">HTML Code:</span>
                  <code
                    class="tech-value"
                    @click="copyTechValue(star.technicalInfo.htmlCode)"
                    :title="'Click to copy: ' + star.technicalInfo.htmlCode"
                  >
                    {{ star.technicalInfo.htmlCode }}
                  </code>
                </div>
                <div class="tech-item" v-if="star.technicalInfo.cssCode">
                  <span class="tech-label">CSS Code:</span>
                  <code
                    class="tech-value"
                    @click="copyTechValue(star.technicalInfo.cssCode)"
                    :title="'Click to copy: ' + star.technicalInfo.cssCode"
                  >
                    {{ star.technicalInfo.cssCode }}
                  </code>
                </div>
                <div class="tech-item" v-if="star.technicalInfo.htmlEntity">
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
                <!-- <span class="creative-name">{{ item.name }}</span> -->
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
  min-height: 100vh;
  background: #f8f9ff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  color: #a0aec0;
}

.breadcrumb-current {
  color: #4a5568;
  font-weight: 500;
}

/* Star Content */
.star-content {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Star Info Section */
.star-info-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
  padding: 2rem;
  background: #f8f9ff;
  border-radius: 15px;
}

.star-display-section {
  text-align: center;
}

.star-display {
  font-size: 8rem;
  line-height: 1;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.star-display:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
}

.star-display.copied {
  background: #e6faed;
  color: #34d399;
}

.copy-hint {
  color: #ff8d00;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

/* Technical Info Section */
.technical-info-section {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.technical-info-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.tech-list {
  display: grid;
  gap: 1rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8f9ff;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: #edf2f7;
}

.tech-label {
  font-weight: 500;
  color: #4a5568;
  min-width: 100px;
}

.tech-value {
  font-family: 'Courier New', monospace;
  background: #2d3748;
  color: #e2e8f0;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.tech-value:hover {
  background: #1a202c;
}

/* About Section */
.about-section {
  margin: 2rem 0;
  padding: 2rem;
  background: #f8f9ff;
  border-radius: 15px;
}

.about-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

/* Creative Showcase Section */
.creative-showcase-section {
  margin: 2rem 0;
  padding: 2rem;
  background: #f8f9ff;
  border-radius: 15px;
}

.creative-showcase-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.creative-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.creative-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.creative-item:hover {
  transform: translateY(-2px);
  border-color: #667eea;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
}

.creative-item.copied {
  background: #e6faed;
  border-color: #34d399;
}

.creative-symbol {
  font-size: 1rem;
}

.creative-name {
  font-size: 0.9rem;
  color: #4a5568;
}

/* Related Stars Section */
.related-stars-section {
  margin: 2rem 0;
  padding: 2rem;
  background: #f8f9ff;
  border-radius: 15px;
}

.related-stars-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.related-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.related-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.related-item:hover {
  transform: translateY(-2px);
  border-color: #667eea;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
}

.related-symbol {
  font-size: 1.2rem;
}

.related-name {
  font-size: 0.9rem;
  color: #4a5568;
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
  z-index: 1000;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .container {
    padding: 1.5rem;
  }

  .star-info-section {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .star-display {
    font-size: 6rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .star-content {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .star-display {
    font-size: 5rem;
  }

  .creative-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  .star-content {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.8rem;
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

  .creative-list {
    grid-template-columns: 1fr;
  }
}

/* 增强的移动端响应式样式 */
@media (max-width: 768px) {
  /* 面包屑导航优化 */
  .breadcrumb {
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-bottom: 1.5rem;
    font-size: 0.8rem;
  }

  .breadcrumb-separator {
    margin: 0 0.25rem;
  }

  /* 页面标题优化 */
  .page-title {
    font-size: 1.8rem;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  .star-meta {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  /* 星号信息区域优化 */
  .star-info-section {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }

  /* 星号显示区域优化 */
  .star-display-section {
    text-align: center;
  }

  .star-display {
    font-size: 4.5rem;
    padding: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .copy-hint {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  /* 技术信息区域优化 */
  .technical-info-section {
    padding: 1.25rem;
  }

  .technical-info-section h2 {
    font-size: 1.3rem;
    margin-bottom: 1.25rem;
  }

  .tech-item {
    padding: 0.5rem;
    gap: 0.75rem;
  }

  .tech-label {
    font-size: 0.9rem;
    min-width: 80px;
  }

  .tech-value {
    font-size: 0.85rem;
    padding: 0.4rem 0.6rem;
    word-break: break-all;
  }

  /* 创意展示区域优化 */
  .creative-showcase-section {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }

  .creative-showcase-section h2 {
    font-size: 1.3rem;
    margin-bottom: 1.25rem;
  }

  .creative-list {
    gap: 0.75rem;
  }

  .creative-item {
    padding: 0.4rem 0.8rem;
    min-width: 60px;
    justify-content: center;
  }

  .creative-symbol {
    font-size: 0.9rem;
  }

  /* 关于区域优化 */
  .about-section {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }

  .about-section h2 {
    font-size: 1.3rem;
    margin-bottom: 1.25rem;
  }

  /* 相关星号区域优化 */
  .related-stars-section {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }

  .related-stars-section h2 {
    font-size: 1.3rem;
    margin-bottom: 1.25rem;
  }

  .related-list {
    gap: 0.75rem;
  }

  .related-item {
    padding: 0.5rem 1rem;
    min-width: 80px;
  }

  .related-symbol {
    font-size: 1rem;
  }

  .related-name {
    font-size: 0.8rem;
  }

  /* Toast通知优化 */
  .toast {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    transform: translateY(100%);
    text-align: center;
    font-size: 0.9rem;
  }

  .toast.show {
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  /* 超小屏幕优化 */
  .container {
    padding: 0.75rem;
  }

  .star-content {
    padding: 1rem;
    border-radius: 15px;
  }

  /* 面包屑进一步优化 */
  .breadcrumb {
    font-size: 0.75rem;
    margin-bottom: 1rem;
  }

  /* 页面标题进一步优化 */
  .page-title {
    font-size: 1.6rem;
    line-height: 1.3;
  }

  .star-meta {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  /* 星号信息区域进一步优化 */
  .star-info-section {
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 12px;
  }

  /* 星号显示进一步优化 */
  .star-display {
    font-size: 3.5rem;
    padding: 1rem;
    border-radius: 12px;
  }

  .copy-hint {
    font-size: 0.9rem;
  }

  /* 技术信息进一步优化 */
  .technical-info-section {
    padding: 1rem;
    border-radius: 12px;
  }

  .technical-info-section h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .tech-item {
    padding: 0.4rem;
    gap: 0.5rem;
    border-radius: 6px;
  }

  .tech-label {
    font-size: 0.8rem;
    min-width: 70px;
  }

  .tech-value {
    font-size: 0.8rem;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
  }

  /* 创意展示进一步优化 */
  .creative-showcase-section {
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 12px;
  }

  .creative-showcase-section h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .creative-list {
    gap: 0.5rem;
  }

  .creative-item {
    padding: 0.3rem 0.6rem;
    border-radius: 8px;
    min-width: 50px;
  }

  .creative-symbol {
    font-size: 0.8rem;
  }

  /* 关于区域进一步优化 */
  .about-section {
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 12px;
  }

  .about-section h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  /* 相关星号进一步优化 */
  .related-stars-section {
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 12px;
  }

  .related-stars-section h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .related-list {
    gap: 0.5rem;
  }

  .related-item {
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    min-width: 70px;
  }

  .related-symbol {
    font-size: 0.9rem;
  }

  .related-name {
    font-size: 0.75rem;
  }

  /* 404页面优化 */
  .not-found {
    text-align: center;
    padding: 2rem 1rem;
  }

  .not-found h1 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .not-found p {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .back-link {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #667eea;
    color: white;
    text-decoration: none;
    border-radius: 25px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }

  .back-link:hover {
    background: #764ba2;
    transform: translateY(-2px);
  }
}

/* 横屏模式优化 */
@media (max-width: 768px) and (orientation: landscape) {
  .star-display {
    font-size: 3rem;
    padding: 1rem;
  }

  .star-info-section {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .star-display:hover {
    transform: none;
  }

  .star-display:active {
    transform: scale(0.95);
    background: #e6faed;
    color: #34d399;
  }

  .tech-value:hover {
    background: #2d3748;
  }

  .tech-value:active {
    background: #1a202c;
  }

  .creative-item:hover {
    transform: none;
  }

  .creative-item:active {
    transform: scale(0.95);
    background: #e6faed;
    border-color: #34d399;
  }

  .related-item:hover {
    transform: none;
  }

  .related-item:active {
    transform: scale(0.95);
    border-color: #667eea;
  }
}

/* v-html content styles */
:deep(.about-content) {
  color: #4a5568;
  line-height: 1.8;
}

:deep(.about-content h3) {
  font-size: 1.5rem;
  color: #2d3748;
  margin: 1.5rem 0 1rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

:deep(.about-content p) {
  margin-bottom: 1rem;
}

:deep(.about-content ul) {
  list-style-type: disc;
  margin: 1rem 0;
  padding-left: 1.5rem;
}

:deep(.about-content li) {
  margin-bottom: 0.5rem;
}

:deep(.about-content code) {
  background: #2d3748;
  color: #e2e8f0;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

:deep(.about-content pre) {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

:deep(.about-content pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

:deep(.about-content blockquote) {
  border-left: 4px solid #667eea;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #4a5568;
  font-style: italic;
}

:deep(.about-content a) {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

:deep(.about-content a:hover) {
  color: #764ba2;
  text-decoration: underline;
}

:deep(.about-content table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

:deep(.about-content th),
:deep(.about-content td) {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  text-align: left;
}

:deep(.about-content th) {
  background: #f8f9ff;
  font-weight: 600;
}

:deep(.about-content tr:nth-child(even)) {
  background: #f8f9ff;
}

:deep(.about-content img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

:deep(.about-content .note) {
  background: #ebf8ff;
  border-left: 4px solid #4299e1;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0 8px 8px 0;
}

:deep(.about-content .warning) {
  background: #fffaf0;
  border-left: 4px solid #ed8936;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0 8px 8px 0;
}

:deep(.about-content .tip) {
  background: #f0fff4;
  border-left: 4px solid #48bb78;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0 8px 8px 0;
}

/* 移动端 v-html 内容优化 */
@media (max-width: 768px) {
  :deep(.about-content) {
    font-size: 0.95rem;
    line-height: 1.7;
  }

  :deep(.about-content h3) {
    font-size: 1.3rem;
    margin: 1.25rem 0 0.75rem;
    padding-bottom: 0.4rem;
  }

  :deep(.about-content p) {
    margin-bottom: 0.75rem;
  }

  :deep(.about-content ul) {
    margin: 0.75rem 0;
    padding-left: 1.25rem;
  }

  :deep(.about-content li) {
    margin-bottom: 0.4rem;
  }

  :deep(.about-content code) {
    font-size: 0.85em;
    padding: 0.15rem 0.3rem;
  }

  :deep(.about-content pre) {
    padding: 0.75rem;
    margin: 0.75rem 0;
    border-radius: 6px;
    font-size: 0.85rem;
  }

  :deep(.about-content blockquote) {
    padding-left: 0.75rem;
    margin: 0.75rem 0;
    font-size: 0.9rem;
  }

  :deep(.about-content table) {
    margin: 0.75rem 0;
    font-size: 0.85rem;
  }

  :deep(.about-content th),
  :deep(.about-content td) {
    padding: 0.5rem 0.4rem;
  }

  :deep(.about-content img) {
    margin: 0.75rem 0;
    border-radius: 6px;
  }

  :deep(.about-content .note),
  :deep(.about-content .warning),
  :deep(.about-content .tip) {
    padding: 0.75rem;
    margin: 0.75rem 0;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  :deep(.about-content) {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  :deep(.about-content h3) {
    font-size: 1.2rem;
    margin: 1rem 0 0.5rem;
    padding-bottom: 0.3rem;
  }

  :deep(.about-content p) {
    margin-bottom: 0.6rem;
  }

  :deep(.about-content ul) {
    margin: 0.6rem 0;
    padding-left: 1rem;
  }

  :deep(.about-content li) {
    margin-bottom: 0.3rem;
  }

  :deep(.about-content code) {
    font-size: 0.8em;
    padding: 0.1rem 0.25rem;
  }

  :deep(.about-content pre) {
    padding: 0.6rem;
    margin: 0.6rem 0;
    border-radius: 4px;
    font-size: 0.8rem;
  }

  :deep(.about-content blockquote) {
    padding-left: 0.6rem;
    margin: 0.6rem 0;
    font-size: 0.85rem;
  }

  :deep(.about-content table) {
    margin: 0.6rem 0;
    font-size: 0.8rem;
  }

  :deep(.about-content th),
  :deep(.about-content td) {
    padding: 0.4rem 0.3rem;
  }

  :deep(.about-content img) {
    margin: 0.6rem 0;
    border-radius: 4px;
  }

  :deep(.about-content .note),
  :deep(.about-content .warning),
  :deep(.about-content .tip) {
    padding: 0.6rem;
    margin: 0.6rem 0;
    font-size: 0.85rem;
  }

  /* 超小屏幕表格优化 */
  :deep(.about-content table) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
