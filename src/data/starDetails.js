// Star symbols with detailed information for detail pages
export const starDetailsData = [
  // Classic Stars Category
  {
    id: 1,
    symbol: '★',
    name: 'Black Star',
    category: 'Classic',
    categorySlug: 'classic',
    slug: 'black-star',
    unicode: 'U+2605',
    tags: ['classic', 'filled', 'rating', 'popular'],
    seo: {
      title: '★ Black Star Symbol - Copy & Paste Unicode Star | StarCopy',
      description:
        'Copy the classic black star symbol ★ (U+2605). Perfect for ratings, emphasis, and decorative text. Free Unicode star symbol with one-click copy.',
      keywords:
        'black star symbol, filled star, unicode star, star rating, classic star, copy star symbol',
    },
    about: [
      'The black star (★) is one of the most recognizable and widely used star symbols in digital communication. This filled star represents excellence, quality, and importance across various contexts.',
      'Originally derived from astronomical symbols, the black star has evolved into a universal icon for rating systems, highlighting important information, and adding visual appeal to text content.',
    ],
    technicalInfo: {
      unicode: 'U+2605',
      htmlEntity: '&#9733;',
      cssContent: '"\\2605"',
      category: 'Symbol, Other',
      block: 'Miscellaneous Symbols',
    },
  },

  {
    id: 2,
    symbol: '☆',
    name: 'White Star',
    category: 'Classic',
    categorySlug: 'classic',
    slug: 'white-star',
    unicode: 'U+2606',
    tags: ['classic', 'outline', 'rating', 'decorative'],
    seo: {
      title: '☆ White Star Symbol - Copy & Paste Unicode Outline Star | StarCopy',
      description:
        'Copy the classic white star symbol ☆ (U+2606). Perfect for unfilled ratings, decorative text, and outline designs. Free Unicode star symbol.',
      keywords:
        'white star symbol, outline star, unicode star, empty star, classic star, copy star symbol',
    },
    about: [
      'The white star (☆) is the outline counterpart to the black star, featuring a hollow center with a defined border. This symbol is essential for creating rating systems, decorative text, and visual hierarchies.',
      'Commonly used to represent unfilled or partial ratings, the white star provides a clean, minimalist aesthetic that works well in both professional and casual contexts.',
    ],
    technicalInfo: {
      unicode: 'U+2606',
      htmlEntity: '&#9734;',
      cssContent: '"\\2606"',
      category: 'Symbol, Other',
      block: 'Miscellaneous Symbols',
    },
  },

  // Solid Stars Category
  {
    id: 3,
    symbol: '⭐',
    name: 'Medium White Star',
    category: 'Solid',
    categorySlug: 'solid',
    slug: 'medium-white-star',
    unicode: 'U+2B50',
    tags: ['emoji', 'modern', 'social', 'popular'],
    seo: {
      title: '⭐ Medium White Star Emoji - Copy & Paste Star Symbol | StarCopy',
      description:
        'Copy the medium white star emoji ⭐ (U+2B50). Perfect for social media, modern designs, and emoji-style content. Free Unicode star symbol.',
      keywords:
        'medium white star, star emoji, unicode star, social media star, modern star, copy star emoji',
    },
    about: [
      'The medium white star (⭐) is one of the most popular emoji-style star symbols, featuring a bright, filled appearance that stands out in digital content. Despite its name, this star typically displays as a golden or yellow color in most emoji implementations.',
      'This symbol bridges the gap between traditional Unicode symbols and modern emoji, making it perfect for contemporary digital communication across all platforms.',
    ],
    technicalInfo: {
      unicode: 'U+2B50',
      htmlEntity: '&#11088;',
      cssContent: '"\\2B50"',
      category: 'Symbol, Other',
      block: 'Miscellaneous Symbols and Arrows',
    },
  },

  // Special Stars Category
  {
    id: 4,
    symbol: '✨',
    name: 'Sparkles',
    category: 'Special',
    categorySlug: 'special',
    slug: 'sparkles',
    unicode: 'U+2728',
    tags: ['sparkles', 'magic', 'glamour', 'excitement'],
    seo: {
      title: '✨ Sparkles Emoji - Copy & Paste Magic Star Symbol | StarCopy',
      description:
        'Copy the sparkles emoji ✨ (U+2728). Perfect for adding magic, glamour, and excitement to your text. Free Unicode sparkles symbol.',
      keywords:
        'sparkles emoji, magic stars, glitter symbol, excitement emoji, glamour symbol, copy sparkles',
    },
    about: [
      'The sparkles symbol (✨) represents magic, excitement, and glamour in digital communication. This versatile emoji conveys a sense of wonder, achievement, and special moments that deserve celebration.',
      'Originally representing literal sparkles or glitter, this symbol has evolved to become one of the most expressive ways to add emotional emphasis to text, particularly in contexts involving success, beauty, or magical moments.',
    ],
    technicalInfo: {
      unicode: 'U+2728',
      htmlEntity: '&#10024;',
      cssContent: '"\\2728"',
      category: 'Symbol, Other',
      block: 'Dingbats',
    },
  },

  // Decorative Stars Category
  {
    id: 5,
    symbol: '✦',
    name: 'Black Four Pointed Star',
    category: 'Decorative',
    categorySlug: 'decorative',
    slug: 'black-four-pointed-star',
    unicode: 'U+2726',
    tags: ['geometric', 'modern', 'minimalist', 'four-pointed'],
    seo: {
      title: '✦ Black Four Pointed Star - Copy & Paste Geometric Star | StarCopy',
      description:
        'Copy the black four pointed star ✦ (U+2726). Perfect for geometric designs, modern aesthetics, and minimalist decorations. Free Unicode star symbol.',
      keywords:
        'four pointed star, geometric star, black star, modern star, minimalist star, copy star symbol',
    },
    about: [
      'The black four pointed star (✦) offers a geometric, modern alternative to traditional five-pointed stars. Its clean, symmetrical design makes it perfect for contemporary layouts and minimalist aesthetics.',
      "This symbol represents precision, balance, and modern design principles. It's particularly popular in architectural contexts, modern branding, and geometric pattern creation.",
    ],
    technicalInfo: {
      unicode: 'U+2726',
      htmlEntity: '&#10022;',
      cssContent: '"\\2726"',
      category: 'Symbol, Other',
      block: 'Dingbats',
    },
  },
]

// Helper functions for star details data
export const getStarDetailById = (id) => {
  return starDetailsData.find((star) => star.id === id)
}

export const getStarDetailBySlug = (slug) => {
  return starDetailsData.find((star) => star.slug === slug)
}

export const getStarsByCategory = (categorySlug) => {
  return starDetailsData.filter((star) => star.categorySlug === categorySlug)
}

export const getAllCategories = () => {
  const categories = [...new Set(starDetailsData.map((star) => star.category))]
  return categories.map((category) => ({
    name: category,
    slug: category.toLowerCase(),
    count: starDetailsData.filter((star) => star.category === category).length,
  }))
}

export const getPopularStars = (limit = 5) => {
  return starDetailsData.sort((a, b) => b.usageCount - a.usageCount).slice(0, limit)
}
