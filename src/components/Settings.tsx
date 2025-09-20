import React, { useState } from 'react';
import { XIcon, MoonIcon, SunIcon, VolumeIcon, Volume2Icon, ZapIcon, GlobeIcon, MonitorIcon, ChevronDownIcon, CheckIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../context/ThemeContext';
export function Settings({
  isOpen,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('general');
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  const {
    theme,
    setTheme,
    currentTheme
  } = useTheme();
  // Dropdown states
  const [voiceDropdownOpen, setVoiceDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [responseLanguageDropdownOpen, setResponseLanguageDropdownOpen] = useState(false);
  // Selected values
  const [selectedVoice, setSelectedVoice] = useState('Jarvis (Default)');
  const [selectedResponseLanguage, setSelectedResponseLanguage] = useState(t('sameAsInterface'));
  const voices = ['Jarvis (Default)', 'Female Voice', 'British Male', 'Australian Female'];
  const responseLanguages = [t('sameAsInterface'), 'English (US)', 'Russian', 'Romanian'];
  const languageOptions = [{
    value: 'en',
    label: 'English (US)'
  }, {
    value: 'ru',
    label: 'Russian'
  }, {
    value: 'ro',
    label: 'Romanian'
  }];
  if (!isOpen) return null;
  const handleLanguageChange = langValue => {
    setLanguage(langValue as Language);
    setLanguageDropdownOpen(false);
  };
  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
  };
  const handleVoiceSelect = voice => {
    setSelectedVoice(voice);
    setVoiceDropdownOpen(false);
  };
  const handleResponseLanguageSelect = lang => {
    setSelectedResponseLanguage(lang);
    setResponseLanguageDropdownOpen(false);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl 
        bg-gradient-to-br from-white/70 to-white/40 
        dark:from-gray-800/90 dark:to-gray-900/80 
        backdrop-blur-xl 
        border border-white/50 dark:border-white/20 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]
        p-1">
        {/* Glass reflection effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute -inset-[400px] top-0 bg-gradient-to-b from-blue-100/40 dark:from-blue-900/20 to-transparent rounded-full opacity-30 blur-3xl"></div>
        </div>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/30 dark:border-blue-300/20">
          <h2 className="text-xl font-semibold text-blue-800/80 dark:text-blue-200">
            {t('settingsTitle')}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/30 dark:hover:bg-gray-700/80 transition-colors duration-200">
            <XIcon size={20} className="text-blue-800/70 dark:text-blue-200" />
          </button>
        </div>
        {/* Content */}
        <div className="flex h-[70vh]">
          {/* Sidebar */}
          <div className="w-1/4 border-r border-white/30 dark:border-blue-300/20 p-2">
            <div onClick={() => setActiveTab('general')} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 mb-1
              ${activeTab === 'general' ? 'bg-white/40 dark:bg-blue-900/60' : 'hover:bg-white/20 dark:hover:bg-gray-700/50'}`}>
              <ZapIcon size={16} className="text-blue-800/70 dark:text-blue-200 mr-3" />
              <span className="text-blue-800/80 dark:text-blue-200">
                {t('generalSettings')}
              </span>
            </div>
            <div onClick={() => setActiveTab('appearance')} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 mb-1
              ${activeTab === 'appearance' ? 'bg-white/40 dark:bg-blue-900/60' : 'hover:bg-white/20 dark:hover:bg-gray-700/50'}`}>
              <SunIcon size={16} className="text-blue-800/70 dark:text-blue-200 mr-3" />
              <span className="text-blue-800/80 dark:text-blue-200">
                {t('appearance')}
              </span>
            </div>
            <div onClick={() => setActiveTab('voice')} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 mb-1
              ${activeTab === 'voice' ? 'bg-white/40 dark:bg-blue-900/60' : 'hover:bg-white/20 dark:hover:bg-gray-700/50'}`}>
              <VolumeIcon size={16} className="text-blue-800/70 dark:text-blue-200 mr-3" />
              <span className="text-blue-800/80 dark:text-blue-200">
                {t('voiceSettings')}
              </span>
            </div>
            <div onClick={() => setActiveTab('language')} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 mb-1
              ${activeTab === 'language' ? 'bg-white/40 dark:bg-blue-900/60' : 'hover:bg-white/20 dark:hover:bg-gray-700/50'}`}>
              <GlobeIcon size={16} className="text-blue-800/70 dark:text-blue-200 mr-3" />
              <span className="text-blue-800/80 dark:text-blue-200">
                {t('languageSettings')}
              </span>
            </div>
          </div>
          {/* Main Content */}
          <div className="w-3/4 p-6 overflow-y-auto">
            {activeTab === 'general' && <div>
                <h3 className="text-lg font-medium text-blue-800/80 dark:text-blue-100 mb-4">
                  {t('generalSettings')}
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-blue-800/80 dark:text-blue-200">
                        {t('enableNotifications')}
                      </span>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-white/50 dark:bg-gray-700/80 transition-colors duration-200">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <span className="absolute inset-y-1 left-1 right-1 peer-checked:bg-blue-500/70 dark:peer-checked:bg-blue-500/90 rounded-full transition-colors duration-200"></span>
                        <span className="absolute top-1 left-1 bg-white dark:bg-blue-100 w-4 h-4 rounded-full transition-transform duration-200 peer-checked:translate-x-6"></span>
                      </div>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-blue-800/80 dark:text-blue-200">
                        {t('saveEventHistory')}
                      </span>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-white/50 dark:bg-gray-700/80 transition-colors duration-200">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <span className="absolute inset-y-1 left-1 right-1 peer-checked:bg-blue-500/70 dark:peer-checked:bg-blue-500/90 rounded-full transition-colors duration-200"></span>
                        <span className="absolute top-1 left-1 bg-white dark:bg-blue-100 w-4 h-4 rounded-full transition-transform duration-200 peer-checked:translate-x-6"></span>
                      </div>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-blue-800/80 dark:text-blue-200">
                        {t('autoSuggestResponses')}
                      </span>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-white/50 dark:bg-gray-700/80 transition-colors duration-200">
                        <input type="checkbox" className="sr-only peer" />
                        <span className="absolute inset-y-1 left-1 right-1 peer-checked:bg-blue-500/70 dark:peer-checked:bg-blue-500/90 rounded-full transition-colors duration-200"></span>
                        <span className="absolute top-1 left-1 bg-white dark:bg-blue-100 w-4 h-4 rounded-full transition-transform duration-200 peer-checked:translate-x-6"></span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>}
            {activeTab === 'appearance' && <div>
                <h3 className="text-lg font-medium text-blue-800/80 dark:text-blue-100 mb-4">
                  {t('appearance')}
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-blue-800/80 dark:text-blue-200 mb-2">
                      {t('theme')}
                    </p>
                    <div className="flex space-x-3">
                      <div onClick={() => handleThemeChange('light')} className={`flex-1 p-4 rounded-lg cursor-pointer flex items-center justify-center shadow-sm
                          ${theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300/50' : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-white/50 opacity-60'}`}>
                        <SunIcon size={20} className="text-blue-800/70 mr-2" />
                        <span className="text-sm text-blue-800/80">
                          {t('light')}
                        </span>
                      </div>
                      <div onClick={() => handleThemeChange('dark')} className={`flex-1 p-4 rounded-lg cursor-pointer flex items-center justify-center shadow-sm
                          ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-400/50' : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 opacity-60'}`}>
                        <MoonIcon size={20} className="text-blue-200 mr-2" />
                        <span className="text-sm text-blue-200">
                          {t('dark')}
                        </span>
                      </div>
                      <div onClick={() => handleThemeChange('system')} className={`flex-1 p-4 rounded-lg cursor-pointer flex items-center justify-center shadow-sm
                          ${theme === 'system' ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-blue-900/70 dark:to-gray-800 border-2 border-blue-400/30 dark:border-blue-400/50' : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-blue-900/70 dark:to-gray-800 border border-white/50 dark:border-gray-600 opacity-60'}`}>
                        <MonitorIcon size={20} className="text-gray-800 dark:text-blue-200 mr-2" />
                        <span className="text-sm text-gray-800 dark:text-blue-200">
                          {t('system')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            {activeTab === 'voice' && <div>
                <h3 className="text-lg font-medium text-blue-800/80 dark:text-blue-100 mb-4">
                  {t('voiceSettings')}
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-blue-800/80 dark:text-blue-200">
                        {t('voiceResponse')}
                      </span>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-white/50 dark:bg-gray-700/80 transition-colors duration-200">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <span className="absolute inset-y-1 left-1 right-1 peer-checked:bg-blue-500/70 dark:peer-checked:bg-blue-500/90 rounded-full transition-colors duration-200"></span>
                        <span className="absolute top-1 left-1 bg-white dark:bg-blue-100 w-4 h-4 rounded-full transition-transform duration-200 peer-checked:translate-x-6"></span>
                      </div>
                    </label>
                  </div>
                  <div>
                    <p className="text-blue-800/80 dark:text-blue-200 mb-2">
                      {t('voice')}
                    </p>
                    {/* Modern dropdown for voice selection */}
                    <div className="relative">
                      <button onClick={() => setVoiceDropdownOpen(!voiceDropdownOpen)} className="flex items-center justify-between w-full p-3 rounded-lg
                        bg-white/40 dark:bg-gray-700/80 backdrop-blur-md
                        border border-white/30 dark:border-gray-600/50
                        text-blue-800 dark:text-blue-100 text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-400/30">
                        <span>{selectedVoice}</span>
                        <ChevronDownIcon size={16} className={`transition-transform duration-200 ${voiceDropdownOpen ? 'transform rotate-180' : ''}`} />
                      </button>
                      {voiceDropdownOpen && <div className="absolute z-10 w-full mt-1 rounded-lg overflow-hidden
                        bg-white/80 dark:bg-gray-800/90 backdrop-blur-md
                        border border-white/30 dark:border-gray-600/50
                        shadow-lg">
                          {voices.map((voice, index) => <div key={index} onClick={() => handleVoiceSelect(voice)} className="flex items-center justify-between px-4 py-3 cursor-pointer
                              hover:bg-blue-100/50 dark:hover:bg-blue-900/30
                              text-blue-800 dark:text-blue-100 text-sm">
                              <span>{voice}</span>
                              {selectedVoice === voice && <CheckIcon size={16} className="text-blue-500" />}
                            </div>)}
                        </div>}
                    </div>
                  </div>
                  <div>
                    <p className="text-blue-800/80 dark:text-blue-200 mb-2">
                      {t('voiceSpeed')}
                    </p>
                    <input type="range" min="0" max="100" defaultValue="50" className="w-full h-2 bg-white/50 dark:bg-gray-700/80 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  <div>
                    <p className="text-blue-800/80 dark:text-blue-200 mb-2">
                      {t('voicePitch')}
                    </p>
                    <input type="range" min="0" max="100" defaultValue="50" className="w-full h-2 bg-white/50 dark:bg-gray-700/80 rounded-lg appearance-none cursor-pointer" />
                  </div>
                </div>
              </div>}
            {activeTab === 'language' && <div>
                <h3 className="text-lg font-medium text-blue-800/80 dark:text-blue-100 mb-4">
                  {t('languageSettings')}
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-blue-800/80 dark:text-blue-200 mb-2">
                      {t('interfaceLanguage')}
                    </p>
                    {/* Modern dropdown for language selection */}
                    <div className="relative">
                      <button onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)} className="flex items-center justify-between w-full p-3 rounded-lg
                        bg-white/40 dark:bg-gray-700/80 backdrop-blur-md
                        border border-white/30 dark:border-gray-600/50
                        text-blue-800 dark:text-blue-100 text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-400/30">
                        <span>
                          {languageOptions.find(opt => opt.value === language)?.label}
                        </span>
                        <ChevronDownIcon size={16} className={`transition-transform duration-200 ${languageDropdownOpen ? 'transform rotate-180' : ''}`} />
                      </button>
                      {languageDropdownOpen && <div className="absolute z-10 w-full mt-1 rounded-lg overflow-hidden
                        bg-white/80 dark:bg-gray-800/90 backdrop-blur-md
                        border border-white/30 dark:border-gray-600/50
                        shadow-lg">
                          {languageOptions.map(option => <div key={option.value} onClick={() => handleLanguageChange(option.value)} className="flex items-center justify-between px-4 py-3 cursor-pointer
                              hover:bg-blue-100/50 dark:hover:bg-blue-900/30
                              text-blue-800 dark:text-blue-100 text-sm">
                              <span>{option.label}</span>
                              {language === option.value && <CheckIcon size={16} className="text-blue-500" />}
                            </div>)}
                        </div>}
                    </div>
                  </div>
                  <div>
                    <p className="text-blue-800/80 dark:text-blue-200 mb-2">
                      {t('responseLanguage')}
                    </p>
                    {/* Modern dropdown for response language */}
                    <div className="relative">
                      <button onClick={() => setResponseLanguageDropdownOpen(!responseLanguageDropdownOpen)} className="flex items-center justify-between w-full p-3 rounded-lg
                        bg-white/40 dark:bg-gray-700/80 backdrop-blur-md
                        border border-white/30 dark:border-gray-600/50
                        text-blue-800 dark:text-blue-100 text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-400/30">
                        <span>{selectedResponseLanguage}</span>
                        <ChevronDownIcon size={16} className={`transition-transform duration-200 ${responseLanguageDropdownOpen ? 'transform rotate-180' : ''}`} />
                      </button>
                      {responseLanguageDropdownOpen && <div className="absolute z-10 w-full mt-1 rounded-lg overflow-hidden
                        bg-white/80 dark:bg-gray-800/90 backdrop-blur-md
                        border border-white/30 dark:border-gray-600/50
                        shadow-lg">
                          {responseLanguages.map((lang, index) => <div key={index} onClick={() => handleResponseLanguageSelect(lang)} className="flex items-center justify-between px-4 py-3 cursor-pointer
                              hover:bg-blue-100/50 dark:hover:bg-blue-900/30
                              text-blue-800 dark:text-blue-100 text-sm">
                              <span>{lang}</span>
                              {selectedResponseLanguage === lang && <CheckIcon size={16} className="text-blue-500" />}
                            </div>)}
                        </div>}
                    </div>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
}