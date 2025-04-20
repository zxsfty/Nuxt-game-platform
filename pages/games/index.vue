<template>
  <div class="space-y-8 relative">
    <!-- 季节性背景 -->
    <SeasonalBackground />
    
    <!-- 导航栏 -->
    <NavBar />
    
    <!-- 主视觉图像 -->
    <section class="main-visual relative h-80 rounded-lg overflow-hidden">
      <img :src="gameImageBanner" alt="游戏平台" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-secondary-dark/70 to-transparent"></div>
      <div class="absolute bottom-0 left-0 p-8 w-full">
        <h1 class="text-5xl font-bold mb-2 text-primary-accent font-serif">游戏世界</h1>
        <p class="text-xl mb-4 text-primary-light max-w-2xl">探索无限可能，体验精彩游戏</p>
      </div>
    </section>
    
    <!-- 主题切换卡片 -->
    <section class="theme-toggle-section bg-primary-light p-6 rounded-lg border border-primary-accent/30">
      <ThemeStyleToggle />
    </section>
    
    <section class="hero-section bg-primary-light rounded-lg p-8 border border-primary-accent/30 relative overflow-hidden">
      <!-- 使用季节场景组件 -->
      <SeasonalScene>
        <div class="max-w-3xl mx-auto text-center relative z-10">
          <h1 class="text-5xl font-bold mb-6 text-primary-accent font-serif seasonal-text-glow">The broken with star sinks</h1>
          <p class="text-xl mb-8">The broken with star sinks</p>
          <div class="flex justify-center space-x-4">
            <button class="bg-primary-accent/80 hover:bg-primary-accent text-primary-light font-bold py-2 px-4 rounded-full transition-all">
              热门游戏
            </button>
            <button class="bg-transparent hover:bg-primary-accent/20 text-primary-light font-bold py-2 px-4 rounded-full border border-primary-accent transition-all">
              最新发布
            </button>
            <button class="bg-transparent hover:bg-primary-accent/20 text-primary-light font-bold py-2 px-4 rounded-full border border-primary-accent transition-all">
              游戏排行
            </button>
            <button class="bg-transparent hover:bg-primary-accent/20 text-primary-light font-bold py-2 px-4 rounded-full border border-primary-accent transition-all">
              个人中心
            </button>
          </div>
        </div>
      </SeasonalScene>
    </section>

    <!-- 游戏分类图标 -->
    <section class="game-categories bg-primary-light p-6 rounded-lg border border-primary-accent/30">
      <h2 class="text-xl font-bold text-primary-accent mb-4 font-serif">游戏分类</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div 
          v-for="category in gameCategories" 
          :key="category.id"
          class="category-item bg-secondary-dark p-4 rounded-lg text-center cursor-pointer transition-all hover:bg-primary-accent/20 hover:scale-105"
          @click="selectedGenre = category.id"
        >
          <div class="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-primary-accent/30">
            <img :src="category.icon" :alt="category.name" class="w-full h-full object-cover">
          </div>
          <p class="text-primary-light font-medium">{{ category.name }}</p>
        </div>
      </div>
    </section>

    <!-- 游戏筛选区域 -->
    <section class="filter-section bg-primary-light p-6 rounded-lg border border-primary-accent/30">
      <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div class="flex-1">
          <div class="relative">
            <input 
              type="text" 
              placeholder="搜索游戏..." 
              class="w-full bg-secondary-dark border border-primary-accent/30 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-accent"
              v-model="searchQuery"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div class="flex space-x-2">
          <select 
            class="bg-secondary-dark border border-primary-accent/30 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-accent"
            v-model="selectedGenre"
          >
            <option value="all">所有类型</option>
            <option value="rpg">角色扮演</option>
            <option value="fps">第一人称射击</option>
            <option value="strategy">策略</option>
            <option value="simulation">模拟</option>
            <option value="adventure">冒险</option>
          </select>
          <select 
            class="bg-secondary-dark border border-primary-accent/30 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-accent"
            v-model="sortBy"
          >
            <option value="rating">评分最高</option>
            <option value="newest">最新发布</option>
            <option value="popular">最受欢迎</option>
            <option value="price_asc">价格 ↑</option>
            <option value="price_desc">价格 ↓</option>
          </select>
        </div>
      </div>
    </section>

    <!-- 特色游戏 -->
    <section class="featured-games">
      <h2 class="text-3xl font-bold text-primary-accent mb-6 font-serif">特色游戏</h2>
      <div class="relative overflow-hidden rounded-lg border border-primary-accent/30">
        <!-- 轮播图 -->
        <div class="relative h-96">
          <div 
            v-for="(game, index) in featuredGames" 
            :key="index"
            class="absolute inset-0 transition-opacity duration-1000"
            :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
          >
            <img :src="game.image" :alt="game.title" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 via-secondary-dark/40 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-8 w-full">
              <h3 class="text-4xl font-bold mb-2 text-primary-accent font-serif">{{ game.title }}</h3>
              <p class="text-xl mb-4 text-primary-light max-w-2xl">{{ game.description }}</p>
              <div class="flex items-center space-x-4 mb-4">
                <div class="flex items-center">
                  <span class="text-primary-accent font-bold text-2xl">{{ game.rating }}</span>
                  <span class="text-secondary-light ml-1">/10</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span class="text-secondary-light">类型:</span>
                  <span class="text-primary-light">{{ game.genre }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span class="text-secondary-light">发行日期:</span>
                  <span class="text-primary-light">{{ game.releaseDate }}</span>
                </div>
              </div>
              <div class="flex space-x-4">
                <button class="bg-primary-accent/80 hover:bg-primary-accent text-primary-light font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105">
                  了解详情
                </button>
                <button class="bg-transparent hover:bg-primary-accent/20 text-primary-light font-bold py-2 px-6 rounded-full border border-primary-accent transition-all transform hover:scale-105">
                  加入愿望单
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 轮播控制 -->
        <div class="absolute bottom-4 right-4 flex space-x-2">
          <button 
            v-for="(_, index) in featuredGames" 
            :key="index"
            @click="currentSlide = index"
            class="w-3 h-3 rounded-full transition-all"
            :class="currentSlide === index ? 'bg-neon-blue scale-125' : 'bg-gray-400 hover:bg-neon-blue/50'"
          ></button>
        </div>
      </div>
    </section>

    <!-- 游戏列表 -->
    <section class="games-grid">
      <h2 class="text-3xl font-bold text-neon-blue mb-6">探索游戏</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(game, index) in filteredGames" 
          :key="index"
          class="bg-primary-light rounded-lg overflow-hidden hover:neon-border transition-all duration-300 transform hover:scale-102 hover:shadow-neon group border border-primary-accent/30"
        >
          <div class="relative">
            <img :src="game.image" :alt="game.title" class="w-full h-48 object-cover" />
            <div class="absolute top-2 right-2 bg-neon-purple text-white text-xs rounded-full px-2 py-1">
              {{ game.genre }}
            </div>
            <div v-if="game.discount" class="absolute top-2 left-2 bg-neon-red text-white text-xs rounded-full px-2 py-1">
              -{{ game.discount }}%
            </div>
          </div>
          
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold group-hover:text-neon-blue transition-colors">{{ game.title }}</h3>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-sm ml-1">{{ game.rating }}</span>
              </div>
            </div>
            
            <p class="text-gray-400 text-sm mb-4 line-clamp-2">{{ game.description }}</p>
            
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <span class="text-neon-blue font-bold text-xl">{{ game.price }}</span>
                <span v-if="game.originalPrice" class="text-gray-400 line-through text-sm ml-2">{{ game.originalPrice }}</span>
              </div>
              <button class="bg-neon-purple hover:bg-neon-blue text-white text-sm py-1 px-3 rounded-full transition-colors">
                查看详情
              </button>
            </div>
            
            <div class="flex items-center mt-3 text-xs text-gray-400">
              <span>开发商: {{ game.developer }}</span>
              <span class="mx-2">•</span>
              <span>发行日期: {{ game.releaseDate }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 加载更多按钮 -->
      <div class="flex justify-center mt-8">
        <button class="bg-secondary-dark hover:bg-neon-purple text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 border border-neon-blue/30">
          加载更多游戏
        </button>
      </div>
    </section>

    <!-- 即将推出的游戏区域 -->
    <UpcomingGamesSection :games="upcomingGames" />

    <!-- 页脚区域 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import ThemeStyleToggle from '@/components/ThemeStyleToggle.vue';
import { useNuxtApp, useState, useHead } from 'nuxt/app';
import { throttle, truncateText } from '~/utils';
import NavBar from '~/components/NavBar.vue';
import Footer from '~/components/Footer.vue';
import SeasonalScene from '~/components/SeasonalScene.vue'; // 引入季节场景组件
import UpcomingGamesSection from '~/components/UpcomingGamesSection.vue'; // 引入即将上线游戏组件
import SeasonalBackground from '~/components/SeasonalBackground.vue'; // 引入季节背景组件

// SEO元数据
useHead({
  title: '游戏世界 - 探索精彩游戏，尽在游戏平台',
  meta: [
    { name: 'description', content: '发现最新、最热门的游戏，包括角色扮演、策略、射击、冒险等多种类型。体验精彩游戏世界，尽在游戏平台。' },
    { name: 'keywords', content: '游戏平台,游戏世界,角色扮演,策略游戏,射击游戏,冒险游戏,热门游戏' }
  ]
});

// 使用 Nuxt 的 useState 来获取共享的主题状态
const $state = {
  themeStyle: useState('themeStyle', () => 'bailu') // Default theme
}

// 搜索和筛选状态
const searchQuery = ref('');
const selectedGenre = ref('all');
const sortBy = ref('rating');

// 轮播状态
const currentSlide = ref(0);

// 自动轮播
onMounted(() => {
  const slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % featuredGames.value.length;
  }, 5000);

  // 组件卸载时清除定时器
  return () => clearInterval(slideInterval);
});

