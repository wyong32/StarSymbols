<template>
  <div class="generator-page hero-variant-generator">
    <!-- Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Star Text Generator</h1>
        <div class="hero-stars">
          <span class="hero-star" style="--delay: 0s">✨</span>
          <span class="hero-star" style="--delay: 0.3s">⭐</span>
          <span class="hero-star" style="--delay: 0.6s">🌟</span>
          <span class="hero-star" style="--delay: 0.9s">💫</span>
          <span class="hero-star" style="--delay: 1.2s">✦</span>
          <span class="hero-star" style="--delay: 1.5s">✧</span>
        </div>
        <p class="hero-description">
          Create beautiful star-decorated text for your social media posts, documents, and creative
          projects. Choose from multiple styles and add stars anywhere in your text.
        </p>
      </div>
    </section>

    <!-- Generator Section -->
    <section class="generator-section">
      <div class="section-container">
        <TextGenerator :show-toast="showToastMessage" />

        <!-- Features Section -->
        <div class="features-section">
          <h3>Generator Features</h3>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h4>Multiple Styles</h4>
              <p>Choose from Classic, Sparkle, Decorative, Elegant, and Cosmic text styles.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⭐</div>
              <h4>Star Picker</h4>
              <p>Insert any star symbol directly into your text at the cursor position.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h4>Mobile Friendly</h4>
              <p>Works perfectly on all devices - desktop, tablet, and mobile.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h4>Instant Copy</h4>
              <p>One-click copying to clipboard for immediate use anywhere.</p>
            </div>
          </div>
        </div>

        <!-- Examples Section -->
        <div class="examples-section">
          <h3>Style Examples</h3>
          <div class="examples-grid">
            <div class="example-card">
              <h4>Classic</h4>
              <div class="example-text">★ Hello World ★</div>
            </div>
            <div class="example-card">
              <h4>Sparkle</h4>
              <div class="example-text">✨ Hello World ✨</div>
            </div>
            <div class="example-card">
              <h4>Decorative</h4>
              <div class="example-text">✧･ﾟ: * Hello World *:･ﾟ✧</div>
            </div>
            <div class="example-card">
              <h4>Elegant</h4>
              <div class="example-text">⋆｡‧˚ʚ Hello World ɞ˚‧｡⋆</div>
            </div>
            <div class="example-card">
              <h4>Cosmic</h4>
              <div class="example-text">🌟 Hello World 🌟</div>
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
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import TextGenerator from '@/components/TextGenerator.vue'
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
</script>

<style scoped>
@import '@/styles/hero.css';

.generator-page {
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

.features-section h3 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

.examples-section h3 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.example-card {
  text-align: center;
  padding: 1.5rem;
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
  font-size: 1.2rem;
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

  .section-header h2 {
    font-size: 2rem;
  }

  .section-header p {
    font-size: 1rem;
  }

  .generator-section {
    padding: 3rem 0;
  }

  .features-section {
    margin-top: 3rem;
    padding: 2rem;
  }

  .features-section h3 {
    font-size: 1.8rem;
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

  .examples-section h3 {
    font-size: 1.8rem;
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

  .section-header h2 {
    font-size: 1.8rem;
  }

  .section-header p {
    font-size: 0.9rem;
  }

  .generator-section {
    padding: 2.5rem 0;
  }

  .features-section {
    margin-top: 2rem;
    padding: 1.5rem;
  }

  .features-section h3 {
    font-size: 1.5rem;
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

  .examples-section h3 {
    font-size: 1.5rem;
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
</style>
