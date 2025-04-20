<template>
  <div class="space-y-8 py-6 px-4 relative">
    <!-- 季节性背景 -->
    <SeasonalBackground />
    
    <section class="hero-section bg-primary-light rounded-lg p-8 border border-primary-accent/30 transform transition-all duration-500 hover:shadow-theme relative overflow-hidden backdrop-blur-sm">
      <!-- 使用季节场景组件 -->
      <SeasonalScene>
        <div class="hero-glow absolute inset-0 opacity-30"></div>
        <div class="max-w-3xl mx-auto text-center relative z-10">
          <h1 class="text-5xl font-bold mb-6 text-primary-accent animate-fadeIn font-serif seasonal-text-glow">
            The broken with star sinks
          </h1>
          <p class="text-xl mb-8 animate-fadeIn" style="animation-delay: 1.2s">The broken with star sinks</p>
          <button class="bg-primary-accent/80 hover:bg-primary-accent text-primary-light font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 relative overflow-hidden group">
            <span class="relative z-10 inline-flex items-center">
              立即开始
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <span class="absolute inset-0 bg-primary-accent opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
          </button>
        </div>
      </SeasonalScene>
    </section>

    <section class="features-section grid md:grid-cols-3 gap-6">
      <div 
        v-for="(feature, index) in features" 
        :key="index" 
        class="bg-primary-light p-6 rounded-lg border border-primary-accent/20 transition-all duration-300 transform hover:scale-102 hover:shadow-theme hover:border-primary-accent/50 relative overflow-hidden group"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: index * 150 } }"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-secondary-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative z-10">
          <div class="text-primary-accent text-3xl mb-4 transform transition-all duration-300 group-hover:scale-110">{{ feature.icon }}</div>
          <h3 class="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-primary-accent">{{ feature.title }}</h3>
          <p class="text-secondary-light transition-all duration-300 group-hover:text-primary-light">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section class="games-section">
      <h2 
        class="text-3xl font-bold mb-6 text-center text-primary-accent relative inline-block w-full font-serif"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 800 } }"
      >
        <span class="relative z-10">热门游戏</span>
        <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-24 bg-gradient-to-r from-transparent via-primary-accent to-transparent"></span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          v-for="(game, index) in games" 
          :key="index" 
          class="game-card bg-primary-light rounded-lg overflow-hidden border border-primary-accent/20 transition-all duration-300 transform hover:scale-105 hover:shadow-theme hover:border-primary-accent/50 relative"
          :class="`game-card-${$state.themeStyle.value}`"
          :style="{ 'animation-delay': `${index * 0.15}s` }"
          v-motion
          :initial="{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: index * 150 } }"
        >
          <!-- 节气特定装饰元素 -->
          <div class="seasonal-pattern absolute inset-0 opacity-5" :class="`${$state.themeStyle.value}-pattern`"></div>
          
          <!-- 卡片装饰边角 -->
          <div class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary-accent/50 rounded-tl-lg"></div>
          <div class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary-accent/50 rounded-tr-lg"></div>
          <div class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary-accent/50 rounded-bl-lg"></div>
          <div class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary-accent/50 rounded-br-lg"></div>
          
          <div class="h-48 bg-secondary-dark flex items-center justify-center overflow-hidden group relative">
            <div class="absolute inset-0 bg-gradient-to-br from-secondary-dark to-transparent opacity-70"></div>
            <div class="absolute inset-0 bg-grid opacity-10"></div>
            <div class="text-6xl transition-all duration-500 transform group-hover:scale-125 group-hover:rotate-12 relative z-10 seasonal-emoji-glow">{{ game.emoji }}</div>
            <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-secondary-dark to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
          </div>
          <div class="p-4 relative">
            <h3 class="font-bold text-lg mb-2 transition-colors duration-300 hover:text-primary-accent seasonal-text-hover">{{ game.name }}</h3>
            <p class="text-sm text-secondary-light mb-2 italic seasonal-description">{{ game.seasonalDesc[$state.themeStyle.value] }}</p>
            <div class="flex justify-between items-center">
              <span class="text-primary-accent transition-all duration-300 hover:scale-110 inline-block seasonal-price">{{ game.price }}</span>
              <button class="text-sm bg-primary-accent/80 hover:bg-primary-accent text-primary-light px-3 py-1 rounded-full transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                <span class="relative z-10">查看详情</span>
                <span class="absolute inset-0 bg-primary-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useState } from 'nuxt/app'; // 引入 Nuxt 的 useState
