// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false,

  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        }
      ],
      script: [{ src: 'https://telegram.org/js/telegram-web-app.js', defer: true }],
    }
  },

  css: ['~/assets/scss/main.scss'],

  modules: ['@nuxt/ui'],
})