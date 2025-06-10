<template>
  <div class="image-to-stars-page hero-variant-image">
    <!-- Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Image To Text Converter​</h1>
        <div class="hero-stars">
          <span class="hero-star" style="--delay: 0s">⍟</span>
          <span class="hero-star" style="--delay: 0.3s">⭐</span>
          <span class="hero-star" style="--delay: 0.6s">✨</span>
          <span class="hero-star" style="--delay: 0.9s">🌟</span>
          <span class="hero-star" style="--delay: 1.2s">🎨</span>
          <span class="hero-star" style="--delay: 1.5s">✦</span>
        </div>
        <p class="hero-description">
          Transform your images into beautiful text art! Upload any image and watch it convert into
          stunning ASCII art using special Unicode characters.
        </p>
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
          </div>

          <!-- Result Panel -->
          <div class="result-panel">
            <div class="result-section" v-if="result" :class="{ 'dark-theme': darkTheme }">
              <div class="result-header">
                <h3>Text Art Result</h3>
                <button
                  @click="copyResult"
                  class="copy-btn-header"
                  v-copy-allowed
                  :disabled="!result"
                >
                  📋 Copy Result
                </button>
              </div>
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

        <!-- Features Section -->
        <div class="features-section">
          <h2>Converter Features</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🖼️</div>
              <h4>Multiple Formats</h4>
              <p>
                Support for JPG, PNG, GIF, and other popular image formats with automatic
                processing.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚙️</div>
              <h4>Advanced Settings</h4>
              <p>
                Customize width, grayscale mode, dithering, and color inversion for perfect results.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h4>Real-time Preview</h4>
              <p>See your image and text art side by side with instant conversion updates.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h4>Mobile Optimized</h4>
              <p>
                Works seamlessly on all devices with responsive design and touch-friendly controls.
              </p>
            </div>
          </div>
        </div>

        <!-- How It Works Section -->
        <div class="how-it-works-section">
          <h2>How It Works</h2>
          <div class="steps-grid">
            <div class="step-card">
              <div class="step-number">1</div>
              <h4>Upload Image</h4>
              <p>Choose an image file from your device or drag and drop it into the upload area.</p>
            </div>
            <div class="step-card">
              <div class="step-number">2</div>
              <h4>Adjust Settings</h4>
              <p>
                Fine-tune the conversion parameters like width, grayscale mode, and visual effects.
              </p>
            </div>
            <div class="step-card">
              <div class="step-number">3</div>
              <h4>Generate Art</h4>
              <p>
                Watch as your image transforms into beautiful ASCII art using Unicode characters.
              </p>
            </div>
            <div class="step-card">
              <div class="step-number">4</div>
              <h4>Copy & Share</h4>
              <p>Copy the generated text art to your clipboard and use it anywhere you want.</p>
            </div>
          </div>
        </div>

        <!-- Tips Section -->
        <div class="tips-section">
          <h2>Pro Tips</h2>
          <div class="tips-grid">
            <div class="tip-card">
              <div class="tip-icon">💡</div>
              <h4>Best Image Types</h4>
              <p>
                High contrast images with clear subjects work best. Avoid overly complex or busy
                backgrounds.
              </p>
            </div>
            <div class="tip-card">
              <div class="tip-icon">📏</div>
              <h4>Optimal Width</h4>
              <p>
                For social media posts, try widths between 40-80 characters. For detailed art, use
                100+ characters.
              </p>
            </div>
            <div class="tip-card">
              <div class="tip-icon">🌓</div>
              <h4>Dark Theme</h4>
              <p>
                Enable dark theme for better visibility when working with light-colored text art.
              </p>
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

// Detect mobile device
const isMobile = () => window.innerWidth <= 768

