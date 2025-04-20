<template>
  <transition name="fade">
    <button 
      v-show="showButton" 
      @click="scrollToTop" 
      class="fixed bottom-8 right-8 w-12 h-12 bg-primary-accent hover:bg-primary-accent/80 text-primary-light rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-300 transform hover:scale-110"
      aria-label="回到顶部"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showButton = ref(false);
const scrollThreshold = 300; // 显示按钮的滚动阈值

// 处理滚动事件
const handleScroll = () => {
  showButton.value = window.scrollY > scrollThreshold;
};

// 滚动到顶部函数
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style> 