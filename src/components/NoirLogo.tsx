import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
export const NoirLogo = ({
  voiceChatEnabled,
  toggleVoiceChat
}) => {
  const {
    t
  } = useLanguage();
  const {
    currentTheme
  } = useTheme();
  const [pulsing, setPulsing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const voiceLevelRef = useRef(0);
  const animationFrameRef = useRef(null);
  const micStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  // Handle microphone input to detect voice levels
  const startListening = useCallback(async () => {
    if (!voiceChatEnabled) return;
    try {
      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      micStreamRef.current = stream;
      // Create analyzer to process audio data
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      // Connect microphone to analyzer
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyser);
      // Start listening and updating volume levels
      setIsListening(true);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        // Calculate average volume from frequency data
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        // Convert to a 0-1 scale and apply some exponential scaling to make it more responsive
        const normalizedVolume = Math.pow(average / 128, 2);
        setMicVolume(normalizedVolume);
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setIsListening(false);
    }
  }, [voiceChatEnabled]);
  const stopListening = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current = null;
    }
    setIsListening(false);
    setMicVolume(0);
  }, []);
  // Simulate voice response when not listening
  useEffect(() => {
    let interval;
    if (voiceChatEnabled && !isListening) {
      // Simulate occasional voice responses
      interval = setInterval(() => {
        // Random chance to start "speaking"
        if (Math.random() > 0.7) {
          const speakDuration = 1000 + Math.random() * 3000;
          // Start with a burst and then decay
          voiceLevelRef.current = 0.3 + Math.random() * 0.5;
          // Simulate speaking with fluctuating volume
          const speakInterval = setInterval(() => {
            voiceLevelRef.current = Math.max(0, voiceLevelRef.current * (0.85 + Math.random() * 0.1) + (Math.random() * 0.2 - 0.1));
            if (voiceLevelRef.current < 0.05) {
              clearInterval(speakInterval);
              voiceLevelRef.current = 0;
            }
          }, 100);
          // End speaking after duration
          setTimeout(() => {
            clearInterval(speakInterval);
            voiceLevelRef.current = 0;
          }, speakDuration);
        }
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [voiceChatEnabled, isListening]);
  // Toggle voice chat and handle microphone permissions
  const handleToggleVoiceChat = useCallback(() => {
    if (toggleVoiceChat) {
      const newState = !voiceChatEnabled;
      toggleVoiceChat();
      if (newState) {
        // If enabling voice chat, start listening
        setTimeout(() => startListening(), 100);
      } else {
        // If disabling voice chat, stop listening
        stopListening();
      }
    }
  }, [toggleVoiceChat, voiceChatEnabled, startListening, stopListening]);
  // Start/stop listening when voice chat is enabled/disabled
  useEffect(() => {
    if (voiceChatEnabled) {
      startListening();
    } else {
      stopListening();
    }
    return () => {
      stopListening();
    };
  }, [voiceChatEnabled, startListening, stopListening]);
  // Pulse effect
  useEffect(() => {
    if (voiceChatEnabled) {
      // Create a pulsing effect
      const pulseInterval = setInterval(() => {
        setPulsing(prev => !prev);
      }, 2000);
      return () => clearInterval(pulseInterval);
    }
  }, [voiceChatEnabled]);
  // Calculate scale factor based on voice activity
  const getScaleFactor = () => {
    if (!voiceChatEnabled) return 1;
    // Use actual mic input if listening, otherwise use simulated values
    const voiceLevel = isListening ? micVolume : voiceLevelRef.current;
    // Base scale + voice-reactive component
    return 1 + voiceLevel * 0.3;
  };
  return <div className="flex flex-col items-center">
      {/* Logo container with click handler */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer" onClick={handleToggleVoiceChat}>
        {/* Main logo image with reactive styling */}
        <img src="/Circle.gif" alt="Noir Logo" className={`w-full h-full will-change-transform ${pulsing && voiceChatEnabled ? 'animate-pulse' : ''}`} style={{
        filter: currentTheme === 'dark' ? `invert(100%) ${voiceChatEnabled && (isListening && micVolume > 0.1 || !isListening && voiceLevelRef.current > 0.1) ? `saturate(${1 + (isListening ? micVolume * 2 : voiceLevelRef.current * 2)})` : ''}` : `${voiceChatEnabled && (isListening && micVolume > 0.1 || !isListening && voiceLevelRef.current > 0.1) ? `saturate(${1 + (isListening ? micVolume * 1.5 : voiceLevelRef.current * 1.5)})` : ''}`,
        transform: `scale(${getScaleFactor()}) ${voiceChatEnabled && (isListening && micVolume > 0.15 || !isListening && voiceLevelRef.current > 0.15) ? `rotate(${(isListening ? micVolume : voiceLevelRef.current) * 2}deg)` : ''}`,
        transition: 'transform 0.05s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.1s ease',
        animation: voiceChatEnabled && (isListening && micVolume > 0.2 || !isListening && voiceLevelRef.current > 0.2) ? `pulse ${1 - (isListening ? Math.min(micVolume, 0.8) : Math.min(voiceLevelRef.current, 0.8)) * 0.7}s cubic-bezier(0.4, 0, 0.6, 1) infinite` : 'none'
      }} />
      </div>
      {/* Logo text */}
      <div className="text-center mt-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wider text-blue-800/80 dark:text-blue-100">
          {t('jarvis')}
        </h1>
        <p className="text-xs md:text-sm text-blue-800/60 dark:text-blue-200/80 mt-1">
          {t('jarvisFullName')}
        </p>
        {/* Voice chat status */}
        <div className="mt-4 flex items-center justify-center">
          <div className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium
              ${voiceChatEnabled ? 'bg-blue-100/50 dark:bg-blue-900/50 text-blue-800/80 dark:text-blue-200' : 'bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400'}`}>
            {t('voiceChat')}: {voiceChatEnabled ? t('enabled') : t('disabled')}
          </div>
        </div>
        {/* Click to toggle instruction */}
        <p className="text-xs text-blue-800/60 dark:text-blue-300/70 mt-2">
          {t('clickToToggle').replace('{action}', voiceChatEnabled ? t('disable') : t('enable'))}
        </p>
      </div>
    </div>;
};