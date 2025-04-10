import { Ref } from 'vue'
import { NuxtConfig } from '@nuxt/schema'

declare global {
  const ref: <T>(value: T) => Ref<T>
  const defineNuxtConfig: (config: NuxtConfig) => NuxtConfig
}

export {}