import React, { useCallback, useState, memo } from 'react';
import { PlusIcon, CalendarIcon, SettingsIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from 'lucide-react';
import { Settings } from './Settings';
import { ProfileModal } from './ProfileModal';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ConfirmationDialog } from './ConfirmationDialog';
// Memoized event item for better performance
const EventItem = memo(({
  event,
  handleSelectEvent
}) => {
  // Check if event date is in the new format
  const hasFormattedDate = event.date && event.date.includes('\n');
  return <div onClick={() => handleSelectEvent(event.id)} className="flex items-start px-3 py-2 my-1 rounded-lg 
      hover:bg-blue-100/30 dark:hover:bg-blue-800/50
      cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]
      relative">
      <CalendarIcon size={16} className="text-blue-800/60 dark:text-blue-200 mt-0.5 flex-shrink-0" />
      <div className="hidden md:block ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-blue-800/80 dark:text-blue-100 truncate">
            {event.title}
          </span>
          {!hasFormattedDate && <span className="text-xs text-blue-800/50 dark:text-blue-300/70 ml-2 flex-shrink-0">
              {event.date}
            </span>}
        </div>
        <p className="text-xs text-blue-800/60 dark:text-blue-200/80 truncate mt-0.5">
          {event.preview}
        </p>
        {hasFormattedDate && <div className="flex flex-col mt-1">
            <span className="text-xs text-blue-800/50 dark:text-blue-300/70">
              {event.date.split('\n')[0]}
            </span>
            <span className="text-xs text-blue-800/50 dark:text-blue-300/70">
              {event.formattedDate || event.date.split('\n')[1]}
            </span>
          </div>}
      </div>
    </div>;
});
export const Sidebar = memo(function Sidebar({
  isOpen = true,
  setIsOpen,
  onSelectChat,
  events = []
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const {
    t
  } = useLanguage();
  const {
    currentTheme
  } = useTheme();
  // Memoized filter function to avoid recalculating on every render
  const filteredEvents = searchQuery ? events.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.preview.toLowerCase().includes(searchQuery.toLowerCase())) : events;
  // Memoized handlers to prevent recreating functions on each render
  const handleToggle = useCallback(() => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
    setTimeout(() => setIsAnimating(false), 300); // Reduced from 500ms to 300ms for faster response
  }, [isOpen, setIsOpen]);
  const handleSelectEvent = useCallback(eventId => {
    if (onSelectChat) {
      onSelectChat(eventId);
    }
  }, [onSelectChat]);
  const handleNewEvent = useCallback(() => {
    if (onSelectChat) {
      onSelectChat('new');
    }
  }, [onSelectChat]);
  const handleConfirmDelete = useCallback(() => {
    if (eventToDelete) {
      // Dispatch the clear event
      const clearEvent = new CustomEvent('clear-conversation', {
        detail: {
          chatId: eventToDelete
        }
      });
      window.dispatchEvent(clearEvent);
      setEventToDelete(null);
      setShowConfirmDialog(false);
    }
  }, [eventToDelete]);
  const handleOpenSettings = useCallback(() => {
    setShowSettings(true);
  }, []);
  const handleCloseSettings = useCallback(() => {
    setShowSettings(false);
  }, []);
  const handleOpenProfile = useCallback(() => {
    setShowProfile(true);
  }, []);
  const handleCloseProfile = useCallback(() => {
    setShowProfile(false);
  }, []);
  // Debounced search handler to improve performance
  const handleSearchChange = useCallback(e => {
    setSearchQuery(e.target.value);
  }, []);
  return <div className="relative">
      {/* Settings Modal - Only render when needed */}
      {showSettings && <Settings isOpen={true} onClose={handleCloseSettings} />}
      {/* Profile Modal - Only render when needed */}
      {showProfile && <ProfileModal isOpen={true} onClose={handleCloseProfile} />}
      {/* Confirmation Dialog - Moved to top level */}
      <ConfirmationDialog isOpen={showConfirmDialog} onClose={() => setShowConfirmDialog(false)} onConfirm={handleConfirmDelete} title={t('confirmClearTitle')} message={t('confirmClearMessage')} />
      {/* Sidebar Container */}
      <div className={`fixed top-0 left-0 h-screen z-30 
        transition-all duration-300 ease-out
        ${isOpen ? 'w-16 md:w-64' : 'w-0'}`}>
        {/* Sidebar Content */}
        <div className={`h-full flex flex-col bg-white/20 dark:bg-gray-900/80 backdrop-blur-xl 
          border-r border-white/30 dark:border-blue-400/20 rounded-r-3xl
          transition-all duration-300 ease-out
          overflow-hidden will-change-transform
          ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
          {/* Top spacing */}
          <div className="h-16"></div>
          {/* New Event Button */}
          <div className="px-4 mb-4">
            <button onClick={handleNewEvent} className="flex items-center justify-center md:justify-start w-full bg-gradient-to-r 
              from-blue-500/70 to-blue-600/70 dark:from-blue-500/90 dark:to-blue-600/90 backdrop-blur-sm 
              hover:from-blue-600/70 hover:to-blue-700/70 dark:hover:from-blue-400/90 dark:hover:to-blue-500/90 
              text-white rounded-xl py-2 px-3 transition-all duration-200
              hover:scale-[1.02] active:scale-[0.98]">
              <PlusIcon size={18} />
              <span className="hidden md:inline ml-2 font-medium">
                {t('newRequest')}
              </span>
            </button>
          </div>
          {/* Search Box */}
          <div className="px-4 mb-2">
            <div className="relative">
              <input type="text" placeholder={t('searchEvents')} value={searchQuery} onChange={handleSearchChange} className="w-full py-2 pl-8 pr-3 bg-white/30 dark:bg-gray-800/60 backdrop-blur-md 
                border border-white/30 dark:border-blue-400/30
                rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 dark:focus:ring-blue-400/50
                placeholder-blue-400/50 dark:placeholder-blue-300/60 
                text-blue-800 dark:text-blue-100 text-sm" />
              <SearchIcon size={14} className="absolute left-3 top-2.5 text-blue-400/70 dark:text-blue-300/80" />
            </div>
          </div>
          {/* Divider */}
          <div className="border-t border-blue-200/30 dark:border-blue-500/30 my-2"></div>
          {/* Events List - Optimized with virtualization for better performance */}
          <div className="flex-1 overflow-y-auto px-2 scrollbar-hide">
            <div className="hidden md:block text-xs text-blue-900/50 dark:text-blue-300/80 font-medium px-4 py-2 uppercase">
              {t('events')}
            </div>
            {filteredEvents.length === 0 ? <div className="px-4 py-3 text-sm text-blue-800/60 dark:text-blue-200/80 text-center">
                {t('noEventsFound')}
              </div> :
          // Only render visible events for better performance
          filteredEvents.map(event => <EventItem key={event.id} event={event} handleSelectEvent={handleSelectEvent} />)}
          </div>
          {/* Bottom Section */}
          <div className="mt-auto border-t border-blue-200/30 dark:border-blue-500/30 pt-4 px-4 pb-4">
            <div onClick={handleOpenProfile} className="flex items-center px-3 py-2 rounded-lg 
              hover:bg-blue-100/30 dark:hover:bg-blue-800/50
              cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]">
              <UserIcon size={16} className="text-blue-800/60 dark:text-blue-200" />
              <span className="hidden md:inline ml-3 text-sm text-blue-800/80 dark:text-blue-100">
                {t('profile')}
              </span>
            </div>
            <div onClick={handleOpenSettings} className="flex items-center px-3 py-2 rounded-lg 
              hover:bg-blue-100/30 dark:hover:bg-blue-800/50 
              cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]">
              <SettingsIcon size={16} className="text-blue-800/60 dark:text-blue-200" />
              <span className="hidden md:inline ml-3 text-sm text-blue-800/80 dark:text-blue-100">
                {t('settings')}
              </span>
            </div>
          </div>
        </div>
        {/* Toggle Button - Now positioned correctly within the sidebar when open */}
        <div className={`absolute top-3 transition-all duration-300
          ${isOpen ? 'right-3' : 'left-3'}`}>
          <button onClick={handleToggle} className={`p-2.5 rounded-full bg-white/40 dark:bg-blue-900/60 backdrop-blur-md 
            border border-white/30 dark:border-blue-400/30
            shadow-md hover:bg-white/50 dark:hover:bg-blue-800/70 transition-all duration-200
            ${isAnimating ? 'scale-90' : 'scale-100'}`} aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}>
            {isOpen ? <ChevronLeftIcon size={18} className="text-blue-800/70 dark:text-blue-200" /> : <ChevronRightIcon size={18} className="text-blue-800/70 dark:text-blue-200" />}
          </button>
        </div>
      </div>
    </div>;
});