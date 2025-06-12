<template>
  <div class="contact-page">
    <!-- Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Let's Create Something Amazing Together</h1>
        <div class="floating-stars">
          <span class="floating-star" style="--delay: 0s; --x: 10%; --y: 20%">🌟</span>
          <span class="floating-star" style="--delay: 0.3s; --x: 85%; --y: 15%">✨</span>
          <span class="floating-star" style="--delay: 0.6s; --x: 25%; --y: 80%">⭐</span>
          <span class="floating-star" style="--delay: 0.9s; --x: 75%; --y: 70%">💫</span>
          <span class="floating-star" style="--delay: 1.2s; --x: 45%; --y: 40%">✪</span>
          <span class="floating-star" style="--delay: 1.5s; --x: 60%; --y: 60%">✿</span>
        </div>
        <p class="hero-description">
          Your ideas are the stars that light up our universe. Share them with us and let's make
          something extraordinary together.
        </p>
      </div>
    </section>

    <!-- Contact Content Section -->
    <section class="contact-section">
      <div class="section-container">
        <!-- Interactive Contact Cards -->
        <div class="contact-grid">
          <div
            class="contact-card email-card"
            @mouseover="activateCard('email')"
            @mouseleave="deactivateCard"
          >
            <div class="card-content">
              <div class="card-front">
                <div class="card-icon">📧</div>
                <h3>Send Us a Message</h3>
                <p>Share your thoughts and ideas</p>
              </div>
              <div class="card-back">
                <h4>Email Us At</h4>
                <a href="mailto:delldremo9898@gmail.com" class="email-link"
                  >delldremo9898@gmail.com</a
                >
                <p class="response-time">We'll sparkle back within 24-48 hours ✨</p>
              </div>
            </div>
          </div>

          <div
            class="contact-card ideas-card"
            @mouseover="activateCard('ideas')"
            @mouseleave="deactivateCard"
          >
            <div class="card-content">
              <div class="card-front">
                <div class="card-icon">💡</div>
                <h3>Share Your Ideas</h3>
                <p>Help us make StarSymbols better</p>
              </div>
              <div class="card-back">
                <h4>We're Looking For</h4>
                <ul class="idea-list">
                  <li><span class="idea-icon">✨</span> New star symbols</li>
                  <li><span class="idea-icon">🎨</span> Design improvements</li>
                  <li><span class="idea-icon">🚀</span> Feature suggestions</li>
                  <li><span class="idea-icon">💫</span> Creative content</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            class="contact-card collab-card"
            @mouseover="activateCard('collab')"
            @mouseleave="deactivateCard"
          >
            <div class="card-content">
              <div class="card-front">
                <div class="card-icon">🤝</div>
                <h3>Join Our Team</h3>
                <p>Let's create magic together</p>
              </div>
              <div class="card-back">
                <h4>Collaboration Areas</h4>
                <div class="collab-tags">
                  <span class="collab-tag">Design</span>
                  <span class="collab-tag">Development</span>
                  <span class="collab-tag">Content</span>
                  <span class="collab-tag">Marketing</span>
                </div>
                <p class="collab-note">Let's discuss how we can work together!</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Features Section -->
        <div class="features-section">
          <div class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">⚡</div>
              <div class="feature-text">
                <h3>Lightning Fast Response</h3>
                <p>We value your input and respond quickly to all inquiries</p>
              </div>
            </div>
            <div class="feature-progress">
              <div class="progress-bar" :style="{ width: responseProgress + '%' }"></div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">💫</div>
              <div class="feature-text">
                <h3>Growing Community</h3>
                <p>Join our creative community of star symbol enthusiasts</p>
              </div>
            </div>
            <div class="feature-stats">
              <div class="stat">
                <span class="stat-number">1000+</span>
                <span class="stat-label">Active Users</span>
              </div>
              <div class="stat">
                <span class="stat-number">50+</span>
                <span class="stat-label">Daily Ideas</span>
              </div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">🌟</div>
              <div class="feature-text">
                <h3>Continuous Innovation</h3>
                <p>Your feedback shapes our future development</p>
              </div>
            </div>
            <div class="innovation-timeline">
              <div class="timeline-item" v-for="(item, index) in timelineItems" :key="index">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-date">{{ item.date }}</span>
                  <span class="timeline-text">{{ item.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

// 响应进度动画
const responseProgress = ref(0)
const timelineItems = ref([
  { date: '2024 Q1', text: 'New symbol collection' },
  { date: '2024 Q2', text: 'Enhanced generator' },
  { date: '2024 Q3', text: 'Community features' },
  { date: '2024 Q4', text: 'Mobile app launch' },
])

// 卡片激活状态
const activeCard = ref(null)

const activateCard = (card) => {
  activeCard.value = card
}

const deactivateCard = () => {
  activeCard.value = null
}

// 进度条动画
onMounted(() => {
  setTimeout(() => {
    responseProgress.value = 100
  }, 500)
})
</script>

<style scoped>
@import '@/styles/hero.css';

/* Global Styles */
.contact-page {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

/* Hero Section */
.hero {
  position: relative;
  padding: 6rem 0 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-title {
  font-size: 3rem;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

/* Floating Stars Animation */
.floating-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-star {
  position: absolute;
  left: var(--x);
  top: var(--y);
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
  animation-delay: var(--delay);
  opacity: 0.8;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

/* Contact Section */
.contact-section {
  padding: 4rem 0;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

/* Contact Cards */
.contact-card {
  position: relative;
  height: 300px;
  perspective: 1000px;
  cursor: pointer;
}

.card-content {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.contact-card:hover .card-content {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.card-front h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.card-front p {
  color: #666;
}

.card-back h4 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.email-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border: 2px solid white;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.email-link:hover {
  background: white;
  color: #667eea;
}

.response-time {
  margin-top: 1rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Idea List */
.idea-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  text-align: left;
}

.idea-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.idea-icon {
  font-size: 1.2rem;
}

/* Collaboration Tags */
.collab-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
}

.collab-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.collab-tag:hover {
  background: white;
  color: #667eea;
  transform: translateY(-2px);
}

.collab-note {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-top: 1rem;
}

/* Features Section */
.features-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.feature-icon {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-text h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.feature-text p {
  color: #666;
  font-size: 0.9rem;
}

/* Progress Bar */
.feature-progress {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 1s ease-in-out;
}

/* Stats */
.feature-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

/* Timeline */
.innovation-timeline {
  margin-top: 1rem;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  flex-shrink: 0;
}

.timeline-content {
  display: flex;
  flex-direction: column;
}

.timeline-date {
  font-size: 0.8rem;
  color: #667eea;
  font-weight: bold;
}

.timeline-text {
  font-size: 0.9rem;
  color: #666;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .features-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .features-section {
    grid-template-columns: 1fr;
  }

  .contact-card {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .section-container {
    padding: 0 1rem;
  }

  .contact-card {
    height: 220px;
  }

  .card-front,
  .card-back {
    padding: 1.5rem;
  }

  .card-icon {
    font-size: 2.5rem;
  }

  .feature-card {
    padding: 1.5rem;
  }
}
</style> 