// Copy Protection Utility Class
export class CopyProtection {
  constructor() {
    this.allowedElements = new Set()
    this.isInitialized = false
    this.toastCallback = null
  }

  // Set toast callback function
  setToastCallback(callback) {
    this.toastCallback = callback
  }

  // Show toast message
  showToast(message) {
    if (this.toastCallback) {
      this.toastCallback(message)
    } else {
      console.log(message)
    }
  }

  // Initialize copy protection
  init() {
    if (this.isInitialized) return

    this.disableContextMenu()
    this.disableKeyboardShortcuts()
    this.disableTextSelection()
    this.disableDragAndDrop()

    this.isInitialized = true
    console.log('Copy protection initialized')
  }

  // 添加允许复制的元素
  addAllowedElement(element) {
    if (element) {
      this.allowedElements.add(element)
      this.enableCopyForElement(element)
    }
  }

  // 移除允许复制的元素
  removeAllowedElement(element) {
    if (element) {
      this.allowedElements.delete(element)
      this.disableCopyForElement(element)
    }
  }

  // Disable context menu
  disableContextMenu() {
    document.addEventListener('contextmenu', (e) => {
      if (!this.isElementAllowed(e.target)) {
        e.preventDefault()
        this.showToast('Content is protected. Only designated areas can be copied.')
        return false
      }
    })
  }

  // 禁用键盘快捷键
  disableKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // 检查是否在允许的元素内
      if (this.isElementAllowed(e.target)) {
        return true
      }

      // Forbidden shortcuts
      const forbiddenKeys = [
        // Copy related
        { ctrl: true, key: 'c' },
        { ctrl: true, key: 'C' },
        { ctrl: true, key: 'a' },
        { ctrl: true, key: 'A' },
        { ctrl: true, key: 'v' },
        { ctrl: true, key: 'V' },
        { ctrl: true, key: 'x' },
        { ctrl: true, key: 'X' },

        // Others
        { ctrl: true, key: 's' },
        { ctrl: true, key: 'S' },
        { ctrl: true, key: 'p' },
        { ctrl: true, key: 'P' },
      ]

      for (const forbidden of forbiddenKeys) {
        if (this.matchesKeyCombo(e, forbidden)) {
          e.preventDefault()
          // Show different messages for different actions
          if (forbidden.key === 'c' || forbidden.key === 'C') {
            this.showToast('Copy is not allowed in this area. Use designated copy buttons.')
          } else if (forbidden.key === 'a' || forbidden.key === 'A') {
            this.showToast('Select all is disabled for content protection.')
          } else {
            this.showToast('This action is not allowed.')
          }
          return false
        }
      }
    })
  }

  // 检查按键组合
  matchesKeyCombo(event, combo) {
    const ctrlMatch = combo.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey
    const shiftMatch = combo.shift ? event.shiftKey : !event.shiftKey
    const keyMatch = event.key === combo.key

    return ctrlMatch && shiftMatch && keyMatch
  }

  // 禁用文本选择
  disableTextSelection() {
    // 添加CSS样式禁用选择
    const style = document.createElement('style')
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
      
      .copy-allowed,
      .copy-allowed * {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }

      .copy-allowed {
        position: relative;
      }

      .copy-allowed:hover::after {
        content: '📋 Copyable';
        position: absolute;
        top: -30px;
        right: 0;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
      }

      .copy-highlight {
        border: 2px dashed #4CAF50 !important;
        background: rgba(76, 175, 80, 0.1) !important;
      }
    `
    document.head.appendChild(style)

    // 禁用选择事件
    document.addEventListener('selectstart', (e) => {
      if (!this.isElementAllowed(e.target)) {
        e.preventDefault()
        return false
      }
    })
  }

  // 禁用拖拽
  disableDragAndDrop() {
    document.addEventListener('dragstart', (e) => {
      if (!this.isElementAllowed(e.target)) {
        e.preventDefault()
        return false
      }
    })
  }

  // 检查元素是否允许复制
  isElementAllowed(element) {
    if (!element) return false

    // 检查元素本身
    if (this.allowedElements.has(element)) return true

    // 检查是否有copy-allowed类
    if (element.classList && element.classList.contains('copy-allowed')) return true

    // 检查父元素
    let parent = element.parentElement
    while (parent) {
      if (this.allowedElements.has(parent)) return true
      if (parent.classList && parent.classList.contains('copy-allowed')) return true
      parent = parent.parentElement
    }

    // 允许输入框
    const allowedTags = ['INPUT', 'TEXTAREA']
    if (allowedTags.includes(element.tagName)) return true

    return false
  }

  // 为元素启用复制
  enableCopyForElement(element) {
    if (element) {
      element.classList.add('copy-allowed')
    }
  }

  // 为元素禁用复制
  disableCopyForElement(element) {
    if (element) {
      element.classList.remove('copy-allowed')
    }
  }

  // 销毁防复制功能
  destroy() {
    this.allowedElements.clear()
    this.isInitialized = false
  }
}

// 创建全局实例
export const copyProtection = new CopyProtection()

// 自动初始化
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    copyProtection.init()
  })
}
