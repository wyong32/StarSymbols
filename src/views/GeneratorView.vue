<template>
  <div class="generator-page hero-variant-generator">
    <header>
      <AppHeader />
    </header>

    <main>
      <section class="hero" aria-label="Fancy Text Generator Introduction">
        <div class="hero-content">
          <h1 class="hero-title">The Ultimate Fancy Text Generator ✨</h1>
          <div class="hero-stars">
            <span class="hero-star" style="--delay: 0s">✨</span>
            <span class="hero-star" style="--delay: 0.3s">⭐</span>
            <span class="hero-star" style="--delay: 0.6s">🌟</span>
            <span class="hero-star" style="--delay: 0.9s">💫</span>
            <span class="hero-star" style="--delay: 1.2s">✦</span>
            <span class="hero-star" style="--delay: 1.5s">✧</span>
          </div>
          <p class="hero-description">
            Want to make your words stand out? Welcome to your new favorite creative tool! Instantly
            generate cool and aesthetic fonts decorated with thousands of unique symbols like stars
            ✨, hearts ❤, and arrows →. It's perfect for making your Instagram bio, TikTok posts,
            and gaming profiles truly unforgettable. Best of all? It's free, fast, and incredibly
            easy to copy and paste. Let's get creative!
          </p>
        </div>
      </section>

      <section class="generator-section" aria-label="Text Generator">
        <div class="section-container">
          <section class="generator-card-container" aria-label="Text Generator Tool">
            <slot name="howto-guide" />
            <StarTextGenerator :show-toast="showToast" />
          </section>

          <section class="features-section" aria-label="Features">
            <h2 class="section-title">Why Our Fancy Text Generator</h2>
            <div class="features-grid">
              <div class="feature-card">
                <div class="feature-icon">⭐</div>
                <h4>Endless Possibilities</h4>
                <p>
                  Unlock thousands of unique combinations. Mix and match dozens of cool fonts with
                  over 20 categories of symbols to create text that is 100% you.
                </p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <h4>Instant Copy and Paste</h4>
                <p>
                  No complicated steps. Just type, style, and click to copy. Your new fancy text is
                  ready to be pasted anywhere in seconds. It's that simple.
                </p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">📱</div>
                <h4>Works Everywhere</h4>
                <p>
                  Your creations are compatible with all major platforms. Make your profiles pop on
                  Instagram, TikTok, Twitter, Facebook, Discord, and more!
                </p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h4>Completely Free, Forever</h4>
                <p>
                  Unleash your creativity without limits. Our tool is 100% free to use, with no
                  sign-ups, no hidden fees, and no nonsense.
                </p>
              </div>
            </div>
          </section>

          <section class="howto-guide" aria-label="How To Guide">
            <h2 class="section-title">How to Use the Fancy Text Generator</h2>
            <p class="howto-desc">
              Follow these simple steps to create and use your own fancy text:
            </p>
            <ol class="howto-list">
              <li class="howto-step">
                <span class="howto-step-num">1</span>
                <span class="howto-step-content">
                  <strong>Choose Symbols to Insert:</strong> Click any symbol in the grid to add it
                  to the <strong>Symbol Preselection Box</strong> below.
                </span>
              </li>
              <li class="howto-step">
                <span class="howto-step-num">2</span>
                <span class="howto-step-content">
                  <strong>Preselect Your Favorite Symbols:</strong> The
                  <strong>Symbol Preselection Box</strong> lets you collect and preview symbols you
                  want to use. You can click any symbol in the box to insert it into your text at
                  the cursor position. The box keeps your selection even if you refresh the page,
                  unless you click <strong>Clear All</strong>.
                </span>
              </li>
              <li class="howto-step">
                <span class="howto-step-num">3</span>
                <span class="howto-step-content">
                  <strong>Type or Paste Your Text:</strong> Enter your text in the
                  <strong>Your Text</strong> area.
                </span>
              </li>
              <li class="howto-step">
                <span class="howto-step-num">4</span>
                <span class="howto-step-content">
                  <strong>Insert Symbols into Your Text:</strong> Click any symbol in the
                  preselection box to insert it at the current cursor position in your text.
                </span>
              </li>
              <li class="howto-step">
                <span class="howto-step-num">5</span>
                <span class="howto-step-content">
                  <strong>Generate Fancy Text:</strong> Click the
                  <strong>Generate Fancy Text</strong> button to create your decorated text.
                </span>
              </li>
              <li class="howto-step">
                <span class="howto-step-num">6</span>
                <span class="howto-step-content">
                  <strong>Copy and Use:</strong> Copy your fancy text and use it anywhere you like!
                </span>
              </li>
            </ol>
          </section>

          <section class="examples-section" aria-label="Examples">
            <h2 class="section-title">Style Examples</h2>
            <div class="examples-grid">
              <div class="example-card">
                <div class="example-text">★ Hello World ★</div>
              </div>
              <div class="example-card">
                <div class="example-text">✨ Hello World ✨</div>
              </div>
              <div class="example-card">
                <div class="example-text">✧･ﾟ: * Hello World *:･ﾟ✧</div>
              </div>
              <div class="example-card">
                <div class="example-text">⋆｡‧˚ʚ Hello World ɞ˚‧｡⋆</div>
              </div>
              <div class="example-card">
                <div class="example-text">🌟 Hello World 🌟</div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>

    <footer>
      <AppFooter />
    </footer>

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
import StarTextGenerator from '@/components/StarTextGenerator.vue'
import { copyProtection } from '@/utils/copyProtection.js'

