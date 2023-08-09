import { createI18n } from 'vue-i18n'
import { en } from './en'
import { zh } from './zh'

export const i18n = createI18n({
  locale: 'en',
  allowComposition: true, // you need to specify that!
  messages: {
    en: en,
    zh: zh
  }
})