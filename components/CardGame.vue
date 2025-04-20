<template>
  <div 
    class="bg-primary-light rounded-lg overflow-hidden border border-primary-accent/30 transition-all duration-300 group card-hover-effect"
  >
    <div class="relative">
      <img :src="game.image" :alt="game.title" class="w-full h-52 object-cover transform transition-transform duration-500 group-hover:scale-110" />
      
      <!-- 渐变叠加层 -->
      <div class="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- 标签 -->
      <div class="absolute top-3 right-3 z-10">
        <span class="bg-primary-accent text-primary-light text-xs font-medium px-2.5 py-1 rounded-full">
          {{ game.genre }}
        </span>
      </div>
      
      <!-- 折扣标签 -->
      <div v-if="game.discount" class="absolute top-3 left-3 z-10">
        <span class="bg-neon-red text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
          -{{ game.discount }}%
        </span>
      </div>
      
      <!-- 悬停时显示的操作按钮 -->
      <div class="absolute inset-x-0 bottom-0 flex justify-center items-center gap-2 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
        <button class="btn-glow bg-primary-accent hover:bg-primary-accent/80 text-primary-light text-sm py-1.5 px-4 rounded-full transition-colors">
          查看详情
        </button>
        <button class="btn-glow bg-transparent border border-primary-light text-primary-light text-sm py-1.5 px-4 rounded-full hover:bg-primary-light/10 transition-colors">
          加入愿望单
        </button>
      </div>
    </div>
    
    <div class="p-5">
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-xl font-bold text-primary-accent transition-colors group-hover:text-neon-blue group-hover:neon-text">{{ game.title }}</h3>
        <div class="flex items-center gap-1 bg-secondary-dark/30 rounded-full px-2 py-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-primary-light text-sm font-medium">{{ game.rating }}</span>
        </div>
      </div>
      
      <p class="text-secondary-light text-sm mb-4 line-clamp-2 group-hover:text-primary-light transition-colors">{{ game.description }}</p>
      
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <span class="text-neon-blue font-bold text-xl">{{ game.price }}</span>
          <span v-if="game.originalPrice" class="text-secondary-light line-through text-sm ml-2">{{ game.originalPrice }}</span>
        </div>
        
        <div class="flex items-center gap-2 text-secondary-light text-xs">
          <span>{{ game.developer }}</span>
          <span class="w-1 h-1 rounded-full bg-secondary-light"></span>
          <span>{{ game.releaseDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  game: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style> 