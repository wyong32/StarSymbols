<template>
  <div class="star-text-generator">
    <div class="generator-form">
      <!-- Star Picker Section with Tabs -->
      <div class="star-picker-section">
        <div class="star-picker-header">
          <h2>Choose Symbols to Insert</h2>
          <p>Click any symbol to add it to the preselected area</p>
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
            {{ isMobile ? category.mobileName : category.name }}
          </button>
        </div>

        <!-- Star Symbols Grid -->
        <div class="star-symbols-grid">
          <button
            v-for="(star, index) in currentCategorySymbols"
            :key="index"
            class="star-symbol-btn"
            @click="addToPreview(star)"
            :title="`Click to add ${star.symbol} to preview`"
          >
            {{ star.symbol }}
          </button>
        </div>

        <!-- 新增预览区域 -->
        <div class="preview-area">
          <div class="preview-header">
            <h4>Symbol Preselection Box</h4>
            <button
              v-if="previewSymbols.length > 0"
              class="clear-preview-btn"
              @click="clearPreview"
            >
              Clear All
            </button>
          </div>
          <div class="preview-symbols" :class="{ empty: previewSymbols.length === 0 }">
            <template v-if="previewSymbols.length > 0">
              <span
                v-for="(symbol, index) in previewSymbols"
                :key="index"
                class="preview-symbol"
                @click="insertSymbolToText(symbol)"
                :title="`Click to insert ${symbol} into text`"
              >
                {{ symbol }}
              </span>
            </template>
            <span v-else class="preview-placeholder">
              Click symbols above to add them here, then click a symbol to insert it into the text
              box
            </span>
          </div>
        </div>
      </div>

      <!-- Text Input -->
      <div class="form-group">
        <label for="input-text">Your Text</label>
        <textarea
          id="input-text"
          ref="textareaRef"
          v-model="inputText"
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
              <option v-for="opt in styleOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
          <div class="style-selector-right">
            <label>Preview</label>
            <div class="style-preview">
              <div
                class="preview-text"
                :class="{
                  'preview-bold': selectedStyle === 'bold',
                  'preview-large': selectedStyle === 'large',
                  'preview-small': selectedStyle === 'small',
                  'preview-reverse': selectedStyle === 'reverse',
                }"
              >
                <template v-if="selectedStyle === 'reverse'">
                  {{
                    (styleOptions.find((opt) => opt.value === selectedStyle)?.prefix || '') +
                    [...'Your Text'].reverse().join('') +
                    (styleOptions.find((opt) => opt.value === selectedStyle)?.suffix || '')
                  }}
                </template>
                <template v-else>
                  {{ styleOptions.find((opt) => opt.value === selectedStyle)?.prefix || '' }} Your
                  Text {{ styleOptions.find((opt) => opt.value === selectedStyle)?.suffix || '' }}
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Generate Button -->
      <button class="generate-button" @click="generateStarText">Generate Fancy Text</button>

      <!-- Result -->
      <div class="result-group">
        <label for="generated-text">Generated Text</label>
        <div class="result-container">
          <div
            id="generated-text"
            class="generated-text-content"
            :class="{
              'generated-large': appliedStyle === 'large',
              'generated-small': appliedStyle === 'small',
              'generated-bold': appliedStyle === 'bold',
            }"
            contenteditable="false"
          >
            {{ generatedText }}
          </div>
          <button
            v-if="inputText.trim() && generatedText"
            class="copy-button"
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
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
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
const appliedStyle = ref('plain')
const generatedText = ref('')
const textareaRef = ref(null)
const activeCategory = ref('star')
const previewSymbols = ref([])
const isMobile = ref(false)

// 检测是否为移动设备
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// 监听窗口大小变化
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Category definitions
const categories = [
  {
    id: 'star',
    name: 'Stars Symbols',
    mobileName: 'Stars',
    description: 'Star symbols',
  },
  {
    id: 'heart',
    name: 'Hearts Symbols',
    mobileName: 'Hearts',
    description: 'Heart symbols',
  },
  {
    id: 'arrow',
    name: 'Arrows Symbols',
    mobileName: 'Arrows',
    description: 'Arrow symbols',
  },

  {
    id: 'sun',
    name: 'Sun Symbols',
    mobileName: 'Sun',
    description: 'Sun symbols',
  },
  {
    id: 'moon',
    name: 'Moon Symbols',
    mobileName: 'Moon',
    description: 'Moon symbols',
  },
  {
    id: 'smiley',
    name: 'Smiley Symbols',
    mobileName: 'Smiley',
    description: 'Smiley symbols',
  },
  {
    id: 'hand',
    name: 'Hands Symbols',
    mobileName: 'Hands',
    description: 'Hand symbols',
  },
  {
    id: 'triangle',
    name: 'Triangle Symbols',
    mobileName: 'Triangle',
    description: 'Triangle symbols',
  },
  {
    id: 'circle',
    name: 'Circle Symbols',
    mobileName: 'Circle',
    description: 'Circle symbols',
  },
  {
    id: 'square',
    name: 'Square Symbols',
    mobileName: 'Square',
    description: 'Square symbols',
  },
  {
    id: 'rectangle',
    name: 'Rectangle Symbols',
    mobileName: 'Rectangle',
    description: 'Rectangle  symbols',
  },
  {
    id: 'math',
    name: 'Math Symbols',
    mobileName: 'Math',
    description: 'Math symbols',
  },
  {
    id: 'athena',
    name: 'Athena Symbols',
    mobileName: 'Athena',
    description: 'Athena symbols',
  },
  {
    id: 'fruit',
    name: 'Fruit Symbols',
    mobileName: 'Fruit',
    description: 'Fruit  symbols',
  },
  {
    id: 'religious-and-symbols',
    name: 'Religious and Symbols',
    mobileName: 'Religious',
    description: 'Religious and symbols',
  },
  {
    id: 'hanging-star',
    name: 'Hanging star Symbol',
    mobileName: 'Hanging',
    description: 'Hanging star symbol',
  },
]

