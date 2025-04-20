<template>
  <div class="space-y-8">
    <section class="hero-section bg-primary-light rounded-lg p-8 border-2 border-neon-blue relative overflow-hidden">
      <!-- 节气特定装饰元素 -->
      <div class="seasonal-pattern absolute inset-0 opacity-10" :class="`${$state.themeStyle.value}-pattern`"></div>
      
      <!-- 白露特效：露珠效果 -->
      <div v-if="$state.themeStyle.value === 'bailu'" class="dew-drops-container"></div>
      
      <!-- 寒露特效：秋叶飘落 -->
      <div v-if="$state.themeStyle.value === 'hanlu'" class="falling-leaves-container"></div>
      
      <!-- 小寒特效：雪花飘落 -->
      <div v-if="$state.themeStyle.value === 'xiaohan'" class="snowflakes-container"></div>
      
      <div class="max-w-3xl mx-auto text-center relative z-10">
        <h1 class="text-5xl font-bold mb-6 text-neon-blue seasonal-text-glow">The broken with star sinks交易平台</h1>
        <p class="text-xl mb-8">安全可靠的游戏物品交易市场，打造公平透明的游戏经济</p>
        <div class="flex justify-center space-x-4">
          <button class="bg-neon-purple hover:bg-neon-blue text-white font-bold py-2 px-4 rounded-full transition-all">
            热门物品
          </button>
          <button class="bg-transparent hover:bg-neon-purple text-white font-bold py-2 px-4 rounded-full border border-neon-purple transition-all">
            我的交易
          </button>
        </div>
      </div>
    </section>

    <!-- 搜索和筛选区域 -->
    <section class="search-section bg-primary-light p-6 rounded-lg neon-border relative overflow-hidden">
      <!-- 节气特定装饰元素 -->
      <div class="seasonal-pattern absolute inset-0 opacity-10" :class="`${$state.themeStyle.value}-pattern`"></div>
      
      <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 relative z-10">
        <div class="flex-1">
          <div class="relative">
            <input 
              type="text" 
              placeholder="搜索物品..." 
              class="w-full bg-secondary-dark border border-neon-blue/30 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-neon-blue"
              v-model="searchQuery"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div class="flex space-x-2">
          <select 
            class="bg-secondary-dark border border-neon-blue/30 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
            v-model="selectedCategory"
          >
            <option value="all">所有分类</option>
            <option value="weapon">武器装备</option>
            <option value="armor">防具护甲</option>
            <option value="consumable">消耗品</option>
            <option value="collectible">收藏品</option>
          </select>
          <select 
            class="bg-secondary-dark border border-neon-blue/30 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
            v-model="sortBy"
          >
            <option value="price_asc">价格 ↑</option>
            <option value="price_desc">价格 ↓</option>
            <option value="newest">最新上架</option>
            <option value="popular">人气最高</option>
          </select>
        </div>
      </div>
    </section>

    <!-- 市场物品列表 -->
    <section class="market-section">
      <h2 class="text-3xl font-bold text-neon-blue mb-6 seasonal-text-glow">热门交易物品</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(item, index) in filteredItems" 
          :key="index"
          class="bg-primary-light rounded-lg overflow-hidden hover:neon-border transition-all duration-300 transform hover:scale-102 hover:shadow-neon group"
        >
          <div class="relative">
            <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover" />
            <div class="absolute top-2 right-2 bg-neon-purple text-white text-xs rounded-full px-2 py-1">
              {{ item.category }}
            </div>
            <div v-if="item.discount" class="absolute top-2 left-2 bg-neon-red text-white text-xs rounded-full px-2 py-1">
              -{{ item.discount }}%
            </div>
          </div>
          
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold group-hover:text-neon-blue transition-colors">{{ item.name }}</h3>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-sm ml-1">{{ item.rating }}</span>
              </div>
            </div>
            
            <p class="text-gray-400 text-sm mb-4">{{ item.description }}</p>
            
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <span class="text-neon-blue font-bold text-xl">{{ item.price }}</span>
                <span v-if="item.originalPrice" class="text-gray-400 line-through text-sm ml-2">{{ item.originalPrice }}</span>
              </div>
              <button class="bg-neon-purple hover:bg-neon-blue text-white text-sm py-1 px-3 rounded-full transition-colors">
                购买
              </button>
            </div>
            
            <div class="flex items-center mt-3 text-xs text-gray-400">
              <span>卖家: {{ item.seller }}</span>
              <span class="mx-2">•</span>
              <span>成交量: {{ item.sales }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 价格趋势图表 -->
    <section class="trends-section bg-primary-light p-6 rounded-lg neon-border relative overflow-hidden">
      <!-- 节气特定装饰元素 -->
      <div class="seasonal-pattern absolute inset-0 opacity-10" :class="`${$state.themeStyle.value}-pattern`"></div>
      
      <h2 class="text-2xl font-bold text-neon-blue mb-4 seasonal-text-glow relative z-10">市场价格趋势</h2>
      <div class="h-64 bg-secondary-dark rounded-lg p-4 flex items-center justify-center">
        <!-- 这里将来可以集成实际的图表库，如Chart.js或Echarts -->
        <p class="text-gray-400">价格趋势图表将在这里显示</p>
      </div>
    </section>

    <!-- 最近交易记录 -->
    <section class="recent-trades">
      <h2 class="text-2xl font-bold text-neon-blue mb-4 seasonal-text-glow">最近交易记录</h2>
      <div class="bg-primary-light rounded-lg overflow-hidden neon-border relative">
        <!-- 节气特定装饰元素 -->
        <div class="seasonal-pattern absolute inset-0 opacity-10" :class="`${$state.themeStyle.value}-pattern`"></div>
        <table class="w-full">
          <thead>
            <tr class="bg-secondary-dark">
              <th class="py-3 px-4 text-left">物品</th>
              <th class="py-3 px-4 text-left">价格</th>
              <th class="py-3 px-4 text-left">买家</th>
              <th class="py-3 px-4 text-left">卖家</th>
              <th class="py-3 px-4 text-left">时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trade, index) in recentTrades" :key="index" class="border-b border-neon-blue/10 hover:bg-secondary-dark/50 transition-colors">
              <td class="py-3 px-4 flex items-center">
                <div class="w-8 h-8 rounded bg-secondary-dark mr-2 overflow-hidden">
                  <img :src="trade.itemImage" :alt="trade.item" class="w-full h-full object-cover" />
                </div>
                <span>{{ trade.item }}</span>
              </td>
              <td class="py-3 px-4 text-neon-blue font-medium">{{ trade.price }}</td>
              <td class="py-3 px-4">{{ trade.buyer }}</td>
              <td class="py-3 px-4">{{ trade.seller }}</td>
              <td class="py-3 px-4 text-gray-400">{{ trade.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useState } from 'nuxt/app';

// 获取当前主题样式
const themeStyle = useState('themeStyle', () => 'bailu');

// 创建$state对象以与模板中的引用保持一致
const $state = {
  themeStyle
};

// 节气特效生成函数
const createSeasonalEffects = () => {
  // 根据当前主题创建特效
  if ($state.themeStyle.value === 'bailu') {
    createDewDrops();
  } else if ($state.themeStyle.value === 'hanlu') {
    createFallingLeaves();
  } else if ($state.themeStyle.value === 'xiaohan') {
    createSnowflakes();
  }
};

// 白露特效：创建露珠
const createDewDrops = () => {
  const container = document.querySelector('.dew-drops-container');
  if (!container) return;
  
  // 清除现有元素
  container.innerHTML = '';
  
  // 创建露珠元素
  const dewCount = 15;
  for (let i = 0; i < dewCount; i++) {
    const dew = document.createElement('div');
    dew.className = 'dew-drop';
    dew.style.left = `${Math.random() * 100}%`;
    dew.style.top = `${Math.random() * 100}%`;
    dew.style.animationDelay = `${Math.random() * 5}s`;
    dew.style.width = `${5 + Math.random() * 10}px`;
    dew.style.height = dew.style.width;
    container.appendChild(dew);
  }
};

// 寒露特效：创建飘落的秋叶
const createFallingLeaves = () => {
  const container = document.querySelector('.falling-leaves-container');
  if (!container) return;
  
  // 清除现有元素
  container.innerHTML = '';
  
  // 创建秋叶元素
  const leafCount = 12;
  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'falling-leaf';
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.top = `-${10 + Math.random() * 20}px`;
    leaf.style.animationDuration = `${10 + Math.random() * 20}s`;
    leaf.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(leaf);
  }
};

