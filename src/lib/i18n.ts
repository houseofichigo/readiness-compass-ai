// src/i18n.ts

class SimpleI18n {
  language: string = 'en'

  changeLanguage(lng: string) {
    this.language = lng
  }
}

const i18n = new SimpleI18n()

export default i18n
