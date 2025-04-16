<template>
  <div class="theme-toggle-container">
    <button 
      @click="toggleTheme" 
      class="theme-toggle-button" 
      :class="{ 'theme-dark': isDarkMode, 'theme-light': !isDarkMode, [`theme-toggle-${currentTheme}`]: true }"
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
        <div class="absolute inset-0 seasonal-glow opacity-50" :class="`seasonal-glow-${currentTheme}`"></div>
      </div>
    </button>
    <span class="theme-label">{{ isDarkMode ? '夜间' : '日间' }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useState } from 'nuxt/app'; // 导入Nuxt的useState函数
import { throttle } from '../utils'; // 导入节流函数

// 使用Nuxt的useState来管理主题状态，确保在整个应用中保持一致
const isDarkMode = useState('darkMode', () => true); // 默认为夜间模式
const currentTheme = useState('themeStyle', () => 'bailu'); // 默认为白露主题

// 切换主题的方法，使用节流函数优化性能
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
}, 300);

// 在组件挂载时初始化主题
onMounted(() => {
  // 确保初始状态与当前主题匹配
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.add('light-mode');
  }
});

</script>

<style scoped>
.theme-toggle-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.theme-toggle-button {
  @apply corner-button;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 8px rgba(var(--decoration-color-1), 0.2), 0 0 4px rgba(var(--decoration-color-2), 0.1);
}

.theme-dark {
  background-color: rgba(var(--color-primary-dark), 0.8);
  color: rgb(var(--color-primary-light));
  border-color: rgb(var(--color-primary-accent), 0.3);
}

.theme-light {
  background-color: rgba(var(--color-secondary-dark), 0.8);
  color: rgb(var(--color-primary-light));
  border-color: rgb(var(--color-primary-accent), 0.3);
}

/* 节气特定主题样式 */
.theme-toggle-bailu {
  border: 1px solid rgba(215, 190, 105, 0.4);
}

.theme-toggle-bailu:hover {
  box-shadow: 0 0 15px rgba(215, 190, 105, 0.6);
}

.theme-toggle-hanlu {
  border: 1px solid rgba(80, 140, 190, 0.4);
}

.theme-toggle-hanlu:hover {
  box-shadow: 0 0 15px rgba(80, 140, 190, 0.6);
}

.theme-toggle-xiaohan {
  border: 1px solid rgba(202, 202, 212, 0.4);
}

.theme-toggle-xiaohan:hover {
  box-shadow: 0 0 15px rgba(202, 202, 212, 0.6);
}

/* 节气特定光晕效果 */
.seasonal-glow-bailu {
  background: radial-gradient(circle, rgba(215, 190, 105, 0.4) 0%, transparent 70%);
}

.seasonal-glow-hanlu {
  background: radial-gradient(circle, rgba(80, 140, 190, 0.4) 0%, transparent 70%);
}

.seasonal-glow-xiaohan {
  background: radial-gradient(circle, rgba(202, 202, 212, 0.4) 0%, transparent 70%);
}

.theme-label {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: rgb(var(--color-primary-light));
  opacity: 0.8;
  text-align: center;
}
</style>