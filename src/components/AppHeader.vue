<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <span class="star-icon">⭐</span>
        <div class="logo-text">StarSymbols</div>
      </div>
      <nav class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/stars">All Stars</router-link>
        <router-link to="/generator">Text Generator</router-link>
        <router-link to="/image-to-stars">Image to Stars</router-link>
        <router-link to="/blog">Blog</router-link>
        <router-link to="/about">About Us</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Header Styles */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.star-icon {
  font-size: 2rem;
  animation: twinkle 2s ease-in-out infinite alternate;
}

.logo .logo-text {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
  position: relative;
}

.nav a:hover {
  color: #667eea;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .header {
    padding: 0.75rem 0;
  }

  .header-container {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }

  .logo .logo-text {
    font-size: 1.3rem;
  }

  .star-icon {
    font-size: 1.3rem;
  }

  .nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .nav a {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 0.75rem;
  }

  .logo .logo-text {
    font-size: 1.1rem;
  }

  .nav {
    gap: 0.25rem;
  }

  .nav a {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
}

.nav a.router-link-active {
  color: #667eea;
  font-weight: 600;
}

.nav a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1px;
}

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
  .nav {
    display: none;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 1rem;
  }
}
</style>
