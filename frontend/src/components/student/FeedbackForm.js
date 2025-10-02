import React, { useState, useEffect } from 'react';
import { feedbackAPI, facultyAPI } from '../../services/api';
import { DEPARTMENTS } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';

const FeedbackForm = ({ studentName }) => {
  const [formData, setFormData] = useState({
    name: studentName || '',
    department: '',
    rollNumber: '',
    email: '',
    feedback: '',
    rating: '',
    facultyName: ''
  });
  
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

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
      setMessage('Error loading faculty list');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const response = await feedbackAPI.submitFeedback(formData);
      setMessage(`✨ Feedback submitted successfully! Sentiment Analysis: ${response.data.sentiment.toUpperCase()}`);
      
      // Reset form
      setFormData({
        name: studentName || '',
        department: '',
        rollNumber: '',
        email: '',
        feedback: '',
        rating: '',
        facultyName: ''
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('❌ Error submitting feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Preparing feedback form..." />;
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 0'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="modern-card fade-in-up" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
              <div style={{
                background: 'var(--success-gradient)',
                padding: '30px',
                textAlign: 'center',
                color: 'white'
              }}>
                <h2 style={{ fontWeight: '700', marginBottom: '10px' }}>
                  🎓 Submit Your Feedback
                </h2>
                <p style={{ opacity: '0.9', marginBottom: '0' }}>
                  Help us improve by sharing your experience
                </p>
              </div>
              
              <div style={{ padding: '40px' }}>
                {message && (
                  <div 
                    className={`alert ${message.includes('Error') || message.includes('❌') ? 'alert-danger' : 'alert-success'}`}
                    style={{
                      borderRadius: '15px',
                      border: 'none',
                      padding: '20px',
                      fontSize: '1.1rem',
                      fontWeight: '500'
                    }}
                  >
                    {message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating-modern">
                        <input
                          type="text"
                          className="form-control-modern"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder=" "
                          required
                        />
                        <label htmlFor="name" className="form-label-modern">Full Name</label>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-floating-modern">
                        <input
                          type="text"
                          className="form-control-modern"
                          id="rollNumber"
                          name="rollNumber"
                          value={formData.rollNumber}
                          onChange={handleChange}
                          placeholder=" "
                          required
                        />
                        <label htmlFor="rollNumber" className="form-label-modern">Roll Number</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating-modern">
                        <select
                          className="form-control-modern"
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Department</option>
                          {DEPARTMENTS.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                        <label htmlFor="department" className="form-label-modern">Department</label>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-floating-modern">
                        <input
                          type="email"
                          className="form-control-modern"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder=" "
                          required
                        />
                        <label htmlFor="email" className="form-label-modern">Email Address</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating-modern">
                        <select
                          className="form-control-modern"
                          id="facultyName"
                          name="facultyName"
                          value={formData.facultyName}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Faculty</option>
                          {facultyList.map(faculty => (
                            <option key={faculty} value={faculty}>{faculty}</option>
                          ))}
                        </select>
                        <label htmlFor="facultyName" className="form-label-modern">Faculty Name</label>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-floating-modern">
                        <select
                          className="form-control-modern"
                          id="rating"
                          name="rating"
                          value={formData.rating}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Rating</option>
                          <option value="1">⭐ (1 Star)</option>
                          <option value="2">⭐⭐ (2 Stars)</option>
                          <option value="3">⭐⭐⭐ (3 Stars)</option>
                          <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                          <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                        </select>
                        <label htmlFor="rating" className="form-label-modern">Star Rating</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-floating-modern">
                    <textarea
                      className="form-control-modern"
                      id="feedback"
                      name="feedback"
                      rows="6"
                      value={formData.feedback}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      style={{ minHeight: '150px', resize: 'vertical' }}
                    ></textarea>
                    <label htmlFor="feedback" className="form-label-modern">Your Detailed Feedback</label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-modern btn-success-modern w-100"
                    disabled={submitting}
                    style={{
                      padding: '15px 30px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      marginTop: '20px'
                    }}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Analyzing & Submitting...
                      </>
                    ) : (
                      <>
                        📝 Submit Feedback
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