// 用数组统一风格配置
const styleOptions = [
  {
    label: 'Bold',
    value: 'bold',
  },
  {
    label: 'Large',
    value: 'large',
  },
  {
    label: 'Small',
    value: 'small',
  },
  {
    label: 'Reverse',
    value: 'reverse',
  },
]

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
  appliedStyle.value = selectedStyle.value
  let text = inputText.value.trim()

  // 根据样式生成文本
  let styledText = text
  if (appliedStyle.value === 'reverse') {
    styledText = text.split('').reverse().join('')
  }

  generatedText.value = styledText
}

const copyGeneratedText = async () => {
  if (!generatedText.value.trim()) {
    props.showToast('Please enter some text first')
    return
  }

  try {
    const text = document.getElementById('generated-text')
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(text)
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('copy')
    selection.removeAllRanges()
    props.showToast('Generated text copied to clipboard!')
  } catch (err) {
    console.error('Copy failed: ', err)
    props.showToast('Copy failed, please try again')
  }
}

const addToPreview = (symbolObj) => {
  previewSymbols.value.push(symbolObj.symbol)
}

// Cookie操作函数
function setCookie(name, value, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/'
}
function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}
function deleteCookie(name) {
  setCookie(name, '', -1)
}

// 页面加载时从cookie恢复
onMounted(() => {
  const cookieVal = getCookie('previewSymbols')
  if (cookieVal) {
    try {
      const arr = JSON.parse(cookieVal)
      if (Array.isArray(arr)) previewSymbols.value = arr
    } catch {}
  }
})

// 监听previewSymbols变化，写入cookie
watch(
  previewSymbols,
  (val) => {
    setCookie('previewSymbols', JSON.stringify(val))
  },
  { deep: true }
)

// 清空时同步清空cookie
const clearPreview = () => {
  previewSymbols.value = []
  deleteCookie('previewSymbols')
}

const insertSymbolToText = (symbol) => {
  const textarea = document.getElementById('input-text')
  if (!textarea) return
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = inputText.value
  inputText.value = text.substring(0, start) + symbol + text.substring(end)
  nextTick(() => {
    textarea.focus()
    textarea.setSelectionRange(start + symbol.length, start + symbol.length)
  })
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
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.category-tab {
  padding: 0.5rem 0.75rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-tab:hover {
  border-color: #667eea;
  color: #667eea;
}

.category-tab.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
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

/* 预览区域样式 */
.preview-area {
  margin-top: 1rem;
  background: #f8f9ff;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #ececff;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.preview-header h4 {
  font-size: 0.9rem;
  color: #4f46e5;
  margin: 0;
  font-weight: 600;
}

.clear-preview-btn {
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.clear-preview-btn:hover {
  background: #f0f4ff;
  color: #4f46e5;
}

.preview-symbols {
  min-height: 60px;
  background: white;
  border-radius: 6px;
  padding: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #ececff;
}

.preview-symbols:hover {
  border-color: #bdb7f7;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.08);
}

.preview-symbols.empty {
  align-items: center;
  justify-content: center;
  background: #fafaff;
}

.preview-symbol {
  font-size: 1.2rem;
  padding: 0.3rem 0.6rem;
  background: #f0f4ff;
  border-radius: 4px;
  color: #4f46e5;
  transition: all 0.2s ease;
}

.preview-symbol:hover {
  transform: scale(1.1);
  background: #e6eaff;
}

.preview-placeholder {
  color: #8b8fa7;
  font-size: 0.85rem;
  text-align: center;
  line-height: 1.4;
}

.preview-bold {
  font-weight: bold;
}
.preview-large {
  font-size: 2rem;
}
.preview-small {
  font-size: 0.7rem;
}
.preview-reverse {
  direction: rtl;
  unicode-bidi: bidi-override;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .category-tabs {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.6rem;
    padding: 0 0.75rem;
  }
}

@media (max-width: 768px) {
  .category-tabs {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }

  .category-tab {
    padding: 0.3rem 0.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .category-tabs {
    gap: 0.3rem;
    padding: 0 0.3rem;
  }

  .category-tab {
    padding: 0.25rem 0.4rem;
    font-size: 0.85rem;
  }
}

/* 生成文本样式 */
.generated-text-content {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: #f8f9ff;
  width: 100%;
  min-height: 100px;
  outline: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
  line-height: 1.5;
}

.generated-text-content:focus {
  border-color: #667eea;
}

.generated-text-content[contenteditable='true']:empty:before {
  content: 'Generated text will appear here...';
  color: #999;
}

/* 样式类 */
.generated-bold {
  font-weight: bold !important;
}

.generated-large {
  font-size: 2rem !important;
  line-height: 1.2;
}

.generated-small {
  font-size: 0.7rem !important;
  line-height: 1.2;
}
</style>
