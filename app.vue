<script setup>
import { onMounted, watch } from 'vue';
// 引入主题状态
const isDarkMode = useState('darkMode', () => true); // 默认为夜间模式
const themeStyle = useState('themeStyle', () => 'bailu'); // 默认为白露主题

// 节气主题信息
const seasonalThemes = {
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

// 在组件挂载时初始化节气主题
onMounted(() => {
  // 从本地存储中获取主题
  const savedTheme = localStorage.getItem('themeStyle');
  
  // 如果有保存的主题，则应用它
  if (savedTheme && ['bailu', 'hanlu', 'xiaohan'].includes(savedTheme)) {
    document.documentElement.classList.add(`theme-${savedTheme}`);
    themeStyle.value = savedTheme;
  } else {
    // 否则应用默认主题
    document.documentElement.classList.add('theme-bailu');
    themeStyle.value = 'bailu';
  }
  
  // 初始化暗色/亮色模式
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.add('light-mode');
    document.documentElement.classList.remove('dark-mode');
  }
});

// 监听主题变化
watch(themeStyle, (newTheme) => {
  // 添加过渡动画类
  document.documentElement.classList.add('theme-transitioning');
  
  // 移除过渡动画类
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
  }, 500);
});
</script>

<template>
  <div class="min-h-screen flex flex-col seasonal-background" :class="{'dark-mode': isDarkMode, 'light-mode': !isDarkMode, [`theme-${themeStyle}`]: true}">
    <!-- 节气特定背景装饰元素 -->
    <div v-if="themeStyle === 'bailu'" class="seasonal-floating-elements bailu-elements">
      <!-- 白露特有的露珠元素 -->
      <div class="dew-drop floating-dew-1"></div>
      <div class="dew-drop floating-dew-2"></div>
      <div class="dew-drop floating-dew-3"></div>
      <div class="bailu-grass floating-grass-1"></div>
      <div class="bailu-grass floating-grass-2"></div>
      <div class="bailu-glow-effect floating-glow-1"></div>
      
      <!-- 白露特有的场景元素 -->
      <div class="seasonal-bridge bailu-bridge">
        <div class="bridge-arch"></div>
        <div class="bridge-reflection"></div>
      </div>
      <div class="seasonal-tree bailu-tree">
        <div class="tree-trunk"></div>
        <div class="tree-leaves"></div>
      </div>
      <div class="seasonal-flower bailu-flower">
        <div class="flower-petals"></div>
        <div class="flower-center"></div>
      </div>
      <div class="seasonal-lake bailu-lake">
        <div class="lake-surface"></div>
        <div class="lake-ripple"></div>
      </div>
    </div>
    <div v-if="themeStyle === 'hanlu'" class="seasonal-floating-elements hanlu-elements">
      <!-- 寒露特有的秋叶元素 -->
      <div class="autumn-leaf floating-leaf-1"></div>
      <div class="autumn-leaf floating-leaf-2"></div>
      <div class="autumn-leaf floating-leaf-3"></div>
      <div class="hanlu-mist floating-mist-1"></div>
      <div class="hanlu-mist floating-mist-2"></div>
      <div class="hanlu-glow-effect floating-glow-1"></div>
      
      <!-- 寒露特有的场景元素 -->
      <div class="seasonal-bridge hanlu-bridge">
        <div class="bridge-arch"></div>
        <div class="bridge-reflection"></div>
      </div>
      <div class="seasonal-tree hanlu-tree">
        <div class="tree-trunk"></div>
        <div class="tree-leaves"></div>
      </div>
      <div class="seasonal-flower hanlu-flower">
        <div class="flower-petals"></div>
        <div class="flower-center"></div>
      </div>
      <div class="seasonal-lake hanlu-lake">
        <div class="lake-surface"></div>
        <div class="lake-ripple"></div>
      </div>
    </div>
    <div v-if="themeStyle === 'xiaohan'" class="seasonal-floating-elements xiaohan-elements">
      <!-- 小寒特有的雪花元素 -->
      <div class="snowflake floating-snow-1"></div>
      <div class="snowflake floating-snow-2"></div>
      <div class="snowflake floating-snow-3"></div>
      <div class="xiaohan-frost floating-frost-1"></div>
      <div class="xiaohan-frost-glow floating-frost-glow-1"></div>
      
      <!-- 小寒特有的场景元素 -->
      <div class="seasonal-bridge xiaohan-bridge">
        <div class="bridge-arch"></div>
        <div class="bridge-reflection"></div>
      </div>
      <div class="seasonal-tree xiaohan-tree">
        <div class="tree-trunk"></div>
        <div class="tree-leaves"></div>
      </div>
      <div class="seasonal-flower xiaohan-flower">
        <div class="flower-petals"></div>
        <div class="flower-center"></div>
      </div>
      <div class="seasonal-lake xiaohan-lake">
        <div class="lake-surface"></div>
        <div class="lake-ripple"></div>
      </div>
    </div>
    <header class="bg-transparent backdrop-blur-lg p-4 border-b border-primary-accent/20 shadow-theme transition-all duration-300 hover:shadow-lg sticky top-0 z-50">
      <!-- 节气特定导航栏背景 -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-primary-dark/10 to-transparent backdrop-blur-lg"></div>
      <div class="absolute inset-0 opacity-30 seasonal-pattern" :class="`${themeStyle}-pattern`"></div>
      <div class="seasonal-accent-line" :class="`${themeStyle}-accent-line`"></div>
      <!-- 毛玻璃效果增强 -->
      <div class="absolute inset-0 backdrop-filter backdrop-blur-md bg-opacity-10 bg-primary-dark/5"></div>
      <!-- 古风装饰边框 -->
      <div class="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary-accent/40 to-transparent"></div>
      <div class="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary-accent/40 to-transparent"></div>
      <div class="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-primary-accent/40 to-transparent"></div>
      <div class="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-primary-accent/40 to-transparent"></div>
      <!-- 节气特定装饰元素 -->
      <div v-if="themeStyle === 'bailu'" class="seasonal-header-decoration bailu-decoration">
        <div class="seasonal-icon animate-pulse">🍃</div>
        <div class="seasonal-header-particles">
          <span class="particle-1"></span>
          <span class="particle-2"></span>
          <span class="particle-3"></span>
          <span class="particle-4"></span>
          <span class="particle-5"></span>
        </div>
        <div class="seasonal-header-glow bailu-glow"></div>
        <div class="dew-drop header-dew-drop-1"></div>
        <div class="dew-drop header-dew-drop-2"></div>
        <div class="bailu-glow-effect header-glow-effect"></div>
      </div>
      <div v-if="themeStyle === 'hanlu'" class="seasonal-header-decoration hanlu-decoration">
        <div class="seasonal-icon animate-pulse">🍂</div>
        <div class="seasonal-header-particles">
          <span class="particle-1"></span>
          <span class="particle-2"></span>
          <span class="particle-3"></span>
          <span class="particle-4"></span>
          <span class="particle-5"></span>
        </div>
        <div class="seasonal-header-glow hanlu-glow"></div>
        <div class="autumn-leaf header-leaf-1"></div>
        <div class="autumn-leaf header-leaf-2"></div>
        <div class="autumn-leaf header-leaf-3"></div>
      </div>
      <div v-if="themeStyle === 'xiaohan'" class="seasonal-header-decoration xiaohan-decoration">
        <div class="seasonal-icon animate-pulse">❄️</div>
        <div class="seasonal-header-particles">
          <span class="particle-1"></span>
          <span class="particle-2"></span>
          <span class="particle-3"></span>
          <span class="particle-4"></span>
          <span class="particle-5"></span>
        </div>
        <div class="seasonal-header-glow xiaohan-glow"></div>
        <div class="xiaohan-frost header-frost-1"></div>
        <div class="xiaohan-frost-glow header-frost-glow-1"></div>
        <div class="xiaohan-frost-glow header-frost-glow-2"></div>
      </div>
      <div class="container mx-auto flex justify-between items-center relative z-10 theme-transition">
        <h1 class="text-2xl font-serif font-bold hover:text-primary-light transition-all transform hover:scale-105 cursor-pointer" :style="`color: rgb(var(--nav-accent-color))`">
          游戏平台
        </h1>
        <nav class="flex items-center space-x-6">
          <NuxtLink 
            to="/" 
            class="nav-link transition-all duration-300 relative group transform hover:scale-105"
            :class="`nav-link-${themeStyle}`"
            :style="`color: rgb(var(--nav-text-color))`"
            active-class="font-bold"
            :active-class-style="`color: rgb(var(--nav-accent-color))`"
          >
            首页
            <span class="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 theme-transition" :style="`background-color: rgb(var(--nav-hover-color))`"></span>
            <div class="nav-decoration" :class="`nav-decoration-${themeStyle}`">
              <span class="nav-particle"></span>
            </div>
          </NuxtLink>
          <NuxtLink 
            to="/games" 
            class="nav-link transition-all duration-300 relative group transform hover:scale-105"
            :class="`nav-link-${themeStyle}`"
            :style="`color: rgb(var(--nav-text-color))`"
            active-class="font-bold"
            :active-class-style="`color: rgb(var(--nav-accent-color))`"
          >
            游戏信息
            <span class="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" :style="`background-color: rgb(var(--nav-hover-color))`"></span>
            <div class="nav-decoration" :class="`nav-decoration-${themeStyle}`">
              <span class="nav-particle"></span>
            </div>
          </NuxtLink>
          <NuxtLink 
            to="/forum" 
            class="nav-link transition-all duration-300 relative group transform hover:scale-105"
            :class="`nav-link-${themeStyle}`"
            :style="`color: rgb(var(--nav-text-color))`"
            active-class="font-bold"
            :active-class-style="`color: rgb(var(--nav-accent-color))`"
          >
            论坛
            <span class="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" :style="`background-color: rgb(var(--nav-hover-color))`"></span>
            <div class="nav-decoration" :class="`nav-decoration-${themeStyle}`">
              <span class="nav-particle"></span>
            </div>
          </NuxtLink>
          <NuxtLink 
            to="/launcher" 
            class="transition-all duration-300 relative group transform hover:scale-105"
            :style="`color: rgb(var(--nav-text-color))`"
            active-class="font-bold"
            :active-class-style="`color: rgb(var(--nav-accent-color))`"
          >
            启动器
            <span class="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" :style="`background-color: rgb(var(--nav-hover-color))`"></span>
          </NuxtLink>

          <NuxtLink 
            to="/chat" 
            class="nav-link transition-all duration-300 relative group transform hover:scale-105"
            :class="`nav-link-${themeStyle}`"
            :style="`color: rgb(var(--nav-text-color))`"
            active-class="font-bold"
            :active-class-style="`color: rgb(var(--nav-accent-color))`"
          >
            聊天
            <span class="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" :style="`background-color: rgb(var(--nav-hover-color))`"></span>
            <div class="nav-decoration" :class="`nav-decoration-${themeStyle}`">
              <span class="nav-particle"></span>
            </div>
          </NuxtLink>
          <NuxtLink 
            to="/market" 
            class="nav-link transition-all duration-300 relative group transform hover:scale-105"
            :class="`nav-link-${themeStyle}`"
            :style="`color: rgb(var(--nav-text-color))`"
            active-class="font-bold"
            :active-class-style="`color: rgb(var(--nav-accent-color))`"
          >
            交易
            <span class="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" :style="`background-color: rgb(var(--nav-hover-color))`"></span>
            <div class="nav-decoration" :class="`nav-decoration-${themeStyle}`">
              <span class="nav-particle"></span>
            </div>
          </NuxtLink>
          <NuxtLink 
            to="/guides" 
            class="nav-link transition-all duration-300 relative group transform hover:scale-105"
            :class="`nav-link-${themeStyle}`"
            :style="`color: rgb(var(--nav-text-color))`"
            active-class="font-bold"
            :active-class-style="`color: rgb(var(--nav-accent-color))`"
          >
            攻略
            <span class="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" :style="`background-color: rgb(var(--nav-hover-color))`"></span>
            <div class="nav-decoration" :class="`nav-decoration-${themeStyle}`">
              <span class="nav-particle"></span>
            </div>
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="nav-link transition-all duration-300 relative group transform hover:scale-105"
            :class="`nav-link-${themeStyle}`"
            :style="`color: rgb(var(--nav-text-color))`"
            active-class="font-bold"
            :active-class-style="`color: rgb(var(--nav-accent-color))`"
          >
            关于我们
            <span class="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" :style="`background-color: rgb(var(--nav-hover-color))`"></span>
            <div class="nav-decoration" :class="`nav-decoration-${themeStyle}`">
              <span class="nav-particle"></span>
            </div>
          </NuxtLink>
          <div class="ml-4 relative group">
            <button class="bg-primary-accent/80 text-primary-light px-4 py-1.5 rounded-md hover:shadow-theme transition-all duration-300 transform hover:scale-105 overflow-hidden relative border border-primary-accent/50 theme-transition">
              <span class="relative z-10">登录/注册</span>
              <span class="absolute inset-0 bg-primary-accent opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto p-4 relative">
      <div class="absolute inset-0 opacity-5 seasonal-pattern"></div>
      <div class="seasonal-floating-elements"></div>
      <NuxtPage class="page-transition relative z-10" />
    </main>
    
    <!-- 主题控制面板固定在右下角 -->
    <ThemeControlPanel />

    <footer class="bg-primary-dark/95 backdrop-blur-md p-4 border-t border-primary-accent/30 text-center transition-all duration-300 hover:shadow-theme">
      <div class="absolute inset-0 opacity-10 seasonal-pattern"></div>
      <div class="seasonal-accent-line bottom-accent"></div>
      <!-- 节气特定页脚装饰 -->
      <div class="seasonal-footer-decoration">
        <div v-if="themeStyle === 'bailu'" class="seasonal-footer-icon bailu-footer-icon">🍃</div>
        <div v-if="themeStyle === 'hanlu'" class="seasonal-footer-icon hanlu-footer-icon">🍂</div>
        <div v-if="themeStyle === 'xiaohan'" class="seasonal-footer-icon xiaohan-footer-icon">❄️</div>
        <!-- 添加节气特定装饰元素 -->
        <div v-if="themeStyle === 'bailu'" class="seasonal-footer-particles bailu-particles">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div v-if="themeStyle === 'hanlu'" class="seasonal-footer-particles hanlu-particles">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div v-if="themeStyle === 'xiaohan'" class="seasonal-footer-particles xiaohan-particles">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
      <p class="text-sm relative z-10">© 2024 The broken with star sinks - <span class="text-primary-accent hover:text-primary-light transition-colors cursor-pointer">保留所有权利</span></p>
      <p class="text-xs text-primary-light/70 mt-1 relative z-10">当前节气：<span class="text-primary-accent">{{ seasonalThemes[themeStyle].name }}</span> - {{ seasonalThemes[themeStyle].description }}</p>
    </footer>
  </div>
