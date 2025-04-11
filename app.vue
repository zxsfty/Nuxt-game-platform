<script setup>
// 引入主题状态
const isDarkMode = useState('darkMode', () => true); // 默认为夜间模式
</script>

<template>
  <div class="min-h-screen flex flex-col" :class="{'dark-mode': isDarkMode, 'light-mode': !isDarkMode}">
    <header class="bg-gradient-to-r from-primary-dark/90 via-secondary-dark/80 to-primary-dark/90 backdrop-blur-md p-4 border-b border-neon-blue/30 shadow-lg neon-border transition-all duration-300 hover:shadow-neon sticky top-0 z-50 animate-gradient-x bg-size-200">
      <div class="absolute inset-0 bg-grid opacity-10"></div>
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan glow-text hover:glow-text-lg transition-all transform hover:scale-105 cursor-pointer">
          科幻游戏平台
        </h1>
        <nav class="flex items-center space-x-6">
          <NuxtLink 
            to="/" 
            class="text-white hover:text-neon-cyan transition-all duration-300 relative group transform hover:scale-105 hover:glow-text"
            active-class="text-neon-blue font-bold glow-text"
          >
            首页
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-cyan group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink 
            to="/games" 
            class="text-white hover:text-neon-cyan transition-all duration-300 relative group transform hover:scale-105 hover:glow-text"
            active-class="text-neon-blue font-bold glow-text"
          >
            游戏信息
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-cyan group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink 
            to="/launcher" 
            class="text-white hover:text-neon-cyan transition-all duration-300 relative group transform hover:scale-105 hover:glow-text"
            active-class="text-neon-blue font-bold glow-text"
          >
            启动器
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-cyan group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink 
            to="/forum" 
            class="text-white hover:text-neon-cyan transition-all duration-300 relative group transform hover:scale-105 hover:glow-text"
            active-class="text-neon-blue font-bold glow-text"
          >
            论坛
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-cyan group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink 
            to="/chat" 
            class="text-white hover:text-neon-cyan transition-all duration-300 relative group transform hover:scale-105 hover:glow-text"
            active-class="text-neon-blue font-bold glow-text"
          >
            聊天
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-cyan group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink 
            to="/market" 
            class="text-white hover:text-neon-cyan transition-all duration-300 relative group transform hover:scale-105 hover:glow-text"
            active-class="text-neon-blue font-bold glow-text"
          >
            交易
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-cyan group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink 
            to="/guides" 
            class="text-white hover:text-neon-cyan transition-all duration-300 relative group transform hover:scale-105 hover:glow-text"
            active-class="text-neon-blue font-bold glow-text"
          >
            攻略
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-cyan group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-white hover:text-neon-cyan transition-all duration-300 relative group transform hover:scale-105 hover:glow-text"
            active-class="text-neon-blue font-bold glow-text"
          >
            关于我们
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-cyan group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <div class="ml-4 relative group">
            <button class="bg-gradient-to-r from-neon-blue to-neon-cyan text-white px-4 py-1.5 rounded-full hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-300 transform hover:scale-105 overflow-hidden relative border border-neon-blue/30">
              <span class="relative z-10">登录/注册</span>
              <span class="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-blue opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
              <span class="absolute -inset-px bg-gradient-to-r from-neon-blue/20 to-neon-cyan/20 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto p-4 relative">
      <div class="absolute inset-0 bg-grid opacity-5"></div>
      <NuxtPage class="page-transition relative z-10" />
    </main>
    
    <!-- 主题切换按钮固定在右下角 -->
    <div class="fixed bottom-6 right-6 z-50">
      <ThemeToggle />
    </div>

    <footer class="bg-gradient-to-r from-primary-dark/95 via-secondary-dark/90 to-primary-dark/95 backdrop-blur-md p-4 border-t border-neon-blue/30 text-center neon-border transition-all duration-300 hover:shadow-neon">
      <div class="absolute inset-0 bg-grid opacity-10"></div>
      <p class="text-sm relative z-10">© 2024 科幻游戏平台 - <span class="text-neon-blue hover:text-neon-cyan transition-colors cursor-pointer glow-text">保留所有权利</span></p>
    </footer>
  </div>
</template>

<style>
.router-link-active {
  @apply text-neon-blue font-bold;
}

.glow-text {
  text-shadow: 0 0 3px rgba(79, 140, 236, 0.8), 0 0 6px rgba(79, 140, 236, 0.4);
  transition: text-shadow 0.5s ease;
}

.glow-text-lg {
  text-shadow: 0 0 5px rgba(79, 140, 236, 0.7), 0 0 10px rgba(79, 140, 236, 0.4), 0 0 15px rgba(79, 140, 236, 0.2);
}

.shadow-neon {
  box-shadow: 0 0 10px rgba(79, 140, 236, 0.3), 0 0 20px rgba(79, 140, 236, 0.2);
}

.neon-border {
  position: relative;
}

.neon-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(45deg, #3b82f6, #06b6d4, #ec4899);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  animation: borderRotate 4s linear infinite;
}

@keyframes borderRotate {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 200% 0%;
  }
}

/* 导航链接悬停效果 */
nav a:hover {
  text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff;
}

/* 导航栏发光效果 */
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
  background: linear-gradient(90deg, transparent, #3b82f6, #00ffff, #3b82f6, transparent);
  animation: scanline 3s linear infinite;
}

@keyframes scanline {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>