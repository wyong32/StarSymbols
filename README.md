# Star-Copy-And-Paste

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 🗺️ 自动化站点地图系统

本项目集成了完全自动化的站点地图生成系统：

### 特性

- ✅ **自动页面发现**: 从路由配置自动提取所有页面
- ✅ **动态内容集成**: 自动包含所有博客文章
- ✅ **构建时生成**: 每次构建自动更新站点地图
- ✅ **SEO优化**: 完整的SEO元数据支持
- ✅ **Robots.txt**: 自动生成配套robots.txt

### 工作原理

1. **开发阶段**: 无需手动操作
2. **构建阶段**: 运行 `npm run build` 时自动生成
3. **输出文件**: `dist/sitemap.xml` 和 `dist/robots.txt`

### 添加新内容

- **新页面**: 在 `src/utils/sitemapConfig.js` 中添加配置
- **博客文章**: 在 `src/data/blogPosts.js` 中添加，自动包含

详细文档请参考: [docs/SITEMAP.md](docs/SITEMAP.md)

## 📝 SEO友好的博客URL

项目采用SEO友好的博客URL结构：

### URL格式

- **之前**: `/blog/1`, `/blog/2`
- **现在**: `/blog/ultimate-guide-star-symbols`, `/blog/creating-aesthetic-text-with-stars`

### 特性

- ✅ **SEO优化**: URL包含关键词，提升搜索排名
- ✅ **用户友好**: 从URL即可了解页面内容
- ✅ **自动生成**: 站点地图自动包含新的URL结构

详细说明请参考: [docs/BLOG_URL_STRUCTURE.md](docs/BLOG_URL_STRUCTURE.md)

## 🔍 SEO关键词优化

项目首页已进行专业的关键词密度优化：

### 目标关键词

- **主关键词**: "star symbols"
- **品牌关键词**: "Star Copy And Paste"
- **目标密度**: 5%左右

### 优化效果

- ✅ **关键词覆盖**: 全页面关键词自然分布
- ✅ **密度达标**: 主要关键词密度达到SEO最佳实践
- ✅ **内容质量**: 保持自然流畅的用户体验
- ✅ **品牌强化**: 品牌名称在关键位置充分展示

详细优化报告请参考: [docs/KEYWORD_DENSITY_OPTIMIZATION.md](docs/KEYWORD_DENSITY_OPTIMIZATION.md)

## 🚀 完整SEO优化

项目已完成全面的SEO优化，包括技术SEO、内容SEO和社交媒体SEO：

### 技术SEO

- ✅ **结构化数据**: JSON-LD格式的Schema.org标记
- ✅ **Meta标签**: 完整的TDK优化和动态更新
- ✅ **站点地图**: 自动生成XML站点地图
- ✅ **Robots.txt**: 搜索引擎爬虫指导文件
- ✅ **Canonical链接**: 防止重复内容问题

### 内容SEO

- ✅ **关键词优化**: 目标关键词密度达到5%+
- ✅ **SEO友好URL**: 描述性URL结构
- ✅ **内容质量**: 高质量、相关性强的内容

### 社交媒体SEO

- ✅ **Open Graph**: Facebook/LinkedIn分享优化
- ✅ **Twitter Cards**: Twitter分享卡片优化
- ✅ **自定义图片**: 专业的社交分享图片

### 性能优化

- ✅ **预连接**: 外部资源预连接优化
- ✅ **移动端**: PWA和移动端友好配置
- ✅ **加载优化**: 资源加载性能优化

### SEO工具

- `scripts/seo-audit.js` - 完整的SEO审计工具
- `scripts/simple-keyword-check.js` - 关键词密度检查

完整SEO报告请参考: [docs/SEO_OPTIMIZATION_COMPLETE.md](docs/SEO_OPTIMIZATION_COMPLETE.md)

## 🎨 公用Hero样式系统

项目提供了统一的Hero区域样式系统，确保所有页面的视觉一致性：

### 特性

- ✅ **统一设计**: 参照首页样式的一致性设计
- ✅ **多种变体**: 支持不同页面的背景渐变
- ✅ **响应式**: 完美适配桌面端、平板和移动设备
- ✅ **组件化**: 模块化的样式组件，易于使用
- ✅ **动画效果**: 内置浮动和颜色波浪动画

### 使用方法

```vue
<template>
  <section class="hero hero-variant-stars">
    <div class="hero-content">
      <h1 class="hero-title">页面标题</h1>
      <p class="hero-description">页面描述</p>
      <div class="hero-stars">
        <span class="hero-star" style="--delay: 0s">⭐</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import '@/styles/hero.css';
</style>
```

### 可用变体

- `hero-variant-stars` - 星号符号页面
- `hero-variant-generator` - 文本生成器页面
- `hero-variant-blog` - 博客页面
- `hero-variant-about` - 关于页面
- `hero-variant-image` - 图像转换页面
- `hero-dark` - 深色变体

详细使用指南请参考: [docs/HERO_STYLES_GUIDE.md](docs/HERO_STYLES_GUIDE.md)