</template>

<style>
.router-link-active {
  @apply text-primary-accent font-bold;
}

.shadow-theme {
  box-shadow: 0 0 10px rgba(var(--color-primary-accent), 0.3), 0 0 20px rgba(var(--color-primary-accent), 0.2);
}

/* 节气特定背景装饰元素 */
.bailu-elements::before,
.bailu-elements::after {
  content: '';
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 160, 122, 0.8) 0%, rgba(168, 160, 122, 0.1) 70%, transparent 100%);
  box-shadow: 0 0 5px rgba(168, 160, 122, 0.5), inset 0 0 2px rgba(255, 255, 255, 0.8);
  pointer-events: none;
  z-index: 1;
  backdrop-filter: blur(1px);
  animation: floatDew 20s ease-in-out infinite;
}

.hanlu-elements::before,
.hanlu-elements::after {
  content: '';
  position: fixed;
  background: radial-gradient(ellipse, rgba(106, 133, 182, 0.3) 0%, rgba(106, 133, 182, 0.1) 50%, transparent 100%);
  border-radius: 50%;
  filter: blur(8px);
  pointer-events: none;
  z-index: 1;
  animation: floatMist 35s ease-in-out infinite;
}

.xiaohan-elements::before,
.xiaohan-elements::after {
  content: '';
  position: fixed;
  pointer-events: none;
  z-index: 1;
  top: -50px;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 70%),
    radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 70%);
  background-size: 12px 12px, 8px 8px;
  background-position: 0% 0%, 50% 50%;
  animation: snowfall 15s linear infinite;
  opacity: 0.4;
}

