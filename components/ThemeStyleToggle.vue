<script setup>
import { ref, computed, watch } from 'vue';

// 引入主题状态
const isDarkMode = useState('darkMode', () => true);
const themeStyle = useState('themeStyle', () => 'bailu');

// 节气主题信息
const seasonalThemes = {
  bailu: {
    name: '白露',
    description: '白露节气，天高气爽，草木凝露',
    season: '秋季',
    color: 'rgb(168, 160, 122)',
    accentColor: 'rgb(215, 190, 105)',
    preview: '~/assets/images/bailu-preview.jpg'
  },
  hanlu: {
    name: '寒露',
    description: '寒露节气，露水将寒，草木渐衰',
    season: '深秋',
    color: 'rgb(106, 133, 182)',
    accentColor: 'rgb(80, 140, 190)',
    preview: '~/assets/images/hanlu-preview.jpg'
  },
  xiaohan: {
    name: '小寒',
    description: '小寒节气，天寒地冻，冰雪纷飞',
    season: '冬季',
    color: 'rgb(169, 169, 169)',
    accentColor: 'rgb(202, 202, 212)',
    preview: '~/assets/images/xiaohan-preview.jpg'
  }
};

// 当前选中的主题
const selectedTheme = ref(themeStyle.value);

// 监听主题变化
watch(selectedTheme, (newTheme) => {
  // 移除所有主题类
  document.documentElement.classList.remove('theme-bailu', 'theme-hanlu', 'theme-xiaohan');
  
  // 添加新主题类
  document.documentElement.classList.add(`theme-${newTheme}`);
  
  // 更新主题状态
  themeStyle.value = newTheme;
  
  // 保存到本地存储
  localStorage.setItem('themeStyle', newTheme);
});

// 切换暗色/亮色模式
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.add('light-mode');
    document.documentElement.classList.remove('dark-mode');
  }
  
  // 保存到本地存储
  localStorage.setItem('darkMode', isDarkMode.value);
};

// 计算当前主题的信息
const currentThemeInfo = computed(() => {
  return seasonalThemes[selectedTheme.value];
});

// 动画状态
const isAnimating = ref(false);

// 切换主题时添加动画效果
const applyTheme = (theme) => {
  if (theme === selectedTheme.value) return;
  
  isAnimating.value = true;
  selectedTheme.value = theme;
  
  setTimeout(() => {
    isAnimating.value = false;
  }, 500);
};
</script>

