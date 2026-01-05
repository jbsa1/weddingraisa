import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Auto play failed, user interaction required');
        }
      }
    };

    playAudio();
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Play failed');
        }
      }
    }
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} loop preload="metadata">
        <source src={audioSrc} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <button className="audio-control" onClick={togglePlay}>
        <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
      </button>
    </div>
  );
};

interface FooterProps {
  audioSrc?: string;
}

const Footer: React.FC<FooterProps> = ({ audioSrc }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {audioSrc && <AudioPlayer audioSrc={audioSrc} />}
        
        <motion.div 
          className="footer-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p>Designed By JaffarSoft</p>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe"></i>
            </a>
            <a href="h#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
          <p>© {new Date().getFullYear()} Wedding Invitation. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;