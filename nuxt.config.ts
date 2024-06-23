// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/nuxt"],
  app: {
    head: {
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1",
      title: "NYIF",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "",
        },
      ],
    },
  },
  colorMode: {
    fallback: "light",
    preference: "light",
  },
});
