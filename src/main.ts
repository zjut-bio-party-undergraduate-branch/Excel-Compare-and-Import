import { i18n } from './i18n/index';
import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import {bitable} from '@base-open/web-api'

createApp(App).use(i18n).mount('#app')

const language = await bitable.bridge.getLanguage()

i18n.global.locale = ['zh', 'zh-TW', 'zh-HK'].includes(language) ? 'zh' : 'en';
