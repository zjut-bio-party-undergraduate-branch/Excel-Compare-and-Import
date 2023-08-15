import { createI18n } from 'vue-i18n'
import { en } from './en'
import { zh } from './zh'
import { bitable } from '@lark-base-open/web-api'

export const i18n = createI18n({
  locale: 'en',
  allowComposition: true, // you need to specify that!
  messages: {
    en: en,
    zh: zh
  }
})

bitable.bridge.getLanguage().then((lang) => {
  i18n.global.locale = ['zh', 'zh-TW', 'zh-HK'].includes(lang) ? 'zh' : 'en'
})



