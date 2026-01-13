
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#E2F1F3', // your splash bg color
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      fontSize: '2rem',
      zIndex: 9999
    }}>
      {/* You can add a logo or spinner here */}
      <img src="/icons/icon-512x512.png" alt="Go Row Logo" style={{ width: '80%' }} />

    </div>
  );
};

export default SplashScreen;