// 图片路径
const gameImagePath = (imageName: string) => {
  return new URL(`/assets/images/games/${imageName}`, import.meta.url).href;
};

// 主视觉图像
const gameImageBanner = "https://via.placeholder.com/1920x600?text=GAME+WORLD";

// 游戏分类图标
const gameCategories = ref([
  { name: '角色扮演', icon: 'https://via.placeholder.com/100x100?text=RPG', id: 'rpg' },
  { name: '射击游戏', icon: 'https://via.placeholder.com/100x100?text=FPS', id: 'fps' },
  { name: '策略游戏', icon: 'https://via.placeholder.com/100x100?text=策略', id: 'strategy' },
  { name: '模拟游戏', icon: 'https://via.placeholder.com/100x100?text=模拟', id: 'simulation' },
  { name: '冒险游戏', icon: 'https://via.placeholder.com/100x100?text=冒险', id: 'adventure' }
]);

// 特色游戏数据
const featuredGames = ref([
  {
    id: 1,
    title: '鸣潮：深海回响',
    description: truncateText('在未来的海洋都市中，作为一名特殊能力者，你将与伙伴们一起对抗深海中的神秘威胁，保卫人类最后的家园。', 150),
    image: gameImagePath('wuthering-waves.svg'),
    rating: 9.2,
    genre: '战术RPG',
    releaseDate: '2023-12-15',
    price: '¥298',
  },
  {
    id: 2,
    title: '明日方舟：终末地',
    description: truncateText('在矿石病肆虐的世界中，作为罗德岛的一员，指挥精英干员小队，应对各种危机与灾难，寻找矿石病的解药。', 150),
    image: gameImagePath('arknights.svg'),
    rating: 8.9,
    genre: '塔防策略',
    releaseDate: '2023-10-20',
    price: '¥259',
    originalPrice: '¥299',
    discount: 15,
    developer: '鹰角网络',
  },
  {
    id: 3,
    title: '鸣潮：深蓝档案',
    description: truncateText('探索被淹没的古代城市遗迹，收集失落的科技与文明记录，揭开海洋变异生物的起源与人类历史的真相。', 150),
    image: gameImagePath('wuthering-waves-blue.svg'),
    rating: 9.5,
    genre: '开放世界',
    releaseDate: '2023-11-05',
    price: '¥328',
    originalPrice: '',
    discount: 0,
    developer: '库伦科技',
  },
  {
    id: 4,
    title: '明日方舟：源石尘行动',
    description: truncateText('在感染区执行特殊任务，与精英敌人作战，收集珍贵的源石样本，阻止灾难性的源石爆发事件。', 150),
    image: gameImagePath('arknights-dust.svg'),
    rating: 8.7,
    genre: '战术射击',
    releaseDate: '2023-09-12',
    price: '¥199',
    originalPrice: '¥249',
    discount: 20,
    developer: '鹰角网络',
  },
  {
    id: 5,
    title: '鸣潮：深渊猎人',
    description: truncateText('作为一名深海猎人，潜入海洋最深处，捕获稀有生物，收集珍贵材料，升级你的装备与潜水技术。', 150),
    image: gameImagePath('wuthering-waves-abyss.svg'),
    rating: 9.0,
    genre: '生存冒险',
  },
  {
    id: 6,
    title: '明日方舟：终焉地',
    description: truncateText('在废土世界中探索未知区域，指挥特种作战小队，对抗神秘组织，揭开终焉之地的秘密。', 150),
    image: gameImagePath('arknights-endfield.svg'),
    rating: 9.3,
    genre: '开放世界RPG',
    releaseDate: '2023-08-30',
    price: '¥279',
    originalPrice: '',
    discount: 0,
    developer: '深海工作室',
  },
  {
    id: 7,
    title: '明日方舟：黄昏行动',
    description: '在乌萨斯与维多利亚的边境冲突中，指挥特别行动小组执行秘密任务，阻止一场可能引发全面战争的阴谋。',
    image: 'https://via.placeholder.com/400x200?text=明日方舟：黄昏行动',
    rating: 8.8,
    genre: '战略模拟',
    releaseDate: '2023-07-15',
    price: '¥229',
    originalPrice: '¥299',
    discount: 25,
    developer: '鹰角网络',
  },
]);

