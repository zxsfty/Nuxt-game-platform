<template>
  <div class="theme-control-panel fixed bottom-6 right-6 z-50">
    <!-- 控制面板容器 -->
    <div class="control-panel-container flex flex-col space-y-2">
      <!-- 主控制按钮 -->
      <button 
        @click="toggleControlPanel" 
        class="corner-button control-main-button"
        :class="{ 'active': isPanelOpen }"
      >
        <div class="relative w-full h-full flex items-center justify-center">
          <span v-if="!isPanelOpen" class="text-lg">🎨</span>
          <span v-else class="text-lg">✖</span>
          <div class="absolute inset-0 seasonal-glow opacity-50" :class="`seasonal-glow-${themeStyle}`"></div>
        </div>
      </button>

      <!-- 展开的控制面板 -->
      <div v-if="isPanelOpen" class="control-panel bg-primary-dark/80 backdrop-blur-md p-3 rounded-md shadow-md border border-primary-accent/30 hover:shadow-theme transition-all duration-300 flex flex-col space-y-3">
        <!-- 暗色/亮色模式切换 -->
        <div class="theme-toggle-container">
          <button 
            @click="toggleTheme" 
            class="theme-toggle-button" 
            :class="{ 'theme-dark': isDarkMode, 'theme-light': !isDarkMode, [`theme-toggle-${themeStyle}`]: true }"
            aria-label="切换主题"
          >
            <div class="relative w-full h-full flex items-center justify-center overflow-hidden">
              <!-- 夜间模式图标 -->
              <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 z-10 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <!-- 日间模式图标 -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 z-10 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <!-- 背景光晕效果 -->
              <div class="absolute inset-0 seasonal-glow opacity-50" :class="`seasonal-glow-${themeStyle}`"></div>
            </div>
          </button>
          <span class="theme-label text-sm">{{ isDarkMode ? '夜间' : '日间' }}</span>
        </div>

        <!-- 节气主题切换 -->
        <div class="seasonal-theme-selector">
          <button 
            @click="showThemeStyleToggle = !showThemeStyleToggle" 
            class="theme-style-button corner-button"
          >
            <div class="seasonal-icon" :class="`${themeStyle}-icon`">{{ seasonalThemes[themeStyle].name }}</div>
          </button>
          <span class="theme-label text-sm">The broken with star sinks</span>
        </div>
      </div>

      <!-- 节气主题选择面板 -->
      <div v-if="showThemeStyleToggle" class="theme-style-toggle-wrapper bg-primary-dark/80 backdrop-blur-md p-2 rounded-md shadow-md border border-primary-accent/30 hover:shadow-theme transition-all duration-300">
        <ThemeStyleToggle @close="closeThemeStyleToggle" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useState } from 'nuxt/app';
import { throttle } from '../utils';

// 使用Nuxt的useState来管理主题状态
const isDarkMode = useState('darkMode', () => true); // 默认为夜间模式
const themeStyle = useState('themeStyle', () => 'bailu'); // 默认为白露主题

// 控制面板状态
const isPanelOpen = ref(false);
const showThemeStyleToggle = ref(false);

// 节气主题信息
interface ThemeInfo {
  name: string;
  description: string;
  season: string;
}

const seasonalThemes: Record<string, ThemeInfo> = {
  bailu: {
    name: '白露',
    description: '白露节气，天高气爽，草木凝露',
    season: '秋季'
  },
  hanlu: {
    name: '寒露',
    description: '寒露节气，露水将寒，草木渐衰',
    season: '深秋'
  },
  xiaohan: {
    name: '小寒',
    description: '小寒节气，天寒地冻，冰雪纷飞',
    season: '冬季'
  }
};

// 切换控制面板显示状态
const toggleControlPanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
  // 如果关闭控制面板，同时关闭节气主题选择器
  if (!isPanelOpen.value) {
    showThemeStyleToggle.value = false;
  }
};

// 切换暗色/亮色主题
const toggleTheme = throttle(() => {
  isDarkMode.value = !isDarkMode.value;
  
  // 添加过渡动画类
  document.documentElement.classList.add('theme-transitioning');
  
  // 更新文档根元素的类名以应用不同的主题样式
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.add('light-mode');
    document.documentElement.classList.remove('dark-mode');
  }
  
  // 移除过渡动画类
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
  }, 500);
  
  // 保存到本地存储
  localStorage.setItem('darkMode', isDarkMode.value.toString());
}, 300);

// 关闭节气主题选择器
const closeThemeStyleToggle = () => {
  showThemeStyleToggle.value = false;
};
</script>

<style scoped>
.theme-control-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.control-panel-container {
  position: relative;
}

.control-main-button {
  z-index: 60;
  transition: all 0.3s ease;
}

.control-main-button.active {
  transform: rotate(45deg);
  background-color: rgba(var(--color-primary-accent), 0.8);
}

.control-panel {
  min-width: 180px;
  animation: fadeIn 0.3s ease-out;
}

.theme-toggle-container, .seasonal-theme-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.theme-toggle-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--color-primary-light));
  background-color: rgba(var(--color-primary-dark), 0.7);
  border: 1px solid rgba(var(--color-primary-accent), 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.theme-toggle-button:hover {
  transform: scale(1.05);
}

.theme-dark {
  background-color: rgba(30, 41, 59, 0.8);
  border-color: rgba(59, 130, 246, 0.3);
}

.theme-light {
  background-color: rgba(254, 215, 170, 0.8);
  border-color: rgba(245, 158, 11, 0.3);
}

.theme-style-button {
  width: 40px;
  height: 40px;
}

.theme-label {
  margin-left: 10px;
  color: rgb(var(--color-primary-light));
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>