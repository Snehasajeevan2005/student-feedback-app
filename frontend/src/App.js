import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import StudentLogin from './components/student/StudentLogin';
import FeedbackForm from './components/student/FeedbackForm';
import FacultyLogin from './components/faculty/FacultyLogin';
import FacultyDashboard from './components/faculty/FacultyDashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role, userName = null) => {
    setUserRole(role);
    setCurrentUser(userName);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUser(null);
  };

  const RoleSelector = () => (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="modern-card fade-in-up" style={{ textAlign: 'center' }}>
              <div style={{
                background: 'var(--primary-gradient)',
                padding: '40px 30px',
                color: 'white'
              }}>
                <h1 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800', 
                  marginBottom: '15px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  🎓 Student Feedback Portal
                </h1>
                <p style={{ 
                  fontSize: '1.2rem', 
                  opacity: '0.9', 
                  marginBottom: '0' 
                }}>
                  Advanced Sentiment Analysis System
                </p>
              </div>
              
              <div style={{ padding: '50px 30px' }}>
                <h3 style={{ 
                  marginBottom: '40px', 
                  color: '#333',
                  fontWeight: '600'
                }}>
                  Choose Your Role
                </h3>
                
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="glass-card" style={{ 
                      padding: '40px 20px',
                      textAlign: 'center',
                      transition: 'var(--transition)',
                      cursor: 'pointer',
                      height: '100%'
                    }}
                    onClick={() => handleLogin('student')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-heavy)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
                    }}>
                      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎓</div>
                      <h4 style={{ color: '#667eea', fontWeight: '700', marginBottom: '15px' }}>
                        Student
                      </h4>
                      <p style={{ color: '#666', marginBottom: '25px' }}>
                        Submit feedback about your faculty members
                      </p>
                      <div className="btn btn-modern btn-primary-modern">
                        Continue as Student
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="glass-card" style={{ 
                      padding: '40px 20px',
                      textAlign: 'center',
                      transition: 'var(--transition)',
                      cursor: 'pointer',
                      height: '100%'
                    }}
                    onClick={() => handleLogin('faculty')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-heavy)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
                    }}>
                      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👨‍🏫</div>
                      <h4 style={{ color: '#11998e', fontWeight: '700', marginBottom: '15px' }}>
                        Faculty
                      </h4>
                      <p style={{ color: '#666', marginBottom: '25px' }}>
                        View your feedback analytics and insights
                      </p>
                      <div className="btn btn-modern btn-info-modern">
                        Continue as Faculty
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="glass-card" style={{ 
                      padding: '40px 20px',
                      textAlign: 'center',
                      transition: 'var(--transition)',
                      cursor: 'pointer',
                      height: '100%'
                    }}
                    onClick={() => handleLogin('admin')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-heavy)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
                    }}>
                      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👔</div>
                      <h4 style={{ color: '#FC466B', fontWeight: '700', marginBottom: '15px' }}>
                        Administrator
                      </h4>
                      <p style={{ color: '#666', marginBottom: '25px' }}>
                        Access comprehensive analytics and reports
                      </p>
                      <div className="btn btn-modern btn-danger-modern">
                        Continue as Admin
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  marginTop: '50px', 
                  padding: '20px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '15px'
                }}>
                  <h5 style={{ color: '#667eea', marginBottom: '15px' }}>
                    🚀 Features
                  </h5>
                  <div className="row text-start">
                    <div className="col-md-4">
                      <small style={{ color: '#666' }}>
                        ⚡ Real-time sentiment analysis<br/>
                        📊 Interactive dashboards<br/>
                        🔒 Anonymous feedback system
                      </small>
                    </div>
                    <div className="col-md-4">
                      <small style={{ color: '#666' }}>
                        📈 Advanced analytics<br/>
                        🎯 Faculty performance insights<br/>
                        📱 Responsive design
                      </small>
                    </div>
                    <div className="col-md-4">
                      <small style={{ color: '#666' }}>
                        ☁️ Azure cloud integration<br/>
                        🤖 AI-powered text analysis<br/>
                        🎨 Modern UI/UX
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

  // Student Flow
  if (userRole === 'student' && !currentUser) {
    return <StudentLogin onLogin={(name) => setCurrentUser(name)} />;
  }
  
  if (userRole === 'student' && currentUser) {
    return <FeedbackForm studentName={currentUser} />;
  }

  // Faculty Flow
  if (userRole === 'faculty' && !currentUser) {
    return <FacultyLogin onLogin={(name) => setCurrentUser(name)} />;
  }
  
  if (userRole === 'faculty' && currentUser) {
    return <FacultyDashboard facultyName={currentUser} onLogout={handleLogout} />;
  }

  // Admin Flow
  if (userRole === 'admin' && !currentUser) {
    return <AdminLogin onLogin={() => setCurrentUser('admin')} />;
  }
  
  if (userRole === 'admin' && currentUser) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Default role selector
  return <RoleSelector />;
}

export default App;
