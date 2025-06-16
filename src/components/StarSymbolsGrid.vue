<template>
  <div class="symbols-tabs">
    <div class="tab-buttons">
      <button
        v-for="tab in symbolTabs"
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ isMobile ? tab.mobileName : tab.name }}
      </button>
    </div>

    <div class="symbols-grid">
      <button
        v-for="(symbol, index) in currentSymbols"
        :key="index"
        class="symbol-button"
        @click="copySymbol(symbol)"
      >
        {{ symbol }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { starSymbolsData } from '@/data/starSymbols.js'

// Props
const props = defineProps({
  showToast: {
    type: Function,
    required: true,
  },
})

// Reactive data
const activeTab = ref('classic')
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

// Symbol data
const symbolTabs = [
  // { id: 'all', name: 'All Stars' },
  { id: 'classic', name: 'Classic Star', mobileName: 'Classic' },
  { id: 'four-pointed', name: 'Four-Pointed Star', mobileName: 'Four' },
  { id: 'five-pointed', name: 'Five-Pointed Star', mobileName: 'Five' },
  { id: 'six-pointed', name: 'Six-Pointed Star', mobileName: 'Six' },
  { id: 'multi-pointed', name: 'Multi-pointed Star', mobileName: 'Multi' },
  { id: 'religious', name: 'Religious Star', mobileName: 'Religious' },
  { id: 'emoji', name: 'Emoji Star', mobileName: 'Emoji' },
  { id: 'math', name: 'Math symbols star', mobileName: 'Math' },
  { id: 'other', name: 'Other stars', mobileName: 'Other' },
]

// Computed properties
const currentSymbols = computed(() => {
  if (activeTab.value === 'all') {
    // For All tab, show all symbols where showSymbols is true
    return starSymbolsData.filter((item) => item.showSymbols).map((item) => item.symbol)
  } else {
    // For other tabs, show symbols where tab array includes the activeTab, and showSymbols is true
    return starSymbolsData
      .filter((item) => {
        const matchesTab = Array.isArray(item.tab)
          ? item.tab.includes(activeTab.value)
          : item.tab === activeTab.value
        return matchesTab && item.showSymbols
      })
      .map((item) => item.symbol)
  }
})

// Methods
const copySymbol = async (symbol) => {
  try {
    await navigator.clipboard.writeText(symbol)
    props.showToast(`"${symbol}" copied to clipboard!`)
  } catch (err) {
    console.error('Copy failed: ', err)
    props.showToast('Copy failed, please try again')
  }
}
</script>

<style scoped>
.tab-buttons {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.tab-button {
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

.tab-button:hover {
  border-color: #667eea;
  color: #667eea;
}

.tab-button.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.symbols-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 55px);
  gap: 0.75rem;
  margin: 0 auto;
  justify-content: start;
}

.symbol-button {
  width: 55px;
  height: 55px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.symbol-button:hover {
  border-color: #667eea;
  background: #f8f9ff;
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .tab-buttons {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.6rem;
    padding: 0 0.75rem;
  }
}

@media (max-width: 768px) {
  .symbols-grid {
    grid-template-columns: repeat(auto-fill, 46px);
    gap: 0.5rem;
  }

  .symbol-button {
    width: 46px;
    height: 46px;
    font-size: 1.2rem;
  }

  .tab-buttons {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }

  .tab-button {
    padding: 0.3rem 0.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .tab-buttons {
    gap: 0.3rem;
    padding: 0 0.3rem;
  }

  .tab-button {
    padding: 0.25rem 0.4rem;
    font-size: 0.85rem;
  }
}
</style>
