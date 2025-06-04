<template>
  <div class="stars-page">
    <!-- Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="hero" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)">
      <div class="hero-content">
        <h1 class="hero-title">All Star Symbols</h1>
        <p class="hero-description">
          Explore our complete collection of Unicode star symbols. From classic stars to decorative
          sparkles, find the perfect symbol for your creative projects.
        </p>
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
        <StarSymbolsGrid :show-toast="showToastMessage" />
      </div>
    </section>

    <!-- Stars Collection Section -->
    <section class="stars-section">
      <div class="section-container">
        <!-- Usage Tips -->
        <div class="usage-tips">
          <h3>How to Use Star Symbols</h3>
          <div class="tips-grid">
            <div class="tip-card">
              <div class="tip-icon">📋</div>
              <h4>Copy & Paste</h4>
              <p>Click any star symbol to copy it instantly. Then paste it anywhere you need it.</p>
            </div>
            <div class="tip-card">
              <div class="tip-icon">🎨</div>
              <h4>Creative Projects</h4>
              <p>Perfect for social media posts, documents, websites, and digital art projects.</p>
            </div>
            <div class="tip-card">
              <div class="tip-icon">🌐</div>
              <h4>Universal Support</h4>
              <p>
                All symbols are Unicode characters that work across all modern devices and
                platforms.
              </p>
            </div>
            <div class="tip-card">
              <div class="tip-icon">⚡</div>
              <h4>Instant Access</h4>
              <p>No registration required. All symbols are free to use for any purpose.</p>
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
import StarSymbolsGrid from '@/components/StarSymbolsGrid.vue'
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

/* Hero Section */
.hero {
  padding: 8rem 2rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-bottom: 3rem;
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
  padding: 5rem 0;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

/* Usage Tips */
.usage-tips {
  margin-top: 4rem;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.usage-tips h3 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.tip-card {
  text-align: center;
  padding: 2rem;
  background: #f8f9ff;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.tip-card:hover {
  transform: translateY(-5px);
}

.tip-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.tip-card h4 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.tip-card p {
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

  .tips-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .tip-card {
    padding: 1.5rem;
  }

  .tip-icon {
    font-size: 2.5rem;
  }

  .tip-card h4 {
    font-size: 1.2rem;
  }

  .tip-card p {
    font-size: 0.9rem;
  }

  .usage-tips {
    margin-top: 3rem;
    padding: 2rem;
  }

  .usage-tips h3 {
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

  .tip-card {
    padding: 1.25rem;
  }

  .tip-icon {
    font-size: 2rem;
  }

  .tip-card h4 {
    font-size: 1.1rem;
  }

  .tip-card p {
    font-size: 0.85rem;
  }

  .usage-tips {
    margin-top: 2rem;
    padding: 1.5rem;
  }

  .usage-tips h3 {
    font-size: 1.5rem;
  }
}
</style>