// 小寒特效：创建飘落的雪花
const createSnowflakes = () => {
  const container = document.querySelector('.snowflakes-container');
  if (!container) return;
  
  // 清除现有元素
  container.innerHTML = '';
  
  // 创建雪花元素
  const snowCount = 20;
  for (let i = 0; i < snowCount; i++) {
    const snow = document.createElement('div');
    snow.className = 'snowflake';
    snow.style.left = `${Math.random() * 100}%`;
    snow.style.top = `-${10 + Math.random() * 20}px`;
    snow.style.opacity = `${0.5 + Math.random() * 0.5}`;
    snow.style.animationDuration = `${10 + Math.random() * 15}s`;
    snow.style.animationDelay = `${Math.random() * 5}s`;
    snow.style.width = `${3 + Math.random() * 5}px`;
    snow.style.height = snow.style.width;
    container.appendChild(snow);
  }
};

// 监听主题变化并重新创建特效
const themeChangeHandler = () => {
  createSeasonalEffects();
};

// 组件挂载时创建特效
onMounted(() => {
  createSeasonalEffects();
  window.addEventListener('themeChange', themeChangeHandler);
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('themeChange', themeChangeHandler);
});

// 搜索和筛选状态
const searchQuery = ref('');
const selectedCategory = ref('all');
const sortBy = ref('newest');

