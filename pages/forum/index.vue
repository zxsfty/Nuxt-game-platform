<template>
  <div class="space-y-8">
    <section class="hero-section bg-primary-light rounded-lg p-8 border-2 border-neon-blue">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6 text-neon-blue">科幻游戏论坛</h1>
        <p class="text-xl mb-8">与其他玩家交流游戏心得，分享未来世界的冒险故事</p>
        <div class="flex justify-center space-x-4">
          <button class="bg-neon-purple hover:bg-neon-blue text-white font-bold py-2 px-4 rounded-full transition-all">
            热门话题
          </button>
          <button class="bg-transparent hover:bg-neon-purple text-white font-bold py-2 px-4 rounded-full border border-neon-purple transition-all">
            最新发布
          </button>
        </div>
      </div>
    </section>

    <section class="forum-section">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-neon-blue">热门话题</h2>
        <button 
          class="bg-neon-purple hover:bg-neon-blue text-white font-bold py-2 px-4 rounded-full transition-all"
          @click="showNewPostModal = true"
        >
          发表新帖
        </button>
      </div>

      <div class="space-y-4">
        <div v-for="(topic, index) in topics" :key="index" class="bg-primary-light p-6 rounded-lg neon-border transition-all hover:shadow-neon group">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 text-neon-purple text-2xl">{{ topic.icon }}</div>
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-1 group-hover:text-neon-blue transition-colors">{{ topic.title }}</h3>
              <p class="text-gray-300 mb-2">{{ topic.description }}</p>
              <div class="flex items-center text-sm text-gray-400">
                <span>{{ topic.author }}</span>
                <span class="mx-2">•</span>
                <span>{{ topic.date }}</span>
                <span class="mx-2">•</span>
                <span>{{ topic.comments }} 条评论</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const showNewPostModal = ref(false)

const topics = [
  {
    icon: '🚀',
    title: '新游戏《星际探索》抢先体验报告',
    description: '分享我在《星际探索》中的冒险经历和游戏体验',
    author: '太空旅人',
    date: '2023-10-15',
    comments: 42
  },
  {
    icon: '🛸',
    title: '关于外星文明DLC的讨论',
    description: '大家觉得新DLC中的外星文明设定如何？',
    author: 'UFO研究员',
    date: '2023-10-14',
    comments: 28
  },
  {
    icon: '👾',
    title: '多人模式战术交流',
    description: '分享一些多人模式中的实用战术和小技巧',
    author: '战术大师',
    date: '2023-10-13',
    comments: 35
  }
]
</script>

<style scoped>
.neon-border {
  border: 1px solid transparent;
  box-shadow: 0 0 10px rgba(100, 255, 255, 0.3);
}

.neon-border:hover {
  box-shadow: 0 0 15px rgba(100, 255, 255, 0.7);
}

.neon-text {
  text-shadow: 0 0 5px rgba(100, 255, 255, 0.7);
}
</style>