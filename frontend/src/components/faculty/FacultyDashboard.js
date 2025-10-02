import React, { useState, useEffect } from 'react';
import { facultyAPI } from '../../services/api';
import Header from '../common/Header';
import SentimentChart from './SentimentChart';
import FeedbackList from './FeedbackList';
import LoadingSpinner from '../common/LoadingSpinner';

const FacultyDashboard = ({ facultyName, onLogout }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, [facultyName]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await facultyAPI.getDashboard(facultyName);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger modern-card">{error}</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Header 
        title={`👨‍🏫 ${facultyName}`} 
        userRole="Faculty Member" 
        onLogout={onLogout} 
      />
      
      <div className="container py-4">
        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="stats-card-modern fade-in-up" style={{ 
              background: 'var(--primary-gradient)',
              animationDelay: '0.1s'
            }}>
              <div className="stats-number">{dashboardData.stats.total}</div>
              <div className="stats-label">📊 Total Feedback</div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="stats-card-modern fade-in-up" style={{ 
              background: 'var(--success-gradient)',
              animationDelay: '0.2s'
            }}>
              <div className="stats-number">{dashboardData.stats.positive}</div>
              <div className="stats-label">😊 Positive</div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="stats-card-modern fade-in-up" style={{ 
              background: 'var(--warning-gradient)',
              animationDelay: '0.3s'
            }}>
              <div className="stats-number">{dashboardData.stats.neutral}</div>
              <div className="stats-label">😐 Neutral</div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="stats-card-modern fade-in-up" style={{ 
              background: 'var(--info-gradient)',
              animationDelay: '0.4s'
            }}>
              <div className="stats-number">{dashboardData.stats.averageRating.toFixed(1)}</div>
              <div className="stats-label">⭐ Average Rating</div>
            </div>
          </div>
        </div>

        {/* Charts and Feedback */}
        <div className="row">
          <div className="col-md-5 mb-4">
            <div className="chart-container-modern slide-in-right" style={{ animationDelay: '0.5s' }}>
              <SentimentChart stats={dashboardData.stats} />
            </div>
          </div>
          <div className="col-md-7 mb-4">
            <div className="modern-card slide-in-right" style={{ animationDelay: '0.6s' }}>
              <FeedbackList feedback={dashboardData.feedback} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
