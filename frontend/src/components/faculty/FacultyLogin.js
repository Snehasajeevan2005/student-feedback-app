import React, { useState, useEffect } from 'react';
import { facultyAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const FacultyLogin = ({ onLogin }) => {
  const [facultyName, setFacultyName] = useState('');
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    fetchFacultyList();
  }, []);

  const fetchFacultyList = async () => {
    try {
      setLoading(true);
      const response = await facultyAPI.getFacultyList();
      setFacultyList(response.data);
    } catch (error) {
      console.error('Error fetching faculty list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (facultyName) {
      setIsLogging(true);
      // Simulate loading for better UX
      setTimeout(() => {
        onLogin(facultyName);
        setIsLogging(false);
      }, 1200);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center'
      }}>
        <LoadingSpinner message="Loading faculty portal..." />
      </div>
    );
  }

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
        top: '20%',
        right: '15%',
        width: '250px',
        height: '250px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: '180px',
        height: '180px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
        animation: 'float 5s ease-in-out infinite reverse'
      }}></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="modern-card fade-in-up" style={{ 
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
            }}>
              {/* Header Section */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                  👨‍🏫
                </div>
                <h2 style={{ 
                  fontWeight: '700', 
                  marginBottom: '10px',
                  fontSize: '1.8rem'
                }}>
                  Faculty Portal
                </h2>
                <p style={{ 
                  opacity: '0.9', 
                  marginBottom: '0',
                  fontSize: '1rem'
                }}>
                  Access your feedback analytics and insights
                </p>
              </div>
              
              {/* Form Section */}
              <div style={{ padding: '40px 30px' }}>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating-modern">
                    <select
                      className="form-control-modern"
                      id="facultyName"
                      value={facultyName}
                      onChange={(e) => setFacultyName(e.target.value)}
                      required
                      style={{
                        fontSize: '1.1rem',
                        padding: '20px',
                        border: '2px solid rgba(102, 126, 234, 0.2)',
                        borderRadius: '15px',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 20px center',
                        backgroundSize: '20px'
                      }}
                      disabled={isLogging}
                    >
                      <option value="">Select Your Name</option>
                      {facultyList.map(faculty => (
                        <option key={faculty} value={faculty}>{faculty}</option>
                      ))}
                    </select>
                    <label htmlFor="facultyName" className="form-label-modern" style={{
                      color: '#667eea',
                      fontWeight: '600'
                    }}>
                      Choose Faculty Profile
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-modern w-100"
                    disabled={isLogging || !facultyName}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '15px 30px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      borderRadius: '15px',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      opacity: (!facultyName && !isLogging) ? 0.6 : 1
                    }}
                  >
                    {isLogging ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Accessing Dashboard...
                      </>
                    ) : (
                      <>
                        📊 Access Faculty Dashboard
                      </>
                    )}
                  </button>
                </form>
                
                {/* Faculty Stats Preview */}
                <div style={{
                  marginTop: '30px',
                  padding: '20px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <h6 style={{ color: '#667eea', marginBottom: '15px', fontWeight: '600' }}>
                    📈 Your Dashboard Includes:
                  </h6>
                  <div className="row text-start">
                    <div className="col-6">
                      <small style={{ color: '#666', display: 'block', marginBottom: '8px' }}>
                        📊 Sentiment analysis
                      </small>
                      <small style={{ color: '#666', display: 'block' }}>
                        ⭐ Average ratings
                      </small>
                    </div>
                    <div className="col-6">
                      <small style={{ color: '#666', display: 'block', marginBottom: '8px' }}>
                        💬 Anonymous feedback
                      </small>
                      <small style={{ color: '#666', display: 'block' }}>
                        📈 Performance trends
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

export default FacultyLogin;
