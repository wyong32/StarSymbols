<template>
  <div class="app">
    <!-- Header Section -->
    <AppHeader />
    <!-- Hero Section -->
    <section class="hero" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)">
      <div class="hero-content">
        <!-- 移动端横幅-1 -->
        <aside class="ad-content" v-if="isMobile" :key="'ph-ad-' + adKey">
          <ins class="eas6a97888e10" data-zoneid="5670024"></ins>
        </aside>
        <h1 class="hero-title">Star Copy and Paste - All Star Symbols</h1>
        <div class="hero-stars">
          <span class="hero-star" style="--delay: 0s">★</span>
          <span class="hero-star" style="--delay: 0.3s">☆</span>
          <span class="hero-star" style="--delay: 0.6s">✡</span>
          <span class="hero-star" style="--delay: 0.9s">✦</span>
          <span class="hero-star" style="--delay: 1.2s">✧</span>
          <span class="hero-star" style="--delay: 1.5s">✪</span>
          <span class="hero-star" style="--delay: 1.8s">⍟</span>
          <span class="hero-star" style="--delay: 2.1s">✮</span>
        </div>
        <p class="hero-description">
          StarSymbols: the ultimate collection of star symbols, all star symbol copy and paste, a
          Star Text Symbols Generator, and an Image to Star Text Art Converter. Discover thousands
          of star symbols to make your content shine with beautiful Unicode star symbols! ✨
        </p>

        <!-- PC端横幅顶部位 -->
        <aside class="ad-content" v-if="!isMobile" :key="'pc-ad-' + adKey">
          <ins class="eas6a97888e2" data-zoneid="5670016"></ins>
        </aside>

        <div class="symbols-container">
          <StarSymbolsGrid :show-toast="showToastMessage" />

          <div class="hero-cta">
            <p class="cta-text">
              Want to explore more star symbols? Click Here
              <router-link to="/all-star-symbols" class="cta-link">
                All Star Symbols →
              </router-link>
            </p>
          </div>
        </div>
        <!-- 移动端横幅-2 -->
        <aside class="ad-content" v-if="isMobile" :key="'ph-ad-' + adKey">
          <ins class="eas6a97888e10" data-zoneid="5670028"></ins>
        </aside>
      </div>
    </section>

    <!-- Text Generator Section -->
    <section class="generator-section">
      <div class="section-container">
        <div class="section-header">
          <h2>Star Text Symbols Generator - Star Copy And Paste</h2>
          <p>
            Transform your text into beautiful star-decorated messages using our star symbols
            collection. Star Copy And Paste provides the perfect star symbols for social media and
            creative content.
          </p>
        </div>

        <div class="generator-card-container">
          <TextGenerator :show-toast="showToastMessage" />

          <div class="section-cta">
            <p class="cta-text">
              Need more advanced text styling options? Click Here
              <router-link to="/text-symbol-generator" class="cta-link">
                Text Symbol Generator →
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 页内原生广告位 -->
    <aside class="ad-content" :key="'pc-ad-' + adKey">
      <ins class="eas6a97888e20" data-zoneid="5670022"></ins>
    </aside>

    <!-- How to Use Section -->
    <section class="how-to-use-section">
      <div class="section-container">
        <div class="section-header">
          <h2>How to Use Star Copy And Paste</h2>
          <p>
            Follow these simple steps to start using star symbols from Star Copy And Paste in your
            content
          </p>
        </div>

        <div class="steps-grid">
          <div v-for="(step, index) in howToSteps" :key="index" class="step-card">
            <div class="step-number">{{ step.number }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>

        <div class="tips-section">
          <h2>Pro Tips</h2>
          <div class="tips-grid">
            <div class="tip-group">
              <h3>✨ Creative Uses for Star Symbols</h3>
              <ul>
                <li>Social media posts and bios with star symbols</li>
                <li>Email signatures decorated with star symbols</li>
                <li>Document headers using Star Copy And Paste</li>
                <li>Website content enhanced with star symbols</li>
              </ul>
            </div>
            <div class="tip-group">
              <h3>⭐ Star Symbols Best Practices</h3>
              <ul>
                <li>Use star symbols sparingly for maximum impact</li>
                <li>Match star symbols style to your content</li>
                <li>Test Star Copy And Paste compatibility across platforms</li>
                <li>Combine star symbols with other symbols</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="section-container">
        <div class="section-header">
          <h2>Star Copy And Paste FAQ</h2>
          <p>Everything you need to know about using star symbols from Star Copy And Paste</p>
        </div>

        <div class="faq-list">
          <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
            <div class="faq-question">
              {{ faq.question }}
            </div>
            <div class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="blog-section">
      <div class="section-container">
        <div class="section-header">
          <h2>Star Copy And Paste Blog</h2>
          <p>
            Discover the latest articles, tips, and insights about star symbols and creative design
            from Star Copy And Paste.
          </p>
        </div>
        <BlogGrid />
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section">
      <div class="section-container">
        <div class="section-header">
          <h2>About Star Copy And Paste</h2>
          <p>
            Your ultimate destination for star symbols and aesthetic text generation with Star Copy
            And Paste
          </p>
        </div>

        <div class="about-content">
          <div class="about-text">
            <div class="about-card">
              <h3>Our Mission</h3>
              <p>
                We believe that creativity should be accessible to everyone. Star Copy And Paste was
                created to provide a simple, elegant solution for anyone looking to add a touch of
                magic to their digital content with beautiful star symbols.
              </p>
              <p>
                Whether you're a social media enthusiast, content creator, designer, or just someone
                who loves beautiful typography, Star Copy And Paste offers the star symbols tools
                you need to make your text shine with star symbols.
              </p>
            </div>

            <div class="about-card">
              <h3>What We Offer</h3>
              <ul class="feature-list">
                <li>
                  <span class="feature-icon">⭐</span>Extensive collection of Unicode star symbols
                  from Star Copy And Paste
                </li>
                <li>
                  <span class="feature-icon">⭐</span>One-click copy functionality for star symbols
                </li>
                <li>
                  <span class="feature-icon">⭐</span>Star symbols aesthetic text generator with
                  multiple styles
                </li>
                <li>
                  <span class="feature-icon">⭐</span>Mobile-friendly responsive design for star
                  symbols
                </li>
                <li>
                  <span class="feature-icon">⭐</span>Cross-platform compatibility for all star
                  symbols
                </li>
              </ul>
            </div>
          </div>

          <div class="about-features">
            <div class="feature-highlight">
              <div class="feature-icon-large">✨</div>
              <h3>100% Free</h3>
              <p>
                All Star Copy And Paste star symbols and tools are completely free to use. No
                registration required, no hidden fees, just pure creative freedom with star symbols.
              </p>
            </div>

            <div class="feature-highlight">
              <div class="feature-icon-large">⚡</div>
              <h3>Lightning Fast</h3>
              <p>
                Instant copying, no loading times, no complicated interfaces. Get your perfect star
                symbols from Star Copy And Paste in seconds, not minutes.
              </p>
            </div>

            <div class="feature-highlight">
              <div class="feature-icon-large">🌟</div>
              <h3>Always Updated</h3>
              <p>
                We continuously expand Star Copy And Paste star symbols collection and improve our
                star symbols tools based on user feedback and the latest Unicode standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <AppFooter />

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast" :class="{ show: showToast }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import StarSymbolsGrid from '@/components/StarSymbolsGrid.vue'
import BlogGrid from '@/components/BlogGrid.vue'
import TextGenerator from '@/components/TextGenerator.vue'
import { copyProtection } from '@/utils/copyProtection.js'
import { useDeviceDetection } from '@/utils/useDeviceDetection.js'

const { isMobile } = useDeviceDetection()

// Reactive data
const showToast = ref(false)
const toastMessage = ref('')
// 广告刷新的key，用于强制重新渲染广告
const adKey = ref(0)

// How to use steps
const howToSteps = [
  {
    number: '01',
    title: 'Choose Your Star Symbols',
    description:
      'Browse through Star Copy And Paste extensive collection of star symbols organized in different categories - Classic, Solid, and Outline star symbols.',
  },
  {
    number: '02',
    title: 'Click to Copy Star Symbols',
    description:
      'Simply click on any star symbol you like from Star Copy And Paste. Star symbols will be automatically copied to your clipboard with a confirmation message.',
  },
  {
    number: '03',
    title: 'Paste Star Symbols Anywhere',
    description:
      'Use Ctrl+V (or Cmd+V on Mac) to paste your copied star symbols into any application, document, or social media post. Star Copy And Paste star symbols work everywhere.',
  },
  {
    number: '04',
    title: 'Create Star Symbols Text',
    description:
      'Use Star Copy And Paste Aesthetic Text Generator to create beautiful star symbols decorated messages for your social media posts and creative projects.',
  },
]

// FAQ data
const faqs = [
  {
    question: 'How do I copy and paste a star?',
    answer:
      'It’s easy! Just visit starsymbols.io, click on the star symbol you like, and it will be copied to your clipboard automatically. Then you can paste it anywhere—documents, messages, social media, or emails.',
  },
  {
    question: 'Are Star Copy And Paste star symbols compatible with all devices?',
    answer:
      'Yes! Star Copy And Paste star symbols are Unicode characters that work across all modern devices, operating systems, and applications. Star symbols display consistently on Windows, Mac, iOS, Android, and web browsers.',
  },
  // {
  //   question: 'Can I use Star Copy And Paste star symbols commercially?',
  //   answer:
  //     'Absolutely! Star Copy And Paste star symbols are standard Unicode symbols that are free to use for any purpose, including commercial projects, social media, websites, and printed materials.',
  // },
  {
    question: 'Do Star Copy And Paste star symbols work on social media platforms?',
    answer:
      'Yes, all major social media platforms (Instagram, Facebook, Twitter, TikTok, LinkedIn) support Star Copy And Paste Unicode star symbols. Star symbols are perfect for enhancing your posts and profiles.',
  },
  {
    question: 'How do I copy multiple star symbols at once from Star Copy And Paste?',
    answer:
      'You can click on individual star symbols to copy them one by one, or use Star Copy And Paste Text Generator to create custom text with multiple star symbols decorations that you can copy all at once.',
  },
  {
    question: "Why aren't Star Copy And Paste star symbols copying on my device?",
    answer:
      "Make sure your browser supports the clipboard API and you've granted permission. Try clicking the star symbol again, or manually select and copy (Ctrl+C) the star symbol from Star Copy And Paste.",
  },
  {
    question: 'Can I suggest new star symbols to add to Star Copy And Paste?',
    answer:
      "We're always looking to expand Star Copy And Paste star symbols collection! While we focus on widely-supported Unicode star symbols, feel free to reach out with suggestions for new star symbols or categories.",
  },
  {
    question: 'How to use star symbols on Windows with Alt codes?',
    answer:
      'On Windows, you can type star symbols using Alt codes. Hold down the Alt key and type the numeric code on your number pad. For example, Alt + 9733 creates a black star (★). Make sure Num Lock is on and use the numeric keypad for this to work.',
  },
  {
    question: 'How to use star symbols on Mac with Character Viewer?',
    answer:
      'On Mac, press Control + Command + Space (⌃+⌘+Space) to open the Character Viewer. Search for "star" to find various star symbols, then double-click any symbol to insert it into your text. You can also access it through Edit menu > Emoji & Symbols.',
  },
  {
    question: 'How to find star symbols on iPhone and Android emoji keyboards?',
    answer:
      'On iPhone, open the emoji keyboard and search for "star" in the search bar, or look in the Symbols section. On Android, access the emoji/symbol keyboard and search for "star" or browse the Symbols category. Most star emojis like ⭐ and ✨ are readily available.',
  },
]

// Methods
const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// 手动触发广告加载
const loadAds = () => {
  if (window.AdProvider) {
    try {
      window.AdProvider.push({ serve: {} })
    } catch (e) {
      console.error('广告加载失败:', e)
    }
  } else {
    // 如果 AdProvider 还没加载，动态加载脚本
    const script = document.createElement('script')
    script.async = true
    script.type = 'application/javascript'
    script.src = 'https://a.magsrv.com/ad-provider.js'
    script.onload = () => {
      if (window.AdProvider) {
        window.AdProvider.push({ serve: {} })
      }
    }
    script.onerror = (e) => {
      console.error('广告脚本加载失败:', e)
    }
    document.head.appendChild(script)
  }
}

// Set up copy protection toast callback
onMounted(() => {
  copyProtection.setToastCallback(showToastMessage)
  // 加载广告
  setTimeout(loadAds, 1000)
})
</script>

<style scoped>
.app {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  color: #333;
  display: flex;
  align-items: center;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: float 3s ease-in-out infinite;
}

.hero-description {
  font-size: 1.3rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.hero-stars {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 1rem;
}

.hero-star {
  animation: colorWave 4s ease-in-out infinite;
  animation-delay: var(--delay);
  background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: transform 0.3s ease;
}

.hero-star:hover {
  transform: scale(1.2);
}

/* Hero CTA Styles */
.hero-cta {
  margin-top: 2rem;
}

.symbols-container {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.generator-card-container {
  background: white;
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.cta-text {
  font-size: 1.1rem;
  color: #555;
  margin: 0;
}

.cta-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
}

.cta-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

.cta-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.cta-link:hover::after {
  width: 100%;
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes colorWave {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 200% 50%;
  }
  75% {
    background-position: 300% 50%;
  }
  100% {
    background-position: 400% 50%;
  }
}

/* Section Styles */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
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
  margin: 0 auto;
}

/* Section CTA Styles */
.section-cta {
  text-align: center;
  padding: 1.5rem;
}

/* All Sections - Full Screen Height and Centered */
section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 5rem 0;
}

/* Symbols Section */
.symbols-section {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

/* Generator Section */
.generator-section {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

/* How to Use Section */
.how-to-use-section {
  background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%);
}

/* FAQ Section */
.faq-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Blog Section */
.blog-section {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
}

/* About Section */
.about-section {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}
.step-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.step-card:hover {
  transform: translateY(-5px);
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
  transition: transform 0.3s ease;
}

.step-card:hover .step-number {
  transform: scale(1.1);
}

.step-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.step-card p {
  color: #666;
  line-height: 1.6;
}

.tips-section {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.tips-section h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.tip-group h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.tip-group ul {
  list-style: none;
  padding: 0;
}

.tip-group li {
  padding: 0.5rem 0;
  color: #666;
  border-bottom: 1px solid #f0f0f0;
}

.tip-group li:last-child {
  border-bottom: none;
}

/* FAQ Section */
.faq-section .section-header h2 {
  color: white;
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  background-clip: unset;
}

.faq-section .section-header p {
  color: rgba(255, 255, 255, 0.9);
}

.faq-list {
  width: 900px;
}

.faq-item {
  background: white;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.faq-question {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 0.5rem;
}

.faq-answer {
  padding: 0 1rem 0.5rem;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}

.faq-answer p {
  margin: 0;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-content .about-text .about-card {
  background: #f8f9ff;
  padding: 2rem;
  border-radius: 15px;
  border-left: 4px solid #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.about-content .about-text .about-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.about-content .about-text .about-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.about-content .about-text .about-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.about-content .about-text .about-card p:last-child {
  margin-bottom: 0;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: #666;
}

.feature-icon {
  font-size: 1.2rem;
}

.about-features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature-highlight {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-highlight:hover {
  transform: translateY(-5px);
}

.feature-icon-large {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-highlight h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature-highlight p {
  color: #666;
  line-height: 1.6;
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

/* Animations */
@keyframes twinkle {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@media screen and (max-width: 1024px) {
  .faq-list {
    width: 100%;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  /* Adjust section heights for mobile */
  section {
    min-height: auto;
    padding: 1rem 0;
  }

  .hero {
    min-height: 80vh;
    padding: 6rem 1.5rem 3rem;
  }

  .hero-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .hero-description {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .hero-stars {
    font-size: 2rem;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .symbols-container {
    padding: 1rem;
  }

  .section-header {
    margin-bottom: 1rem;
  }

  .section-container {
    padding: 0 1.5rem;
  }

  .section-header h2 {
    font-size: 1.8rem;
    line-height: 1.2;
  }

  .section-header p {
    font-size: 1rem;
  }

  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .step-card {
    padding: 1.5rem;
  }

  .step-number {
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
  }

  .step-card h3 {
    font-size: 1.1rem;
  }

  .step-card p {
    font-size: 0.9rem;
  }

  .tips-section {
    padding: 1rem;
  }

  .tips-section h2 {
    font-size: 1.5rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .tips-section h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .tip-group li {
    padding: 0.2rem 0;
    font-size: 0.8rem;
  }

  .faq-section {
    color: white;
  }

  .faq-question {
    font-size: 1rem;
    padding: 1rem 1rem 0.5rem 1rem;
  }

  .faq-answer {
    padding: 0 1rem 1rem;
  }

  .faq-answer p {
    font-size: 0.9rem;
  }

  .feature-highlight {
    padding: 1.5rem;
  }

  .feature-icon-large {
    font-size: 2rem;
  }

  .about-content .about-text .about-card {
    padding: 1rem;
  }

  .about-content .about-text .about-card h3 {
    font-size: 1.2rem;
    line-height: 1.2;
  }
  .about-content .about-text .about-card p {
    font-size: 0.8rem;
    line-height: 1.5;
  }
  .feature-list li {
    font-size: 0.8rem;
    line-height: 1.5;
  }
}

@media (max-width: 600px) {
  .steps-grid {
    gap: 1rem;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .about-content {
    grid-template-columns: 1fr;
  }

  .feature-highlight {
    padding: 1rem;
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
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .hero-description {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  .hero-stars {
    font-size: 1.8rem;
    gap: 0.6rem;
    margin-bottom: 0.5rem;
  }

  .hero-cta,
  .section-cta {
    margin-top: 1rem;
    padding: 0.5rem;
  }

  .cta-text {
    font-size: 0.8rem;
  }

  .section-container {
    padding: 0 1rem;
  }

  .section-header h2 {
    font-size: 1.3rem;
  }

  .section-header p {
    font-size: 0.8rem;
  }

  .step-card {
    padding: 1rem;
  }

  .step-number {
    font-size: 1.3rem;
    width: 45px;
    height: 45px;
  }

  .step-card h3 {
    font-size: 1rem;
    line-height: 1.3;
  }

  .step-card p {
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .faq-question {
    font-size: 0.9rem;
    padding: 0.8rem 0.8rem 0.4rem 0.8rem;
  }

  .faq-answer {
    padding: 0 0.8rem 0.8rem;
  }

  .faq-answer p {
    font-size: 0.8rem;
  }

  .feature-highlight h3 {
    font-size: 1.1rem;
  }

  .feature-highlight p {
    font-size: 0.8rem;
  }

  .feature-icon-large {
    font-size: 1.8rem;
  }
}
</style>