// 筛选游戏
const filteredGames = computed(() => {
  let result = [...featuredGames.value];
  
  // 应用搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(game => 
      game.title.toLowerCase().includes(query) || 
      game.description.toLowerCase().includes(query)
    );
  }
  
  // 应用类型筛选
  if (selectedGenre.value !== 'all') {
    const genreMap: { [key: string]: string } = {
      'rpg': '角色扮演',
      'fps': '第一人称射击',
      'strategy': '策略',
      'simulation': '模拟',
      'adventure': '冒险'
    };
    
    result = result.filter(game => 
      game.genre === genreMap[selectedGenre.value] || 
      game.genre.toLowerCase().includes(selectedGenre.value.toLowerCase())
    );
  }
  
  // 应用排序
  switch (sortBy.value) {
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result.sort((a, b) => {
        const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
        const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
        return dateB - dateA;
      });
      break;
    case 'popular':
      // 这里假设id越小表示越受欢迎（实际应用中可能需要其他指标）
      result.sort((a, b) => a.id - b.id);
      break;
    case 'price_asc':
      result.sort((a, b) => {
        const priceA = a.price ? parseFloat(a.price.replace(/[^0-9.]/g, '')) : 0;
        const priceB = b.price ? parseFloat(b.price.replace(/[^0-9.]/g, '')) : 0;
        return priceA - priceB;
      });
      break;
    case 'price_desc':
      result.sort((a, b) => {
        const priceA = a.price ? parseFloat(a.price.replace(/[^0-9.]/g, '')) : 0;
        const priceB = b.price ? parseFloat(b.price.replace(/[^0-9.]/g, '')) : 0;
        return priceB - priceA;
      });
      break;
  }
  
  return result;
});