/* 季节性过渡效果 */
.theme-bailu .seasonal-transition {
  transition: all 0.5s ease;
  background-image: linear-gradient(to right, rgba(var(--color-primary-accent), 0.2), rgba(var(--color-secondary-accent), 0.2));
}

.theme-hanlu .seasonal-transition {
  transition: all 0.5s ease;
  background-image: linear-gradient(to right, rgba(var(--color-primary-accent), 0.2), rgba(var(--color-secondary-accent), 0.2));
}

.theme-xiaohan .seasonal-transition {
  transition: all 0.5s ease;
  background-image: linear-gradient(to right, rgba(var(--color-primary-accent), 0.2), rgba(var(--color-secondary-accent), 0.2));
}

/* 主题过渡动画 */
.theme-transitioning * {
  transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease !important;
}

/* 节气特定导航栏装饰 */
.seasonal-header-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.seasonal-icon {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.7;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
  animation: floatHeaderIcon 5s ease-in-out infinite;
  transition: all 0.3s ease;
}

.seasonal-icon:hover {
  opacity: 0.9;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
  transform: scale(1.1);
}

.bailu-decoration .seasonal-icon {
  top: 10px;
  right: 5%;
}

.hanlu-decoration .seasonal-icon {
  top: 15px;
  right: 8%;
}