import { ref, onMounted, watch, nextTick } from 'vue'; // 引入 ref, onMounted, watch, nextTick
import SeasonalScene from '~/components/SeasonalScene.vue'; // 引入季节场景组件
import SeasonalBackground from '~/components/SeasonalBackground.vue'; // 引入季节背景组件

// 使用Nuxt的useState来获取当前主题状态
// 统一使用$state.themeStyle.value的方式访问主题状态
const themeStyle = useState<string>('themeStyle', () => 'bailu'); // 默认为白露主题，保留此变量以兼容现有代码

// 创建$state对象以与模板中的引用保持一致
const $state = {
  themeStyle
};

// 获取特效容器的引用
const dewDropsContainer = ref<HTMLElement | null>(null);
const fallingLeavesContainer = ref<HTMLElement | null>(null);
const snowflakesContainer = ref<HTMLElement | null>(null);

// 导入节流函数
import { throttle } from '~/utils/index';

// 创建动画元素的函数
const createElements = (container: HTMLElement | null, count: number, className: string, animationName: string) => {
  if (!container) return;
  container.innerHTML = ''; // 清空旧元素
  for (let i = 0; i < count; i++) {
    const element = document.createElement('div');
    element.classList.add(className);

    // 随机化属性
    const duration = Math.random() * 5 + 3; // 3-8s 动画时长
    const delay = Math.random() * 5; // 0-5s 延迟
    const startX = Math.random() * 100 + 'vw'; // 随机起始 X 位置
    const endXOffset = (Math.random() - 0.5) * 40 + 'vw'; // 随机结束 X 偏移
    const rotateZ = Math.random() * 360 + 'deg'; // 随机 Z 轴旋转 (用于叶子)

    element.style.left = startX;
    element.style.animationDuration = `${duration}s`;
    element.style.animationDelay = `${delay}s`;

    if (animationName === 'fallingLeaf') {
      element.style.setProperty('--leaf-end-x', endXOffset);
      element.style.setProperty('--leaf-rotate-z', rotateZ);
    } else if (animationName === 'snowfall') {
      element.style.setProperty('--snow-start-x', startX);
      element.style.setProperty('--snow-end-x', `calc(${startX} + ${endXOffset})`);
    }

    container.appendChild(element);
  }
};

// 更新动画效果
const updateAnimationsBase = async () => {
  await nextTick(); // 等待 DOM 更新
  dewDropsContainer.value = document.querySelector('.dew-drops-container');
  fallingLeavesContainer.value = document.querySelector('.falling-leaves-container');
  snowflakesContainer.value = document.querySelector('.snowflakes-container');

  if ($state.themeStyle.value === 'bailu') {
    createElements(dewDropsContainer.value, 15, 'dew-drop', 'dewDrop');
  } else {
    if (dewDropsContainer.value) dewDropsContainer.value.innerHTML = '';
  }

  if ($state.themeStyle.value === 'hanlu') {
    createElements(fallingLeavesContainer.value, 20, 'falling-leaf', 'fallingLeaf');
  } else {
    if (fallingLeavesContainer.value) fallingLeavesContainer.value.innerHTML = '';
  }

  if ($state.themeStyle.value === 'xiaohan') {
    createElements(snowflakesContainer.value, 30, 'snowflake', 'snowfall');
  } else {
    if (snowflakesContainer.value) snowflakesContainer.value.innerHTML = '';
  }
};

// 使用节流函数优化动画性能
const updateAnimations = throttle(updateAnimationsBase, 300);

// 监听主题变化
watch(() => $state.themeStyle.value, updateAnimations);

// 组件挂载时初始化动画
onMounted(updateAnimations);

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

// 定义游戏数据的接口，包含seasonalDesc的类型定义
interface GameData {
  emoji: string;
  name: string;
  price: string;
  seasonalDesc: Record<string, string>; // 使用Record类型允许字符串索引
}