// 市场物品数据
const marketItems = ref([
  {
    id: 1,
    name: '源石刀',
    description: '明日方舟世界中的高级武器，由源石材料打造，可对抗感染者和敌对势力',
    price: '2,500 龙门币',
    originalPrice: '3,000 龙门币',
    discount: 17,
    image: 'https://via.placeholder.com/300x200?text=源石刀',
    category: '武器装备',
    rating: 4.8,
    seller: '罗德岛军需处',
    sales: 128,
  },
  {
    id: 2,
    name: '深海合金护甲',
    description: '鸣潮世界中的高级防护装备，由深海特殊材料制成，可抵御水压和海洋生物的攻击',
    price: '3,800 海晶币',
    originalPrice: '',
    discount: 0,
    image: 'https://via.placeholder.com/300x200?text=深海合金护甲',
    category: '防具护甲',
    rating: 4.5,
    seller: '深海科技公司',
    sales: 75,
  },
  {
    id: 3,
    name: '源石医疗包',
    description: '含有源石技术的医疗包，可快速治愈伤口，但对矿石病感染者使用需谨慎',
    price: '850 龙门币',
    originalPrice: '1,000 龙门币',
    discount: 15,
    image: 'https://via.placeholder.com/300x200?text=源石医疗包',
    category: '消耗品',
    rating: 4.9,
    seller: '罗德岛医疗部',
    sales: 312,
  },
  {
    id: 4,
    name: '海洋生物标本',
    description: '鸣潮世界中的珍稀变异海洋生物标本，收藏价值极高',
    price: '1,200 海晶币',
    originalPrice: '',
    discount: 0,
    image: 'https://via.placeholder.com/300x200?text=海洋生物标本',
    category: '收藏品',
    rating: 4.2,
    seller: '深海研究所',
    sales: 64,
  },
  {
    id: 5,
    name: '源石结晶',
    description: '明日方舟世界中的珍贵矿物，是制作高级装备的核心材料，也是矿石病的源头',
    price: '5,000 龙门币',
    originalPrice: '6,500 龙门币',
    discount: 23,
    image: 'https://via.placeholder.com/300x200?text=源石结晶',
    category: '收藏品',
    rating: 4.7,
    seller: '乌萨斯矿业',
    sales: 28,
  },
  {
    id: 6,
    name: '深海能量核心',
    description: '鸣潮世界中的高密度能量存储装置，由深海特殊生物提取的能量制成',
    price: '1,800 海晶币',
    originalPrice: '',
    discount: 0,
    image: 'https://via.placeholder.com/300x200?text=深海能量核心',
    category: '消耗品',
    rating: 4.6,
    seller: '深海能源公司',
    sales: 156,
  },
  {
    id: 7,
    name: '合成玉',
    description: '明日方舟世界中的高价值货币，由源石提纯而成，是高级交易的通用货币',
    price: '10,000 龙门币',
    originalPrice: '12,000 龙门币',
    discount: 17,
    image: 'https://via.placeholder.com/300x200?text=合成玉',
    category: '收藏品',
    rating: 5.0,
    seller: '罗德岛资源部',
    sales: 42,
  },
  {
    id: 8,
    name: '海嗣结晶',
    description: '鸣潮世界中的神秘物质，由海嗣生物体内提取，具有强大的能量和未知的潜力',
    price: '7,500 海晶币',
    originalPrice: '9,000 海晶币',
    discount: 17,
    image: 'https://via.placeholder.com/300x200?text=海嗣结晶',
    category: '收藏品',
    rating: 4.9,
    seller: '深海研究院',
    sales: 18,
  },
  {
    id: 9,
    name: '源石技艺装置',
    description: '明日方舟世界中的高科技装置，利用源石能量运作，可以释放强大的法术效果',
    price: '3,200 龙门币',
    originalPrice: '',
    discount: 0,
    image: 'https://via.placeholder.com/300x200?text=源石技艺装置',
    category: '武器装备',
    rating: 4.6,
    seller: '莱茵生命实验室',
    sales: 87,
  },
  {
    id: 10,
    name: '深海呼吸装置',
    description: '鸣潮世界中的必备装备，使用特殊技术过滤海水中的氧气，让人类可以在深海环境生存',
    price: '2,800 海晶币',
    originalPrice: '3,500 海晶币',
    discount: 20,
    image: 'https://via.placeholder.com/300x200?text=深海呼吸装置',
    category: '防具护甲',
    rating: 4.7,
    seller: '深海科技联盟',
    sales: 215,
  },
  {
    id: 11,
    name: '龙门币钱袋',
    description: '明日方舟世界中的通用货币，由龙门城市发行，是泰拉大陆上最广泛使用的交易媒介',
    price: '1,000 龙门币',
    originalPrice: '',
    discount: 0,
    image: 'https://via.placeholder.com/300x200?text=龙门币钱袋',
    category: '消耗品',
    rating: 4.3,
    seller: '龙门金融中心',
    sales: 567,
  },
  {
    id: 12,
    name: '海嗣抑制剂',
    description: '鸣潮世界中的战略物资，可以暂时抑制海嗣的活动和侵蚀，是对抗深海威胁的关键道具',
    price: '4,500 海晶币',
    originalPrice: '5,200 海晶币',
    discount: 13,
    image: 'https://via.placeholder.com/300x200?text=海嗣抑制剂',
    category: '消耗品',
    rating: 4.8,
    seller: '深海防御部',
    sales: 132,
  },
]);

