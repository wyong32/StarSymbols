<template>
  <div class="app">
    <!-- Header Section -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="hero" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)">
      <div class="hero-content">
        <h1 class="hero-title">⭐ Star Copy And Paste ⭐</h1>
        <p class="hero-description">
          The ultimate collection of star symbols, copy-paste tools, and aesthetic text generators.
          Make your content shine with beautiful Unicode stars! ✨
        </p>
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

        <StarSymbolsGrid :show-toast="showToastMessage" />
      </div>
    </section>

    <!-- Text Generator Section -->
    <section class="generator-section">
      <div class="section-container">
        <div class="section-header">
          <h2>Aesthetic Text Generator with Stars</h2>
          <p>
            Transform your text into beautiful star-decorated messages perfect for social media and
            creative content.
          </p>
        </div>

        <TextGenerator :show-toast="showToastMessage" />
      </div>
    </section>

    <!-- How to Use Section -->
    <section class="how-to-use-section">
      <div class="section-container">
        <div class="section-header">
          <h2>How to Use</h2>
          <p>Follow these simple steps to start using star symbols in your content</p>
        </div>

        <div class="steps-grid">
          <div v-for="(step, index) in howToSteps" :key="index" class="step-card">
            <div class="step-number">{{ step.number }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>

        <div class="tips-section">
          <h3>Pro Tips</h3>
          <div class="tips-grid">
            <div class="tip-group">
              <h4>✨ Creative Uses</h4>
              <ul>
                <li>Social media posts and bios</li>
                <li>Email signatures</li>
                <li>Document headers</li>
                <li>Website content</li>
              </ul>
            </div>
            <div class="tip-group">
              <h4>⭐ Best Practices</h4>
              <ul>
                <li>Use stars sparingly for impact</li>
                <li>Match star style to your content</li>
                <li>Test compatibility across platforms</li>
                <li>Combine with other symbols</li>
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
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about using star symbols</p>
        </div>

        <div class="faq-list">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="faq-item"
            :class="{ active: activeFaq === index }"
          >
            <button class="faq-question" @click="toggleFaq(index)">
              {{ faq.question }}
              <span class="faq-icon">{{ activeFaq === index ? '−' : '+' }}</span>
            </button>
            <div class="faq-answer" v-show="activeFaq === index">
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
          <h2>Star Blog</h2>
          <p>
            Discover the latest articles, tips, and insights about star symbols and creative design.
          </p>
        </div>
        <BlogGrid />
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section">
      <div class="section-container">
        <div class="section-header">
          <h2>About StarCopy</h2>
          <p>Your ultimate destination for star symbols and aesthetic text generation</p>
        </div>

        <div class="about-content">
          <div class="about-text">
            <div class="about-card">
              <h3>Our Mission</h3>
              <p>
                We believe that creativity should be accessible to everyone. StarCopy was created to
                provide a simple, elegant solution for anyone looking to add a touch of magic to
                their digital content with beautiful star symbols.
              </p>
              <p>
                Whether you're a social media enthusiast, content creator, designer, or just someone
                who loves beautiful typography, our platform offers the tools you need to make your
                text shine.
              </p>
            </div>

            <div class="about-card">
              <h3>What We Offer</h3>
              <ul class="feature-list">
                <li>
                  <span class="feature-icon">⭐</span>Extensive collection of Unicode star symbols
                </li>
                <li><span class="feature-icon">⭐</span>One-click copy functionality</li>
                <li>
                  <span class="feature-icon">⭐</span>Aesthetic text generator with multiple styles
                </li>
                <li><span class="feature-icon">⭐</span>Mobile-friendly responsive design</li>
                <li><span class="feature-icon">⭐</span>Cross-platform compatibility</li>
              </ul>
            </div>
          </div>

          <div class="about-features">
            <div class="feature-highlight">
              <div class="feature-icon-large">✨</div>
              <h3>100% Free</h3>
              <p>
                All our star symbols and tools are completely free to use. No registration required,
                no hidden fees, just pure creative freedom.
              </p>
            </div>

            <div class="feature-highlight">
              <div class="feature-icon-large">⚡</div>
              <h3>Lightning Fast</h3>
              <p>
                Instant copying, no loading times, no complicated interfaces. Get your perfect star
                symbols in seconds, not minutes.
              </p>
            </div>

            <div class="feature-highlight">
              <div class="feature-icon-large">🌟</div>
              <h3>Always Updated</h3>
              <p>
                We continuously expand our symbol collection and improve our tools based on user
                feedback and the latest Unicode standards.
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

// Reactive data
const activeFaq = ref(null)
const showToast = ref(false)
const toastMessage = ref('')

// Featured stars for preview
const featuredStars = ['★', '⭐', '✨', '🌟', '💫', '✦', '✧', '✩', '✪', '✫', '✬', '✭']

// How to use steps
const howToSteps = [
  {
    number: '01',
    title: 'Choose Your Star',
    description:
      'Browse through our extensive collection of star symbols organized in different categories - Classic, Solid, and Outline stars.',
  },
  {
    number: '02',
    title: 'Click to Copy',
    description:
      'Simply click on any star symbol you like. It will be automatically copied to your clipboard with a confirmation message.',
  },
  {
    number: '03',
    title: 'Paste Anywhere',
    description:
      'Use Ctrl+V (or Cmd+V on Mac) to paste your copied star symbol into any application, document, or social media post.',
  },
  {
    number: '04',
    title: 'Create Star Text',
    description:
      'Use our Aesthetic Text Generator to create beautiful star-decorated messages for your social media posts and creative projects.',
  },
]

// FAQ data
const faqs = [
  {
    question: 'Are these star symbols compatible with all devices?',
    answer:
      'Yes! Our star symbols are Unicode characters that work across all modern devices, operating systems, and applications. They display consistently on Windows, Mac, iOS, Android, and web browsers.',
  },
  {
    question: 'Can I use these stars commercially?',
    answer:
      'Absolutely! These are standard Unicode symbols that are free to use for any purpose, including commercial projects, social media, websites, and printed materials.',
  },
  {
    question: 'Do the star symbols work on social media platforms?',
    answer:
      "Yes, all major social media platforms (Instagram, Facebook, Twitter, TikTok, LinkedIn) support these Unicode star symbols. They're perfect for enhancing your posts and profiles.",
  },
  {
    question: 'How do I copy multiple star symbols at once?',
    answer:
      'You can click on individual stars to copy them one by one, or use our Text Generator to create custom text with multiple star decorations that you can copy all at once.',
  },
  {
    question: "Why aren't the symbols copying on my device?",
    answer:
      "Make sure your browser supports the clipboard API and you've granted permission. Try clicking the symbol again, or manually select and copy (Ctrl+C) the symbol from the button.",
  },
  {
    question: 'Can I suggest new star symbols to add?',
    answer:
      "We're always looking to expand our collection! While we focus on widely-supported Unicode symbols, feel free to reach out with suggestions for new symbols or categories.",
  },
]

// Methods
const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const copySymbol = async (symbol) => {
  try {
    await navigator.clipboard.writeText(symbol)
    showToastMessage(`"${symbol}" copied to clipboard!`)
  } catch (err) {
    console.error('Copy failed: ', err)
    showToastMessage('Copy failed, please try again')
  }
}

// Set up copy protection toast callback
onMounted(() => {
  copyProtection.setToastCallback(showToastMessage)
})
</script>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

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
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
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
  margin-bottom: 2rem;
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
  max-width: 600px;
  margin: 0 auto;
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

.tips-section h3 {
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

.tip-group h4 {
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
  transition: box-shadow 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
}

.faq-question:hover {
  background: #f8f9ff;
}

.faq-icon {
  font-size: 1.5rem;
  color: #667eea;
  transition: transform 0.3s ease;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: #666;
  line-height: 1.6;
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

.about-card {
  background: #f8f9ff;
  padding: 2rem;
  border-radius: 15px;
  border-left: 4px solid #667eea;
}

.about-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.about-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.about-card p:last-child {
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

/* Responsive Design */
@media (max-width: 768px) {
  /* Adjust section heights for mobile */
  section {
    min-height: auto;
    padding: 3rem 0;
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

  .faq-section {
    color: white;
  }

  .faq-question {
    font-size: 1rem;
    padding: 1rem;
  }

  .faq-answer p {
    font-size: 0.9rem;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .feature-highlight {
    padding: 1.5rem;
  }

  .feature-icon-large {
    font-size: 2rem;
  }
}

@media (max-width: 600px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .about-content {
    grid-template-columns: 1fr;
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

  .step-card {
    padding: 1.25rem;
  }

  .step-number {
    font-size: 1.3rem;
    width: 45px;
    height: 45px;
  }

  .step-card h3 {
    font-size: 1rem;
  }

  .step-card p {
    font-size: 0.85rem;
  }

  .faq-question {
    font-size: 0.9rem;
    padding: 0.8rem;
  }

  .faq-answer p {
    font-size: 0.85rem;
  }

  .feature-highlight {
    padding: 1.25rem;
  }

  .feature-highlight h3 {
    font-size: 1.1rem;
  }

  .feature-highlight p {
    font-size: 0.85rem;
  }

  .feature-icon-large {
    font-size: 1.8rem;
  }

  .tip-group h4 {
    font-size: 1rem;
  }

  .tip-group ul li {
    font-size: 0.85rem;
  }
}
</style>