const settings = reactive({
  width: isMobile() ? 30 : 60, // Use smaller width on mobile
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
  { deep: true },
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

// Handle window resize for responsive width adjustment
const handleResize = () => {
  const newWidth = isMobile() ? 30 : 60
  if (settings.width !== newWidth) {
    settings.width = newWidth
  }
}

// Set up copy protection and paste listener
onMounted(() => {
  copyProtection.setToastCallback(showToastMessage)
  document.addEventListener('paste', handlePaste)
  window.addEventListener('resize', handleResize)
})

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('paste', handlePaste)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
@import '@/styles/hero.css';

.image-to-stars-page {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Section Styles */
.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  overflow-x: hidden;
}

/* Converter Section */
.converter-section {
  padding: 0 0 4rem 0;
}

/* Features Section */
.features-section {
  margin-top: 4rem;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.features-section h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  background: #f8f9ff;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h4 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* How It Works Section */
.how-it-works-section {
  margin-top: 3rem;
  background: rgba(255, 255, 255, 0.8);
  padding: 3rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.how-it-works-section h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.step-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.step-card:hover {
  transform: translateY(-3px);
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.step-card h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.step-card p {
  color: #666;
  line-height: 1.6;
}

/* Tips Section */
.tips-section {
  margin-top: 3rem;
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%);
  padding: 3rem;
  border-radius: 20px;
}

.tips-section h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.tip-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.tip-card:hover {
  transform: translateY(-3px);
}

.tip-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.tip-card h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #667eea;
  font-weight: 600;
}

.tip-card p {
  color: #666;
  line-height: 1.6;
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

/* Result Header */
.result-header {
  background: #667eea;
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

/* Copy Button in Header */
.copy-btn-header {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.copy-btn-header:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}

.copy-btn-header:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.copy-btn-header:hover::after {
  top: auto;
  bottom: -30px;
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
  overflow-x: hidden;
  max-width: 100%;
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
  word-break: break-all;
  max-width: 100%;
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

  .features-section,
  .how-it-works-section,
  .tips-section {
    margin-top: 3rem;
    padding: 2rem;
  }

  .features-section h2,
  .how-it-works-section h2,
  .tips-section h2 {
    font-size: 1.8rem;
  }

  .features-grid,
  .steps-grid,
  .tips-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card,
  .step-card,
  .tip-card {
    padding: 1.5rem;
  }

  .feature-icon {
    font-size: 2.5rem;
  }

  .tip-icon {
    font-size: 2rem;
  }

  .step-number {
    width: 50px;
    height: 50px;
    font-size: 1.3rem;
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

  .result-text {
    font-size: 0.7rem;
    white-space: pre-wrap;
    word-break: break-all;
    overflow-x: hidden;
  }
}

@media (max-width: 480px) {
  .section-container {
    padding: 0 1rem;
  }

  .converter-section {
    padding: 0 0 2rem 0;
  }

  .features-section,
  .how-it-works-section,
  .tips-section {
    margin-top: 2rem;
    padding: 1.5rem;
  }

  .features-section h2,
  .how-it-works-section h2,
  .tips-section h2 {
    font-size: 1.5rem;
  }

  .feature-card,
  .step-card,
  .tip-card {
    padding: 1.25rem;
  }

  .feature-icon {
    font-size: 2rem;
  }

  .tip-icon {
    font-size: 1.8rem;
  }

  .step-number {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }

  .feature-card h4,
  .step-card h4,
  .tip-card h4 {
    font-size: 1.1rem;
  }

  .feature-card p,
  .step-card p,
  .tip-card p {
    font-size: 0.9rem;
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

  .copy-btn-header {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .result-header {
    padding: 0.8rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }

  .result-header h3 {
    font-size: 1rem;
    text-align: center;
  }

  .result-text {
    font-size: 0.65rem;
    line-height: 1.05;
    white-space: pre-wrap;
    word-break: break-all;
    overflow-x: hidden;
    max-width: 100%;
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

.result-section.dark-theme .result-header {
  background: #2d2d2d;
  color: #e0e0e0;
}

.result-section.dark-theme .copy-btn-header {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.result-section.dark-theme .copy-btn-header:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
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
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}
</style>
