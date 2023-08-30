// import the original type declarations
import 'i18next'
// import all namespaces (for the default language, only)
import en from './../../../lang/en/frontend.json'
// TODO: add russian
// import ru from './../../../lang/ru/client/ru.json'

declare module 'i18next' {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom namespace type, if you changed it
        defaultNS: 'en'
        // custom resources type
        resources: {
            en: typeof en
            // ru: typeof ru
        }
        // other
    }
}