.xiaohan-decoration .seasonal-icon {
  top: 12px;
  right: 6%;
}

.seasonal-header-particles span {
  position: absolute;
  display: block;
  pointer-events: none;
  opacity: 0;
}

.bailu-decoration .seasonal-header-particles span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 160, 122, 0.8) 0%, rgba(168, 160, 122, 0.1) 70%, transparent 100%);
  box-shadow: 0 0 3px rgba(168, 160, 122, 0.5);
  animation: floatHeaderParticle 8s ease-in-out infinite;
}

.hanlu-decoration .seasonal-header-particles span {
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, rgba(106, 133, 182, 0.8) 0%, rgba(106, 133, 182, 0.1) 70%, transparent 100%);
  box-shadow: 0 0 3px rgba(106, 133, 182, 0.5);
  animation: floatHeaderParticle 10s ease-in-out infinite;
}

.xiaohan-decoration .seasonal-header-particles span {
  width: 5px;
  height: 5px;
  background: radial-gradient(circle, rgba(169, 169, 169, 0.8) 0%, rgba(169, 169, 169, 0.1) 70%, transparent 100%);
  box-shadow: 0 0 3px rgba(169, 169, 169, 0.5);
  animation: floatHeaderParticle 12s ease-in-out infinite;
}

.seasonal-header-particles .particle-1 { top: 20%; right: 10%; animation-delay: 0s; }
.seasonal-header-particles .particle-2 { top: 30%; right: 20%; animation-delay: 1s; }
.seasonal-header-particles .particle-3 { top: 15%; right: 30%; animation-delay: 2s; }
.seasonal-header-particles .particle-4 { top: 25%; right: 15%; animation-delay: 3s; }
.seasonal-header-particles .particle-5 { top: 35%; right: 25%; animation-delay: 4s; }

