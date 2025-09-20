import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { XIcon } from 'lucide-react';
export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}) {
  const {
    t
  } = useLanguage();
  const {
    currentTheme
  } = useTheme();
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-2 xs:p-3 sm:p-4">
      <div className="relative w-full max-w-[280px] xs:max-w-xs sm:max-w-sm overflow-hidden rounded-lg xs:rounded-xl sm:rounded-2xl 
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
          <h2 className="text-base xs:text-lg sm:text-xl font-semibold text-blue-800/80 dark:text-blue-200">
            {title}
          </h2>
          <button onClick={onClose} className="p-1 xs:p-1.5 sm:p-2 rounded-full hover:bg-white/30 dark:hover:bg-gray-700/80 transition-colors duration-200">
            <XIcon size={16} className="text-blue-800/70 dark:text-blue-200 xs:hidden" />
            <XIcon size={18} className="text-blue-800/70 dark:text-blue-200 hidden xs:block sm:hidden" />
            <XIcon size={18} className="text-blue-800/70 dark:text-blue-200 hidden sm:block" />
          </button>
        </div>
        {/* Content */}
        <div className="p-3 xs:p-4 sm:p-6">
          <p className="text-xs xs:text-sm sm:text-base text-blue-800/80 dark:text-blue-200 mb-4 xs:mb-5 sm:mb-6">
            {message}
          </p>
          <div className="flex justify-end space-x-2 xs:space-x-3 sm:space-x-4">
            <button onClick={onClose} className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg bg-white/40 dark:bg-gray-700/60 backdrop-blur-sm
              border border-white/30 dark:border-gray-600/50
              text-xs sm:text-sm text-blue-800/80 dark:text-blue-200
              hover:bg-white/60 dark:hover:bg-gray-600/70 transition-all duration-200">
              {t('no')}
            </button>
            <button onClick={onConfirm} className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg bg-gradient-to-r 
              from-red-500/70 to-red-600/70 dark:from-red-500/90 dark:to-red-600/90 backdrop-blur-sm 
              text-xs sm:text-sm text-white
              hover:from-red-600/70 hover:to-red-700/70 dark:hover:from-red-400/90 dark:hover:to-red-500/90 
              transition-all duration-200">
              {t('yes')}
            </button>
          </div>
        </div>
      </div>
    </div>;
}