const games: GameData[] = [
  {
    emoji: '🚀',
    name: '星际探索',
    price: '¥128',
    seasonalDesc: {
      bailu: '清晨的露珠中启程',
      hanlu: '秋叶飘落的星际旅途',
      xiaohan: '穿越冰雪星系的冒险'
    }
  },
  {
    emoji: '👾',
    name: '外星入侵',
    price: '¥98',
    seasonalDesc: {
      bailu: '晨露中的神秘访客',
      hanlu: '秋风中的异星来客',
      xiaohan: '冰封世界的入侵者'
    }
  },
  {
    emoji: '🤖',
    name: '机器人战争',
    price: '¥158',
    seasonalDesc: {
      bailu: '露珠反射的机械战场',
      hanlu: '落叶纷飞的钢铁对决',
      xiaohan: '冰雪覆盖的机械战争'
    }
  },
  {
    emoji: '🛸',
    name: 'UFO模拟器',
    price: '¥88',
    seasonalDesc: {
      bailu: '穿越晨露的飞行',
      hanlu: '秋日天空的神秘飞行',
      xiaohan: '雪花飘落中的飞行'
    }
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

/* 确保特效容器的样式已在全局 CSS (seasonal-animations.css) 中定义 */
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

.seasonal-text-glow {
  /* 可以在 themes.css 中为不同主题定义不同的文本辉光效果 */
  text-shadow: 0 0 8px var(--primary-accent);
}

/* 游戏卡片节气特定样式 */
.game-card {
  isolation: isolate;
  backdrop-filter: blur(2px);
}

/* 白露主题游戏卡片 */
.game-card-bailu {
  box-shadow: 0 0 15px rgba(var(--decoration-color-1), 0.1);
}
.game-card-bailu:hover {
  box-shadow: 0 0 20px rgba(var(--decoration-color-1), 0.3);
}
.game-card-bailu .seasonal-emoji-glow {
  filter: drop-shadow(0 0 5px rgba(var(--decoration-color-1), 0.7));
}

/* 寒露主题游戏卡片 */
.game-card-hanlu {
  box-shadow: 0 0 15px rgba(var(--decoration-color-1), 0.1);
}
.game-card-hanlu:hover {
  box-shadow: 0 0 20px rgba(var(--decoration-color-1), 0.3);
}
.game-card-hanlu .seasonal-emoji-glow {
  filter: drop-shadow(0 0 5px rgba(var(--decoration-color-1), 0.7));
}

/* 小寒主题游戏卡片 */
.game-card-xiaohan {
  box-shadow: 0 0 15px rgba(var(--decoration-color-1), 0.1);
}
.game-card-xiaohan:hover {
  box-shadow: 0 0 20px rgba(var(--decoration-color-1), 0.3);
}
.game-card-xiaohan .seasonal-emoji-glow {
  filter: drop-shadow(0 0 5px rgba(var(--decoration-color-1), 0.7));
}

/* 节气特定文本悬停效果 */
.seasonal-text-hover:hover {
  text-shadow: 0 0 5px rgba(var(--decoration-color-1), 0.7);
}

/* 节气特定价格样式 */
.seasonal-price {
  font-weight: bold;
  position: relative;
}
.seasonal-price::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(var(--decoration-color-1), 0.7), transparent);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
.seasonal-price:hover::after {
  transform: scaleX(1);
}

/* 节气描述文本样式 */
.seasonal-description {
  min-height: 2.5rem;
  font-style: italic;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.game-card:hover .seasonal-description {
  opacity: 1;
  color: rgba(var(--decoration-color-1), 0.9);
}

/* 游戏卡片进入动画优化 */
@keyframes card-entrance-bailu {
  from { opacity: 0; transform: translateY(20px); box-shadow: 0 0 0 rgba(var(--decoration-color-1), 0); }
  to { opacity: 1; transform: translateY(0); box-shadow: 0 0 15px rgba(var(--decoration-color-1), 0.2); }
}

@keyframes card-entrance-hanlu {
  from { opacity: 0; transform: translateY(20px); box-shadow: 0 0 0 rgba(var(--decoration-color-1), 0); }
  to { opacity: 1; transform: translateY(0); box-shadow: 0 0 15px rgba(var(--decoration-color-1), 0.2); }
}

@keyframes card-entrance-xiaohan {
  from { opacity: 0; transform: translateY(20px); box-shadow: 0 0 0 rgba(var(--decoration-color-1), 0); }
  to { opacity: 1; transform: translateY(0); box-shadow: 0 0 15px rgba(var(--decoration-color-1), 0.2); }
}
</style>