<template>
  <div class="space-y-8">
    <section class="hero-section bg-primary-light rounded-lg p-8 border-2 border-neon-blue">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6 text-neon-blue">The broken with star sinks</h1>
        <p class="text-xl mb-8">一站式管理您的游戏，畅享无缝游戏体验</p>
        <div class="flex justify-center space-x-4">
          <button class="bg-neon-purple hover:bg-neon-blue text-white font-bold py-2 px-4 rounded-full transition-all">
            我的游戏库
          </button>
          <button class="bg-transparent hover:bg-neon-purple text-white font-bold py-2 px-4 rounded-full border border-neon-purple transition-all">
            游戏商店
          </button>
        </div>
      </div>
    </section>

    <!-- 游戏库和下载管理 -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- 侧边栏 -->
      <div class="lg:col-span-1">
        <div class="bg-primary-light rounded-lg p-4 neon-border sticky top-24">
          <h3 class="text-xl font-bold text-neon-blue mb-4">启动器菜单</h3>
          <nav class="space-y-2">
            <a href="#" class="flex items-center space-x-2 p-2 rounded-md bg-secondary-dark text-neon-blue">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span>我的游戏库</span>
            </a>
            <a href="#" class="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary-dark hover:text-neon-blue transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
              </svg>
              <span>游戏商店</span>
            </a>
            <a href="#" class="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary-dark hover:text-neon-blue transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <span>下载管理</span>
            </a>
            <a href="#" class="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary-dark hover:text-neon-blue transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
              <span>设置</span>
            </a>
            <a href="#" class="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary-dark hover:text-neon-blue transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
              </svg>
              <span>帮助与支持</span>
            </a>
          </nav>

          <!-- 系统状态 -->
          <div class="mt-6 pt-4 border-t border-neon-blue/30">
            <h4 class="text-lg font-medium text-neon-blue mb-2">系统状态</h4>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm">CPU 使用率</span>
                <div class="w-24 h-2 bg-secondary-dark rounded-full overflow-hidden">
                  <div class="h-full bg-neon-blue" style="width: 35%"></div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm">内存使用率</span>
                <div class="w-24 h-2 bg-secondary-dark rounded-full overflow-hidden">
                  <div class="h-full bg-neon-purple" style="width: 65%"></div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm">网络状态</span>
                <span class="text-xs text-green-500">良好</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="lg:col-span-3 space-y-6">
        <!-- 游戏库 -->
        <section class="game-library">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-neon-blue">我的游戏库</h2>
            <div class="flex space-x-2">
              <button class="bg-secondary-dark hover:bg-neon-purple text-white text-sm py-1 px-3 rounded-full transition-colors">
                全部
              </button>
              <button class="bg-secondary-dark hover:bg-neon-purple text-white text-sm py-1 px-3 rounded-full transition-colors">
                已安装
              </button>
              <button class="bg-secondary-dark hover:bg-neon-purple text-white text-sm py-1 px-3 rounded-full transition-colors">
                收藏
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(game, index) in installedGames" :key="index" class="bg-primary-light rounded-lg overflow-hidden hover:neon-border transition-all duration-300 group">
              <div class="relative">
                <img :src="game.image" :alt="game.name" class="w-full h-32 object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                  <div>
                    <h3 class="text-lg font-bold group-hover:text-neon-blue transition-colors">{{ game.name }}</h3>
                    <div class="flex items-center text-xs text-gray-400">
                      <span>{{ game.genre }}</span>
                      <span class="mx-1">•</span>
                      <span>{{ game.size }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-3 flex justify-between items-center">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full" :class="game.status === 'ready' ? 'bg-green-500' : 'bg-yellow-500'"></div>
                  <span class="text-sm">{{ game.status === 'ready' ? '已准备' : '需要更新' }}</span>
                </div>
                <button class="bg-neon-blue hover:bg-neon-purple text-white text-sm py-1 px-4 rounded-full transition-colors">
                  {{ game.status === 'ready' ? '启动' : '更新' }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- 下载管理 -->
        <section class="downloads-section bg-primary-light rounded-lg p-6 neon-border">
          <h2 class="text-2xl font-bold text-neon-blue mb-4">下载管理</h2>
          
          <div v-if="downloads.length > 0" class="space-y-4">
            <div v-for="(download, index) in downloads" :key="index" class="bg-secondary-dark rounded-lg p-4">
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded bg-primary-light overflow-hidden">
                    <img :src="download.image" :alt="download.name" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 class="font-medium">{{ download.name }}</h4>
                    <div class="text-xs text-gray-400">{{ download.downloaded }} / {{ download.size }}</div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button class="text-neon-blue hover:text-neon-purple transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button class="text-neon-red hover:text-red-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="w-full h-2 bg-primary-light rounded-full overflow-hidden">
                <div class="h-full bg-neon-blue" :style="{ width: download.progress + '%' }"></div>
              </div>
              <div class="flex justify-between items-center mt-2 text-xs text-gray-400">
                <span>{{ download.progress }}%</span>
                <span>{{ download.speed }} - {{ download.timeLeft }}</span>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-8 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <p>当前没有下载任务</p>
          </div>
        </section>

        <!-- 游戏更新 -->
        <section class="updates-section bg-primary-light rounded-lg p-6 neon-border">
          <h2 class="text-2xl font-bold text-neon-blue mb-4">可用更新</h2>
          
          <div v-if="updates.length > 0" class="space-y-3">
            <div v-for="(update, index) in updates" :key="index" class="flex justify-between items-center p-3 bg-secondary-dark rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded bg-primary-light overflow-hidden">
                  <img :src="update.image" :alt="update.name" class="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 class="font-medium">{{ update.name }}</h4>
                  <div class="text-xs text-gray-400">{{ update.version }} - {{ update.size }}</div>
                </div>
              </div>
              <button class="bg-neon-purple hover:bg-neon-blue text-white text-sm py-1 px-3 rounded-full transition-colors">
                更新
              </button>
            </div>
          </div>
          
          <div v-else class="text-center py-8 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>所有游戏都是最新版本</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 已安装游戏数据
const installedGames = ref([
  {
    name: '星际探索者',
    genre: '太空探险',
    size: '45.2 GB',
    status: 'ready',
    image: 'https://via.placeholder.com/400x200?text=星际探索者'
  },
  {
    name: '量子战争',
    genre: '科幻射击',
    size: '68.7 GB',
    status: 'update',
    image: 'https://via.placeholder.com/400x200?text=量子战争'
  },
  {
    name: '赛博朋克2099',
    genre: '角色扮演',
    size: '103.4 GB',
    status: 'ready',
    image: 'https://via.placeholder.com/400x200?text=赛博朋克2099'
  },
  {
    name: '机械纪元',
    genre: '机甲模拟',
    size: '32.1 GB',
    status: 'ready',
    image: 'https://via.placeholder.com/400x200?text=机械纪元'
  }
]);

// 下载任务数据
const downloads = ref([
  {
    name: '虚空行者',
    size: '78.5 GB',
    downloaded: '45.2 GB',
    progress: 58,
    speed: '12.5 MB/s',
    timeLeft: '约 45 分钟',
    image: 'https://via.placeholder.com/50x50?text=虚空行者'
  },
  {
    name: '量子战争 - 更新包',
    size: '12.3 GB',
    downloaded: '3.7 GB',
    progress: 30,
    speed: '8.2 MB/s',
    timeLeft: '约 18 分钟',
    image: 'https://via.placeholder.com/50x50?text=量子战争'
  }
]);

// 可用更新数据
const updates = ref([
  {
    name: '量子战争',
    version: 'v2.5.1',
    size: '12.3 GB',
    image: 'https://via.placeholder.com/50x50?text=量子战争'
  },
  {
    name: '星际探索者 - DLC',
    version: '银河扩展包',
    size: '8.7 GB',
    image: 'https://via.placeholder.com/50x50?text=星际探索者'
  }
]);
</script>

<style scoped>
.neon-border {
  box-shadow: 0 0 5px rgba(var(--color-neon-blue), 0.5);
}

.hover\:neon-border:hover {
  box-shadow: 0 0 10px rgba(var(--color-neon-blue), 0.7);
}
</style>