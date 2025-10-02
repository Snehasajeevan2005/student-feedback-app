import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [adminKey, setAdminKey] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLogging(true);

    // Simulate authentication delay
    setTimeout(() => {
      // Simple admin authentication (in production, use proper authentication)
      if (adminKey === 'admin123') {
        onLogin();
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
      setIsLogging(false);
    }, 1500);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Animation Elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '20%',
        width: '200px',
        height: '200px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '25%',
        width: '150px',
        height: '150px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '50%',
        animation: 'float 4s ease-in-out infinite reverse'
      }}></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="modern-card fade-in-up" style={{ 
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.2)'
            }}>
              {/* Header Section */}
              <div style={{
                background: 'linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)',
                padding: '40px 30px',
                textAlign: 'center',
                color: 'white',
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '15px',
                  animation: 'bounce 2s infinite'
                }}>
                  👔
                </div>
                <h2 style={{ 
                  fontWeight: '700', 
                  marginBottom: '10px',
                  fontSize: '1.8rem'
                }}>
                  Admin Portal
                </h2>
                <p style={{ 
                  opacity: '0.9', 
                  marginBottom: '0',
                  fontSize: '1rem'
                }}>
                  Comprehensive analytics and system management
                </p>
              </div>
              
              {/* Form Section */}
              <div style={{ padding: '40px 30px' }}>
                {error && (
                  <div 
                    className="alert alert-danger" 
                    style={{
                      borderRadius: '15px',
                      border: 'none',
                      background: 'rgba(252, 70, 107, 0.1)',
                      color: '#FC466B',
                      fontWeight: '500',
                      marginBottom: '25px'
                    }}
                  >
                    ❌ {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-floating-modern">
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control-modern"
                        id="adminKey"
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        placeholder=" "
                        required
                        style={{
                          fontSize: '1.1rem',
                          padding: '20px 50px 20px 20px',
                          border: '2px solid rgba(252, 70, 107, 0.2)',
                          borderRadius: '15px'
                        }}
                        disabled={isLogging}
                      />
                      <button
                        type="button"
                        style={{
                          position: 'absolute',
                          right: '15px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: '#FC466B',
                          fontSize: '1.2rem',
                          cursor: 'pointer',
                          padding: '5px'
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    <label htmlFor="adminKey" className="form-label-modern" style={{
                      color: '#FC466B',
                      fontWeight: '600'
                    }}>
                      Administrator Password
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-modern w-100"
                    disabled={isLogging}
                    style={{
                      background: 'linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)',
                      color: 'white',
                      padding: '15px 30px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      borderRadius: '15px',
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isLogging ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Authenticating...
                      </>
                    ) : (
                      <>
                        🚀 Access Admin Dashboard
                      </>
                    )}
                  </button>
                </form>
                
                {/* Admin Info */}
                <div style={{
                  marginTop: '30px',
                  padding: '20px',
                  background: 'rgba(252, 70, 107, 0.1)',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <h6 style={{ color: '#FC466B', marginBottom: '15px', fontWeight: '600' }}>
                    🔐 Admin Capabilities:
                  </h6>
                  <div className="row text-start">
                    <div className="col-6">
                      <small style={{ color: '#666', display: 'block', marginBottom: '8px' }}>
                        📊 Global analytics
                      </small>
                      <small style={{ color: '#666', display: 'block' }}>
                        👥 Faculty comparison
                      </small>
                    </div>
                    <div className="col-6">
                      <small style={{ color: '#666', display: 'block', marginBottom: '8px' }}>
                        📈 Performance reports
                      </small>
                      <small style={{ color: '#666', display: 'block' }}>
                        🎯 System insights
                      </small>
                    </div>
                  </div>
                  
                  <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    background: 'rgba(63, 94, 251, 0.1)',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    color: '#3F5EFB'
                  }}>
                    💡 Demo Credentials: <strong>admin123</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
