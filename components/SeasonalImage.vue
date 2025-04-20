<template>
  <div class="seasonal-image-container" :class="[`${$state.themeStyle.value}-image`, { 'is-loading': isLoading, 'has-error': hasError }]">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="image-loading-overlay">
      <div class="loading-spinner" :class="`${$state.themeStyle.value}-spinner`"></div>
    </div>
    
    <!-- 错误状态 -->
    <div v-if="hasError && (!fallbackSrc || (fallbackSrc && fallbackError))" class="image-error-overlay">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p class="error-text">{{ errorText }}</p>
    </div>
    
    <!-- 实际图片 -->
    <img 
      v-show="!isLoading && !hasError"
      :src="props.lazy ? actualSrc : props.src" 
      :alt="props.alt" 
      :class="props.imageClass"
      @load="onImageLoaded" 
      @error="onImageError" 
    />
    
    <!-- 备用图片 -->
    <img 
      v-if="hasError && props.fallbackSrc" 
      :src="props.fallbackSrc" 
      :alt="props.alt" 
      :class="props.imageClass"
      @load="onFallbackLoaded"
      @error="onFallbackError"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useState } from 'nuxt/app';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  fallbackSrc: {
    type: String,
    default: ''
  },
  lazy: {
    type: Boolean,
    default: true
  },
  imageClass: {
    type: String,
    default: ''
  },
  errorText: {
    type: String,
    default: '图片加载失败'
  }
});

const isLoading = ref(true);
const hasError = ref(false);
const isIntersecting = ref(!props.lazy); // 如果不是懒加载，则默认为true
const actualSrc = ref(props.lazy ? '' : props.src);
const fallbackError = ref(false); // 添加备用图片错误状态

// 使用Nuxt的useState来获取当前主题状态
// 创建$state对象以与模板中的引用保持一致
const $state = {
  themeStyle: useState('themeStyle', () => 'bailu')
};

// 图片加载成功
const onImageLoaded = () => {
  isLoading.value = false;
  hasError.value = false;
};

// 图片加载失败
const onImageError = () => {
  isLoading.value = false;
  hasError.value = true;
  // 如果有备用图片，不显示错误信息
  if (props.fallbackSrc) {
    console.log('使用备用图片:', props.fallbackSrc);
  }
};

// 备用图片加载成功
const onFallbackLoaded = () => {
  isLoading.value = false;
  hasError.value = false; // 备用图片加载成功，清除错误状态
};

// 备用图片加载失败
const onFallbackError = () => {
  isLoading.value = false;
  fallbackError.value = true; // 设置备用图片加载失败状态
  hasError.value = true; // 确保错误状态被正确设置
  console.error('备用图片加载失败:', props.fallbackSrc);
  // 保持错误状态，因为主图和备用图都失败了
};

// 监听元素是否进入视口
onMounted(() => {
  if (props.lazy) {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        isIntersecting.value = true;
        actualSrc.value = props.src;
        observer.disconnect();
      }
    }, {
      rootMargin: '100px', // 提前100px开始加载
      threshold: 0.1 // 当10%的元素可见时
    });
    
    // 获取当前组件的DOM元素
    const el = document.querySelector('.seasonal-image-container');
    if (el) {
      observer.observe(el);
    }
    
    // 组件卸载时清理observer
    onUnmounted(() => {
      if (observer) {
        observer.disconnect();
      }
    });
  }
});
</script>

<style scoped>
.seasonal-image-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

/* 加载状态样式 */
.image-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(var(--color-primary-dark), 0.7);
  z-index: 1;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(var(--color-neon-blue), 0.3);
  border-radius: 50%;
  border-top-color: rgb(var(--color-neon-blue));
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 错误状态样式 */
.image-error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(var(--color-primary-dark), 0.7);
  z-index: 1;
  padding: 1rem;
  text-align: center;
}

.error-icon {
  color: rgb(var(--color-neon-red));
  margin-bottom: 0.5rem;
}

.error-text {
  font-size: 0.875rem;
  color: rgb(var(--color-primary-light));
}

/* 节气特定样式 */
.bailu-image {
  border: 2px solid rgba(var(--decoration-color-1), 0.6);
  box-shadow: 0 0 10px rgba(var(--decoration-glow), 0.4);
}

.bailu-image:hover {
  box-shadow: 0 0 15px rgba(var(--decoration-glow), 0.7);
  transform: translateY(-2px);
}

.bailu-spinner {
  border: 3px solid rgba(var(--decoration-color-1), 0.3);
  border-top-color: rgb(var(--decoration-color-1));
}

.hanlu-image {
  border: 2px solid rgba(var(--leaf-color-1), 0.6);
  box-shadow: 0 0 10px rgba(var(--leaf-glow), 0.4);
}

.hanlu-image:hover {
  box-shadow: 0 0 15px rgba(var(--leaf-glow), 0.7);
  transform: translateY(-2px);
}

.hanlu-spinner {
  border: 3px solid rgba(var(--leaf-color-1), 0.3);
  border-top-color: rgb(var(--leaf-color-1));
}

.xiaohan-image {
  border: 2px solid rgba(var(--frost-color-1), 0.6);
  box-shadow: 0 0 10px rgba(var(--frost-glow), 0.4);
}

.xiaohan-image:hover {
  box-shadow: 0 0 15px rgba(var(--frost-glow), 0.7);
  transform: translateY(-2px);
}

.xiaohan-spinner {
  border: 3px solid rgba(var(--frost-color-1), 0.3);
  border-top-color: rgb(var(--frost-color-1));
}
</style>