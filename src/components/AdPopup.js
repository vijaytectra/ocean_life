"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoCloseCircle } from 'react-icons/io5';

export default function AdPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Check if already shown in this session
    const hasShown = sessionStorage.getItem('ad_popup_shown');
    if (hasShown) return;

    // Fetch popup image
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const item = data.find(i => i.id === 'popup-image');
          if (item && item.value) {
            setImageUrl(item.value);
            // Show after a short delay
            setTimeout(() => {
              setIsVisible(true);
            }, 2000);
          }
        }
      })
      .catch(err => console.error("Popup fetch error:", err));
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem('ad_popup_shown', 'true');
  };

  if (!isVisible || !imageUrl) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 99999,
      padding: '20px'
    }}>
      <div style={{
        position: 'relative',
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        animation: 'fadeInScale 0.5s ease-out forwards'
      }}>
        <button 
          onClick={closePopup}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            color: '#333',
            display: 'flex',
            zIndex: 1
          }}
        >
          <IoCloseCircle size={32} />
        </button>
        <img 
          src={imageUrl} 
          alt="Advertisement" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }} 
        />
      </div>
      <style jsx>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
