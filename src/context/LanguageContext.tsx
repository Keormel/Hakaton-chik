import React, { useMemo, useState, createContext, useContext, memo } from 'react';
// Define available languages
export type Language = 'en' | 'ru' | 'ro';
// Define our translations for each language
export const translations = {
  en: {
    // Sidebar
    newRequest: 'New Request',
    searchEvents: 'Search events...',
    events: 'Events',
    noEventsFound: 'No events found',
    profile: 'Profile',
    settings: 'Settings',
    // Settings
    settingsTitle: 'Settings',
    generalSettings: 'General Settings',
    enableNotifications: 'Enable notifications',
    saveEventHistory: 'Save event history',
    autoSuggestResponses: 'Auto-suggest responses',
    appearance: 'Appearance',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    transparency: 'Transparency',
    voiceSettings: 'Voice Settings',
    voiceResponse: 'Voice response',
    voice: 'Voice',
    voiceSpeed: 'Voice Speed',
    voicePitch: 'Voice Pitch',
    languageSettings: 'Language Settings',
    interfaceLanguage: 'Interface Language',
    responseLanguage: 'Response Language',
    sameAsInterface: 'Same as interface',
    // Chat Area
    currentChat: 'Current Chat',
    clearConversation: 'Clear Conversation',
    askMeAnything: 'Ask me anything...',
    you: 'You',
    justNow: 'Just now',
    // Noir Logo
    jarvis: 'NOIR',
    jarvisFullName: 'Neural Omniscient Intelligence Responder',
    voiceChat: 'Voice Chat',
    enabled: 'Enabled',
    disabled: 'Disabled',
    clickToToggle: 'Click to {action}',
    enable: 'enable',
    disable: 'disable',
    // Profile
    profileTitle: 'Profile',
    login: 'Log in',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    addAnotherAccount: 'Add another account',
    yourAccounts: 'Your accounts',
    termsNotice: 'By registering, you agree to our Terms and Privacy Policy',
    // Confirmation dialog
    confirmClearTitle: 'Confirm deletion',
    confirmClearMessage: 'Are you sure you want to delete this conversation?',
    yes: 'Yes',
    no: 'No',
    // Months
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December'
  },
  ru: {
    // Sidebar
    newRequest: 'Новый запрос',
    searchEvents: 'Поиск событий...',
    events: 'События',
    noEventsFound: 'События не найдены',
    profile: 'Профиль',
    settings: 'Настройки',
    // Settings
    settingsTitle: 'Настройки',
    generalSettings: 'Общие настройки',
    enableNotifications: 'Включить уведомления',
    saveEventHistory: 'Сохранять историю событий',
    autoSuggestResponses: 'Автоматические предложения',
    appearance: 'Внешний вид',
    theme: 'Тема',
    light: 'Светлая',
    dark: 'Темная',
    system: 'Системная',
    transparency: 'Прозрачность',
    voiceSettings: 'Настройки голоса',
    voiceResponse: 'Голосовой ответ',
    voice: 'Голос',
    voiceSpeed: 'Скорость голоса',
    voicePitch: 'Высота голоса',
    languageSettings: 'Настройки языка',
    interfaceLanguage: 'Язык интерфейса',
    responseLanguage: 'Язык ответов',
    sameAsInterface: 'Как у интерфейса',
    // Chat Area
    currentChat: 'Текущий чат',
    clearConversation: 'Очистить беседу',
    askMeAnything: 'Спросите что угодно...',
    you: 'Вы',
    justNow: 'Только что',
    // Noir Logo
    jarvis: 'НУАР',
    jarvisFullName: 'Нейронная Универсальная Аналитическая Разумность',
    voiceChat: 'Голосовой чат',
    enabled: 'Включен',
    disabled: 'Отключен',
    clickToToggle: 'Нажмите, чтобы {action}',
    enable: 'включить',
    disable: 'отключить',
    // Profile
    profileTitle: 'Профиль',
    login: 'Войти',
    register: 'Регистрация',
    email: 'Электронная почта',
    password: 'Пароль',
    forgotPassword: 'Забыли пароль?',
    addAnotherAccount: 'Добавить другой аккаунт',
    yourAccounts: 'Ваши аккаунты',
    termsNotice: 'Регистрируясь, вы соглашаетесь с нашими Условиями и Политикой конфиденциальности',
    // Confirmation dialog
    confirmClearTitle: 'Подтверждение удаления',
    confirmClearMessage: 'Вы уверены, что хотите удалить этот разговор?',
    yes: 'Да',
    no: 'Нет',
    // Months
    january: 'Январь',
    february: 'Февраль',
    march: 'Март',
    april: 'Апрель',
    may: 'Май',
    june: 'Июнь',
    july: 'Июль',
    august: 'Август',
    september: 'Сентябрь',
    october: 'Октябрь',
    november: 'Ноябрь',
    december: 'Декабрь'
  },
  ro: {
    // Sidebar
    newRequest: 'Cerere nouă',
    searchEvents: 'Caută evenimente...',
    events: 'Evenimente',
    noEventsFound: 'Nu s-au găsit evenimente',
    profile: 'Profil',
    settings: 'Setări',
    // Settings
    settingsTitle: 'Setări',
    generalSettings: 'Setări generale',
    enableNotifications: 'Activează notificările',
    saveEventHistory: 'Salvează istoricul evenimentelor',
    autoSuggestResponses: 'Sugestii automate de răspuns',
    appearance: 'Aspect',
    theme: 'Temă',
    light: 'Luminos',
    dark: 'Întunecat',
    system: 'Sistem',
    transparency: 'Transparență',
    voiceSettings: 'Setări voce',
    voiceResponse: 'Răspuns vocal',
    voice: 'Voce',
    voiceSpeed: 'Viteza vocii',
    voicePitch: 'Tonul vocii',
    languageSettings: 'Setări de limbă',
    interfaceLanguage: 'Limba interfeței',
    responseLanguage: 'Limba răspunsurilor',
    sameAsInterface: 'Aceeași ca interfața',
    // Chat Area
    currentChat: 'Chat curent',
    clearConversation: 'Șterge conversația',
    askMeAnything: 'Întreabă-mă orice...',
    you: 'Tu',
    justNow: 'Acum',
    // Noir Logo
    jarvis: 'NOIR',
    jarvisFullName: 'Neural Omniscient Intelligence Responder',
    voiceChat: 'Chat vocal',
    enabled: 'Activat',
    disabled: 'Dezactivat',
    clickToToggle: 'Click pentru a {action}',
    enable: 'activa',
    disable: 'dezactiva',
    // Profile
    profileTitle: 'Profil',
    login: 'Autentificare',
    register: 'Înregistrare',
    email: 'Email',
    password: 'Parolă',
    forgotPassword: 'Ai uitat parola?',
    addAnotherAccount: 'Adaugă alt cont',
    yourAccounts: 'Conturile tale',
    termsNotice: 'Prin înregistrare, ești de acord cu Termenii și Politica noastră de confidențialitate',
    // Confirmation dialog
    confirmClearTitle: 'Confirmare ștergere',
    confirmClearMessage: 'Sigur doriți să ștergeți această conversație?',
    yes: 'Da',
    no: 'Nu',
    // Months
    january: 'Ianuarie',
    february: 'Februarie',
    march: 'Martie',
    april: 'Aprilie',
    may: 'Mai',
    june: 'Iunie',
    july: 'Iulie',
    august: 'August',
    september: 'Septembrie',
    october: 'Octombrie',
    november: 'Noiembrie',
    december: 'Decembrie'
  }
};
// Create the context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: key => key.toString()
});
// Create the provider component
export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  // Try to get saved language from localStorage
  const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') as Language || 'en' : 'en';
  const [language, setLanguage] = useState<Language>(savedLanguage);
  // Save language preference to localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };
  // Function to get translated text - memoized to prevent recreation
  const t = useMemo(() => {
    return (key: keyof typeof translations.en): string => {
      return translations[language][key] || key.toString();
    };
  }, [language]);
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t
  }), [language, t]);
  return <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>;
};
// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);