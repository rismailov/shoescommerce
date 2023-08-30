import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './../../lang/en/frontend.json'
// TODO: add russian
// import ru from './../../lang/ru/client/ru.json'

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        // ru: { translation: ru },
    },
    lng: 'en',
    fallbackLng: 'en',
})

export default i18n
