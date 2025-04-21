<template>
  <div class="space-y-8">
    <!-- 导航栏 -->
    <NavBar />
    
    <!-- 主视觉图像 -->
    <section class="main-visual relative h-80 rounded-lg overflow-hidden">
      <img src="~/assets/images/games/wuthering-waves-abyss.svg" alt="游戏攻略" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-secondary-dark/70 to-transparent"></div>
      <div class="absolute bottom-0 left-0 p-8 w-full">
        <h1 class="text-5xl font-bold mb-2 text-primary-accent font-serif">游戏攻略</h1>
        <p class="text-xl mb-4 text-primary-light max-w-2xl">掌握游戏技巧，成为顶尖玩家</p>
      </div>
    </section>

    <!-- 攻略分类 -->
    <section class="guide-categories bg-primary-light p-6 rounded-lg border border-primary-accent/30">
      <h2 class="text-xl font-bold text-primary-accent mb-4 font-serif">攻略分类</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div 
          v-for="category in guideCategories" 
          :key="category.id"
          class="category-item bg-secondary-dark p-4 rounded-lg text-center cursor-pointer transition-all hover:bg-primary-accent/20 hover:scale-105"
        >
          <div class="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-primary-accent/30">
            <img :src="category.icon" :alt="category.name" class="w-full h-full object-cover">
          </div>
          <p class="text-primary-light font-medium">{{ category.name }}</p>
        </div>
      </div>
    </section>

    <!-- 热门攻略 -->
    <section class="featured-guides">
      <h2 class="text-3xl font-bold text-primary-accent mb-6 font-serif">热门攻略</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="(guide, index) in featuredGuides" 
          :key="index"
          class="bg-primary-light rounded-lg overflow-hidden hover:transform hover:scale-102 transition-all duration-300 border border-primary-accent/30"
        >
          <div class="relative h-48">
            <img :src="guide.image" :alt="guide.title" class="w-full h-full object-cover">
            <div class="absolute top-3 right-3 bg-primary-accent text-primary-light px-3 py-1 rounded-full text-sm">
              {{ guide.category }}
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-bold text-primary-accent mb-2">{{ guide.title }}</h3>
            <p class="text-primary-light mb-4">{{ guide.description }}</p>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <img :src="guide.authorAvatar" alt="作者头像" class="w-8 h-8 rounded-full mr-2">
                <span class="text-secondary-light">{{ guide.author }}</span>
              </div>
              <span class="text-secondary-light text-sm">{{ guide.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新攻略 -->
    <section class="latest-guides">
      <h2 class="text-3xl font-bold text-primary-accent mb-6 font-serif">最新攻略</h2>
      <div class="space-y-6">
        <div 
          v-for="(guide, index) in latestGuides" 
          :key="index"
          class="bg-primary-light rounded-lg overflow-hidden p-6 border border-primary-accent/30 hover:bg-primary-accent/5 transition-colors"
        >
          <div class="flex flex-col md:flex-row gap-6">
            <div class="w-full md:w-1/4 h-40 rounded-lg overflow-hidden">
              <img :src="guide.image" :alt="guide.title" class="w-full h-full object-cover">
            </div>
            <div class="w-full md:w-3/4">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-xl font-bold text-primary-accent">{{ guide.title }}</h3>
                <span class="bg-secondary-dark text-primary-light px-3 py-1 rounded-full text-xs">{{ guide.category }}</span>
              </div>
              <p class="text-primary-light mb-4 line-clamp-2">{{ guide.description }}</p>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <img :src="guide.authorAvatar" alt="作者头像" class="w-6 h-6 rounded-full mr-2">
                  <span class="text-secondary-light text-sm">{{ guide.author }}</span>
                </div>
                <div class="flex items-center space-x-4 text-sm text-secondary-light">
                  <span>{{ guide.date }}</span>
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {{ guide.views }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 加载更多按钮 -->
      <div class="flex justify-center mt-8">
        <button class="bg-secondary-dark hover:bg-primary-accent text-primary-light font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 border border-primary-accent/30">
          加载更多攻略
        </button>
      </div>
    </section>

    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '~/components/NavBar.vue';
import Footer from '~/components/Footer.vue';
import { useHead } from 'nuxt/app';

// SEO元数据
useHead({
  title: '游戏攻略 - 掌握游戏技巧，成为顶尖玩家',
  meta: [
    { name: 'description', content: '提供最新、最全面的游戏攻略，帮助玩家提升游戏技能，了解游戏攻略技巧，攻克游戏难关。' },
    { name: 'keywords', content: '游戏攻略,游戏技巧,角色攻略,装备搭配,新手指南,游戏平台' }
  ]
});

// 攻略分类
const guideCategories = ref([
  { name: '新手指南', icon: '~/assets/images/games/wuthering-waves-icon.svg', id: 'beginners' },
  { name: '角色攻略', icon: '~/assets/images/games/arknights-icon.svg', id: 'characters' },
  { name: '装备搭配', icon: '~/assets/images/games/wuthering-waves-abyss-icon.svg', id: 'equipment' },
  { name: '副本攻略', icon: '~/assets/images/games/arknights-endfield-icon.svg', id: 'dungeons' },
  { name: '竞技技巧', icon: '~/assets/images/games/wuthering-waves-abyss-icon.svg', id: 'pvp' }
]);

// 热门攻略
const featuredGuides = ref([
  {
    title: '鸣潮：深海回响 - 全角色技能解析',
    description: '详细分析鸣潮游戏中所有角色的技能、特性以及最佳使用场景，助你轻松通关各类挑战。',
    image: '~/assets/images/games/wuthering-waves.svg',
    category: '角色攻略',
    author: '游戏达人',
    authorAvatar: '~/assets/images/games/wuthering-waves-icon.svg',
    date: '2023-12-10'
  },
  {
    title: '明日方舟：终末地 - 最强阵容搭配指南',
    description: '根据不同关卡特性，提供最佳阵容搭配方案，包括干员选择、技能搭配及部署策略。',
    image: '~/assets/images/games/arknights.svg',
    category: '阵容搭配',
    author: '方舟专家',
    authorAvatar: '~/assets/images/games/arknights-icon.svg',
    date: '2023-11-25'
  }
]);

// 最新攻略
const latestGuides = ref([
  {
    title: '火星殖民 - 基地建设攻略',
    description: '如何在有限的资源下高效规划殖民地布局，提高资源产出效率，确保可持续发展。',
    image: '~/assets/images/games/wuthering-waves-abyss.svg',
    category: '基地建设',
    author: '星际开拓者',
    authorAvatar: '~/assets/images/games/wuthering-waves-abyss-icon.svg',
    date: '2023-12-15',
    views: '4,289'
  },
  {
    title: '神经网络 - 黑客技能全解析',
    description: '详解神经网络游戏中各类黑客技能的解锁条件、使用方法及组合效果，帮你成为顶级黑客。',
    image: '~/assets/images/games/arknights-endfield.svg',
    category: '技能解析',
    author: '数字幽灵',
    authorAvatar: '~/assets/images/games/arknights-endfield-icon.svg',
    date: '2023-12-12',
    views: '3,567'
  },
  {
    title: '时间守护者 - 历史线修复指南',
    description: '针对不同历史时期的特点，提供最佳任务路线与关键选择点分析，确保历史线修复的最优结果。',
    image: '~/assets/images/games/arknights.svg',
    category: '任务攻略',
    author: '时间旅行者',
    authorAvatar: '~/assets/images/games/arknights-icon.svg',
    date: '2023-12-08',
    views: '2,984'
  },
  {
    title: '深海探险 - 装备打造与升级策略',
    description: '详细介绍深海探险中各类装备的获取途径、升级材料及最佳属性搭配，助你应对深海危机。',
    image: '~/assets/images/games/wuthering-waves.svg',
    category: '装备攻略',
    author: '深海猎人',
    authorAvatar: '~/assets/images/games/wuthering-waves-icon.svg',
    date: '2023-12-05',
    views: '3,128'
  }
]);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style> 