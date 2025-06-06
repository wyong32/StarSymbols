<template>
  <div class="symbols-tabs">
    <div class="tab-buttons">
      <button
        v-for="tab in symbolTabs"
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="symbols-grid">
      <button
        v-for="(symbol, index) in currentSymbols"
        :key="index"
        class="symbol-button"
        v-copy-allowed
        @click="copySymbol(symbol)"
      >
        {{ symbol }}
      </button>
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
const activeTab = ref('all')

// Symbol data
const symbolTabs = [
  { id: 'all', name: 'All Stars' },
  { id: 'solid', name: 'Solid Stars' },
  { id: 'outline', name: 'Outline Stars' },
  { id: 'special', name: 'Special Stars' },
]

// Computed properties
const currentSymbols = computed(() => {
  if (activeTab.value === 'all') {
    // For All tab, show all symbols where showSymbols is true
    return starSymbolsData.filter((item) => item.showSymbols).map((item) => item.symbol)
  } else {
    // For other tabs, show symbols where tab matches and showSymbols is true
    return starSymbolsData
      .filter((item) => item.tab === activeTab.value && item.showSymbols)
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
.symbols-tabs {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab-button {
  padding: 0.8rem 1.5rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
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
@media (max-width: 768px) {
  .symbols-grid {
    grid-template-columns: repeat(auto-fill, 50px);
    gap: 0.5rem;
  }

  .symbol-button {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .symbols-tabs {
    padding: 1rem;
  }

  .tab-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
