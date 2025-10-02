import React, { useState } from 'react';

const StudentLogin = ({ onLogin }) => {
  const [studentName, setStudentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (studentName.trim()) {
      setIsLoading(true);
      // Simulate loading for better UX
      setTimeout(() => {
        onLogin(studentName.trim());
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Animation Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'rgba(255,255,255,0.05)',
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
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              {/* Header Section */}
              <div style={{
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
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
                  🎓
                </div>
                <h2 style={{ 
                  fontWeight: '700', 
                  marginBottom: '10px',
                  fontSize: '1.8rem'
                }}>
                  Student Portal
                </h2>
                <p style={{ 
                  opacity: '0.9', 
                  marginBottom: '0',
                  fontSize: '1rem'
                }}>
                  Share your feedback and help us improve
                </p>
              </div>
              
              {/* Form Section */}
              <div style={{ padding: '40px 30px' }}>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating-modern">
                    <input
                      type="text"
                      className="form-control-modern"
                      id="studentName"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder=" "
                      required
                      style={{
                        fontSize: '1.1rem',
                        padding: '20px',
                        border: '2px solid rgba(17, 153, 142, 0.2)',
                        borderRadius: '15px'
                      }}
                      disabled={isLoading}
                    />
                    <label htmlFor="studentName" className="form-label-modern" style={{
                      color: '#11998e',
                      fontWeight: '600'
                    }}>
                      Enter Your Full Name
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-modern w-100"
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                      color: 'white',
                      padding: '15px 30px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      borderRadius: '15px',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Logging in...
                      </>
                    ) : (
                      <>
                        🚀 Continue as Student
                      </>
                    )}
                  </button>
                </form>
                
                {/* Additional Info */}
                <div style={{
                  marginTop: '30px',
                  padding: '20px',
                  background: 'rgba(17, 153, 142, 0.1)',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <h6 style={{ color: '#11998e', marginBottom: '15px', fontWeight: '600' }}>
                    ✨ What you can do:
                  </h6>
                  <div className="row text-start">
                    <div className="col-6">
                      <small style={{ color: '#666', display: 'block', marginBottom: '8px' }}>
                        📝 Submit detailed feedback
                      </small>
                      <small style={{ color: '#666', display: 'block' }}>
                        ⭐ Rate your faculty
                      </small>
                    </div>
                    <div className="col-6">
                      <small style={{ color: '#666', display: 'block', marginBottom: '8px' }}>
                        🔒 Anonymous submissions
                      </small>
                      <small style={{ color: '#666', display: 'block' }}>
                        🤖 AI sentiment analysis
                      </small>
                    </div>
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

export default StudentLogin;
