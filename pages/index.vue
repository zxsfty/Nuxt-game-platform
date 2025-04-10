<template>
  <div class="space-y-8">
    <section class="hero-section bg-primary-light rounded-lg p-8 neon-border">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6 neon-text">欢迎来到科幻游戏平台</h1>
        <p class="text-xl mb-8">探索未来世界的无限可能，体验前所未有的游戏乐趣</p>
        <button class="bg-neon-purple hover:bg-neon-blue text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105">
          立即开始
        </button>
      </div>
    </section>

    <section class="features-section grid md:grid-cols-3 gap-6">
      <div v-for="(feature, index) in features" :key="index" class="bg-primary-light p-6 rounded-lg hover:neon-border transition-all">
        <div class="text-neon-purple text-3xl mb-4">{{ feature.icon }}</div>
        <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
        <p class="text-gray-300">{{ feature.description }}</p>
      </div>
    </section>

    <section class="games-section">
      <h2 class="text-3xl font-bold mb-6 text-center neon-text">热门游戏</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(game, index) in games" :key="index" class="bg-primary-light rounded-lg overflow-hidden hover:neon-border transition-all">
          <div class="h-48 bg-secondary-dark flex items-center justify-center">
            <span class="text-4xl">{{ game.emoji }}</span>
          </div>
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2">{{ game.name }}</h3>
            <div class="flex justify-between items-center">
              <span class="text-neon-pink">{{ game.price }}</span>
              <button class="text-sm bg-neon-blue hover:bg-neon-purple px-3 py-1 rounded-full">查看详情</button>
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
}
</style>