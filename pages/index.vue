<template>
  <div class="space-y-8 py-6 px-4">
    <section class="hero-section bg-primary-light rounded-lg p-8 neon-border transform transition-all duration-500 hover:shadow-neon relative overflow-hidden backdrop-blur-sm">
      <div class="hero-glow absolute inset-0 opacity-30"></div>
      <div class="max-w-3xl mx-auto text-center relative z-10">
        <h1 class="text-5xl font-bold mb-6 neon-text animate-fadeIn">
          <span class="inline-block animate-fadeIn" style="animation-delay: 0.1s">欢</span>
          <span class="inline-block animate-fadeIn" style="animation-delay: 0.2s">迎</span>
          <span class="inline-block animate-fadeIn" style="animation-delay: 0.3s">来</span>
          <span class="inline-block animate-fadeIn" style="animation-delay: 0.4s">到</span>
          <span class="inline-block animate-fadeIn" style="animation-delay: 0.5s">科</span>
          <span class="inline-block animate-fadeIn" style="animation-delay: 0.6s">幻</span>
          <span class="inline-block animate-fadeIn" style="animation-delay: 0.7s">游</span>
          <span class="inline-block animate-fadeIn" style="animation-delay: 0.8s">戏</span>
          <span class="inline-block animate-fadeIn" style="animation-delay: 0.9s">平</span>
          <span class="inline-block animate-fadeIn" style="animation-delay: 1.0s">台</span>
        </h1>
        <p class="text-xl mb-8 animate-fadeIn" style="animation-delay: 1.2s">探索未来世界的无限可能，体验前所未有的游戏乐趣</p>
        <button class="bg-neon-purple hover:bg-neon-blue text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 btn-effect pulse relative overflow-hidden group">
          <span class="relative z-10 inline-flex items-center">
            立即开始
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <span class="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-purple bg-size-200 animate-gradient-x"></span>
        </button>
      </div>
    </section>

    <section class="features-section grid md:grid-cols-3 gap-6">
      <div 
        v-for="(feature, index) in features" 
        :key="index" 
        class="bg-primary-light p-6 rounded-lg hover:neon-border transition-all duration-300 transform hover:scale-102 hover:shadow-neon relative overflow-hidden group"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: index * 150 } }"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-secondary-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative z-10">
          <div class="text-neon-purple text-3xl mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:text-neon-blue">{{ feature.icon }}</div>
          <h3 class="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-neon-cyan">{{ feature.title }}</h3>
          <p class="text-gray-300 transition-all duration-300 group-hover:text-white">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section class="games-section">
      <h2 
        class="text-3xl font-bold mb-6 text-center neon-text flicker relative inline-block w-full"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 800 } }"
      >
        <span class="relative z-10">热门游戏</span>
        <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-24 bg-gradient-to-r from-transparent via-neon-blue to-transparent"></span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          v-for="(game, index) in games" 
          :key="index" 
          class="bg-primary-light rounded-lg overflow-hidden hover:neon-border transition-all duration-300 transform hover:scale-105 hover:shadow-neon"
          :style="{ 'animation-delay': `${index * 0.15}s` }"
          v-motion
          :initial="{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: index * 150 } }"
        >
          <div class="h-48 bg-secondary-dark flex items-center justify-center overflow-hidden group relative">
            <div class="absolute inset-0 bg-gradient-to-br from-secondary-dark to-black opacity-70"></div>
            <div class="absolute inset-0 bg-grid opacity-10"></div>
            <div class="text-6xl transition-all duration-500 transform group-hover:scale-125 group-hover:rotate-12 relative z-10 glow-emoji">{{ game.emoji }}</div>
            <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
          </div>
          <div class="p-4 relative">
            <h3 class="font-bold text-lg mb-2 transition-colors duration-300 hover:text-neon-blue">{{ game.name }}</h3>
            <div class="flex justify-between items-center">
              <span class="text-neon-pink transition-all duration-300 hover:scale-110 hover:text-neon-purple inline-block glow-text-sm">{{ game.price }}</span>
              <button class="text-sm bg-neon-blue hover:bg-neon-purple px-3 py-1 rounded-full transition-all duration-300 transform hover:scale-105 btn-effect relative overflow-hidden">
                <span class="relative z-10">查看详情</span>
                <span class="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    icon: '🎮',
    title: '游戏启动器',
    description: '一键启动所有游戏，管理您的游戏库'
  },
  {
    icon: '💬',
    title: '社区论坛',
    description: '与全球玩家交流游戏心得和攻略'
  },
  {
    icon: '💰',
    title: '交易市场',
    description: '安全可靠的虚拟物品交易平台'
  }
]

const games = [
  {
    emoji: '🚀',
    name: '星际探索',
    price: '¥128'
  },
  {
    emoji: '👾',
    name: '外星入侵',
    price: '¥98'
  },
  {
    emoji: '🤖',
    name: '机器人战争',
    price: '¥158'
  },
  {
    emoji: '🛸',
    name: 'UFO模拟器',
    price: '¥88'
  }
]
</script>

<style scoped>
.hero-section {
  background-image: linear-gradient(to right, rgba(30, 41, 59, 0.8), rgba(30, 27, 75, 0.8));
  position: relative;
}

.hero-glow {
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.3), transparent 70%);
  filter: blur(20px);
  animation: pulse-glow 8s infinite alternate ease-in-out;
}

@keyframes pulse-glow {
  0% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.1); }
  100% { opacity: 0.2; transform: scale(1); }
}

.glow-text-sm {
  text-shadow: 0 0 5px currentColor;
}

.glow-emoji {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
}

.bg-grid {
  background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* 添加滚动触发动画 */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>