.seasonal-header-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.2;
  filter: blur(20px);
  animation: pulseGlow 4s ease-in-out infinite;
}

.bailu-glow {
  background: radial-gradient(circle, rgba(168, 160, 122, 0.6) 0%, transparent 70%);
}

.hanlu-glow {
  background: radial-gradient(circle, rgba(106, 133, 182, 0.6) 0%, transparent 70%);
}

.xiaohan-glow {
  background: radial-gradient(circle, rgba(169, 169, 169, 0.6) 0%, transparent 70%);
}

@keyframes floatHeaderIcon {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-5px) rotate(5deg);
  }
}

@keyframes floatHeaderParticle {
  0% {
    transform: translate(0, 0) scale(0.8);
    opacity: 0;
  }
  20% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.4;
  }
  100% {
    transform: translate(-30px, 20px) scale(0.2);
    opacity: 0;
  }
}

@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.2);
  }
}

/* 导航链接悬停效果 */

/* 节气特定页脚装饰 */
.seasonal-footer-decoration {
  position: relative;
  height: 20px;
  margin-bottom: 5px;
  overflow: visible;
}

.seasonal-footer-icon {
  position: absolute;
  font-size: 1.2rem;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.8;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
  animation: pulseFooterIcon 4s ease-in-out infinite;
}

