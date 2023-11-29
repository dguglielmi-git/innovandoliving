import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import { TRANSLATION_EN } from "./en/translations";
import { TRANSLATION_ES } from "./es/translations";
import { TRANSLATION_FR } from "./fr/translations";
import { TRANSLATION_IT } from './it/translations';
import { TRANSLATION_NL } from "./nl/translations";
import { TRANSLATION_PT } from "./pt/translations";
import { TRANSLATION_ZH } from "./zh/translations";
import { TRANSLATION_DE } from './de/translations';

export const languages = {
    resources: {
        en: {
            text: 'English',
            flag: 'gb',
            lang: 'en',
            translation: TRANSLATION_EN,
        },
        es: {
            text: 'Español',
            flag: 'ar',
            lang: 'es',
            translation: TRANSLATION_ES,
        },
        de: {
            text: 'Deutsch',
            flag: 'de',
            lang: 'de',
            translation: TRANSLATION_DE,
        },
        fr: {
            text: 'Française',
            flag: 'fr',
            lang: 'fr',
            translation: TRANSLATION_FR,
        },
        it: {
            text: 'Italiano',
            flag: 'it',
            lang: 'it',
            translation: TRANSLATION_IT,
        },
        nl: {
            text: 'Nederlandse',
            flag: 'nl',
            lang: 'nl',
            translation: TRANSLATION_NL,
        },
        pt: {
            text: 'Português',
            flag: 'br',
            lang: 'pt',
            translation: TRANSLATION_PT,
        },
        zh: {
            text: '中國人',
            flag: 'cn',
            lang: 'zh',
            translation: TRANSLATION_ZH,
        },
    },
};

i18n.use(LanguageDetector).use(initReactI18next).init(languages);
//i18n.changeLanguage('en');
export default i18n;