<template>
  <div class="theme-style-toggle" :class="[`theme-${selectedTheme}-container`, {'is-animating': isAnimating}]">
    <div class="seasonal-decoration" :class="`seasonal-decoration-${selectedTheme}`">
      <div class="seasonal-particles">
        <span v-for="n in 5" :key="n" class="particle" :class="`particle-${n}`"></span>
      </div>
    </div>
    
    <h3 class="seasonal-title text-xl font-bold mb-4 text-center" :class="`seasonal-title-${selectedTheme}`">
      <span class="seasonal-icon mr-2">🍂</span>
      节气主题选择
      <span class="seasonal-icon ml-2">🍂</span>
    </h3>
    
    <div class="theme-cards-container grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- 白露主题卡片 -->
      <div 
        class="theme-card" 
        :class="{'active': selectedTheme === 'bailu'}"
        @click="applyTheme('bailu')"
      >
        <div class="theme-card-inner">
          <div class="theme-preview-image" style="background-image: url('~/assets/images/bailu-preview.jpg')"></div>
          <div class="theme-content">
            <div class="theme-name">{{ seasonalThemes.bailu.name }}</div>
            <div class="theme-description text-sm opacity-80">{{ seasonalThemes.bailu.description }}</div>
            <div class="theme-season text-xs mt-1 opacity-60">{{ seasonalThemes.bailu.season }}</div>
          </div>
        </div>
      </div>
      
      <!-- 寒露主题卡片 -->
      <div 
        class="theme-card" 
        :class="{'active': selectedTheme === 'hanlu'}"
        @click="applyTheme('hanlu')"
      >
        <div class="theme-card-inner">
          <div class="theme-preview-image" style="background-image: url('~/assets/images/hanlu-preview.jpg')"></div>
          <div class="theme-content">
            <div class="theme-name">{{ seasonalThemes.hanlu.name }}</div>
            <div class="theme-description text-sm opacity-80">{{ seasonalThemes.hanlu.description }}</div>
            <div class="theme-season text-xs mt-1 opacity-60">{{ seasonalThemes.hanlu.season }}</div>
          </div>
        </div>
      </div>
      
      <!-- 小寒主题卡片 -->
      <div 
        class="theme-card" 
        :class="{'active': selectedTheme === 'xiaohan'}"
        @click="applyTheme('xiaohan')"
      >
        <div class="theme-card-inner">
          <div class="theme-preview-image" style="background-image: url('~/assets/images/xiaohan-preview.jpg')"></div>
          <div class="theme-content">
            <div class="theme-name">{{ seasonalThemes.xiaohan.name }}</div>
            <div class="theme-description text-sm opacity-80">{{ seasonalThemes.xiaohan.description }}</div>
            <div class="theme-season text-xs mt-1 opacity-60">{{ seasonalThemes.xiaohan.season }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="theme-info mt-6 p-4 rounded-lg" :class="`theme-info-${selectedTheme}`">
      <h4 class="font-bold mb-2">当前主题: {{ currentThemeInfo.name }}</h4>
      <p class="text-sm opacity-80">{{ currentThemeInfo.description }}</p>
      <div class="flex items-center mt-3">
        <span class="text-xs opacity-70 mr-2">暗色/亮色模式:</span>
        <button 
          @click="toggleDarkMode" 
          class="mode-toggle-btn"
          :class="{'dark': isDarkMode, 'light': !isDarkMode}"
        >
          <span class="mode-toggle-icon">{{ isDarkMode ? '🌙' : '☀️' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-style-toggle {
  padding: 1.5rem;
  border-radius: 0.75rem;
  background-color: rgba(var(--color-secondary-dark), 0.7);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 20px rgba(var(--color-primary-accent), 0.15);
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
  transform-origin: bottom right;
  animation: fadeIn 0.3s ease-out;
}

.theme-style-toggle:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25), 0 0 25px rgba(var(--color-primary-accent), 0.2);
}

/* 节气特定容器样式 */
.theme-bailu-container {
  border: 1px solid rgba(168, 160, 122, 0.3);
  box-shadow: 0 4px 15px rgba(215, 190, 105, 0.2), 0 0 5px rgba(215, 190, 105, 0.1);
}

.theme-hanlu-container {
  border: 1px solid rgba(116, 143, 192, 0.3);
  box-shadow: 0 4px 15px rgba(80, 140, 190, 0.2), 0 0 5px rgba(80, 140, 190, 0.1);
}

.theme-xiaohan-container {
  border: 1px solid rgba(179, 179, 189, 0.3);
  box-shadow: 0 4px 15px rgba(202, 202, 212, 0.2), 0 0 5px rgba(202, 202, 212, 0.1);
}

.seasonal-title {
  position: relative;
  display: inline-block;
  margin: 0 auto;
}

.seasonal-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(var(--color-primary-accent), 0.7), transparent);
  border-radius: 2px;
}

/* 主题卡片样式 */
.theme-card {
  height: 180px;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.theme-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

.theme-card.active {
  transform: translateY(-5px);
  animation: pulseGlow 2s infinite alternate;
}

@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 5px rgba(var(--color-primary-accent), 0.5);
  }
  100% {
    box-shadow: 0 0 15px rgba(var(--color-primary-accent), 0.7);
  }
}

.theme-bailu .theme-card.active {
  border: 2px solid rgb(168, 160, 122);
  box-shadow: 0 0 15px rgba(168, 160, 122, 0.5);
}

.theme-hanlu .theme-card.active {
  border: 2px solid rgb(106, 133, 182);
  box-shadow: 0 0 15px rgba(106, 133, 182, 0.5);
}

.theme-xiaohan .theme-card.active {
  border: 2px solid rgb(169, 169, 169);
  box-shadow: 0 0 15px rgba(169, 169, 169, 0.5);
}

