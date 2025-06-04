<template>
  <div class="image-to-stars-page">
    <!-- Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="hero" style="background: linear-gradient(135deg, #a8e6cf 0%, #88d8c0 100%)">
      <div class="hero-content">
        <h1 class="hero-title white-text">Image to Text Art</h1>
        <p class="hero-description white-text">
          Transform your images into beautiful text art! Upload any image and watch it convert into
          stunning ASCII art using special Unicode characters.
        </p>
        <div class="hero-stars">
          <span class="hero-star" style="--delay: 0s">🖼️</span>
          <span class="hero-star" style="--delay: 0.3s">⭐</span>
          <span class="hero-star" style="--delay: 0.6s">✨</span>
          <span class="hero-star" style="--delay: 0.9s">🌟</span>
          <span class="hero-star" style="--delay: 1.2s">🎨</span>
          <span class="hero-star" style="--delay: 1.5s">✦</span>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="converter-section">
      <div class="section-container">
        <div class="converter-layout">
          <!-- Controls Panel -->
          <div class="controls-panel">
            <div class="control-group">
              <h3>Upload Image</h3>
              <div class="upload-area" @drop="handleDrop" @dragover.prevent @dragenter.prevent>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleFileSelect"
                  style="display: none"
                />
                <button @click="$refs.fileInput.click()" class="upload-btn">📁 Choose File</button>
                <p>or drag & drop an image here</p>
              </div>

              <!-- Image Preview -->
              <div class="image-preview-section" v-if="previewUrl">
                <div class="image-preview">
                  <canvas ref="canvas" style="display: none"></canvas>
                  <img :src="previewUrl" alt="Preview" class="preview-img" />
                </div>
              </div>
            </div>

            <div class="control-group">
              <h3>Settings</h3>
              <div class="setting-item">
                <label>Width:</label>
                <input v-model.number="settings.width" type="number" min="20" max="150" step="5" />
              </div>
              <div class="setting-item">
                <label>Grayscale Mode:</label>
                <select v-model="settings.grayscaleMode">
                  <option value="luminance">Luminance</option>
                  <option value="lightness">Lightness</option>
                  <option value="average">Average</option>
                  <option value="value">Value (Max)</option>
                </select>
              </div>
              <div class="setting-item">
                <label>
                  <input v-model="settings.inverted" type="checkbox" />
                  Invert Colors
                </label>
              </div>
              <div class="setting-item">
                <label>
                  <input v-model="settings.dithering" type="checkbox" />
                  Enable Dithering
                </label>
              </div>
              <div class="setting-item">
                <label>
                  <input v-model="settings.monospace" type="checkbox" />
                  Monospace Mode
                </label>
              </div>
              <div class="setting-item">
                <label>
                  <input v-model="darkTheme" type="checkbox" />
                  Dark Theme
                </label>
              </div>
            </div>

            <div class="control-group" v-if="result">
              <h3>Actions</h3>
              <button @click="copyResult" class="copy-btn" v-copy-allowed :disabled="!result">
                📋 Copy Result
              </button>
            </div>
          </div>

          <!-- Result Panel -->
          <div class="result-panel">
            <div class="result-section" v-if="result" :class="{ 'dark-theme': darkTheme }">
              <h3>Text Art Result</h3>
              <div class="result-container">
                <pre class="result-text" v-copy-allowed>{{ result }}</pre>
              </div>
            </div>
            <div v-else class="no-result">
              <span>🎨</span>
              <p>Upload an image to see the text art result</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast" :class="{ show: showToast }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { createImageCanvas, canvasToText } from '@/utils/brailleConverter.js'
import { copyProtection } from '@/utils/copyProtection.js'

// Reactive data
const fileInput = ref(null)
const canvas = ref(null)
const previewUrl = ref('')
const imageLoaded = ref(false)
const result = ref('')
const showToast = ref(false)
const toastMessage = ref('')
const lastCanvas = ref(null)
const processing = ref(false)

