<template>
  <header class="header" :style="{ '--header-height': '80px' }">
    <div class="header-container">
      <div class="logo">
        <span class="star-icon">⭐</span>
        <div class="logo-text">StarSymbols</div>
      </div>

      <!-- Desktop Navigation -->
      <nav class="nav desktop-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/all-star-symbols">All Star Symbols</router-link>
        <router-link to="/text-symbol-generator">Text Symbol Generator</router-link>
        <router-link to="/image-to-text">Image To Text</router-link>
        <router-link to="/blog">Blog</router-link>
        <router-link to="/about">About Us</router-link>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="mobile-menu-btn"
        @click="toggleMobileMenu"
        :class="{ active: isMobileMenuOpen }"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <nav class="mobile-nav" :class="{ open: isMobileMenuOpen }">
      <div class="mobile-nav-content">
        <router-link to="/" @click="closeMobileMenu">Home</router-link>
        <router-link to="/all-star-symbols" @click="closeMobileMenu">All Star Symbols</router-link>
        <router-link to="/text-symbol-generator" @click="closeMobileMenu"
          >Text Symbol Generator</router-link
        >
        <router-link to="/image-to-text" @click="closeMobileMenu">Image To Text</router-link>
        <router-link to="/blog" @click="closeMobileMenu">Blog</router-link>
        <router-link to="/about" @click="closeMobileMenu">About Us</router-link>
      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div
      class="mobile-overlay"
      :class="{ active: isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // 防止背景滚动
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// 监听窗口大小变化，大屏幕时自动关闭移动端菜单
const handleResize = () => {
  if (window.innerWidth > 768 && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// 监听ESC键关闭菜单
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('keydown', handleKeydown)
  // 清理样式
  document.body.style.overflow = ''
})
</script>

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

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  gap: 2rem;
}

.desktop-nav a {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
  position: relative;
}

.desktop-nav a:hover {
  color: #667eea;
}

.desktop-nav a.router-link-active {
  color: #667eea;
  font-weight: 600;
}

.desktop-nav a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1px;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background: #667eea;
  margin: 3px 0;
  transition: all 0.3s ease;
  border-radius: 1px;
}

.mobile-menu-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Navigation */
.mobile-nav {
  position: fixed;
  top: 0;
  right: -100%;
  width: 280px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  display: none;
}

.mobile-nav.open {
  right: 0;
}

.mobile-nav-content {
  padding: 6rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-nav-content a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  position: relative;
}

.mobile-nav-content a:hover {
  color: #667eea;
  padding-left: 1rem;
}

.mobile-nav-content a.router-link-active {
  color: #667eea;
  font-weight: 600;
}

.mobile-nav-content a.router-link-active::before {
  content: '⭐';
  position: absolute;
  left: -1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
  display: none;
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .header {
    padding: 0.75rem 0;
  }

  .header-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }

  .logo .logo-text {
    font-size: 1.3rem;
  }

  .star-icon {
    font-size: 1.3rem;
  }

  /* Hide desktop navigation */
  .desktop-nav {
    display: none;
  }

  /* Show mobile menu button */
  .mobile-menu-btn {
    display: flex;
  }

  /* Show mobile navigation */
  .mobile-nav {
    display: block;
  }

  /* Show mobile overlay */
  .mobile-overlay {
    display: block;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 0.75rem;
  }

  .logo .logo-text {
    font-size: 1.1rem;
  }

  .star-icon {
    font-size: 1.1rem;
  }

  .mobile-menu-btn {
    width: 36px;
    height: 36px;
  }

  .hamburger-line {
    width: 20px;
  }

  .mobile-nav {
    width: 100%;
    right: -100%;
  }

  .mobile-nav-content {
    padding: 5rem 1.5rem 2rem;
  }

  .mobile-nav-content a {
    font-size: 1rem;
    padding: 0.8rem 0;
  }
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
</style>
