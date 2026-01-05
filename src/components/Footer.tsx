import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(true); // Default true karena autoplay
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(audioSrc);

  const togglePlay = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: command,
          args: []
        }),
        '*'
      );
      setIsPlaying(!isPlaying);
    }
  };

  if (!videoId) {
    // Fallback to regular audio if not YouTube URL
    return (
      <div className="audio-player">
        <audio autoPlay loop preload="metadata">
          <source src={audioSrc} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

  return (
    <div className="audio-player">
      <iframe
        ref={iframeRef}
        width="0"
        height="0"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&enablejsapi=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ display: 'none' }}
        title="Background Music"
      ></iframe>
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
          <p>Coded By Jafar & MJ</p>
          <div className="social-links">
            {/* <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe"></i>
            </a>
            <a href="h#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a> */}
          </div>
          <p>
            © {new Date().getFullYear()} Wedding Invitation. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
