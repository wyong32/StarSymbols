<template>
  <div class="about-page hero-variant-about">
    <!-- Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">About Us</h1>
        <div class="hero-stars">
          <span class="hero-star" style="--delay: 0s">🌟</span>
          <span class="hero-star" style="--delay: 0.3s">✨</span>
          <span class="hero-star" style="--delay: 0.6s">⭐</span>
          <span class="hero-star" style="--delay: 0.9s">💫</span>
          <span class="hero-star" style="--delay: 1.2s">🎯</span>
          <span class="hero-star" style="--delay: 1.5s">💡</span>
        </div>
        <p class="hero-description">
          We're passionate about making creativity accessible to everyone. StarCopy was created to
          provide a simple, elegant solution for anyone looking to add a touch of magic to their
          digital content with beautiful star symbols.
        </p>
      </div>
    </section>

    <!-- About Content Section -->
    <section class="about-section">
      <div class="section-container">
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
                <li><span class="feature-icon">⭐</span>Comprehensive blog and tutorials</li>
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

        <!-- Stats Section -->
        <div class="stats-section">
          <h2>StarCopy by the Numbers</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">50+</div>
              <div class="stat-label">Star Symbols</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">5</div>
              <div class="stat-label">Text Styles</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">100%</div>
              <div class="stat-label">Free to Use</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">∞</div>
              <div class="stat-label">Possibilities</div>
            </div>
          </div>
        </div>

        <!-- Team Section -->
        <div class="team-section">
          <h2>Our Values</h2>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">🎨</div>
              <h3>Creativity First</h3>
              <p>
                We believe in empowering creativity and making beautiful design accessible to
                everyone.
              </p>
            </div>
            <div class="value-card">
              <div class="value-icon">🚀</div>
              <h3>Simplicity</h3>
              <p>
                Our tools are designed to be intuitive and easy to use, without sacrificing
                functionality.
              </p>
            </div>
            <div class="value-card">
              <div class="value-icon">🌍</div>
              <h3>Accessibility</h3>
              <p>We ensure our platform works for everyone, across all devices and platforms.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">💝</div>
              <h3>Community</h3>
              <p>We're building a community of creators who love to make their content sparkle.</p>
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
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped>
@import '@/styles/hero.css';

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.about-page {
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

/* About Section */
.about-section {
  padding: 0 0 4rem 0;
  min-height: auto;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
  margin-bottom: 4rem;
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.about-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem;
  border-radius: 20px;
  margin-bottom: 4rem;
  color: white;
}

.stats-section h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Team Section */
.team-section {
  background: #f8f9ff;
  padding: 3rem;
  border-radius: 20px;
}

.team-section h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.value-card h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.value-card p {
  color: #666;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  /* Section adjustments */
  .about-section {
    padding: 1rem 0 2rem 0;
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

  /* About content layout */
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .about-card {
    padding: 1.5rem;
  }

  .about-card h3 {
    font-size: 1.2rem;
    line-height: 1.2;
  }

  .about-card p {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .feature-list li {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  /* Feature highlights */
  .feature-highlight {
    padding: 1.5rem;
  }

  .feature-icon-large {
    font-size: 2rem;
  }

  /* Stats section */
  .stats-section {
    padding: 2rem;
    margin-bottom: 3rem;
  }

  .stats-section h2 {
    font-size: 1.5rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-label {
    font-size: 1rem;
  }

  /* Team section */
  .team-section {
    padding: 2rem;
  }

  .team-section h2 {
    font-size: 1.5rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .value-card {
    padding: 1.5rem;
  }

  .value-icon {
    font-size: 2rem;
  }

  .value-card h3 {
    font-size: 1.1rem;
  }

  .value-card p {
    font-size: 0.9rem;
  }
}

@media (max-width: 600px) {
  .about-content {
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .values-grid {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  /* Section adjustments */
  .about-section {
    padding: 0.5rem 0 1.5rem 0;
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

  /* About content */
  .about-content {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .about-card {
    padding: 1rem;
  }

  .about-card h3 {
    font-size: 1rem;
    line-height: 1.3;
  }

  .about-card p {
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .feature-list li {
    font-size: 0.8rem;
    line-height: 1.5;
    padding: 0.3rem 0;
  }

  /* Feature highlights */
  .feature-highlight {
    padding: 1.25rem;
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

  /* Stats section */
  .stats-section {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .stats-section h2 {
    font-size: 1.3rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-card {
    padding: 1rem;
  }

  .stat-number {
    font-size: 1.8rem;
  }

  .stat-label {
    font-size: 0.9rem;
  }

  /* Team section */
  .team-section {
    padding: 1.5rem;
  }

  .team-section h2 {
    font-size: 1.3rem;
  }

  .value-card {
    padding: 1.25rem;
  }

  .value-icon {
    font-size: 1.8rem;
  }

  .value-card h3 {
    font-size: 1rem;
    line-height: 1.3;
  }

  .value-card p {
    font-size: 0.8rem;
    line-height: 1.5;
  }
}
</style>
