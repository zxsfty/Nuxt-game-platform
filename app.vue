<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-primary-light/80 backdrop-blur-sm p-4 border-b border-secondary-accent shadow-lg neon-border transition-all duration-300 hover:shadow-neon">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-mono text-neon-blue glow-text hover:glow-text-lg transition-all">科幻游戏平台</h1>
        <nav class="flex space-x-6">
          <NuxtLink 
            to="/" 
            class="hover:text-neon-cyan transition-colors duration-300 relative group"
            active-class="text-neon-blue font-bold"
          >
            首页
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink 
            to="/forum" 
            class="hover:text-neon-cyan transition-colors"
            active-class="text-neon-blue font-bold"
          >
            论坛
          </NuxtLink>
          <NuxtLink 
            to="/chat" 
            class="hover:text-neon-cyan transition-colors"
            active-class="text-neon-blue font-bold"
          >
            聊天
          </NuxtLink>
          <NuxtLink 
            to="/market" 
            class="hover:text-neon-cyan transition-colors"
            active-class="text-neon-blue font-bold"
          >
            交易
          </NuxtLink>
          <NuxtLink 
            to="/launcher" 
            class="hover:text-neon-cyan transition-colors"
            active-class="text-neon-blue font-bold"
          >
            启动器
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto p-4">
      <NuxtPage />
    </main>

    <footer class="bg-primary-light p-4 border-t border-secondary-accent text-center">
      <p class="text-sm">© 2024 科幻游戏平台 - 保留所有权利</p>
    </footer>
  </div>
</template>

<style>
.router-link-active {
  @apply text-neon-blue font-bold;
}

.glow-text {
  text-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6;
  transition: text-shadow 0.3s ease;
}

.glow-text-lg {
  text-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6;
}

.shadow-neon {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
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
}
</style>