const settings = reactive({
  width: 60,
  grayscaleMode: 'luminance',
  inverted: false,
  dithering: false,
  monospace: false,
})

// Dark theme state
const darkTheme = ref(false)

// Watch for settings changes and auto-convert
watch(
  settings,
  () => {
    if (lastCanvas.value && !processing.value) {
      // If width changed, need to recreate canvas
      if (imageLoaded.value) {
        convertImage()
      }
    }
  },
  { deep: true }
)

// Watch for dark theme changes
watch(darkTheme, () => {
  // Dark theme only affects display, no need to reconvert
})

// Methods
const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    loadImage(file)
  }
}

const handleDrop = (event) => {
  event.preventDefault()
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    loadImage(file)
  }
}

const loadImage = (file) => {
  const reader = new FileReader()
  reader.onload = async (e) => {
    try {
      previewUrl.value = e.target.result
      imageLoaded.value = true
      showToastMessage('Image loaded successfully!')

      // Auto-convert when image is loaded
      await convertImage()
    } catch (error) {
      console.error('Error loading image:', error)
      showToastMessage('Error loading image')
    }
  }
  reader.readAsDataURL(file)
}

const convertImage = async () => {
  if (!imageLoaded.value || processing.value) return

  try {
    processing.value = true
    showToastMessage('Converting image...')

    // Create canvas with proper dimensions for braille
    const imageCanvas = await createImageCanvas(previewUrl.value, settings.width)
    lastCanvas.value = imageCanvas

    // Convert to text
    convertToText()
  } catch (error) {
    console.error('Error converting image:', error)
    showToastMessage('Error converting image')
  } finally {
    processing.value = false
  }
}

const convertToText = () => {
  if (!lastCanvas.value) return

  try {
    const text = canvasToText(lastCanvas.value, {
      grayscaleMode: settings.grayscaleMode,
      inverted: settings.inverted,
      dithering: settings.dithering,
      monospace: settings.monospace,
    })

    result.value = text
    showToastMessage('Image converted to text art!')
  } catch (error) {
    console.error('Error converting to text:', error)
    showToastMessage('Error converting to text')
  }
}

const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(result.value)
    showToastMessage('Text art copied to clipboard!')
  } catch (err) {
    console.error('Copy failed: ', err)
    showToastMessage('Copy failed, please try again')
  }
}

// Handle paste from clipboard
const handlePaste = async (event) => {
  const items = event.clipboardData.items
  for (let item of items) {
    if (item.type.startsWith('image/')) {
      event.preventDefault()
      const file = item.getAsFile()
      if (file) {
        loadImage(file)
      }
      break
    }
  }
}

