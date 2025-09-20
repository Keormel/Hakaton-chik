import React, { useEffect, useState, useRef, memo } from 'react';
import { MessageInput } from './MessageInput';
import { UserIcon, TrashIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ConfirmationDialog } from './ConfirmationDialog';
// Memoized message component for better performance
const ChatMessage = memo(({
  message,
  t,
  currentTheme
}) => <div className={`flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
    {/* Avatar Circle */}
    <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`}>
      {message.sender === 'user' ? <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-400/80 to-blue-600/80 flex items-center justify-center shadow-md border border-white/30 dark:border-blue-300/30">
          <UserIcon size={14} className="text-white xs:hidden" />
          <UserIcon size={16} className="text-white hidden xs:inline sm:hidden" />
          <UserIcon size={20} className="text-white hidden sm:inline" />
        </div> : <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-indigo-400/80 to-indigo-600/80 dark:from-indigo-300/80 dark:to-indigo-500/80 flex items-center justify-center shadow-md border border-white/30 dark:border-blue-300/30">
          <span className="text-white font-bold text-xs sm:text-sm md:text-base">
            N
          </span>
        </div>}
    </div>
    {/* Message Bubble */}
    <div className={`max-w-[75%] xs:max-w-[80%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
      <div className={`p-2 xs:p-3 sm:p-4 rounded-2xl text-xs xs:text-sm sm:text-base ${message.sender === 'user' ? 'bg-gradient-to-r from-blue-500/70 to-blue-600/70 dark:from-blue-500/90 dark:to-blue-600/90 text-white rounded-tr-none' : 'bg-gradient-to-r from-white/50 to-white/40 dark:from-gray-800/90 dark:to-gray-700/80 backdrop-blur-md text-blue-800 dark:text-blue-100 rounded-tl-none'}`}>
        {message.text}
      </div>
      <div className={`text-[10px] xs:text-xs text-blue-800/50 dark:text-blue-300/70 mt-0.5 sm:mt-1 ${message.sender === 'user' ? 'text-right mr-2' : 'text-left ml-2'}`}>
        {message.sender === 'user' ? t('you') : 'Noir'} • {t('justNow')}
      </div>
    </div>
  </div>);
export const ChatArea = memo(function ChatArea({
  voiceChatEnabled,
  onSendMessage,
  messages = [],
  selectedEventId,
  events = []
}) {
  const {
    t,
    language
  } = useLanguage();
  const {
    currentTheme
  } = useTheme();
  const messagesEndRef = useRef(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    // Check on mount and window resize
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // Dynamic background animation
  useEffect(() => {
    // Generate initial particles
    const generateParticles = () => {
      const newParticles = [];
      const count = 15;
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 2 + Math.random() * 5,
          speed: 0.1 + Math.random() * 0.2,
          opacity: 0.1 + Math.random() * 0.3,
          direction: Math.random() > 0.5 ? 1 : -1
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
    setIsActive(true);
    // Animation interval
    const interval = setInterval(() => {
      if (!isActive) return;
      setParticles(prevParticles => prevParticles.map(p => ({
        ...p,
        x: (p.x + p.speed * p.direction + 100) % 100,
        y: (p.y + p.speed * 0.5 * (Math.random() > 0.5 ? 1 : -1) + 100) % 100,
        opacity: 0.1 + Math.random() * 0.3
      })));
    }, 50);
    return () => {
      clearInterval(interval);
      setIsActive(false);
    };
  }, []);
  // Find the selected event
  const selectedEvent = events.find(event => event.id === selectedEventId) || null;
  // Scroll to bottom of messages when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages]);
  const handleSendMessage = message => {
    if (onSendMessage) {
      onSendMessage(message);
    }
  };
  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };
  // Format the event title for the header based on language
  const formatEventTitle = () => {
    if (!selectedEvent) return t('currentChat');
    return selectedEvent.title;
  };
  return <div className="flex flex-col w-full h-full p-1 xs:p-2 sm:p-4 relative">
      {/* Dynamic background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => <div key={particle.id} className={`absolute rounded-full ${currentTheme === 'dark' ? 'bg-blue-400/20' : 'bg-blue-500/10'}`} style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        opacity: particle.opacity,
        filter: `blur(${particle.size / 2}px)`,
        transition: 'opacity 0.5s ease'
      }} />)}
        {/* Additional dynamic glow effects */}
        <div className="absolute -top-[200px] -left-[200px] w-[500px] h-[500px] bg-blue-300/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-[300px] -right-[200px] w-[600px] h-[600px] bg-indigo-200/10 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{
        animationDuration: '7s'
      }}></div>
      </div>
      {/* Confirmation Dialog */}
      <ConfirmationDialog isOpen={showConfirmDialog} onClose={() => setShowConfirmDialog(false)} onConfirm={() => {
      setShowConfirmDialog(false);
      const clearEvent = new CustomEvent('clear-conversation', {
        detail: {
          chatId: selectedEventId
        }
      });
      window.dispatchEvent(clearEvent);
    }} title={t('confirmClearTitle')} message={t('confirmClearMessage')} />
      {/* Chat header with event info - Added mobile-specific left padding for hamburger menu */}
      <div className="flex justify-between items-center px-2 xs:px-3 sm:px-6 py-1.5 xs:py-2 sm:py-3 mb-1 xs:mb-2 sm:mb-4 relative z-10">
        {/* Chat title with proper left padding to avoid sidebar arrow overlap */}
        <div className={`flex flex-col ${isMobile ? 'pl-10' : 'pl-1 xs:pl-2 sm:pl-4'}`}>
          <span className="text-sm xs:text-base sm:text-lg font-medium text-blue-800/80 dark:text-blue-100 truncate max-w-[150px] xs:max-w-[200px] sm:max-w-full">
            {formatEventTitle()}
          </span>
          {selectedEvent && <span className="text-[10px] xs:text-xs sm:text-sm text-blue-800/60 dark:text-blue-200/70">
              {selectedEvent.date}
            </span>}
        </div>
        {/* Trash button in header */}
        {selectedEventId && <button onClick={handleDeleteClick} className="p-1 xs:p-1.5 sm:p-2 rounded-lg border border-red-500/70 hover:bg-red-100/30 dark:hover:bg-red-900/30 transition-colors duration-200">
            <TrashIcon size={14} className="text-red-500/70 dark:text-red-400/70 xs:hidden" />
            <TrashIcon size={16} className="text-red-500/70 dark:text-red-400/70 hidden xs:block sm:hidden" />
            <TrashIcon size={18} className="text-red-500/70 dark:text-red-400/70 hidden sm:block" />
          </button>}
      </div>
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-2 xs:mb-3 sm:mb-4 px-1 xs:px-2 sm:px-4 will-change-scroll relative z-10">
        {messages.map(message => <ChatMessage key={message.id} message={message} t={t} currentTheme={currentTheme} />)}
        <div ref={messagesEndRef} />
      </div>
      {/* Input area */}
      <div className="w-full max-w-2xl mx-auto px-1 xs:px-2 sm:px-0 relative z-10">
        <MessageInput onSendMessage={handleSendMessage} voiceChatEnabled={voiceChatEnabled} />
      </div>
    </div>;
});