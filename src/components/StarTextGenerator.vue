<template>
  <div class="star-text-generator">
    <div class="generator-form">
      <!-- Star Picker Section with Tabs -->
      <div class="star-picker-section">
        <div class="star-picker-header">
          <h3>Choose Stars to Insert</h3>
          <p>Click any star to insert it at cursor position</p>
        </div>

        <!-- Category Tabs -->
        <div class="category-tabs">
          <button
            v-for="category in categories"
            :key="category.id"
            class="category-tab"
            :class="{ active: activeCategory === category.id }"
            @click="setActiveCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- Star Symbols Grid -->
        <div class="star-symbols-grid">
          <button
            v-for="symbol in currentCategorySymbols"
            :key="symbol.id"
            class="star-symbol-btn"
            v-copy-allowed
            @click="insertStarIntoText(symbol.symbol)"
            :title="`${symbol.name} - Click to add ${symbol.symbol} to your text`"
          >
            {{ symbol.symbol }}
          </button>
        </div>
      </div>

      <!-- Text Input -->
      <div class="form-group">
        <label for="input-text">Your Text</label>
        <textarea
          id="input-text"
          ref="textareaRef"
          v-model="inputText"
          v-copy-allowed
          placeholder="Enter your text here... Click stars above to insert them anywhere!"
          rows="4"
        ></textarea>
      </div>

      <!-- Style Selector -->
      <div class="form-group">
        <div class="style-selector-container">
          <div class="style-selector-left">
            <label for="style-selector">Text Style</label>
            <select id="style-selector" v-model="selectedStyle">
              <option value="plain">Plain Text</option>
              <option value="classic">★ Classic ★</option>
              <option value="sparkle">✨ Sparkle ✨</option>
              <option value="decorative">✧ Decorative ✧</option>
              <option value="elegant">⋆ Elegant ⋆</option>
              <option value="cosmic">🌟 Cosmic 🌟</option>
            </select>
          </div>
          <div class="style-selector-right">
            <label>Preview</label>
            <div class="style-preview">
              <div class="preview-text">
                {{ starStyles[selectedStyle].prefix }} Your Text
                {{ starStyles[selectedStyle].suffix }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Generate Button -->
      <button class="generate-button" @click="generateStarText">Generate Star Text ✨</button>

      <!-- Result -->
      <div class="result-group">
        <label for="generated-text">Generated Text</label>
        <div class="result-container">
          <textarea
            id="generated-text"
            v-model="generatedText"
            v-copy-allowed
            readonly
            rows="4"
          ></textarea>
          <button
            v-if="inputText.trim() && generatedText"
            class="copy-button"
            v-copy-allowed
            @click="copyGeneratedText"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { generatorSymbolsData } from '@/data/generatorSymbols.js'

// Props
const props = defineProps({
  showToast: {
    type: Function,
    required: true,
  },
})

// Reactive data
const inputText = ref('')
const selectedStyle = ref('plain')
const generatedText = ref('')
const textareaRef = ref(null)
const activeCategory = ref('star')

// Category definitions
const categories = [
  {
    id: 'star',
    name: 'Stars Symbols',
    description: 'Star symbols',
  },
  {
    id: 'heart',
    name: 'Hearts Symbols',
    description: 'Heart symbols',
  },
  {
    id: 'arrow',
    name: 'Arrows Symbols',
    description: 'Arrow symbols',
  },

  {
    id: 'sun',
    name: 'Sun Symbols',
    description: 'Sun symbols',
  },
  {
    id: 'moon',
    name: 'Moon Symbols',
    description: 'Moon symbols',
  },
  {
    id: 'smiley',
    name: 'Smiley Symbols',
    description: 'Smiley symbols',
  },
  {
    id: 'hand',
    name: 'Hands Symbols',
    description: 'Hand symbols',
  },
  {
    id: 'triangle',
    name: 'Triangle Symbols',
    description: 'Triangle symbols',
  },
  {
    id: 'circle',
    name: 'Circle Symbols',
    description: 'Circle symbols',
  },
  {
    id: 'square',
    name: 'Square Symbols',
    description: 'Square symbols',
  },
  {
    id: 'rectangle',
    name: 'Rectangle Symbols',
    description: 'Rectangle  symbols',
  },
  {
    id: 'math',
    name: 'Math Symbols',
    description: 'Math symbols',
  },
  {
    id: 'athena',
    name: 'Athena Symbols',
    description: 'Athena symbols',
  },
  {
    id: 'fruit',
    name: 'Fruit Symbols',
    description: 'Fruit  symbols',
  },
  {
    id: 'religious-and-symbols',
    name: 'Religious and Symbols',
    description: 'Religious and symbols',
  },
  {
    id: 'hanging-star',
    name: 'Hanging star Symbol',
    description: 'Hanging star symbol',
  },
]

// Star styles for text generator
const starStyles = {
  plain: { prefix: '', suffix: '', separator: ' ' },
  classic: { prefix: '★', suffix: '★', separator: ' ✦ ' },
  sparkle: { prefix: '✨', suffix: '✨', separator: ' ⭐ ' },
  decorative: { prefix: '✧･ﾟ: *', suffix: '*:･ﾟ✧', separator: ' ✩ ' },
  elegant: { prefix: '⋆｡‧˚ʚ', suffix: 'ɞ˚‧｡⋆', separator: ' ★ ' },
  cosmic: { prefix: '🌟', suffix: '🌟', separator: ' 💫 ' },
}

// Computed properties
const currentCategorySymbols = computed(() => {
  return generatorSymbolsData.filter((symbol) => symbol.category.includes(activeCategory.value))
})

// Methods
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

const generateStarText = () => {
  if (!inputText.value.trim()) {
    props.showToast('Please enter some text to generate')
    generatedText.value = ''
    return
  }

  const style = starStyles[selectedStyle.value]
  const words = inputText.value.trim().split(' ')
  const decoratedText = words.join(style.separator)

  if (selectedStyle.value === 'plain') {
    generatedText.value = decoratedText
  } else {
    generatedText.value = `${style.prefix} ${decoratedText} ${style.suffix}`
  }
}

const copyGeneratedText = async () => {
  if (!generatedText.value.trim()) {
    props.showToast('Please enter some text first')
    return
  }

  try {
    await navigator.clipboard.writeText(generatedText.value)
    props.showToast('Generated text copied to clipboard!')
  } catch (err) {
    console.error('Copy failed: ', err)
    props.showToast('Copy failed, please try again')
  }
}

const insertStarIntoText = (star) => {
  const textarea = textareaRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = inputText.value

  inputText.value = text.substring(0, start) + star + text.substring(end)

  // Set cursor position after the inserted star
  setTimeout(() => {
    textarea.focus()
    textarea.setSelectionRange(start + star.length, start + star.length)
  }, 0)
}
</script>

<style scoped>
.star-text-generator {
  margin: 0 auto;
}

.generator-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Star Picker Section */
.star-picker-section {
  background: #f8f9ff;
  border: 2px solid #e0e7ff;
  border-radius: 12px;
  padding: 1.5rem;
}

.star-picker-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.star-picker-header h3 {
  font-size: 1.2rem;
  color: #4c51bf;
  margin-bottom: 0.5rem;
}

.star-picker-header p {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

/* Category Tabs */
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.category-tab {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6b7280;
}

.category-tab:hover {
  border-color: #667eea;
  color: #667eea;
}

.category-tab.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

/* Star Symbols Grid */
.star-symbols-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.5rem;
  max-height: 250px;
  overflow-y: auto;
  overflow-x: auto;
  padding: 0.5rem;
  background: white;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
}

.star-symbol-btn {
  width: max-content;
  min-width: 45px;
  max-width: none;
  height: 45px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  white-space: nowrap;
  flex-shrink: 0;
  overflow: visible;
  text-overflow: clip;
}

.star-symbol-btn:hover {
  border-color: #667eea;
  background: #f0f4ff;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

/* Form Groups */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.form-group textarea,
.form-group select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

/* Style Selector */
.style-selector-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

.style-selector-left,
.style-selector-right {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.style-preview {
  padding: 0.75rem;
  background: #f8f9ff;
  border-radius: 8px;
  min-height: 45px;
  display: flex;
  align-items: center;
}

.preview-text {
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
}

/* Generate Button */
.generate-button {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
  align-self: center;
}

.generate-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Result */
.result-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-container {
  position: relative;
}

.result-container textarea {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: #f8f9ff;
  width: 100%;
  resize: vertical;
}

.copy-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.copy-button:hover {
  background: #5a67d8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .star-picker-section {
    padding: 1rem;
  }

  .star-picker-header h3 {
    font-size: 1.1rem;
  }

  .star-picker-header p {
    font-size: 0.85rem;
  }

  .category-tabs {
    gap: 0.3rem;
  }

  .category-tab {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }

  .star-symbols-grid {
    gap: 0.4rem;
    max-height: 150px;
  }

  .star-symbol-btn {
    min-width: 40px;
    height: 40px;
    font-size: 1.1rem;
    padding: 0 0.4rem;
  }

  .style-selector-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .generate-button {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  }

  .form-group textarea,
  .form-group select {
    padding: 0.6rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .star-picker-section {
    padding: 0.8rem;
  }

  .star-picker-header h3 {
    font-size: 1rem;
  }

  .star-picker-header p {
    font-size: 0.8rem;
  }

  .category-tabs {
    gap: 0.25rem;
  }

  .category-tab {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }

  .star-symbols-grid {
    gap: 0.3rem;
    max-height: 120px;
  }

  .star-symbol-btn {
    min-width: 35px;
    height: 35px;
    font-size: 1rem;
    padding: 0 0.3rem;
  }

  .generate-button {
    padding: 0.5rem 1.2rem;
    font-size: 0.9rem;
  }

  .form-group textarea,
  .form-group select {
    padding: 0.5rem;
    font-size: 0.8rem;
  }

  .form-group label {
    font-size: 0.85rem;
  }

  .copy-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }

  .preview-text {
    font-size: 0.85rem;
  }
}
</style>
