import { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');
    const { i18n } = useTranslation(); // Hook into the i18n system

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
        i18n.changeLanguage(newLang); // Tell i18next to switch dictionaries
    };

    // The Layout Flipper
    useEffect(() => {
        const root = window.document.documentElement;
        // Sets <html dir="rtl"> for Arabic, or "ltr" for English
        root.dir = language === 'ar' ? 'rtl' : 'ltr';
        root.lang = language;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);