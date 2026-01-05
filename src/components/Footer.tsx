import React from 'react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  return (
    <div className="audio-player">
      <audio loop>
        <source src={audioSrc} type="audio/mp3" />
      </audio>
      <button className="audio-control">
        <i className="fas fa-music"></i>
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
          <p>Designed By wedding-invitation.id</p>
          <div className="social-links">
            <a href="https://www.instagram.com/tibradigital/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.tibradigital.id" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe"></i>
            </a>
            <a href="https://pesan.link/chatminti" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
          <p>© 2024 Wedding Invitation. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;