// 筛选物品
const filteredItems = computed(() => {
  let result = [...marketItems.value];
  
  // 应用搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );
  }
  
  // 应用分类筛选
  if (selectedCategory.value !== 'all') {
    const categoryMap: Record<string, string> = {
      'weapon': '武器装备',
      'armor': '防具护甲',
      'consumable': '消耗品',
      'collectible': '收藏品'
    };
    
    result = result.filter(item => 
      item.category === categoryMap[selectedCategory.value]
    );
  }
  
  // 应用排序
  switch (sortBy.value) {
    case 'price_asc':
      result.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, '')));
      break;
    case 'price_desc':
      result.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, '')));
      break;
    case 'newest':
      // 这里假设id越大表示越新
      result.sort((a, b) => b.id - a.id);
      break;
    case 'popular':
      result.sort((a, b) => b.sales - a.sales);
      break;
  }
  
  return result;
});

// 最近交易记录
const recentTrades = ref([
  {
    item: '源石结晶',
    itemImage: 'https://via.placeholder.com/50x50?text=源石结晶',
    price: '4,800 龙门币',
    buyer: '凯尔希',
    seller: '乌萨斯矿业',
    time: '10分钟前'
  },
  {
    item: '海嗣结晶',
    itemImage: 'https://via.placeholder.com/50x50?text=海嗣结晶',
    price: '7,200 海晶币',
    buyer: '星熊',
    seller: '深海研究院',
    time: '25分钟前'
  },
  {
    item: '合成玉',
    itemImage: 'https://via.placeholder.com/50x50?text=合成玉',
    price: '9,500 龙门币',
    buyer: '阿米娅',
    seller: '罗德岛资源部',
    time: '1小时前'
  },
  {
    item: '深海能量核心',
    itemImage: 'https://via.placeholder.com/50x50?text=深海能量核心',
    price: '1,950 海晶币',
    buyer: '特雷西斯',
    seller: '深海能源公司',
    time: '2小时前'
  },
  {
    item: '源石技艺装置',
    itemImage: 'https://via.placeholder.com/50x50?text=源石技艺装置',
    price: '3,100 龙门币',
    buyer: '陈',
    seller: '莱茵生命实验室',
    time: '3小时前'
  },
]);
</script>