@keyframes pulseFooterIcon {
  0%, 100% {
    transform: translateX(-50%) scale(1) rotate(0deg);
  }
  50% {
    transform: translateX(-50%) scale(1.2) rotate(5deg);
  }
}
nav a:hover {
  color: rgb(var(--color-primary-accent));
}

/* 导航栏季节性效果 */
header {
  position: relative;
  overflow: hidden;
}

header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgb(var(--color-primary-accent)), rgb(var(--color-secondary-accent)), rgb(var(--color-primary-accent)), transparent);
  animation: seasonalFlow 8s ease-in-out infinite;
}

@keyframes seasonalFlow {
  0% {
    transform: translateX(-100%);
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    transform: translateX(100%);
    opacity: 0.3;
  }
}

/* 节气主题背景图案 */
.seasonal-pattern {
  background-size: 200px 200px;
  background-repeat: repeat;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.theme-bailu .seasonal-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L60 40 L50 30 L40 40 Z' stroke='rgba(168, 160, 122, 0.2)' fill='none' /%3E%3Cpath d='M20 20 L30 10 L20 0 L10 10 Z' stroke='rgba(168, 160, 122, 0.15)' fill='none' /%3E%3Cpath d='M80 80 L90 70 L80 60 L70 70 Z' stroke='rgba(168, 160, 122, 0.15)' fill='none' /%3E%3C/svg%3E");
}

.theme-hanlu .seasonal-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30 Q50 10 70 30 Q90 50 70 70 Q50 90 30 70 Q10 50 30 30 Z' stroke='rgba(106, 133, 182, 0.2)' fill='none' /%3E%3Cpath d='M15 15 Q25 5 35 15 Q45 25 35 35 Q25 45 15 35 Q5 25 15 15 Z' stroke='rgba(106, 133, 182, 0.15)' fill='none' /%3E%3Cpath d='M65 65 Q75 55 85 65 Q95 75 85 85 Q75 95 65 85 Q55 75 65 65 Z' stroke='rgba(106, 133, 182, 0.15)' fill='none' /%3E%3C/svg%3E");
}

.theme-xiaohan .seasonal-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 30 L55 40 L65 40 L58 48 L60 58 L50 52 L40 58 L42 48 L35 40 L45 40 Z' stroke='rgba(169, 169, 169, 0.2)' fill='none' /%3E%3Cpath d='M20 10 L22 16 L28 16 L23 20 L25 26 L20 22 L15 26 L17 20 L12 16 L18 16 Z' stroke='rgba(169, 169, 169, 0.15)' fill='none' /%3E%3Cpath d='M80 70 L82 76 L88 76 L83 80 L85 86 L80 82 L75 86 L77 80 L72 76 L78 76 Z' stroke='rgba(169, 169, 169, 0.15)' fill='none' /%3E%3C/svg%3E");
}

/* 季节性背景效果 */
.seasonal-background {
  position: relative;
  overflow-x: hidden;
}

.seasonal-accent-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(var(--color-primary-accent), 0.7), rgba(var(--color-secondary-accent), 0.7), rgba(var(--color-primary-accent), 0.7), transparent);
  z-index: 5;
  opacity: 0.7;
}

.bottom-accent {
  top: 0;
  bottom: auto;
}

/* 季节性浮动元素 */
.seasonal-floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.theme-bailu .seasonal-floating-elements::before,
.theme-bailu .seasonal-floating-elements::after {
  content: '';
  position: absolute;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L12 8 L10 6 L8 8 Z' stroke='rgba(168, 160, 122, 0.4)' fill='none' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  opacity: 0;
  animation: floatElement 15s ease-in-out infinite;
}

