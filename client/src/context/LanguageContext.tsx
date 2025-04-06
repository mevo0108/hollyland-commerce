import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Language, TranslationKey, getTranslation } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language storage key in localStorage
const LANGUAGE_STORAGE_KEY = 'app-language';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get saved language from localStorage or use browser language or default to English
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';
    
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'he')) {
      return savedLanguage;
    }
    
    // Try to detect browser language
    const browserLanguage = navigator.language.split('-')[0];
    if (browserLanguage === 'he') return 'he';
    
    return 'en';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const isRTL = language === 'he';

  // Update language in state and localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    
    // Update document direction
    document.documentElement.dir = newLanguage === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  // Get translation for a specific key
  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  // Set initial document direction on mount
  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { useLanguage };