// Set up copy protection and paste listener
onMounted(() => {
  copyProtection.setToastCallback(showToastMessage)
  document.addEventListener('paste', handlePaste)
})

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('paste', handlePaste)
})
</script>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.image-to-stars-page {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Hero Section */
.hero {
  padding: 8rem 2rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: float 3s ease-in-out infinite;
}

.hero-title.white-text {
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  background-clip: unset;
  color: white;
}

.hero-description {
  font-size: 1.3rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.hero-description.white-text {
  color: rgba(255, 255, 255, 0.9);
}

.hero-stars {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 3rem;
}

.hero-star {
  animation: colorWave 4s ease-in-out infinite;
  animation-delay: var(--delay);
  background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: transform 0.3s ease;
}

.hero-star:hover {
  transform: scale(1.2);
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes colorWave {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 200% 50%;
  }
  75% {
    background-position: 300% 50%;
  }
  100% {
    background-position: 400% 50%;
  }
}

/* Section Styles */
.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Converter Section */
.converter-section {
  padding: 5rem 0;
  background: white;
  transition: background-color 0.3s ease;
}

.converter-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 3rem;
  align-items: start;
}

/* Controls Panel */
.controls-panel {
  background: #f8f9ff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
}

.control-group {
  margin-bottom: 2rem;
}

.control-group:last-child {
  margin-bottom: 0;
}

.control-group h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

/* Upload Area */
.upload-area {
  border: 2px dashed #667eea;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  background: white;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #5a67d8;
  background: #f0f4ff;
}

.upload-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.upload-btn:hover {
  transform: translateY(-2px);
}

.upload-area p {
  color: #666;
  font-size: 0.9rem;
}

/* Settings */
.setting-item {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.setting-item label {
  font-weight: 500;
  color: #333;
  min-width: 80px;
}

.setting-item input[type='number'],
.setting-item select {
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 0.9rem;
  flex: 1;
}

.setting-item input[type='number']:focus,
.setting-item select:focus {
  outline: none;
  border-color: #667eea;
}

.setting-item input[type='checkbox'] {
  margin-right: 0.5rem;
}

/* Action Buttons */
.convert-btn,
.copy-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
}

.convert-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.convert-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.convert-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.copy-btn {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.copy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
}

/* Image Preview Section */
.image-preview-section {
  margin-top: 1.5rem;
}

.image-preview-section .image-preview {
  padding: 1rem;
  background: white;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  text-align: center;
}

.image-preview-section .preview-img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

/* Result Panel */
.result-panel {
  display: flex;
  flex-direction: column;
}

.result-section {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 500px;
}

.result-section h3 {
  background: #667eea;
  color: white;
  padding: 1rem 1.5rem;
  margin: 0;
  font-size: 1.1rem;
}

.no-result {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 4rem 2rem;
  text-align: center;
  color: #999;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-result span {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

/* Result */
.result-container {
  padding: 1.5rem;
  background: #f8f9ff;
  height: calc(700px - 60px); /* Subtract header height */
}

.result-text {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  line-height: 1;
  white-space: pre;
  overflow-x: auto;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  height: 100%;
  overflow-y: auto;
}

/* Toast Notification */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  background: #667eea;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  z-index: 1001;
  white-space: nowrap;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .converter-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .controls-panel {
    position: static;
  }
}

@media (max-width: 768px) {
  .section-container {
    padding: 0 1rem;
  }

  .controls-panel {
    padding: 1.5rem;
  }

  .setting-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .setting-item label {
    min-width: auto;
    margin-bottom: 0.5rem;
  }

  .toast {
    left: 1rem;
    right: 1rem;
    transform: translateX(0) translateY(100%);
  }

  .toast.show {
    transform: translateX(0) translateY(0);
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 5rem 1rem 2rem;
    min-height: 70vh;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-stars {
    font-size: 1.8rem;
    gap: 0.6rem;
  }

  .section-container {
    padding: 0 1rem;
  }

  .converter-section {
    padding: 2.5rem 0;
  }

  .controls-panel {
    padding: 1.25rem;
  }

  .control-group h3 {
    font-size: 1rem;
  }

  .upload-area {
    padding: 1.25rem;
  }

  .upload-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .setting-item label {
    font-size: 0.85rem;
  }

  .setting-item input,
  .setting-item select {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
  }

  .copy-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .result-text {
    font-size: 0.65rem;
    line-height: 1.05;
  }

  .no-result span {
    font-size: 1.8rem;
  }

  .no-result p {
    font-size: 0.85rem;
  }

  .preview-img {
    max-height: 200px;
  }
}

/* Dark Theme Styles - Only for Result Section */
.result-section.dark-theme {
  background: #1a1a1a;
  transition: background-color 0.3s ease;
}

.result-section.dark-theme h3 {
  background: #2d2d2d;
  color: #e0e0e0;
}

.result-section.dark-theme .result-container {
  background: #1a1a1a;
}

.result-section.dark-theme .result-text {
  background: #000;
  border-color: #333;
  color: #fff;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  font-weight: bold;
}

/* Dark theme transitions */
.result-section.dark-theme * {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
</style>
