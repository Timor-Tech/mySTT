import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5050');

function VoiceToText() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ms-MY'; // Bahasa Malaysia

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);
      socket.emit('transcription', transcriptText);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div>
      <button onClick={toggleListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <div>
        <h2>Transcript:</h2>
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default VoiceToText;