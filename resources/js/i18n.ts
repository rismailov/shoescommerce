import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './../../lang/en/client.json'
import ru from './../../lang/ru/client.json'
// TODO: add russian

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        ru: { translation: ru },
    },
    lng: 'en',
    fallbackLng: 'en',
})

export default i18n
