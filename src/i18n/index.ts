import { createI18n } from 'vue-i18n'
import { en } from './en'
import { zh } from './zh'
import {bitable} from '@base-open/web-api'

const language = await bitable.bridge.getLanguage()
const locale = ['zh', 'zh-TW', 'zh-HK'].includes(language) ? 'zh' : 'en';

export const i18n = createI18n({
  locale,
  allowComposition: true, // you need to specify that!
  messages: {
    en: en,
    zh: zh
  }
})



