import React, { useState } from 'react';
import { XIcon, UserIcon, PlusIcon, LogInIcon, UserPlusIcon, MailIcon, LockIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
export function ProfileModal({
  isOpen,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accounts, setAccounts] = useState([]);
  const {
    t
  } = useLanguage();
  const {
    currentTheme
  } = useTheme();
  if (!isOpen) return null;
  const handleLogin = e => {
    e.preventDefault();
    if (email && password) {
      // In a real app, this would connect to an authentication service
      console.log('Login attempt:', email);
      setAccounts(prev => [...prev, {
        email
      }]);
      setEmail('');
      setPassword('');
    }
  };
  const handleRegister = e => {
    e.preventDefault();
    if (email && password) {
      // In a real app, this would connect to an authentication service
      console.log('Register attempt:', email);
      setAccounts(prev => [...prev, {
        email
      }]);
      setEmail('');
      setPassword('');
    }
  };
  const handleAddAccount = () => {
    setEmail('');
    setPassword('');
    setActiveTab('login');
  };
  const handleSelectAccount = accountEmail => {
    console.log('Selected account:', accountEmail);
    // In a real app, this would switch to the selected account
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-2 xs:p-3 sm:p-4">
      <div className="relative w-full max-w-[280px] xs:max-w-xs sm:max-w-md max-h-[90vh] overflow-hidden rounded-lg xs:rounded-xl sm:rounded-2xl 
        bg-gradient-to-br from-white/70 to-white/40 
        dark:from-gray-800/90 dark:to-gray-900/80 
        backdrop-blur-xl 
        border border-white/50 dark:border-white/20 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]
        p-0.5 xs:p-1">
        {/* Glass reflection effect */}
        <div className="absolute inset-0 overflow-hidden rounded-lg xs:rounded-xl sm:rounded-2xl pointer-events-none">
          <div className="absolute -inset-[400px] top-0 bg-gradient-to-b from-blue-100/40 dark:from-blue-900/20 to-transparent rounded-full opacity-30 blur-3xl"></div>
        </div>
        {/* Header */}
        <div className="flex items-center justify-between p-2 xs:p-3 sm:p-4 border-b border-white/30 dark:border-blue-300/20">
          <h2 className="text-base xs:text-lg sm:text-xl font-semibold text-blue-800/80 dark:text-blue-200 flex items-center">
            <UserIcon size={16} className="mr-1.5 xs:mr-2 xs:hidden" />
            <UserIcon size={18} className="mr-2 hidden xs:block sm:hidden" />
            <UserIcon size={20} className="mr-2 hidden sm:block" />
            {t('profileTitle')}
          </h2>
          <button onClick={onClose} className="p-1 xs:p-1.5 sm:p-2 rounded-full hover:bg-white/30 dark:hover:bg-gray-700/80 transition-colors duration-200">
            <XIcon size={16} className="text-blue-800/70 dark:text-blue-200 xs:hidden" />
            <XIcon size={18} className="text-blue-800/70 dark:text-blue-200 hidden xs:block sm:hidden" />
            <XIcon size={20} className="text-blue-800/70 dark:text-blue-200 hidden sm:block" />
          </button>
        </div>
        {/* Content */}
        <div className="p-3 xs:p-4 sm:p-6">
          {/* Tabs */}
          {accounts.length === 0 && <div className="flex mb-3 xs:mb-4 sm:mb-6 border border-white/30 dark:border-blue-400/30 rounded-lg overflow-hidden">
              <button onClick={() => setActiveTab('login')} className={`flex-1 py-1 xs:py-1.5 sm:py-2 px-1.5 xs:px-2 sm:px-4 flex items-center justify-center text-[10px] xs:text-xs sm:text-sm ${activeTab === 'login' ? 'bg-blue-500/70 dark:bg-blue-600/70 text-white' : 'bg-white/30 dark:bg-gray-800/60 text-blue-800/70 dark:text-blue-200 hover:bg-blue-100/30 dark:hover:bg-blue-900/40'}`}>
                <LogInIcon size={12} className="mr-1 xs:hidden" />
                <LogInIcon size={14} className="mr-1 hidden xs:block sm:hidden" />
                <LogInIcon size={16} className="mr-2 hidden sm:block" />
                {t('login')}
              </button>
              <button onClick={() => setActiveTab('register')} className={`flex-1 py-1 xs:py-1.5 sm:py-2 px-1.5 xs:px-2 sm:px-4 flex items-center justify-center text-[10px] xs:text-xs sm:text-sm ${activeTab === 'register' ? 'bg-blue-500/70 dark:bg-blue-600/70 text-white' : 'bg-white/30 dark:bg-gray-800/60 text-blue-800/70 dark:text-blue-200 hover:bg-blue-100/30 dark:hover:bg-blue-900/40'}`}>
                <UserPlusIcon size={12} className="mr-1 xs:hidden" />
                <UserPlusIcon size={14} className="mr-1 hidden xs:block sm:hidden" />
                <UserPlusIcon size={16} className="mr-2 hidden sm:block" />
                {t('register')}
              </button>
            </div>}
          {/* Account List */}
          {accounts.length > 0 && <div className="mb-3 xs:mb-4 sm:mb-6">
              <h3 className="text-[10px] xs:text-xs sm:text-sm font-medium text-blue-800/60 dark:text-blue-300/80 mb-1.5 xs:mb-2 sm:mb-3">
                {t('yourAccounts')}
              </h3>
              <div className="space-y-1.5 xs:space-y-2 max-h-28 xs:max-h-32 sm:max-h-40 overflow-y-auto scrollbar-hide">
                {accounts.map((account, index) => <div key={index} onClick={() => handleSelectAccount(account.email)} className="flex items-center p-1.5 xs:p-2 sm:p-3 rounded-lg cursor-pointer
                    bg-white/30 dark:bg-gray-800/60 backdrop-blur-sm
                    border border-white/30 dark:border-blue-400/20
                    hover:bg-blue-100/30 dark:hover:bg-blue-900/40
                    transition-all duration-200">
                    <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400/80 to-blue-600/80 flex items-center justify-center shadow-sm border border-white/30 dark:border-blue-300/30">
                      <UserIcon size={10} className="text-white xs:hidden" />
                      <UserIcon size={12} className="text-white hidden xs:block sm:hidden" />
                      <UserIcon size={14} className="text-white hidden sm:block" />
                    </div>
                    <span className="ml-1.5 xs:ml-2 sm:ml-3 text-[10px] xs:text-xs sm:text-sm text-blue-800/80 dark:text-blue-200">
                      {account.email}
                    </span>
                  </div>)}
              </div>
              <button onClick={handleAddAccount} className="w-full mt-2 xs:mt-3 sm:mt-4 py-1 xs:py-1.5 sm:py-2 px-2 xs:px-3 sm:px-4 rounded-lg
                bg-white/30 dark:bg-gray-800/60 backdrop-blur-sm
                border border-white/30 dark:border-blue-400/20
                hover:bg-blue-100/30 dark:hover:bg-blue-900/40
                text-[10px] xs:text-xs sm:text-sm text-blue-800/70 dark:text-blue-200
                transition-all duration-200
                flex items-center justify-center">
                <PlusIcon size={12} className="mr-1 xs:mr-1.5 sm:mr-2" />
                {t('addAnotherAccount')}
              </button>
            </div>}
          {/* Login Form */}
          {activeTab === 'login' && accounts.length === 0 && <form onSubmit={handleLogin} className="space-y-2 xs:space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[10px] xs:text-xs sm:text-sm font-medium text-blue-800/70 dark:text-blue-300 mb-1">
                  {t('email')}
                </label>
                <div className="relative">
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full py-1 xs:py-1.5 sm:py-2 pl-6 xs:pl-8 sm:pl-10 pr-2 xs:pr-3 rounded-lg text-[10px] xs:text-xs sm:text-sm
                    bg-white/30 dark:bg-gray-800/60 backdrop-blur-md
                    border border-white/30 dark:border-blue-400/30
                    focus:outline-none focus:ring-2 focus:ring-blue-400/30 dark:focus:ring-blue-400/50
                    placeholder-blue-400/50 dark:placeholder-blue-300/60
                    text-blue-800 dark:text-blue-100" required />
                  <MailIcon size={12} className="absolute left-2 top-1.5 text-blue-400/70 dark:text-blue-300/80 xs:hidden" />
                  <MailIcon size={14} className="absolute left-2.5 top-2 text-blue-400/70 dark:text-blue-300/80 hidden xs:block sm:hidden" />
                  <MailIcon size={16} className="absolute left-3 top-2.5 text-blue-400/70 dark:text-blue-300/80 hidden sm:block" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] xs:text-xs sm:text-sm font-medium text-blue-800/70 dark:text-blue-300 mb-1">
                  {t('password')}
                </label>
                <div className="relative">
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full py-1 xs:py-1.5 sm:py-2 pl-6 xs:pl-8 sm:pl-10 pr-2 xs:pr-3 rounded-lg text-[10px] xs:text-xs sm:text-sm
                    bg-white/30 dark:bg-gray-800/60 backdrop-blur-md
                    border border-white/30 dark:border-blue-400/30
                    focus:outline-none focus:ring-2 focus:ring-blue-400/30 dark:focus:ring-blue-400/50
                    placeholder-blue-400/50 dark:placeholder-blue-300/60
                    text-blue-800 dark:text-blue-100" required />
                  <LockIcon size={12} className="absolute left-2 top-1.5 text-blue-400/70 dark:text-blue-300/80 xs:hidden" />
                  <LockIcon size={14} className="absolute left-2.5 top-2 text-blue-400/70 dark:text-blue-300/80 hidden xs:block sm:hidden" />
                  <LockIcon size={16} className="absolute left-3 top-2.5 text-blue-400/70 dark:text-blue-300/80 hidden sm:block" />
                </div>
              </div>
              <button type="submit" className="w-full py-1.5 xs:py-2 sm:py-2.5 rounded-lg bg-gradient-to-r
                from-blue-500/70 to-blue-600/70 dark:from-blue-500/90 dark:to-blue-600/90 backdrop-blur-sm
                hover:from-blue-600/70 hover:to-blue-700/70 dark:hover:from-blue-400/90 dark:hover:to-blue-500/90
                text-white text-[10px] xs:text-xs sm:text-sm font-medium transition-all duration-200
                hover:scale-[1.02] active:scale-[0.98]">
                {t('login')}
              </button>
              <div className="text-center">
                <button type="button" className="text-[10px] xs:text-xs sm:text-sm text-blue-600/70 dark:text-blue-400 hover:underline">
                  {t('forgotPassword')}
                </button>
              </div>
            </form>}
          {/* Register Form */}
          {activeTab === 'register' && accounts.length === 0 && <form onSubmit={handleRegister} className="space-y-2 xs:space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[10px] xs:text-xs sm:text-sm font-medium text-blue-800/70 dark:text-blue-300 mb-1">
                  {t('email')}
                </label>
                <div className="relative">
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full py-1 xs:py-1.5 sm:py-2 pl-6 xs:pl-8 sm:pl-10 pr-2 xs:pr-3 rounded-lg text-[10px] xs:text-xs sm:text-sm
                    bg-white/30 dark:bg-gray-800/60 backdrop-blur-md
                    border border-white/30 dark:border-blue-400/30
                    focus:outline-none focus:ring-2 focus:ring-blue-400/30 dark:focus:ring-blue-400/50
                    placeholder-blue-400/50 dark:placeholder-blue-300/60
                    text-blue-800 dark:text-blue-100" required />
                  <MailIcon size={12} className="absolute left-2 top-1.5 text-blue-400/70 dark:text-blue-300/80 xs:hidden" />
                  <MailIcon size={14} className="absolute left-2.5 top-2 text-blue-400/70 dark:text-blue-300/80 hidden xs:block sm:hidden" />
                  <MailIcon size={16} className="absolute left-3 top-2.5 text-blue-400/70 dark:text-blue-300/80 hidden sm:block" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] xs:text-xs sm:text-sm font-medium text-blue-800/70 dark:text-blue-300 mb-1">
                  {t('password')}
                </label>
                <div className="relative">
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full py-1 xs:py-1.5 sm:py-2 pl-6 xs:pl-8 sm:pl-10 pr-2 xs:pr-3 rounded-lg text-[10px] xs:text-xs sm:text-sm
                    bg-white/30 dark:bg-gray-800/60 backdrop-blur-md
                    border border-white/30 dark:border-blue-400/30
                    focus:outline-none focus:ring-2 focus:ring-blue-400/30 dark:focus:ring-blue-400/50
                    placeholder-blue-400/50 dark:placeholder-blue-300/60
                    text-blue-800 dark:text-blue-100" required />
                  <LockIcon size={12} className="absolute left-2 top-1.5 text-blue-400/70 dark:text-blue-300/80 xs:hidden" />
                  <LockIcon size={14} className="absolute left-2.5 top-2 text-blue-400/70 dark:text-blue-300/80 hidden xs:block sm:hidden" />
                  <LockIcon size={16} className="absolute left-3 top-2.5 text-blue-400/70 dark:text-blue-300/80 hidden sm:block" />
                </div>
              </div>
              <button type="submit" className="w-full py-1.5 xs:py-2 sm:py-2.5 rounded-lg bg-gradient-to-r
                from-blue-500/70 to-blue-600/70 dark:from-blue-500/90 dark:to-blue-600/90 backdrop-blur-sm
                hover:from-blue-600/70 hover:to-blue-700/70 dark:hover:from-blue-400/90 dark:hover:to-blue-500/90
                text-white text-[10px] xs:text-xs sm:text-sm font-medium transition-all duration-200
                hover:scale-[1.02] active:scale-[0.98]">
                {t('register')}
              </button>
              <div className="text-center text-[8px] xs:text-[10px] sm:text-xs text-blue-800/60 dark:text-blue-300/70">
                {t('termsNotice')}
              </div>
            </form>}
        </div>
      </div>
    </div>;
}