<template>
  <nav class="bg-secondary-dark rounded-lg overflow-hidden border border-primary-accent/30 mb-6">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-3">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-primary-accent mr-8">游戏平台</NuxtLink>
          <div class="hidden md:flex space-x-6">
            <NuxtLink to="/" class="text-primary-light hover:text-primary-accent transition-colors">首页</NuxtLink>
            <NuxtLink to="/games" class="text-primary-light hover:text-primary-accent transition-colors">游戏库</NuxtLink>
            <NuxtLink to="/guides" class="text-primary-light hover:text-primary-accent transition-colors">攻略</NuxtLink>
            <NuxtLink to="/about" class="text-primary-light hover:text-primary-accent transition-colors">关于我们</NuxtLink>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <button class="text-primary-light hover:text-primary-accent">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button class="bg-primary-accent text-secondary-dark px-4 py-1 rounded-full font-medium hover:bg-primary-accent/80 transition-colors">
            登录
          </button>
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button @click="isMenuOpen = !isMenuOpen" class="text-primary-light focus:outline-none">
            <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-primary-accent/20">
        <div class="flex flex-col space-y-3">
          <NuxtLink to="/" class="text-primary-light hover:text-primary-accent transition-colors">首页</NuxtLink>
          <NuxtLink to="/games" class="text-primary-light hover:text-primary-accent transition-colors">游戏库</NuxtLink>
          <NuxtLink to="/guides" class="text-primary-light hover:text-primary-accent transition-colors">攻略</NuxtLink>
          <NuxtLink to="/about" class="text-primary-light hover:text-primary-accent transition-colors">关于我们</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
</script> 