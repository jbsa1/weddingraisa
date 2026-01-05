import React from "react";
import { motion } from "framer-motion";

const YouTubeSection: React.FC = () => {
  return (
    <section className="youtube-section">
      <div className="youtube-content">
        <motion.div
          className="youtube-video-container"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <iframe
            src="https://www.youtube.com/embed/N4psx-ryqfQ?si=9wC_sFtsJ58ved6e"
            title="Wedding Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="youtube-video"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default YouTubeSection;
