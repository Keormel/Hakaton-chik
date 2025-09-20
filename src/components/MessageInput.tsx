import React, { useCallback, useState, memo } from 'react';
import { SendIcon, MicIcon, StopCircleIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
export const MessageInput = memo(function MessageInput({
  onSendMessage,
  voiceChatEnabled
}) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const {
    t
  } = useLanguage();
  const {
    currentTheme
  } = useTheme();
  // Memoize handlers to prevent recreating functions on each render
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  }, [message, onSendMessage]);
  const handleMessageChange = useCallback(e => {
    setMessage(e.target.value);
  }, []);
  const toggleRecording = useCallback(() => {
    if (!voiceChatEnabled) return;
    setIsRecording(prev => !prev);
  }, [voiceChatEnabled]);
  // Pre-calculate button disabled state to avoid recalculation in render
  const isSubmitDisabled = !message.trim();
  return <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        {/* Simplified container with fewer nested divs */}
        <div className="relative rounded-full overflow-hidden p-[1px] bg-gradient-to-r from-white/40 to-white/10 dark:from-blue-500/30 dark:to-blue-600/10 shadow-lg">
          <div className="relative flex items-center bg-gradient-to-r from-white/30 to-white/20 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-md rounded-full border border-white/30 dark:border-blue-400/30 overflow-hidden">
            <input type="text" value={message} onChange={handleMessageChange} placeholder={t('askMeAnything')} className="w-full py-4 px-6 pr-[90px] bg-transparent focus:outline-none placeholder-blue-400/50 dark:placeholder-blue-300/60 text-blue-800 dark:text-blue-100" />
            <div className="absolute right-2 flex space-x-1">
              <button type="button" onClick={toggleRecording} className={`p-2.5 rounded-full transition-colors duration-200
                ${isRecording ? 'bg-red-500/80 text-white animate-pulse' : voiceChatEnabled ? 'hover:bg-blue-100/50 dark:hover:bg-blue-700/50 text-blue-500 dark:text-blue-300' : 'text-blue-300 dark:text-blue-500/50 cursor-not-allowed'}`} aria-label={isRecording ? 'Stop recording' : 'Voice input'} disabled={!voiceChatEnabled}>
                {isRecording ? <StopCircleIcon size={20} /> : <MicIcon size={20} />}
              </button>
              <button type="submit" disabled={isSubmitDisabled} className={`p-2.5 rounded-full transition-colors duration-200 ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} style={{
              background: currentTheme === 'dark' ? 'linear-gradient(135deg, rgba(59,130,246,0.9) 0%, rgba(37,99,235,1) 100%)' : 'linear-gradient(135deg, rgba(59,130,246,0.8) 0%, rgba(37,99,235,0.9) 100%)'
            }} aria-label="Send message">
                <SendIcon size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>;
});