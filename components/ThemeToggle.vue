<template>
  <div class="theme-toggle-container">
    <button 
      @click="toggleTheme" 
      class="theme-toggle-button"
      :class="{ 'theme-light': !isDarkMode, 'theme-dark': isDarkMode }"
      aria-label="切换主题模式"
    >
      <!-- 夜间模式图标 (月亮) -->
      <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <!-- 日间模式图标 (太阳) -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useState } from 'nuxt/app'; // 导入Nuxt的useState函数

// 使用Nuxt的useState来管理主题状态，确保在整个应用中保持一致
const isDarkMode = useState('darkMode', () => true); // 默认为夜间模式

// 切换主题的方法
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  
  // 更新文档根元素的类名以应用不同的主题样式
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.add('light-mode');
    document.documentElement.classList.remove('dark-mode');
  }
};

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
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 2px solid;
  cursor: pointer;
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
}

.theme-dark {
  background-color: #2a2d40; /* 更柔和的深色 */
  color: #e8eaef; /* 更柔和的浅色 */
  border-color: #3b82f6;
}

.theme-light {
  background-color: #eef0f5; /* 护眼浅色 */
  color: #3a3f50; /* 更柔和的深色 */
  border-color: #f59e0b;
}

.icon {
  width: 22px; /* 稍微减小图标尺寸 */
  height: 22px;
  transition: all 0.5s ease; /* 延长过渡时间 */
  opacity: 0.9; /* 稍微降低不透明度 */
}

.theme-toggle-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
}

.theme-dark:hover {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
}

.theme-light:hover {
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.8);
}
</style>