<template>
  <div class="blog-detail-page">
    <!-- Header -->
    <AppHeader />

    <!-- Blog Detail Content -->
    <main class="blog-detail-main">
      <div class="container">
        <div v-if="post" class="blog-detail">
          <!-- Blog Header -->
          <header class="blog-header">
            <img :src="post.image" :alt="post.title" class="blog-featured-image" />
            <div class="blog-meta">
              <h1 class="blog-title">{{ post.title }}</h1>
              <time :datetime="formatDatetime(post.date)" class="blog-date">{{ post.date }}</time>
              <p class="blog-excerpt">{{ post.excerpt }}</p>
            </div>
          </header>

          <!-- Blog Content -->
          <div class="blog-content" v-html="post.content"></div>

          <!-- Navigation -->
          <nav class="blog-navigation">
            <router-link to="/blog" class="back-to-blog"> ← Back to Blog </router-link>
          </nav>
        </div>

        <!-- Not Found -->
        <div v-else class="blog-not-found">
          <h1>Blog Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <router-link to="/blog" class="back-to-blog"> ← Back to Blog </router-link>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { getBlogPostById } from '@/data/blogPosts.js'

// Route and reactive data
const route = useRoute()
const post = ref(null)

// Methods
const formatDatetime = (dateString) => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

// Load blog post on mount
onMounted(() => {
  const postId = parseInt(route.params.id)
  post.value = getBlogPostById(postId)

  // Update page title for SEO
  if (post.value) {
    document.title = `${post.value.title} | StarCopy Blog`

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', post.value.excerpt)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = post.value.excerpt
      document.head.appendChild(meta)
    }
  }
})
</script>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.blog-detail-page {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Main Content */
.blog-detail-main {
  padding: 6rem 0 4rem;
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Blog Detail */
.blog-detail {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Blog Header */
.blog-header {
  position: relative;
}

.blog-featured-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.blog-meta {
  padding: 2rem;
  background: white;
}

.blog-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.blog-date {
  display: inline-block;
  color: #667eea;
  font-weight: 500;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: #f0f4ff;
  border-radius: 20px;
  font-size: 0.9rem;
}

.blog-excerpt {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  font-style: italic;
}

/* Blog Content */
.blog-content {
  padding: 0 2rem 2rem;
}

/* Content Styling for v-html */
.blog-content :deep(article) {
  max-width: none;
}

.blog-content :deep(h1) {
  font-size: 2rem;
  margin: 2rem 0 1rem;
  color: #333;
}

.blog-content :deep(h2) {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.blog-content :deep(h3) {
  font-size: 1.2rem;
  margin: 1.5rem 0 0.5rem;
  color: #555;
}

.blog-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.7;
  color: #444;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.blog-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.blog-content :deep(strong) {
  color: #333;
  font-weight: 600;
}

.blog-content :deep(code) {
  background: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.blog-content :deep(pre) {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

.blog-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.blog-content :deep(th),
.blog-content :deep(td) {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.blog-content :deep(th) {
  background: #f8f9ff;
  font-weight: 600;
  color: #333;
}

.blog-content :deep(.example) {
  background: #f8f9ff;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  border-left: 4px solid #667eea;
}

/* Navigation */
.blog-navigation {
  padding: 2rem;
  border-top: 1px solid #eee;
  background: #f8f9ff;
}

.back-to-blog {
  display: inline-flex;
  align-items: center;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  background: white;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
}

.back-to-blog:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* Not Found */
.blog-not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.blog-not-found h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.blog-not-found p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-detail-main {
    padding: 5rem 0 3rem;
  }

  .container {
    padding: 0 1rem;
  }

  .blog-title {
    font-size: 2rem;
  }

  .blog-meta {
    padding: 1.5rem;
  }

  .blog-content {
    padding: 0 1.5rem 1.5rem;
  }

  .blog-navigation {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .blog-title {
    font-size: 1.5rem;
  }

  .blog-featured-image {
    height: 200px;
  }

  .blog-meta {
    padding: 1rem;
  }

  .blog-content {
    padding: 0 1rem 1rem;
  }

  .blog-navigation {
    padding: 1rem;
  }
}
</style>
