import { i18n } from "./i18n/index"
import { createApp } from "vue"
import { createHead } from "@unhead/vue"
import App from "./App.vue"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"

const head = createHead()
createApp(App).use(head).use(i18n).mount("#app")
