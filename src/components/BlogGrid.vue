<template>
  <div class="blog-grid">
    <article v-for="(post, index) in blogPosts" :key="index" class="blog-item">
      <div class="blog-image">
        <img :src="post.image" :alt="post.title" />
      </div>
      <div class="blog-content">
        <div class="blog-date">{{ post.date }}</div>
        <h3 class="blog-title">{{ post.title }}</h3>
        <p class="blog-excerpt">{{ post.excerpt }}</p>
        <router-link :to="`/blog/${post.pagename}`" class="blog-read-more">Read More →</router-link>
      </div>
    </article>
  </div>
</template>

<script setup>
import { getLatestBlogPosts } from '@/data/blogPosts.js'

// Blog posts data
const blogPosts = getLatestBlogPosts(8)
</script>

<style scoped>
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.blog-item {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.blog-image {
  position: relative;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-item:hover .blog-image img {
  transform: scale(1.05);
}

.blog-content {
  padding: 1.5rem;
}

.blog-date {
  font-size: 0.85rem;
  color: #667eea;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.blog-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.blog-item:hover .blog-title {
  color: #667eea;
}

.blog-excerpt {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-read-more {
  display: inline-flex;
  align-items: center;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.blog-read-more:hover {
  color: #5a67d8;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .blog-image img {
    height: 180px;
  }

  .blog-content {
    padding: 1.25rem;
  }

  .blog-title {
    font-size: 1.1rem;
  }

  .blog-excerpt {
    font-size: 0.9rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
}

@media (max-width: 480px) {
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .blog-image img {
    height: 160px;
  }

  .blog-content {
    padding: 1rem;
  }

  .blog-date {
    font-size: 0.8rem;
  }

  .blog-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .blog-excerpt {
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }

  .blog-read-more {
    font-size: 0.85rem;
  }
}
</style>
