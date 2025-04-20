<template>
  <div 
    class="seasonal-background w-full h-full absolute inset-0 -z-10 opacity-30" 
    :class="`seasonal-background-${$state.themeStyle.value}`"
  >
    <!-- 季节特定的背景图案 -->
    <div class="seasonal-bg-pattern absolute inset-0 opacity-20" :class="`bg-pattern-${$state.themeStyle.value}`"></div>
    
    <!-- 季节特定的装饰元素 -->
    <div v-if="$state.themeStyle.value === 'bailu'" class="bailu-decorations">
      <div class="bailu-circle circle-1"></div>
      <div class="bailu-circle circle-2"></div>
      <div class="bailu-circle circle-3"></div>
      <div class="bailu-line line-1"></div>
      <div class="bailu-line line-2"></div>
    </div>
    
    <div v-if="$state.themeStyle.value === 'hanlu'" class="hanlu-decorations">
      <div class="hanlu-leaf leaf-1"></div>
      <div class="hanlu-leaf leaf-2"></div>
      <div class="hanlu-leaf leaf-3"></div>
      <div class="hanlu-wave wave-1"></div>
      <div class="hanlu-wave wave-2"></div>
    </div>
    
    <div v-if="$state.themeStyle.value === 'xiaohan'" class="xiaohan-decorations">
      <div class="xiaohan-flake flake-1"></div>
      <div class="xiaohan-flake flake-2"></div>
      <div class="xiaohan-flake flake-3"></div>
      <div class="xiaohan-crystal crystal-1"></div>
      <div class="xiaohan-crystal crystal-2"></div>
    </div>
  </div>
</template>

<script setup>
import { useState } from 'nuxt/app';

// 使用Nuxt的useState来获取当前主题状态
const $state = {
  themeStyle: useState('themeStyle', () => 'bailu')
};
</script>

<style scoped>
.seasonal-background {
  overflow: hidden;
  transition: all 0.5s ease;
}

/* 白露主题背景 */
.seasonal-background-bailu {
  background-image: radial-gradient(circle at 20% 80%, rgba(215, 190, 105, 0.15) 0%, transparent 60%),
                    radial-gradient(circle at 80% 30%, rgba(215, 190, 105, 0.1) 0%, transparent 50%);
}

.bg-pattern-bailu {
  background-image: 
    linear-gradient(to right, rgba(215, 190, 105, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(215, 190, 105, 0.1) 1px, transparent 1px);
  background-size: 60px 60px;
}

.bailu-circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(215, 190, 105, 0.3);
  opacity: 0.5;
}

.bailu-circle.circle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  right: 15%;
  animation: rotate 60s linear infinite;
}

.bailu-circle.circle-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  left: 10%;
  animation: rotate 45s linear infinite reverse;
}

.bailu-circle.circle-3 {
  width: 150px;
  height: 150px;
  top: 30%;
  left: 25%;
  animation: rotate 30s linear infinite;
}

.bailu-line {
  position: absolute;
  background: linear-gradient(to right, transparent, rgba(215, 190, 105, 0.2), transparent);
  height: 1px;
}

.bailu-line.line-1 {
  width: 40%;
  top: 40%;
  right: 0;
  transform: rotate(-15deg);
}

.bailu-line.line-2 {
  width: 30%;
  bottom: 30%;
  left: 10%;
  transform: rotate(20deg);
}

/* 寒露主题背景 */
.seasonal-background-hanlu {
  background-image: radial-gradient(circle at 70% 20%, rgba(80, 140, 190, 0.15) 0%, transparent 60%),
                    radial-gradient(circle at 30% 70%, rgba(80, 140, 190, 0.1) 0%, transparent 50%);
}

.bg-pattern-hanlu {
  background-image: 
    linear-gradient(to right, rgba(80, 140, 190, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(80, 140, 190, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

.hanlu-leaf {
  position: absolute;
  opacity: 0.6;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(80, 140, 190)" opacity="0.4"><path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" stroke="rgb(80, 140, 190)" stroke-width="1" opacity="0.4"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
}

.hanlu-leaf.leaf-1 {
  width: 100px;
  height: 100px;
  top: 15%;
  right: 20%;
  animation: float 20s ease-in-out infinite;
}

.hanlu-leaf.leaf-2 {
  width: 80px;
  height: 80px;
  bottom: 25%;
  left: 15%;
  animation: float 15s ease-in-out infinite reverse;
}

.hanlu-leaf.leaf-3 {
  width: 60px;
  height: 60px;
  top: 40%;
  left: 30%;
  animation: float 25s ease-in-out infinite;
}

.hanlu-wave {
  position: absolute;
  height: 2px;
  background: linear-gradient(to right, transparent, rgba(80, 140, 190, 0.2), transparent);
}

.hanlu-wave.wave-1 {
  width: 50%;
  top: 35%;
  left: 0;
  transform: rotate(5deg);
}

.hanlu-wave.wave-2 {
  width: 40%;
  bottom: 20%;
  right: 5%;
  transform: rotate(-8deg);
}

/* 小寒主题背景 */
.seasonal-background-xiaohan {
  background-image: radial-gradient(circle at 30% 30%, rgba(202, 202, 212, 0.15) 0%, transparent 60%),
                    radial-gradient(circle at 70% 70%, rgba(202, 202, 212, 0.1) 0%, transparent 50%);
}

.bg-pattern-xiaohan {
  background-image: 
    linear-gradient(to right, rgba(202, 202, 212, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(202, 202, 212, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

.xiaohan-flake {
  position: absolute;
  opacity: 0.7;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(202, 202, 212)" opacity="0.4"><path d="M11 2h2v5.17l4.88-4.88 1.42 1.42L14.83 9H20v2h-5.17l4.88 4.88-1.42 1.42L14 12.83V18h-2v-5.17l-4.88 4.88-1.42-1.42L10.17 11H5V9h5.17L5.3 4.12l1.42-1.42L11 7.17V2z" stroke="rgb(202, 202, 212)" stroke-width="0.5" opacity="0.4"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
}

.xiaohan-flake.flake-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  right: 25%;
  animation: rotate 40s linear infinite;
}

.xiaohan-flake.flake-2 {
  width: 60px;
  height: 60px;
  bottom: 30%;
  left: 20%;
  animation: rotate 30s linear infinite reverse;
}

.xiaohan-flake.flake-3 {
  width: 40px;
  height: 40px;
  top: 50%;
  left: 40%;
  animation: rotate 20s linear infinite;
}

.xiaohan-crystal {
  position: absolute;
  background: linear-gradient(135deg, rgba(202, 202, 212, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
  transform: rotate(45deg);
}

.xiaohan-crystal.crystal-1 {
  width: 150px;
  height: 150px;
  top: 10%;
  left: 10%;
  opacity: 0.3;
}

.xiaohan-crystal.crystal-2 {
  width: 100px;
  height: 100px;
  bottom: 15%;
  right: 15%;
  opacity: 0.2;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
</style> 