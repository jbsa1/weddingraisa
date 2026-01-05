import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  children: React.ReactNode;
}

const Preloader: React.FC<PreloaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // List of all assets to preload
  const assets = [
    // Images
    '/Background.JPG',
    '/Raisa.JPG',
    '/Raisa1.jpeg',
    '/Rafi1.jpeg',
    '/Rafi.JPG',
    '/IMG_1564.JPG',
    '/IMG_4013.JPG',
    '/IMG_4015.JPG',
    '/IMG_4019.JPG',
    '/IMG_4022.JPG',
    '/IMG_4023.JPG',
    '/IMG_4024.JPG',
    '/IMG_4117.JPG',
    '/IMG_4136.JPEG',
    '/ourstory.jpeg',
    '/ASSET-FRAME-JK2.webp',
    '/ASSET-FRAME-JK.webp',
    // External images (if any)
    'https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-13.webp',
    'https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-1.webp',
    'https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-8-Rev.webp',
    'https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-9-Rev.webp',
    'https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-16-2.webp',
    'https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-16.webp',
    'https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-3-scaled.webp',
    'https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-4-scaled.webp',
    'https://tibra-invitation.id/wp-content/uploads/2024/10/ASSET-GOLD-WHITE-6-scaled.webp',
    'https://tibra-invitation.id/wp-content/uploads/2024/10/VIDEO-ASSET-WHITE-GOLD.mp4',
    // Fonts will be loaded automatically by CSS imports
  ];

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Continue even if image fails to load
      img.src = src;
    });
  };

  const preloadVideo = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.onloadeddata = () => resolve();
      video.onerror = () => resolve(); // Continue even if video fails to load
      video.preload = 'metadata';
      video.src = src;
    });
  };

  const preloadAssets = async () => {
    const totalAssets = assets.length;
    let loadedAssets = 0;

    const updateProgress = () => {
      loadedAssets++;
      setLoadingProgress(Math.round((loadedAssets / totalAssets) * 100));
    };

    const promises = assets.map(async (asset) => {
      try {
        if (asset.endsWith('.mp4')) {
          await preloadVideo(asset);
        } else {
          await preloadImage(asset);
        }
        updateProgress();
      } catch (error) {
        updateProgress(); // Continue even if asset fails
      }
    });

    await Promise.all(promises);
  };

  useEffect(() => {
    const loadAllAssets = async () => {
      try {
        await preloadAssets();
        // Add a small delay for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        // If preloading fails, still show content
        setIsLoading(false);
      }
    };

    loadAllAssets();
  }, []);

  if (isLoading) {
    return (
      <div className="preloader">
        <div className="preloader-content">
          <div className="preloader-logo">
            <div className="preloader-initials">
              <center>
                R<br />R
              </center>
            </div>
          </div>

          <div className="preloader-text">
            <h1>The Wedding Of</h1>
            <h2>Raisa & Rafi</h2>
          </div>

          <div className="preloader-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Loading... {loadingProgress}%
            </div>
          </div>

          <div className="preloader-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="decoration-line"></div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Preloader;