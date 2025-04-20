<template>
  <div class="space-y-8">
    <!-- 导航栏 -->
    <NavBar />
    
    <!-- 主视觉图像 -->
    <section class="main-visual relative h-80 rounded-lg overflow-hidden">
      <img src="/assets/images/games/arknights-endfield.svg" alt="关于我们" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-secondary-dark/70 to-transparent"></div>
      <div class="absolute bottom-0 left-0 p-8 w-full">
        <h1 class="text-5xl font-bold mb-2 text-primary-accent font-serif">关于我们</h1>
        <p class="text-xl mb-4 text-primary-light max-w-2xl">探索游戏世界的引领者</p>
      </div>
    </section>

    <!-- 公司简介 -->
    <section class="company-intro bg-primary-light p-8 rounded-lg border border-primary-accent/30">
      <h2 class="text-3xl font-bold text-primary-accent mb-6 font-serif text-center">我们的故事</h2>
      <div class="flex flex-col md:flex-row gap-8 items-center">
        <div class="w-full md:w-1/2">
          <p class="text-primary-light mb-4 leading-relaxed">
            游戏平台成立于2020年，是由一群热爱游戏的开发者、设计师和游戏爱好者组成的团队。我们致力于为全球玩家提供最优质、最前沿的游戏体验。
          </p>
          <p class="text-primary-light mb-4 leading-relaxed">
            三年来，我们不断拓展游戏品类，从最初的独立游戏平台，发展成为囊括角色扮演、策略、射击、冒险等多种类型的综合游戏平台。目前，我们已为超过500万玩家提供服务，平台上架游戏超过200款。
          </p>
          <p class="text-primary-light leading-relaxed">
            未来，我们将继续秉持"玩家至上"的理念，不断创新，为玩家带来更多优质游戏和服务，成为连接开发者与玩家的桥梁。
          </p>
        </div>
        <div class="w-full md:w-1/2 flex justify-center">
          <div class="relative w-full h-64 rounded-lg overflow-hidden border-4 border-primary-accent/20">
            <img src="/assets/images/games/wuthering-waves-blue.svg" alt="公司历程" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-secondary-dark/50 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-center">
              <span class="bg-primary-accent text-primary-light px-4 py-1 rounded-full text-sm font-medium">
                三年成长历程
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 使命与愿景 -->
    <section class="mission-vision bg-secondary-dark p-8 rounded-lg text-center">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-primary-accent mb-8 font-serif">使命与愿景</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="mission p-6 bg-primary-light/10 rounded-lg border border-primary-accent/30">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-accent/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-primary-accent mb-3">我们的使命</h3>
            <p class="text-primary-light">
              通过创新的游戏体验，连接全球玩家，为他们带来欢乐、挑战与成长，同时支持游戏开发者实现创意梦想。
            </p>
          </div>
          <div class="vision p-6 bg-primary-light/10 rounded-lg border border-primary-accent/30">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-accent/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-primary-accent mb-3">我们的愿景</h3>
            <p class="text-primary-light">
              成为全球领先的游戏平台，引领游戏产业发展方向，塑造游戏文化，让游戏成为连接人与人之间的重要纽带。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心团队 -->
    <section class="team-section">
      <h2 class="text-3xl font-bold text-primary-accent mb-6 font-serif text-center">核心团队</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="member in teamMembers" 
          :key="member.id"
          class="team-member bg-primary-light rounded-lg overflow-hidden border border-primary-accent/30 transition-all hover:transform hover:scale-105"
        >
          <div class="h-48 overflow-hidden">
            <img :src="member.avatar" :alt="member.name" class="w-full h-full object-cover">
          </div>
          <div class="p-4 text-center">
            <h3 class="text-xl font-bold text-primary-accent mb-1">{{ member.name }}</h3>
            <p class="text-secondary-light mb-3">{{ member.position }}</p>
            <p class="text-primary-light text-sm mb-4">{{ member.bio }}</p>
            <div class="flex justify-center space-x-3">
              <a href="#" class="text-primary-accent hover:text-primary-accent/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" class="text-primary-accent hover:text-primary-accent/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-primary-accent hover:text-primary-accent/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="contact-section bg-primary-light p-8 rounded-lg border border-primary-accent/30">
      <h2 class="text-3xl font-bold text-primary-accent mb-6 font-serif text-center">联系我们</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="contact-info">
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="w-10 h-10 rounded-full bg-secondary-dark flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-primary-accent mb-1">办公地址</h3>
                <p class="text-primary-light">北京市海淀区中关村科技园区8号楼A座15层</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-10 h-10 rounded-full bg-secondary-dark flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-primary-accent mb-1">电子邮箱</h3>
                <p class="text-primary-light">contact@gameplatform.com</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-10 h-10 rounded-full bg-secondary-dark flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-primary-accent mb-1">联系电话</h3>
                <p class="text-primary-light">+86 010-12345678</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-10 h-10 rounded-full bg-secondary-dark flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-primary-accent mb-1">社交媒体</h3>
                <div class="flex space-x-3 mt-2">
                  <a href="#" class="w-8 h-8 rounded-full bg-secondary-dark/50 flex items-center justify-center hover:bg-primary-accent/80 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-light" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" class="w-8 h-8 rounded-full bg-secondary-dark/50 flex items-center justify-center hover:bg-primary-accent/80 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-light" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" class="w-8 h-8 rounded-full bg-secondary-dark/50 flex items-center justify-center hover:bg-primary-accent/80 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-light" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" class="w-8 h-8 rounded-full bg-secondary-dark/50 flex items-center justify-center hover:bg-primary-accent/80 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-light" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <form>
            <div class="mb-4">
              <label class="block text-primary-accent text-sm font-bold mb-2" for="name">
                您的姓名
              </label>
              <input class="bg-secondary-dark text-primary-light border border-primary-accent/30 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-accent" id="name" type="text" placeholder="请输入您的姓名">
            </div>
            <div class="mb-4">
              <label class="block text-primary-accent text-sm font-bold mb-2" for="email">
                电子邮箱
              </label>
              <input class="bg-secondary-dark text-primary-light border border-primary-accent/30 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-accent" id="email" type="email" placeholder="请输入您的电子邮箱">
            </div>
            <div class="mb-4">
              <label class="block text-primary-accent text-sm font-bold mb-2" for="subject">
                主题
              </label>
              <input class="bg-secondary-dark text-primary-light border border-primary-accent/30 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-accent" id="subject" type="text" placeholder="请输入您的主题">
            </div>
            <div class="mb-6">
              <label class="block text-primary-accent text-sm font-bold mb-2" for="message">
                您的留言
              </label>
              <textarea class="bg-secondary-dark text-primary-light border border-primary-accent/30 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-accent h-32" id="message" placeholder="请输入您的留言内容"></textarea>
            </div>
            <div class="flex items-center justify-center">
              <button class="bg-primary-accent hover:bg-primary-accent/80 text-primary-light font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline transition-colors" type="button">
                发送留言
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- 页脚区域 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '~/components/NavBar.vue';
import Footer from '~/components/Footer.vue';
import { useHead } from 'nuxt/app';