.theme-card-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  position: relative;
}

.theme-preview-image {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  transition: all 0.5s ease;
  filter: brightness(0.95);
}

.theme-card:hover .theme-preview-image {
  transform: scale(1.1);
  filter: brightness(1.05);
}

.theme-card.active .theme-preview-image {
  filter: brightness(1.1);
}

.theme-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  z-index: 1;
  transition: all 0.3s ease;
  transform: translateY(0);
}

.theme-card:hover .theme-content {
  padding-bottom: 1.2rem;
  transform: translateY(-5px);
}

.theme-name {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

/* 主题信息面板 */
.theme-info {
  background-color: rgba(var(--color-secondary-dark), 0.5);
  border: 1px solid rgba(var(--color-primary-accent), 0.2);
  transition: all 0.3s ease;
}

.theme-info-bailu {
  border-color: rgba(215, 190, 105, 0.3);
  background: linear-gradient(135deg, rgba(168, 160, 122, 0.1), rgba(215, 190, 105, 0.2));
}

.theme-info-hanlu {
  border-color: rgba(80, 140, 190, 0.3);
  background: linear-gradient(135deg, rgba(106, 133, 182, 0.1), rgba(80, 140, 190, 0.2));
}

.theme-info-xiaohan {
  border-color: rgba(202, 202, 212, 0.3);
  background: linear-gradient(135deg, rgba(169, 169, 169, 0.1), rgba(202, 202, 212, 0.2));
}

/* 模式切换按钮 */
.mode-toggle-btn {
  width: 40px;
  height: 20px;
  border-radius: 10px;
  background-color: rgba(var(--color-secondary-light), 0.3);
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}

.mode-toggle-btn.dark {
  background-color: rgba(var(--color-secondary-dark), 0.7);
}

.mode-toggle-btn.light {
  background-color: rgba(var(--color-eye-comfort), 0.7);
}

.mode-toggle-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.mode-toggle-btn.dark .mode-toggle-icon {
  right: 5px;
}

.mode-toggle-btn.light .mode-toggle-icon {
  left: 5px;
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.is-animating {
  animation: themeTransition 0.5s ease;
}

@keyframes themeTransition {
  0% { opacity: 0.8; transform: scale(0.98); }
  50% { opacity: 0.9; transform: scale(1.01); }
  100% { opacity: 1; transform: scale(1); }
}

/* 季节性装饰 */
.seasonal-decoration {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.seasonal-particles .particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0.6;
  pointer-events: none;
}

/* 白露特定装饰 */
.seasonal-decoration-bailu .particle {
  background: radial-gradient(circle, rgba(215, 190, 105, 0.8), transparent);
  box-shadow: 0 0 10px rgba(215, 190, 105, 0.5);
  animation: floatParticle 15s infinite linear;
}

/* 寒露特定装饰 */
.seasonal-decoration-hanlu .particle {
  background: radial-gradient(circle, rgba(80, 140, 190, 0.8), transparent);
  box-shadow: 0 0 10px rgba(80, 140, 190, 0.5);
  animation: floatParticle 20s infinite linear;
}

/* 小寒特定装饰 */
.seasonal-decoration-xiaohan .particle {
  background: radial-gradient(circle, rgba(202, 202, 212, 0.8), transparent);
  box-shadow: 0 0 10px rgba(202, 202, 212, 0.5);
  animation: floatParticle 25s infinite linear;
}

@keyframes floatParticle {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(100px, 50px) rotate(90deg); }
  50% { transform: translate(50px, 100px) rotate(180deg); }
  75% { transform: translate(-50px, 50px) rotate(270deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}

.particle-1 { top: 10%; left: 10%; animation-delay: 0s; }
.particle-2 { top: 20%; right: 20%; animation-delay: -2s; }
.particle-3 { bottom: 30%; left: 30%; animation-delay: -4s; }
.particle-4 { bottom: 10%; right: 10%; animation-delay: -6s; }
.particle-5 { top: 50%; left: 50%; animation-delay: -8s; }
</style>