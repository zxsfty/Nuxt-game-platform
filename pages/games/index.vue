<template>
  <div class="space-y-8">
    <!-- 主题切换卡片 -->
    <section class="theme-toggle-section bg-primary-light p-6 rounded-lg border border-primary-accent/30">
      <ThemeStyleToggle />
    </section>
    <section class="hero-section bg-primary-light rounded-lg p-8 border border-primary-accent/30">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6 text-primary-accent font-serif">The broken with star sinks</h1>
        <p class="text-xl mb-8">The broken with star sinks</p>
        <div class="flex justify-center space-x-4">
          <button class="bg-primary-accent/80 hover:bg-primary-accent text-primary-light font-bold py-2 px-4 rounded-full transition-all">
            热门游戏
          </button>
          <button class="bg-transparent hover:bg-primary-accent/20 text-primary-light font-bold py-2 px-4 rounded-full border border-primary-accent transition-all">
            最新发布
          </button>
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
          class="bg-primary-light rounded-lg overflow-hidden hover:neon-border transition-all duration-300 transform hover:scale-102 hover:shadow-neon group"
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

    <!-- 即将推出 -->
    <section class="upcoming-games bg-primary-light rounded-lg p-6 neon-border">
      <h2 class="text-2xl font-bold text-neon-blue mb-4">即将推出</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(game, index) in upcomingGames" :key="index" class="relative group">
          <img :src="game.image" :alt="game.title" class="w-full h-40 object-cover rounded-lg" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
            <div>
              <h3 class="text-lg font-bold text-neon-blue">{{ game.title }}</h3>
              <p class="text-xs text-gray-300">预计发行: {{ game.releaseDate }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 搜索和筛选状态
const searchQuery = ref('');
const selectedGenre = ref('all');
const sortBy = ref('rating');

// 轮播状态
const currentSlide = ref(0);

// 特色游戏数据
const featuredGames = ref([
  {
    id: 1,
    title: '星际探索者',
    description: '探索浩瀚宇宙，发现未知文明，在这款开放世界太空冒险游戏中成为传奇星际探险家。',
    image: 'https://via.placeholder.com/1200x600?text=星际探索者',
    rating: 9.2,
    genre: '太空探险',
    releaseDate: '2023-12-15',
    price: '¥298',
  },
  {
    id: 2,
    title: '量子战争',
    description: '在多元宇宙的战场上，指挥你的量子部队，利用时空扭曲和物理法则的变化获得胜利。',
    image: 'https://via.placeholder.com/400x200?text=量子战争',
    rating: 8.9,
    genre: '策略',
    releaseDate: '2023-10-20',
    price: '¥259',
    originalPrice: '¥299',
    discount: 15,
    developer: '量子游戏',
  },
  {
    id: 3,
    title: '赛博朋克2099',
    description: '在这个高度数字化的反乌托邦世界中，作为一名增强人类，你将揭露巨型企业的阴谋并决定城市的命运。',
    image: 'https://via.placeholder.com/400x200?text=赛博朋克2099',
    rating: 9.5,
    genre: '角色扮演',
    releaseDate: '2023-11-05',
    price: '¥328',
    originalPrice: '',
    discount: 0,
    developer: '未来视觉',
  },
  {
    id: 4,
    title: '机械纪元',
    description: '在一个被机器统治的世界中，操控你的定制机甲，与敌对势力作战，夺回人类的家园。',
    image: 'https://via.placeholder.com/400x200?text=机械纪元',
    rating: 8.7,
    genre: '机甲模拟',
    releaseDate: '2023-09-12',
    price: '¥199',
    originalPrice: '¥249',
    discount: 20,
    developer: '机械工坊',
  },
  {
    id: 5,
    title: '虚空行者',
    description: '作为一名拥有超能力的虚空行者，你可以穿越维度，解决宇宙中的神秘事件和威胁。',
    image: 'https://via.placeholder.com/400x200?text=虚空行者',
    rating: 9.0,
    genre: '冒险',
    releaseDate: '2023-08-30',
    price: '¥279',
    originalPrice: '',
    discount: 0,
    developer: '维度工作室',
  },
  {
    id: 6,
    title: '生化危机：新纪元',
    description: '在一场全球性的生化灾难后，你必须在充满变异生物的世界中生存，并寻找疫苗的线索。',
    image: 'https://via.placeholder.com/400x200?text=生化危机：新纪元',
    rating: 8.8,
    genre: '生存恐怖',
    releaseDate: '2023-07-15',
    price: '¥229',
    originalPrice: '¥299',
    discount: 25,
    developer: '生存游戏',
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
      result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      break;
    case 'popular':
      // 这里假设id越小表示越受欢迎（实际应用中可能需要其他指标）
      result.sort((a, b) => a.id - b.id);
      break;
    case 'price_asc':
      result.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, '')));
      break;
    case 'price_desc':
      result.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, '')));
      break;
  }
  
  return result;
});

// 即将推出的游戏
const upcomingGames = ref([
  {
    title: '深海探险',
    releaseDate: '2024-01-20',
    image: 'https://via.placeholder.com/200x150?text=深海探险'
  },
  {
    title: '火星殖民',
    releaseDate: '2024-02-15',
    image: 'https://via.placeholder.com/200x150?text=火星殖民'
  },
  {
    title: '时间守护者',
    releaseDate: '2024-03-10',
    image: 'https://via.placeholder.com/200x150?text=时间守护者'
  },
  {
    title: '神经网络',
    releaseDate: '2024-04-05',
    image: 'https://via.placeholder.com/200x150?text=神经网络'
  }
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>