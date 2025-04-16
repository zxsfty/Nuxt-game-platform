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
        <h1 class="text-5xl font-bold mb-6 text-neon-blue seasonal-text-glow">The broken with star sinks论坛</h1>
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

    <section class="forum-section relative">
      <!-- 节气特定装饰元素 -->
      <div class="seasonal-accent-line absolute -top-2 left-0 right-0" :class="`${$state.themeStyle.value}-accent-line`"></div>
      
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-neon-blue seasonal-text-glow">热门话题</h2>
        <button 
          class="bg-neon-purple hover:bg-neon-blue text-white font-bold py-2 px-4 rounded-full transition-all seasonal-button"
          :class="`${$state.themeStyle.value}-button`"
          @click="showNewPostModal = true"
        >
          发表新帖
        </button>
      </div>

      <div class="space-y-4">
        <div v-for="(topic, index) in topics" :key="index" class="bg-primary-light p-6 rounded-lg neon-border transition-all hover:shadow-neon group relative overflow-hidden">
          <!-- 节气特定卡片装饰 -->
          <div class="seasonal-card-decoration absolute top-0 right-0 w-20 h-20 opacity-10" :class="`${$state.themeStyle.value}-card-decoration`"></div>
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
import { ref } from 'vue';
import { useState } from 'nuxt/app';

const showNewPostModal = ref(false)

// 使用Nuxt的useState来获取当前主题状态
const $state = {
  themeStyle: useState('themeStyle', () => 'bailu') // 默认为白露主题
}

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
/* 基础样式 */
.neon-border {
  border: 1px solid transparent;
  box-shadow: 0 0 10px rgba(100, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.neon-border:hover {
  box-shadow: 0 0 15px rgba(100, 255, 255, 0.7);
}

.neon-text {
  text-shadow: 0 0 5px rgba(100, 255, 255, 0.7);
}

/* 节气特定文字发光效果 */
.seasonal-text-glow {
  transition: text-shadow 0.5s ease;
}

:deep(.theme-bailu) .seasonal-text-glow {
  text-shadow: 0 0 10px rgba(var(--decoration-color-1), 0.7);
}

:deep(.theme-hanlu) .seasonal-text-glow {
  text-shadow: 0 0 10px rgba(var(--decoration-color-1), 0.7);
}

:deep(.theme-xiaohan) .seasonal-text-glow {
  text-shadow: 0 0 10px rgba(var(--decoration-color-1), 0.7);
}

/* 节气特定卡片样式 */
:deep(.theme-bailu) .neon-border {
  border-color: rgba(var(--decoration-color-1), 0.3);
  box-shadow: 0 0 10px rgba(var(--decoration-color-1), 0.3);
}

:deep(.theme-bailu) .neon-border:hover {
  box-shadow: 0 0 15px rgba(var(--decoration-color-1), 0.7);
}

:deep(.theme-hanlu) .neon-border {
  border-color: rgba(var(--decoration-color-1), 0.3);
  box-shadow: 0 0 10px rgba(var(--decoration-color-1), 0.3);
}

:deep(.theme-hanlu) .neon-border:hover {
  box-shadow: 0 0 15px rgba(var(--decoration-color-1), 0.7);
}

:deep(.theme-xiaohan) .neon-border {
  border-color: rgba(var(--decoration-color-1), 0.3);
  box-shadow: 0 0 10px rgba(var(--decoration-color-1), 0.3);
}

:deep(.theme-xiaohan) .neon-border:hover {
  box-shadow: 0 0 15px rgba(var(--decoration-color-1), 0.7);
}

/* 节气特定按钮样式 */
.seasonal-button {
  position: relative;
  overflow: hidden;
}

.seasonal-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.seasonal-button:hover::after {
  transform: translateX(100%);
}

:deep(.theme-bailu) .seasonal-button {
  background-color: rgba(var(--decoration-color-1), 0.8);
}

:deep(.theme-hanlu) .seasonal-button {
  background-color: rgba(var(--decoration-color-1), 0.8);
}

:deep(.theme-xiaohan) .seasonal-button {
  background-color: rgba(var(--decoration-color-1), 0.8);
}

/* 节气特定卡片装饰 */
.seasonal-card-decoration {
  pointer-events: none;
  transition: all 0.5s ease;
}

.bailu-card-decoration {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L32 15 L37 15 L33 19 L35 24 L30 21 L25 24 L27 19 L23 15 L28 15 Z' stroke='rgba(215, 190, 105, 0.8)' fill='none' /%3E%3C/svg%3E");
}

.hanlu-card-decoration {
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 Q60 40 40 70 Q20 40 40 10 Z' stroke='rgba(80, 140, 190, 0.8)' fill='none' /%3E%3C/svg%3E");
}

.xiaohan-card-decoration {
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5 L22 12 L29 12 L23 17 L25 24 L20 19 L15 24 L17 17 L11 12 L18 12 Z' stroke='rgba(169, 169, 169, 0.8)' fill='none' /%3E%3C/svg%3E");
}

/* 露珠、落叶和雪花容器 */
.dew-drops-container,
.falling-leaves-container,
.snowflakes-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

/* 白露特效 - 露珠 */
.dew-drops-container::before,
.dew-drops-container::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(215, 190, 105, 0.4));
  box-shadow: 0 0 5px rgba(215, 190, 105, 0.6);
  animation: dewDrop 10s ease-in-out infinite alternate;
}

.dew-drops-container::before {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.dew-drops-container::after {
  bottom: 30%;
  right: 20%;
  animation-delay: 2s;
}

@keyframes dewDrop {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.1); }
}

/* 寒露特效 - 落叶 */
.falling-leaves-container::before,
.falling-leaves-container::after {
  content: '🍂';
  position: absolute;
  font-size: 20px;
  opacity: 0.7;
  animation: fallingLeaf 15s linear infinite;
}

.falling-leaves-container::before {
  top: -20px;
  left: 30%;
  animation-delay: 0s;
}

.falling-leaves-container::after {
  top: -20px;
  right: 40%;
  animation-delay: 5s;
}

@keyframes fallingLeaf {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
  10% { opacity: 0.7; }
  100% { transform: translateY(300px) rotate(360deg); opacity: 0; }
}

/* 小寒特效 - 雪花 */
.snowflakes-container::before,
.snowflakes-container::after {
  content: '❄';
  position: absolute;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  animation: snowfall 20s linear infinite;
}

.snowflakes-container::before {
  top: -20px;
  left: 20%;
  animation-delay: 0s;
}

.snowflakes-container::after {
  top: -20px;
  right: 30%;
  animation-delay: 7s;
}

@keyframes snowfall {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
  10% { opacity: 0.8; }
  100% { transform: translateY(300px) rotate(360deg); opacity: 0; }
}
</style>