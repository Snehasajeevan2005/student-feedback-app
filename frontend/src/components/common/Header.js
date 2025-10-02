import React from 'react';

const Header = ({ title, userRole, onLogout }) => {
  return (
    <header className="modern-header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <h1 className="h2 mb-0 text-white" style={{ fontWeight: '700', position: 'relative', zIndex: 2 }}>
              {title}
            </h1>
          </div>
          <div className="col-auto d-flex align-items-center">
            <span 
              className="badge me-3 px-3 py-2" 
              style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white',
                borderRadius: '50px',
                fontSize: '0.8rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {userRole}
            </span>
            {onLogout && (
              <button 
                className="btn btn-modern"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
                onClick={onLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
