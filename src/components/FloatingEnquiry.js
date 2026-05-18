"use client";

import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';

const FloatingEnquiry = () => {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkSetting = async () => {
      try {
        const res = await fetch('/api/content');
        const data = await res.json();
        const setting = data.find(i => i.id === 'show-floating-enquiry');
        if (setting && setting.value === 'true') {
          setShow(true);
        }
      } catch (e) {
        console.error("Failed to check floating enquiry setting", e);
      }
    };
    checkSetting();
  }, []);

  if (!show) return null;

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '100px', // Above GoToTop button
          right: '25px',
          zIndex: 999,
          background: 'var(--color-orange)',
          color: '#fff',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(255, 122, 0, 0.4)',
          transition: 'all 0.3s ease',
          fontSize: '24px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
        title="Enquire Now"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            width: '100%',
            maxWidth: '700px',
            maxHeight: '90vh',
            borderRadius: '24px',
            position: 'relative',
            overflowY: 'auto'
          }}>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f1f5f9',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                fontSize: '20px',
                cursor: 'pointer',
                zIndex: 10,
                color: '#64748b'
              }}
            >
              &times;
            </button>
            <div style={{ padding: '20px' }}>
              <ContactForm type="Floating Enquiry" title="Send us an Enquiry" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingEnquiry;
