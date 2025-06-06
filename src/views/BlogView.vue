<template>
  <div class="blog-page hero-variant-blog">
    <!-- Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Star Blog</h1>
        <div class="hero-stars">
          <span class="hero-star" style="--delay: 0s">📝</span>
          <span class="hero-star" style="--delay: 0.3s">⭐</span>
          <span class="hero-star" style="--delay: 0.6s">✨</span>
          <span class="hero-star" style="--delay: 0.9s">💡</span>
          <span class="hero-star" style="--delay: 1.2s">🌟</span>
          <span class="hero-star" style="--delay: 1.5s">📚</span>
        </div>
        <p class="hero-description">
          Discover the latest articles, tips, and insights about star symbols, creative design, and
          how to make your content sparkle with our comprehensive guides.
        </p>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="blog-section">
      <div class="section-container">
        <BlogGrid />
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import BlogGrid from '@/components/BlogGrid.vue'
</script>

<style scoped>
@import '@/styles/hero.css';

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.blog-page {
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

/* Blog Section */
.blog-section {
  padding: 0 0 4rem 0;
}

/* Categories Section */
.categories-section {
  margin-top: 4rem;
  background: #f8f9ff;
  padding: 3rem;
  border-radius: 20px;
}

.categories-section h3 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.category-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.category-card h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.category-card p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Newsletter Section */
.newsletter-section {
  margin-top: 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  color: white;
}

.newsletter-content h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.newsletter-content p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.newsletter-form {
  display: flex;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto 1rem;
}

.newsletter-form input {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
}

.newsletter-form input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}

.newsletter-form button {
  padding: 1rem 1.5rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.newsletter-form button:hover {
  transform: translateY(-2px);
}

.newsletter-note {
  font-size: 0.9rem;
  opacity: 0.7;
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

  .blog-section {
    padding: 0 0 3rem 0;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .category-card {
    padding: 1.5rem;
  }

  .category-icon {
    font-size: 2rem;
  }

  .newsletter-section {
    margin-top: 3rem;
    padding: 2rem;
  }

  .newsletter-content h3 {
    font-size: 1.8rem;
  }

  .newsletter-form {
    flex-direction: column;
    gap: 0.8rem;
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

  .blog-section {
    padding: 0 0 2rem 0;
  }

  .categories-section {
    margin-top: 2rem;
    padding: 1.5rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .category-card {
    padding: 1.25rem;
  }

  .category-card h4 {
    font-size: 1.1rem;
  }

  .category-card p {
    font-size: 0.85rem;
  }

  .newsletter-section {
    margin-top: 2rem;
    padding: 1.5rem;
  }

  .newsletter-content h3 {
    font-size: 1.5rem;
  }

  .newsletter-content p {
    font-size: 1rem;
  }

  .newsletter-form input,
  .newsletter-form button {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