<style scoped>
.neon-border {
  box-shadow: 0 0 5px rgba(var(--color-neon-blue), 0.5);
}

.hover\:neon-border:hover {
  box-shadow: 0 0 10px rgba(var(--color-neon-blue), 0.7);
}

.hover\:shadow-neon:hover {
  box-shadow: 0 0 15px rgba(var(--color-neon-blue), 0.7);
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}

/* 节气特定文字发光效果 */
.seasonal-text-glow {
  text-shadow: 0 0 8px rgba(var(--decoration-color-1), 0.7);
  transition: text-shadow 0.5s ease;
}

/* 白露特效容器 */
.dew-drops-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
}

/* 白露特效：露珠 */
.dew-drop {
  position: absolute;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(215, 190, 105, 0.4));
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(215, 190, 105, 0.6);
  animation: dewGlisten 5s ease-in-out infinite;
  z-index: 5;
}

@keyframes dewGlisten {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

/* 寒露特效容器 */
.falling-leaves-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
}

/* 寒露特效：飘落的秋叶 */
.falling-leaf {
  position: absolute;
  width: 15px;
  height: 15px;
  background-image: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.5 1 Q12 7.5 7.5 14 Q3 7.5 7.5 1 Z' fill='rgba(106, 133, 182, 0.7)' /%3E%3C/svg%3E");
  animation: leafFall linear forwards, leafSwing 3s ease-in-out infinite;
  z-index: 5;
}

@keyframes leafFall {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(1000px) rotate(360deg); }
}

@keyframes leafSwing {
  0%, 100% { transform: translateX(-5px) rotate(-5deg); }
  50% { transform: translateX(5px) rotate(5deg); }
}

/* 小寒特效容器 */
.snowflakes-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
}

/* 小寒特效：雪花 */
.snowflake {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  animation: snowFall linear forwards;
  z-index: 5;
}

@keyframes snowFall {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(1000px) rotate(360deg); }
}
</style>