// SEO元数据
useHead({
  title: '关于我们 - 游戏平台官方介绍',
  meta: [
    { name: 'description', content: '了解游戏平台的使命、愿景、团队成员及发展历程。我们致力于为全球玩家提供最优质、最前沿的游戏体验。' },
    { name: 'keywords', content: '游戏平台,关于我们,游戏公司,团队介绍,公司使命,联系我们' }
  ]
});

// 核心团队成员
const teamMembers = ref([
  {
    id: 1,
    name: '陈明',
    position: '创始人 & CEO',
    bio: '前知名游戏公司技术总监，拥有15年游戏开发经验，致力于打造最佳游戏平台。',
    avatar: '/assets/images/games/wuthering-waves-icon.svg'
  },
  {
    id: 2,
    name: '李婷',
    position: '首席设计官',
    bio: '资深UI/UX设计师，曾参与多款知名游戏的界面设计，擅长创造沉浸式游戏体验。',
    avatar: '/assets/images/games/arknights-icon.svg'
  },
  {
    id: 3,
    name: '张伟',
    position: '技术总监',
    bio: '全栈开发工程师，云计算专家，致力于构建高性能、安全可靠的游戏平台基础设施。',
    avatar: '/assets/images/games/wuthering-waves-abyss-icon.svg'
  },
  {
    id: 4,
    name: '王芳',
    position: '市场总监',
    bio: '拥有丰富的游戏行业市场推广经验，专注于用户增长策略和品牌建设。',
    avatar: '/assets/images/games/arknights-endfield-icon.svg'
  }
]);
</script>

<style scoped>
.hover\:transform:hover {
  transform: scale(1.05);
}
</style> 