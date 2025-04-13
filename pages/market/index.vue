<template>
  <div class="space-y-8">
    <section class="hero-section bg-primary-light rounded-lg p-8 border-2 border-neon-blue">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6 text-neon-blue">科幻游戏交易平台</h1>
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
    <section class="search-section bg-primary-light p-6 rounded-lg neon-border">
      <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
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
      <h2 class="text-3xl font-bold text-neon-blue mb-6">热门交易物品</h2>
      
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
    <section class="trends-section bg-primary-light p-6 rounded-lg neon-border">
      <h2 class="text-2xl font-bold text-neon-blue mb-4">市场价格趋势</h2>
      <div class="h-64 bg-secondary-dark rounded-lg p-4 flex items-center justify-center">
        <!-- 这里将来可以集成实际的图表库，如Chart.js或Echarts -->
        <p class="text-gray-400">价格趋势图表将在这里显示</p>
      </div>
    </section>

    <!-- 最近交易记录 -->
    <section class="recent-trades">
      <h2 class="text-2xl font-bold text-neon-blue mb-4">最近交易记录</h2>
      <div class="bg-primary-light rounded-lg overflow-hidden neon-border">
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
import { ref, computed } from 'vue';

// 搜索和筛选状态
const searchQuery = ref('');
const selectedCategory = ref('all');
const sortBy = ref('newest');

// 市场物品数据
const marketItems = ref([
  {
    id: 1,
    name: '量子粒子剑',
    description: '由量子技术打造的高级武器，可穿透敌人护甲',
    price: '2,500 星币',
    originalPrice: '3,000 星币',
    discount: 17,
    image: 'https://via.placeholder.com/300x200?text=量子粒子剑',
    category: '武器装备',
    rating: 4.8,
    seller: '星际武器商',
    sales: 128,
  },
  {
    id: 2,
    name: '反物质护甲',
    description: '高科技防护装备，可抵御大多数能量武器的伤害',
    price: '3,800 星币',
    originalPrice: '',
    discount: 0,
    image: 'https://via.placeholder.com/300x200?text=反物质护甲',
    category: '防具护甲',
    rating: 4.5,
    seller: '防御系统公司',
    sales: 75,
  },
  {
    id: 3,
    name: '纳米医疗包',
    description: '含有纳米机器人的医疗包，可快速治愈伤口',
    price: '850 星币',
    originalPrice: '1,000 星币',
    discount: 15,
    image: 'https://via.placeholder.com/300x200?text=纳米医疗包',
    category: '消耗品',
    rating: 4.9,
    seller: '医疗科技实验室',
    sales: 312,
  },
  {
    id: 4,
    name: '全息投影装置',
    description: '可创建逼真的3D全息影像，用于战术迷惑或娱乐',
    price: '1,200 星币',
    originalPrice: '',
    discount: 0,
    image: 'https://via.placeholder.com/300x200?text=全息投影装置',
    category: '收藏品',
    rating: 4.2,
    seller: '科技创新者',
    sales: 64,
  },
  {
    id: 5,
    name: '时空扭曲器',
    description: '实验性装置，可短暂减缓周围区域的时间流速',
    price: '5,000 星币',
    originalPrice: '6,500 星币',
    discount: 23,
    image: 'https://via.placeholder.com/300x200?text=时空扭曲器',
    category: '收藏品',
    rating: 4.7,
    seller: '时间研究所',
    sales: 28,
  },
  {
    id: 6,
    name: '能量核心',
    description: '高密度能量存储装置，可为各种设备提供长时间动力',
    price: '1,800 星币',
    originalPrice: '',
    discount: 0,
    image: 'https://via.placeholder.com/300x200?text=能量核心',
    category: '消耗品',
    rating: 4.6,
    seller: '能源科技公司',
    sales: 156,
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
    item: '量子粒子剑',
    itemImage: 'https://via.placeholder.com/50x50?text=量子粒子剑',
    price: '2,450 星币',
    buyer: '星际旅行者',
    seller: '星际武器商',
    time: '10分钟前'
  },
  {
    item: '纳米医疗包',
    itemImage: 'https://via.placeholder.com/50x50?text=纳米医疗包',
    price: '850 星币',
    buyer: '量子猎手',
    seller: '医疗科技实验室',
    time: '25分钟前'
  },
  {
    item: '反物质护甲',
    itemImage: 'https://via.placeholder.com/50x50?text=反物质护甲',
    price: '3,750 星币',
    buyer: '虚空行者',
    seller: '防御系统公司',
    time: '1小时前'
  },
  {
    item: '能量核心',
    itemImage: 'https://via.placeholder.com/50x50?text=能量核心',
    price: '1,800 星币',
    buyer: '机械师',
    seller: '能源科技公司',
    time: '2小时前'
  },
  {
    item: '全息投影装置',
    itemImage: 'https://via.placeholder.com/50x50?text=全息投影装置',
    price: '1,150 星币',
    buyer: '数据分析师',
    seller: '科技创新者',
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
</style>