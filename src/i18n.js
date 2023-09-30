import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';



i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        supportedLngs: ['ar', 'en'],
        fallbackLng: "ar",
        lng: 'ar',
        
        react: {

            useSuspense: false,
        },
        backend: {
            loadPath: '/language/{{lng}}/translation.json',
            allowMultiLoading: false,
        }


    });

export default i18n;