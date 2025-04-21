// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css', '~/assets/css/themes.css', '~/assets/css/seasonal-animations.css', '~/assets/css/seasonal-scene-elements.css', '~/assets/css/homepage-effects.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  typescript: {
    strict: true,
    typeCheck: true
  },

  app: {
    head: {
      title: 'The broken with star sinks',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { key: 'description', name: 'description', content: 'The broken with star sinks - 沉浸式科幻游戏平台' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    // 添加页面过渡动画
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  compatibilityDate: '2025-04-10'
})