// Reactive data
const showToast = ref(false)
const toastMessage = ref('')

// Methods
const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Set up copy protection toast callback
onMounted(() => {
  copyProtection.setToastCallback(showToastMessage)
})

const howtoSteps = [
  '<b>Choose Symbols to Insert:</b> <span class="howto-key">Click</span> any symbol in the grid to add it to the <span class="howto-key">Symbol Preselection Box</span> below.',
  '<b>Preselect Your Favorite Symbols:</b> The <span class="howto-key">Symbol Preselection Box</span> lets you collect and preview symbols you want to use. You can <span class="howto-key">click</span> any symbol in the box to insert it into your text at the cursor position. The box keeps your selection even if you refresh the page, unless you click <span class="howto-key">Clear All</span>.',
  '<b>Type or Paste Your Text:</b> Enter your text in the <span class="howto-key">Your Text</span> area.',
  '<b>Insert Symbols into Your Text:</b> <span class="howto-key">Click</span> any symbol in the preselection box to insert it at the current cursor position in your text.',
  '<b>Generate Fancy Text:</b> Click the <span class="howto-key">Generate Fancy Text</span> button to create your decorated text.',
  '<b>Copy and Use:</b> <span class="howto-key">Copy</span> your fancy text and use it anywhere you like!',
]
</script>

<style scoped>
@import '@/styles/hero.css';

.generator-page {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

.generator-card-container {
  background: white;
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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

.section-header p {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

/* Generator Section */
.generator-section {
  padding: 0 0 4rem 0;
}

/* Features Section */
.features-section {
  margin-top: 4rem;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  background: #f8f9ff;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h4 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* Examples Section */
.examples-section {
  margin-top: 3rem;
  background: rgba(255, 255, 255, 0.8);
  padding: 3rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.example-card {
  text-align: center;
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.example-card:hover {
  transform: translateY(-3px);
}

.example-card h4 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #667eea;
  font-weight: 600;
}

.example-text {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  word-break: break-all;
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
  .section-container {
    padding: 0 1.5rem;
  }

  .section-header p {
    font-size: 1rem;
  }

  .generator-section {
    padding: 0 0 3rem 0;
  }

  .features-section {
    margin-top: 3rem;
    padding: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
  }

  .feature-icon {
    font-size: 2.5rem;
  }

  .feature-card h4 {
    font-size: 1.2rem;
  }

  .feature-card p {
    font-size: 0.9rem;
  }

  .examples-section {
    margin-top: 2rem;
    padding: 2rem;
  }

  .examples-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .example-card {
    padding: 1.25rem;
  }

  .example-text {
    font-size: 1.1rem;
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
  .section-container {
    padding: 0 1rem;
  }

  .generator-section {
    padding: 0 0 2rem 0;
  }

  .features-section {
    margin-top: 2rem;
    padding: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.25rem;
  }

  .feature-icon {
    font-size: 2rem;
  }

  .feature-card h4 {
    font-size: 1.1rem;
  }

  .feature-card p {
    font-size: 0.85rem;
  }

  .examples-section {
    margin-top: 1.5rem;
    padding: 1.5rem;
  }

  .examples-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .example-card {
    padding: 1rem;
  }

  .example-card h4 {
    font-size: 1rem;
  }

  .example-text {
    font-size: 1rem;
  }
}

.howto-guide {
  background: #f8f9ff;
  border-radius: 16px;
  padding: 2rem 2.2rem 1.5rem 2.2rem;
  margin: 2.2rem 0 0 0;
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.1);
  border: 1.5px solid #ececff;
  margin-left: auto;
  margin-right: auto;
}
.howto-list {
  margin: 0;
  padding-left: 0;
  color: #444;
  font-size: 1.05rem;
  list-style: none;
}
.howto-step {
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.06);
  margin-bottom: 1.1rem;
  padding: 1rem 1.2rem 1rem 0.9rem;
  position: relative;
  transition: box-shadow 0.2s;
}
.howto-step:last-child {
  margin-bottom: 0;
}
.howto-step:hover {
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.13);
}
.howto-step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.1rem;
  height: 2.1rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  margin-right: 1.1rem;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.1);
  flex-shrink: 0;
}
.howto-step-content {
  flex: 1;
  line-height: 1.7;
  word-break: break-word;
}
.howto-key {
  color: #4f46e5;
  font-weight: 600;
  background: #ececff;
  border-radius: 4px;
  padding: 0.1em 0.4em;
  margin: 0 0.1em;
  font-size: 0.98em;
}
@media (max-width: 900px) {
  .howto-guide {
    padding: 1.2rem 0.7rem 1rem 0.7rem;
  }
}
@media (max-width: 600px) {
  .howto-guide {
    padding: 0.7rem 0.2rem 0.7rem 0.2rem;
    max-width: 98vw;
  }
  .howto-step {
    padding: 0.7rem 0.5rem 0.7rem 0.5rem;
    font-size: 0.97rem;
  }
  .howto-step-num {
    min-width: 1.5rem;
    height: 1.5rem;
    font-size: 0.95rem;
    margin-right: 0.6rem;
  }
}
.howto-desc {
  text-align: center;
  color: #666;
  font-size: 1rem;
  margin-bottom: 1.2rem;
}

.generator-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.generator-container {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #4a5568;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.toast.show {
  opacity: 1;
}

/* 统一的标题样式 */
.section-title {
  color: #2d3748;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 响应式样式 */
@media (max-width: 900px) {
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}

/* 其他样式保持不变 */
</style>
