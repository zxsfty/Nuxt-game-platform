<template>
  <section class="upcoming-games-section">
    <h2 class="text-3xl font-bold mb-6 text-primary-accent relative font-serif text-center">
      <span class="relative z-10">即将上线</span>
      <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-24 bg-gradient-to-r from-transparent via-primary-accent to-transparent"></span>
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="(game, index) in games" 
        :key="index" 
        class="upcoming-game-card relative overflow-hidden group"
        :class="`upcoming-game-card-${$state.themeStyle.value}`"
      >
        <!-- 季节特定装饰元素 -->
        <div class="seasonal-pattern absolute inset-0 opacity-5" :class="`${$state.themeStyle.value}-pattern`"></div>
        
        <!-- 游戏图片 -->
        <div class="relative h-48 overflow-hidden">
          <img :src="game.image" :alt="game.title" class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-secondary-dark/90 via-secondary-dark/50 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <span class="bg-primary-accent text-primary-light px-2 py-1 rounded text-xs font-semibold">
              {{ formatDate(game.releaseDate) }}发布
            </span>
          </div>
        </div>
        
        <!-- 游戏信息 -->
        <div class="p-4 bg-primary-light">
          <h3 class="text-lg font-bold mb-2 transition-colors duration-300 group-hover:text-primary-accent">{{ game.title }}</h3>
          <p class="text-sm text-secondary-light mb-3 line-clamp-2">{{ game.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm text-secondary-light">{{ game.developer }}</span>
            <div class="seasonal-decoration h-6 w-6" :class="`seasonal-icon-${$state.themeStyle.value}`"></div>
          </div>
          <button class="mt-3 w-full bg-primary-accent hover:bg-primary-accent/80 text-primary-light py-2 rounded-md text-sm transition-colors">
            预约获取
          </button>
        </div>
        
        <!-- 季节装饰边角 -->
        <div class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg" :class="`border-${$state.themeStyle.value}`"></div>
        <div class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg" :class="`border-${$state.themeStyle.value}`"></div>
        <div class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg" :class="`border-${$state.themeStyle.value}`"></div>
        <div class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-lg" :class="`border-${$state.themeStyle.value}`"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useState } from 'nuxt/app';

// Props
const props = defineProps({
  games: {
    type: Array,
    required: true
  }
});

// 使用Nuxt的useState来获取当前主题状态
const $state = {
  themeStyle: useState('themeStyle', () => 'bailu')
};

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
};
</script>

<style scoped>
.upcoming-games-section {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.upcoming-game-card {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: rgb(var(--color-primary-light));
  backdrop-filter: blur(8px);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.upcoming-game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15), 0 0 10px rgba(var(--decoration-color-1), 0.3);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

/* 白露主题装饰 */
.upcoming-game-card-bailu:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15), 0 0 10px rgba(215, 190, 105, 0.3);
}

.border-bailu {
  border-color: rgba(215, 190, 105, 0.7);
}

.seasonal-icon-bailu {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(215, 190, 105)"><circle cx="12" cy="12" r="10" fill="none" stroke="rgb(215, 190, 105)" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="none" stroke="rgb(215, 190, 105)" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="rgb(215, 190, 105)"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
}

/* 寒露主题装饰 */
.upcoming-game-card-hanlu:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15), 0 0 10px rgba(80, 140, 190, 0.3);
}

.border-hanlu {
  border-color: rgba(80, 140, 190, 0.7);
}

.seasonal-icon-hanlu {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(80, 140, 190)"><path d="M12 2.5L9 9H3.5L7.5 13.5L6 19.5L12 16L18 19.5L16.5 13.5L20.5 9H15L12 2.5Z" stroke="rgb(80, 140, 190)" stroke-width="1.5" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
}

/* 小寒主题装饰 */
.upcoming-game-card-xiaohan:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15), 0 0 10px rgba(202, 202, 212, 0.3);
}

.border-xiaohan {
  border-color: rgba(202, 202, 212, 0.7);
}

.seasonal-icon-xiaohan {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(202, 202, 212)"><path d="M12 3L13.5 9H20L15 13L17 19L12 15L7 19L9 13L4 9H10.5L12 3Z" stroke="rgb(202, 202, 212)" stroke-width="1.5" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
}
</style> 