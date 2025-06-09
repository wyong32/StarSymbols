<template>
  <div class="generator-card">
    <div class="generator-form">
      <div class="form-group">
        <!-- Star Picker Panel - Always Visible -->
        <div class="star-picker-panel">
          <div class="star-picker-header">
            <h3>Click any star to insert it at cursor position</h3>
          </div>

          <div class="star-categories-list">
            <div v-for="category in starCategories" :key="category.id" class="star-category-row">
              <div class="category-label">{{ category.name }}:</div>
              <div class="star-symbols-row">
                <button
                  v-for="(star, index) in category.symbols"
                  :key="index"
                  class="star-picker-item"
                  v-copy-allowed
                  @click="insertStarIntoText(star)"
                  :title="`Click to add ${star} to your text`"
                >
                  {{ star }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <label for="input-text" class="sr-only">Enter your text to decorate with stars</label>
        <textarea
          id="input-text"
          ref="textareaRef"
          v-model="inputText"
          v-copy-allowed
          placeholder="Enter your text here... Click 'Add Stars to Text' above to insert stars anywhere!"
          rows="4"
        ></textarea>
      </div>

      <div class="form-group">
        <div class="style-selector-container">
          <div class="style-selector-left">
            <label for="style-selector" class="sub-label">Star Style</label>
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
            <label class="sub-label">Preview</label>
            <div class="style-preview">
              <div class="preview-text">
                {{ starStyles[selectedStyle].prefix }} Your Text
                {{ starStyles[selectedStyle].suffix }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="generate-button" @click="generateStarText">Generate Star Text ✨</button>

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
import { starSymbolsData } from '@/data/starSymbols.js'

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

// Star styles for text generator
const starStyles = {
  plain: { prefix: '', suffix: '', separator: ' ' },
  classic: { prefix: '★', suffix: '★', separator: ' ✦ ' },
  sparkle: { prefix: '✨', suffix: '✨', separator: ' ⭐ ' },
  decorative: { prefix: '✧･ﾟ: *', suffix: '*:･ﾟ✧', separator: ' ✩ ' },
  elegant: { prefix: '⋆｡‧˚ʚ', suffix: 'ɞ˚‧｡⋆', separator: ' ★ ' },
  cosmic: { prefix: '🌟', suffix: '🌟', separator: ' 💫 ' },
}

// Computed properties - organize symbols by category
const starCategories = computed(() => {
  const categories = [
    {
      id: 'classic',
      name: 'Classic',
      symbols: starSymbolsData
        .filter((item) => item.tab === 'classic' && item.showEdit)
        .map((item) => item.symbol),
    },
    {
      id: 'solid',
      name: 'Solid',
      symbols: starSymbolsData
        .filter((item) => item.tab === 'solid' && item.showEdit)
        .map((item) => item.symbol),
    },
    {
      id: 'outline',
      name: 'Outline',
      symbols: starSymbolsData
        .filter((item) => item.tab === 'outline' && item.showEdit)
        .map((item) => item.symbol),
    },
    {
      id: 'special',
      name: 'Special',
      symbols: starSymbolsData
        .filter((item) => item.tab === 'special' && item.showEdit)
        .map((item) => item.symbol),
    },
  ]

  // Only return categories that have symbols
  return categories.filter((category) => category.symbols.length > 0)
})

// Methods
const generateStarText = () => {
  if (!inputText.value.trim()) {
    props.showToast('Please enter some text to generate')
    generatedText.value = '' // Clear generated text when input is empty
    return
  }

  const style = starStyles[selectedStyle.value]
  const words = inputText.value.trim().split(' ')
  const decoratedText = words.join(style.separator)

  // For plain text style, don't add extra spaces if prefix/suffix are empty
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
/* Screen reader only class for accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.generator-card {
  background: white;
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.generator-card h3 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #333;
}

.generator-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-group textarea,
.form-group select {
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 0.8rem;
  transition: border-color 0.3s ease;
}

.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

/* Style Selector Container - Left/Right Layout */
.style-selector-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

.style-selector-left {
  display: flex;
  flex-direction: column;
}

.style-selector-right {
  display: flex;
  flex-direction: column;
}

.sub-label {
  margin-bottom: 0.5rem;
  display: block;
}

.style-preview {
  padding: 0.5rem 1rem;
  background: #f8f9ff;
  border-radius: 8px;
  height: fit-content;
}

.preview-text {
  font-size: 0.8rem;
  color: #333;
  font-weight: 500;
  line-height: 1.3;
}

.generate-button {
  padding: 0.5rem 2rem;
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

/* Star Picker Styles */

.star-picker-panel {
  background: #f8f9ff;
  border: 2px solid #e0e7ff;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.star-picker-header {
  margin-bottom: 1rem;
}

.star-picker-header h3 {
  font-size: 1rem;
  color: #4c51bf;
  margin-bottom: 1rem;
  text-align: center;
}

.star-categories-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.star-category-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.category-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4c51bf;
  min-width: 60px;
  padding-top: 0.5rem;
  flex-shrink: 0;
}

.star-symbols-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}

.star-picker-item {
  width: 35px;
  height: 35px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.star-picker-item:hover {
  border-color: #667eea;
  background: #f0f4ff;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .text-generator {
    padding: 1.5rem;
  }

  .generator-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .generator-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .style-selector-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .generate-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  .result-textarea {
    min-height: 120px;
    font-size: 0.9rem;
  }

  .copy-button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .star-picker-panel {
    padding: 0.8rem;
  }

  .star-symbols-row {
    gap: 0.4rem;
  }
}

@media (max-width: 480px) {
  .text-generator {
    padding: 1rem;
  }

  .generator-card {
    padding: 1.5rem;
  }

  .generator-title {
    font-size: 1.5rem;
  }

  .generator-description {
    font-size: 0.9rem;
  }

  .form-group textarea,
  .form-group select {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .generate-button {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }

  .result-textarea {
    min-height: 100px;
    font-size: 0.85rem;
  }

  .copy-button {
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
  }

  .preview-text {
    font-size: 0.9rem;
  }

  .star-category-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .category-label {
    min-width: auto;
    padding-top: 0;
    font-size: 0.85rem;
  }

  .star-picker-item {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }

  .toggle-stars-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