// 即将推出的游戏
const upcomingGames = ref([
  {
    title: '深海探险',
    description: '探索神秘的海底世界，揭开远古文明的秘密，面对深海未知的危险生物。',
    releaseDate: '2024-01-20',
    image: '/assets/images/games/wuthering-waves.svg',
    developer: '深蓝工作室'
  },
  {
    title: '火星殖民',
    description: '在红色星球上建立人类第一个殖民地，管理资源，扩展基地，确保居民的生存。',
    releaseDate: '2024-02-15',
    image: '/assets/images/games/wuthering-waves-abyss.svg',
    developer: '星际科技'
  },
  {
    title: '时间守护者',
    description: '穿越不同的历史时期，修复被篡改的时间线，防止历史被扭曲导致的灾难性后果。',
    releaseDate: '2024-03-10',
    image: '/assets/images/games/arknights.svg',
    developer: '时光工作室'
  },
  {
    title: '神经网络',
    description: '在充满高科技的赛博朋克世界中，作为一名黑客，深入网络核心，对抗强大的人工智能。',
    releaseDate: '2024-04-05',
    image: '/assets/images/games/arknights-endfield.svg',
    developer: '数字梦境'
  }
]);
</script>

<style scoped>
/* 确保样式隔离 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}

.hover\:shadow-neon:hover {
  box-shadow: 0 0 15px rgba(var(--color-neon-blue-rgb), 0.5);
}

.hover\:neon-border:hover {
  border-color: rgba(var(--color-neon-blue-rgb), 0.7);
}

/* 添加对 $state 的依赖，确保样式能正确应用 */
.hero-section {
  /* 可以在这里添加一些基础样式，如果需要的话 */
}

.seasonal-text-glow {
  /* 确保这个类有对应的样式定义，可能在全局 CSS 中 */
  /* text-shadow: 0 0 8px rgba(var(--color-neon-blue-rgb), 0.7); */
}

/* 确保动画容器的样式已在全局 CSS (seasonal-animations.css/seasonal-scene-elements.css) 中定义 */
.dew-drops-container,
.falling-leaves-container,
.snowflakes-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 确保不影响交互 */
  z-index: 5; /* 确保在内容之下，但在背景之上 */
}

/* 确保节气背景图案样式已在全局 CSS (themes.css) 中定义 */
.bailu-pattern {
  /* background-image: url('@/assets/images/bailu-pattern.png'); */
}
.hanlu-pattern {
  /* background-image: url('@/assets/images/hanlu-pattern.png'); */
}
.xiaohan-pattern {
  /* background-image: url('@/assets/images/xiaohan-pattern.png'); */
}
</style>