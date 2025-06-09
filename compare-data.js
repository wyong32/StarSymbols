import { starDetailsData } from './src/data/starDetails.js';
import { starSymbolsData } from './src/data/starSymbols.js';

console.log('=== 数据对比检查 ===');
console.log('starDetails.js 符号数量:', starDetailsData.length);
console.log('starSymbols.js 符号数量:', starSymbolsData.length);

console.log('\n=== 逐个符号对比 ===');
const mismatches = [];

for (let i = 0; i < Math.max(starDetailsData.length, starSymbolsData.length); i++) {
  const detail = starDetailsData[i];
  const symbol = starSymbolsData[i];
  
  if (!detail && symbol) {
    mismatches.push(`starSymbols[${i}] 多余: ${symbol.symbol} - ${symbol.name}`);
  } else if (detail && !symbol) {
    mismatches.push(`starSymbols[${i}] 缺失: ${detail.symbol} - ${detail.name}`);
  } else if (detail && symbol) {
    if (detail.symbol !== symbol.symbol) {
      mismatches.push(`符号不匹配[${i}]: starDetails="${detail.symbol}" vs starSymbols="${symbol.symbol}"`);
    }
    if (detail.name !== symbol.name) {
      mismatches.push(`名称不匹配[${i}]: starDetails="${detail.name}" vs starSymbols="${symbol.name}"`);
    }
  }
}

if (mismatches.length === 0) {
  console.log('✅ 所有符号和名称都匹配！');
} else {
  console.log('❌ 发现不匹配项:');
  mismatches.forEach(mismatch => console.log('  -', mismatch));
}

console.log('\n=== 检查缺失的符号 ===');
const detailSymbols = new Set(starDetailsData.map(s => s.symbol));
const symbolsSymbols = new Set(starSymbolsData.map(s => s.symbol));

const missingInSymbols = starDetailsData.filter(detail => !symbolsSymbols.has(detail.symbol));
const extraInSymbols = starSymbolsData.filter(symbol => !detailSymbols.has(symbol.symbol));

if (missingInSymbols.length > 0) {
  console.log('starSymbols.js 中缺失的符号:');
  missingInSymbols.forEach(s => console.log(`  - ${s.symbol} (${s.name})`));
}

if (extraInSymbols.length > 0) {
  console.log('starSymbols.js 中多余的符号:');
  extraInSymbols.forEach(s => console.log(`  - ${s.symbol} (${s.name})`));
}

console.log('\n=== starDetails.js 中的所有符号 ===');
starDetailsData.forEach((star, index) => {
  console.log(`${index + 1}. ${star.symbol} - ${star.name}`);
});
