import {Lang} from "@/types";

export const getLang: () => Lang = () => {
    const language: string | null = localStorage.getItem('language');
    let lang = 'zh';
    if (language) {
        try {
            lang = JSON.parse(language).language;
        } catch (e) {
        }
    }
    return lang as Lang;
};