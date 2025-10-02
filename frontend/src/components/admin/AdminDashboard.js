import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { adminAPI } from '../../services/api';
import Header from '../common/Header';
import LoadingSpinner from '../common/LoadingSpinner';
import { SENTIMENT_COLORS } from '../../utils/constants';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = ({ onLogout }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching admin dashboard:', error);
      setError('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getFacultyComparisonChart = () => {
    if (!dashboardData?.facultyStats) return null;

    const faculties = Object.keys(dashboardData.facultyStats);
    const positiveData = faculties.map(faculty => dashboardData.facultyStats[faculty].positive);
    const neutralData = faculties.map(faculty => dashboardData.facultyStats[faculty].neutral);
    const negativeData = faculties.map(faculty => dashboardData.facultyStats[faculty].negative);

    return {
      labels: faculties,
      datasets: [
        {
          label: 'Positive',
          data: positiveData,
          backgroundColor: SENTIMENT_COLORS.positive,
        },
        {
          label: 'Neutral',
          data: neutralData,
          backgroundColor: SENTIMENT_COLORS.neutral,
        },
        {
          label: 'Negative',
          data: negativeData,
          backgroundColor: SENTIMENT_COLORS.negative,
        }
      ]
    };
  };

  const getRatingComparisonChart = () => {
    if (!dashboardData?.facultyStats) return null;

    const faculties = Object.keys(dashboardData.facultyStats);
    const ratings = faculties.map(faculty => dashboardData.facultyStats[faculty].averageRating);

    return {
      labels: faculties,
      datasets: [
        {
          label: 'Average Rating',
          data: ratings,
          backgroundColor: '#007bff',
          borderColor: '#0056b3',
          borderWidth: 1
        }
      ]
    };
  };

  if (loading) {
    return <LoadingSpinner message="Loading admin dashboard..." />;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Header 
        title="Admin Dashboard" 
        userRole="Administrator" 
        onLogout={onLogout} 
      />
      
      <div className="container">
        {/* Overall Stats */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white">
              <div className="card-body text-center">
                <h3>{dashboardData.overallStats.totalFeedback}</h3>
                <p className="mb-0">Total Feedback</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success text-white">
              <div className="card-body text-center">
                <h3>{dashboardData.overallStats.positive}</h3>
                <p className="mb-0">Positive</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-warning text-white">
              <div className="card-body text-center">
                <h3>{dashboardData.overallStats.neutral}</h3>
                <p className="mb-0">Neutral</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info text-white">
              <div className="card-body text-center">
                <h3>{dashboardData.overallStats.averageRating.toFixed(1)}</h3>
                <p className="mb-0">Overall Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Comparison Charts */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Faculty Sentiment Comparison</h5>
              </div>
              <div className="card-body">
                <Bar data={getFacultyComparisonChart()} options={chartOptions} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Faculty Rating Comparison</h5>
              </div>
              <div className="card-body">
                <Bar data={getRatingComparisonChart()} options={{
                  ...chartOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 5
                    }
                  }
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Statistics Table */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Faculty Statistics</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Faculty Name</th>
                        <th>Total Feedback</th>
                        <th>Positive</th>
                        <th>Neutral</th>
                        <th>Negative</th>
                        <th>Average Rating</th>
                        <th>Sentiment Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(dashboardData.facultyStats).map(([faculty, stats]) => (
                        <tr key={faculty}>
                          <td>{faculty}</td>
                          <td>{stats.total}</td>
                          <td><span className="badge bg-success">{stats.positive}</span></td>
                          <td><span className="badge bg-warning">{stats.neutral}</span></td>
                          <td><span className="badge bg-danger">{stats.negative}</span></td>
                          <td>{stats.averageRating.toFixed(1)} ⭐</td>
                          <td>
                            {((stats.positive / stats.total) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
