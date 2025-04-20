<template>
  <div class="seasonal-scene relative">
    <!-- 节气特定装饰元素 -->
    <div class="seasonal-pattern absolute inset-0 opacity-10" :class="`${$state.themeStyle.value}-pattern`"></div>
    
    <!-- 白露特效：露珠效果 -->
    <div v-if="$state.themeStyle.value === 'bailu'" class="dew-drops-container"></div>
    
    <!-- 寒露特效：秋叶飘落 -->
    <div v-if="$state.themeStyle.value === 'hanlu'" class="falling-leaves-container"></div>
    
    <!-- 小寒特效：雪花飘落 -->
    <div v-if="$state.themeStyle.value === 'xiaohan'" class="snowflakes-container"></div>
    
    <!-- 季节特定元素 -->
    <div class="seasonal-elements">
      <!-- 白露：桥、树、草木、露珠 -->
      <template v-if="$state.themeStyle.value === 'bailu'">
        <div class="seasonal-bridge"></div>
        <div class="seasonal-tree seasonal-tree-1"></div>
        <div class="seasonal-tree seasonal-tree-2"></div>
        <div class="seasonal-flower seasonal-flower-1"></div>
        <div class="seasonal-flower seasonal-flower-2"></div>
      </template>
      
      <!-- 寒露：红叶树、杂草、湖面、落叶 -->
      <template v-if="$state.themeStyle.value === 'hanlu'">
        <div class="seasonal-tree-red seasonal-tree-red-1"></div>
        <div class="seasonal-tree-red seasonal-tree-red-2"></div>
        <div class="seasonal-lake"></div>
        <div class="seasonal-grass seasonal-grass-1"></div>
        <div class="seasonal-grass seasonal-grass-2"></div>
      </template>
      
      <!-- 小寒：雪松、雪地、冰湖、雪堆 -->
      <template v-if="$state.themeStyle.value === 'xiaohan'">
        <div class="seasonal-pine seasonal-pine-1"></div>
        <div class="seasonal-pine seasonal-pine-2"></div>
        <div class="seasonal-frozen-lake"></div>
        <div class="seasonal-snow-pile seasonal-snow-pile-1"></div>
        <div class="seasonal-snow-pile seasonal-snow-pile-2"></div>
      </template>
    </div>
    
    <!-- 渲染内容插槽 -->
    <div class="seasonal-content relative z-10">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useState } from 'nuxt/app';
import { throttle } from '~/utils/index';

// 使用Nuxt的useState来获取当前主题状态
const $state = {
  themeStyle: useState('themeStyle', () => 'bailu')
};

// 节气容器引用
const dewDropsContainer = ref(null);
const fallingLeavesContainer = ref(null);
const snowflakesContainer = ref(null);

// 创建动画元素的函数
const createElements = (container, count, className, animationName) => {
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
</script>

<style scoped>
.seasonal-scene {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 300px;
}

/* 确保动画容器的样式适配组件 */
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

/* 季节元素容器 */
.seasonal-elements {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* 注意: 这里的样式只是基础样式，详细的季节元素样式在assets/css/seasonal-scene-elements.css中定义 */
</style> 