import React from "react";
import { motion } from "framer-motion";

const LiveStreamingSection: React.FC = () => {
  return (
    <section className="live-streaming-section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="streaming-container"
      >
        <h2 className="streaming-title">Live Streaming</h2>
        <p className="streaming-subtitle">
          Can't attend in person? Join us virtually through our live streaming.
        </p>

        <div className="streaming-content">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="streaming-links"
          >
            <div className="streaming-card">
              <h3>Wedding Ceremony</h3>
              <p className="streaming-description">
                Watch the holy matrimony ceremony live from Graha Samudra Bumimoro
              </p>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                className="streaming-button"
              >
                <i className="fab fa-youtube"></i>
                Watch Live
              </a>
            </div>
            <div className="streaming-card">
              <h3>Wedding Reception</h3>
              <p className="streaming-description">
                Join the celebration and reception festivities live
              </p>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                className="streaming-button"
              >
                <i className="fab fa-youtube"></i>
                Watch Live
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default LiveStreamingSection;