.theme-bailu .seasonal-floating-elements::before {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.theme-bailu .seasonal-floating-elements::after {
  top: 50%;
  right: 10%;
  animation-delay: 5s;
}

.theme-hanlu .seasonal-floating-elements::before,
.theme-hanlu .seasonal-floating-elements::after {
  content: '';
  position: absolute;
  background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 5 Q25 15 15 25 Q5 15 15 5 Z' stroke='rgba(106, 133, 182, 0.4)' fill='none' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  opacity: 0;
  animation: floatElement 20s ease-in-out infinite;
}

.theme-hanlu .seasonal-floating-elements::before {
  top: 30%;
  left: 15%;
  animation-delay: 2s;
}

.theme-hanlu .seasonal-floating-elements::after {
  top: 60%;
  right: 15%;
  animation-delay: 7s;
}

.theme-xiaohan .seasonal-floating-elements::before,
.theme-xiaohan .seasonal-floating-elements::after {
  content: '';
  position: absolute;
  background-image: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.5 1 L8.5 4 L11.5 4 L9 6 L10 9 L7.5 7 L5 9 L6 6 L3.5 4 L6.5 4 Z' stroke='rgba(169, 169, 169, 0.4)' fill='none' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  width: 15px;
  height: 15px;
  opacity: 0;
  animation: floatSnow 10s ease-in-out infinite;
}

.theme-xiaohan .seasonal-floating-elements::before {
  top: 10%;
  left: 20%;
  animation-delay: 1s;
}

.theme-xiaohan .seasonal-floating-elements::after {
  top: 40%;
  right: 20%;
  animation-delay: 4s;
}

@keyframes floatElement {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0;
  }
  25% {
    opacity: 0.7;
  }
  50% {
    transform: translate(20px, 20px) rotate(180deg);
    opacity: 0.5;
  }
  75% {
    opacity: 0.7;
  }
  100% {
    transform: translate(0, 40px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes floatSnow {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0;
  }
  25% {
    opacity: 0.7;
  }
  100% {
    transform: translate(30px, 100px) rotate(90deg);
    opacity: 0;
  }
}

/* 导航链接节气特定样式和动画效果 */
.nav-link {
  padding: 0.5rem 0.75rem;
  position: relative;
  overflow: hidden;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* 白露主题导航样式 */
.nav-link-bailu::after {
  background: linear-gradient(90deg, transparent, rgba(215, 190, 105, 0.7), transparent);
}

.nav-link-bailu:hover {
  text-shadow: 0 0 5px rgba(215, 190, 105, 0.5);
}

.nav-decoration-bailu .nav-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(215, 190, 105, 0.9) 0%, rgba(215, 190, 105, 0.1) 70%);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

.nav-link-bailu:hover .nav-particle {
  animation: floatParticle 2s ease-in-out infinite;
  opacity: 1;
}

/* 寒露主题导航样式 */
.nav-link-hanlu::after {
  background: linear-gradient(90deg, transparent, rgba(80, 140, 190, 0.7), transparent);
}

.nav-link-hanlu:hover {
  text-shadow: 0 0 5px rgba(80, 140, 190, 0.5);
}

.nav-decoration-hanlu .nav-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, rgba(80, 140, 190, 0.9) 0%, rgba(80, 140, 190, 0.1) 70%);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

.nav-link-hanlu:hover .nav-particle {
  animation: floatParticle 2.5s ease-in-out infinite;
  opacity: 1;
}

/* 小寒主题导航样式 */
.nav-link-xiaohan::after {
  background: linear-gradient(90deg, transparent, rgba(202, 202, 212, 0.7), transparent);
}

.nav-link-xiaohan:hover {
  text-shadow: 0 0 5px rgba(202, 202, 212, 0.5);
}

.nav-decoration-xiaohan .nav-particle {
  position: absolute;
  width: 5px;
  height: 5px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(202, 202, 212, 0.1) 70%);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

.nav-link-xiaohan:hover .nav-particle {
  animation: floatParticle 2s ease-in-out infinite;
  opacity: 1;
}

@keyframes floatParticle {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-10px) translateX(5px);
  }
}
</style>