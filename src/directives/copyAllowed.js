// Vue指令：允许复制
import { copyProtection } from '@/utils/copyProtection.js'

export const copyAllowedDirective = {
  mounted(el, binding) {
    // 添加到允许复制的元素列表
    copyProtection.addAllowedElement(el)
    
    // 如果有修饰符，添加额外的类名
    if (binding.modifiers.highlight) {
      el.classList.add('copy-highlight')
    }
  },
  
  unmounted(el) {
    // 从允许复制的元素列表中移除
    copyProtection.removeAllowedElement(el)
    el.classList.remove('copy-highlight')
  }
}

// 注册全局指令的函数
export function registerCopyDirectives(app) {
  app.directive('copy-allowed', copyAllowedDirective)
}
