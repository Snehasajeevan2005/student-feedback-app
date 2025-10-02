import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
      <div className="text-center">
        <div className="modern-spinner mx-auto mb-3"></div>
        <div style={{ 
          fontSize: '1.1rem', 
          color: '#667eea', 
          fontWeight: '500' 
        }}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
