// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  css: ['~/assets/scss/app.scss'],
  plugins: [],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/color-mode',
  ],
  build: {},
  tailwindcss: {
    cssPath: '~/assets/css/input.css',
  },
  runtimeConfig: {
    apiSecret: {},
    public: {
      apiBaseUrl: process.env.NUXT_BASE_URL || 'localhost:3000',
      appVersion: process.env.NUXT_APP_VERSION || 'v1',
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.ts',
        name: 'English',
      },
      {
        code: 'vi',
        file: 'vi.ts',
        name: 'Vietnamese',
      },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'vi',
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
});
