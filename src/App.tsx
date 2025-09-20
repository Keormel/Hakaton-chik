import React, { useCallback, useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { NoirLogo } from './components/NoirLogo';
import { MessageInput } from './components/MessageInput';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
function AppContent() {
  const {
    currentTheme
  } = useTheme();
  const [showChat, setShowChat] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [voiceChatEnabled, setVoiceChatEnabled] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [events, setEvents] = useState([]);
  // Dynamic background elements
  const [backgroundElements, setBackgroundElements] = useState([]);
  // Initialize dynamic background elements
  useEffect(() => {
    const elements = [];
    const types = ['circle', 'square', 'triangle'];
    for (let i = 0; i < 15; i++) {
      elements.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 100 + Math.random() * 400,
        speed: 0.02 + Math.random() * 0.05,
        opacity: 0.03 + Math.random() * 0.05,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.05
      });
    }
    setBackgroundElements(elements);
    // Animation loop for background elements
    const animateBackground = () => {
      setBackgroundElements(prev => prev.map(el => ({
        ...el,
        x: (el.x + el.speed) % 100,
        y: (el.y + el.speed * 0.7) % 100,
        rotation: (el.rotation + el.rotationSpeed) % 360
      })));
    };
    const interval = setInterval(animateBackground, 50);
    return () => clearInterval(interval);
  }, []);
  // Add event listener for clear conversation
  useEffect(() => {
    const handleClearConversation = event => {
      const {
        chatId
      } = event.detail;
      if (chatId === selectedChatId) {
        // Clear messages for the current chat
        setMessages([]);
        // Remove the event from events list
        setEvents(prevEvents => prevEvents.filter(event => event.id !== chatId));
        // Return to main screen
        setSelectedChatId(null);
        setShowChat(false);
      } else {
        // Just remove the event from the events list
        setEvents(prevEvents => prevEvents.filter(event => event.id !== chatId));
      }
    };
    window.addEventListener('clear-conversation', handleClearConversation);
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('clear-conversation', handleClearConversation);
    };
  }, [selectedChatId]);
  // Format date for event display
  const formatEventDate = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const month = now.toLocaleString('en-US', {
      month: 'long'
    });
    const day = now.getDate();
    return {
      time: `${hours}:${minutes}`,
      date: `${month} ${day}`
    };
  };
  // Create a new event and chat
  const createNewEvent = useCallback(message => {
    // Create formatted date for event
    const formattedDate = formatEventDate();
    // Parse the message to create an appropriate title
    let title = message;
    // Common request prefixes to clean up
    const prefixesToRemove = ['can you', 'could you', 'please', 'i need', 'i want', 'help me', 'noir', 'create', 'make', 'find'];
    // Remove prefixes for cleaner titles
    for (const prefix of prefixesToRemove) {
      if (message.toLowerCase().startsWith(prefix)) {
        title = message.substring(prefix.length).trim();
        break;
      }
    }
    // Capitalize first letter
    title = title.charAt(0).toUpperCase() + title.slice(1);
    // Limit title length
    if (title.length > 20) {
      title = title.substring(0, 20) + '...';
    }
    // Create a new event from the message
    const newEvent = {
      id: Date.now(),
      title: title,
      preview: message,
      date: `${formattedDate.time}\n${formattedDate.date}`,
      formattedTime: formattedDate.time,
      formattedDate: formattedDate.date
    };
    // Add the new event to the events list
    setEvents(prevEvents => [newEvent, ...prevEvents]);
    return newEvent;
  }, []);
  // Memoize handlers to prevent recreating functions on each render
  const handleSendMessage = useCallback(message => {
    if (!message.trim()) return;
    // Create a new message
    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text: message
    };
    // If we're in the main screen (no chat selected), create a new event
    if (selectedChatId === null && !showChat) {
      const newEvent = createNewEvent(message);
      // Set this as the selected chat
      setSelectedChatId(newEvent.id);
      // Add user message to chat
      setMessages([newUserMessage]);
      // Show the chat
      setShowChat(true);
      // Simulate Noir response
      setTimeout(() => {
        const jarvisResponse = {
          id: Date.now() + 1,
          sender: 'noir',
          text: `I'll help you with "${newEvent.title}". What specific information do you need?`
        };
        setMessages(prevMessages => [...prevMessages, jarvisResponse]);
      }, 1000);
    } else {
      // We're in an existing chat, just add the message
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      // Simulate Noir response
      setTimeout(() => {
        const jarvisResponse = {
          id: Date.now() + 1,
          sender: 'noir',
          text: `I'll continue helping with this. Is there anything else you'd like to know?`
        };
        setMessages(prevMessages => [...prevMessages, jarvisResponse]);
      }, 1000);
    }
  }, [selectedChatId, showChat, createNewEvent]);
  const toggleVoiceChat = useCallback(() => {
    setVoiceChatEnabled(prev => !prev);
  }, []);
  const handleSelectChat = useCallback(chatId => {
    if (chatId === 'new') {
      setSelectedChatId(null);
      setShowChat(false);
      setMessages([]);
    } else {
      setSelectedChatId(chatId);
      setShowChat(true);
      // Find the selected event
      const selectedEvent = events.find(event => event.id === chatId);
      // Create a simulated chat history for this event
      if (selectedEvent) {
        const initialMessages = [{
          id: 1,
          sender: 'user',
          text: selectedEvent.preview
        }, {
          id: 2,
          sender: 'noir',
          text: `I'll help you with "${selectedEvent.title}". What specific information do you need?`
        }];
        setMessages(initialMessages);
      }
    }
  }, [events]);
  return <div className="flex w-full h-screen overflow-hidden transition-colors duration-300
      bg-gradient-to-br from-blue-50 to-blue-100 
      dark:from-gray-900 dark:to-blue-950">
      {/* Dynamic background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {backgroundElements.map(element => <div key={element.id} className={`absolute ${element.type === 'circle' ? 'rounded-full' : element.type === 'square' ? 'rounded-lg' : 'triangle'} ${currentTheme === 'dark' ? 'bg-blue-500/5 dark:bg-blue-400/5' : 'bg-blue-300/5 dark:bg-blue-200/5'}`} style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        width: `${element.size}px`,
        height: `${element.size}px`,
        opacity: element.opacity,
        transform: `rotate(${element.rotation}deg)`,
        transition: 'transform 1s ease-out, opacity 1s ease-out'
      }} />)}
        {/* Main glow effects */}
        <div className="absolute -top-[300px] -left-[100px] w-[600px] h-[600px] bg-blue-200/20 dark:bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{
        animationDuration: '15s'
      }}></div>
        <div className="absolute -bottom-[200px] -right-[100px] w-[500px] h-[500px] bg-blue-300/20 dark:bg-blue-400/15 rounded-full blur-3xl animate-pulse" style={{
        animationDuration: '20s'
      }}></div>
        {/* Additional moving light sources */}
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-indigo-200/10 dark:bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{
        animationDuration: '25s',
        transform: `translateX(${Math.sin(Date.now() / 10000) * 100}px) translateY(${Math.cos(Date.now() / 15000) * 50}px)`,
        transition: 'transform 5s ease-in-out'
      }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] bg-blue-100/10 dark:bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{
        animationDuration: '18s',
        transform: `translateX(${Math.sin(Date.now() / 12000) * -80}px) translateY(${Math.cos(Date.now() / 8000) * 40}px)`,
        transition: 'transform 4s ease-in-out'
      }}></div>
      </div>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onSelectChat={handleSelectChat} events={events} />
      {/* Main Content */}
      <div className={`flex-1 flex flex-col items-center justify-center relative transition-all duration-300 ${sidebarOpen ? 'ml-16 md:ml-64' : 'ml-0'}`}>
        {showChat ? <ChatArea voiceChatEnabled={voiceChatEnabled} onSendMessage={handleSendMessage} messages={messages} selectedEventId={selectedChatId} events={events} /> : <div className="flex-1 flex flex-col items-center justify-center">
            <NoirLogo voiceChatEnabled={voiceChatEnabled} toggleVoiceChat={toggleVoiceChat} />
          </div>}
        {/* Centered Input Bar */}
        {!showChat && <div className="absolute bottom-8 left-0 right-0 mx-auto flex justify-center px-4">
            <div className="w-full max-w-xl">
              <MessageInput onSendMessage={handleSendMessage} voiceChatEnabled={voiceChatEnabled} />
            </div>
          </div>}
      </div>
    </div>;
}
export function App() {
  return <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>;
}