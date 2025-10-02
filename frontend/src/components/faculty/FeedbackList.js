import React from 'react';
import { SENTIMENT_COLORS } from '../../utils/constants';

const FeedbackList = ({ feedback }) => {
  const getSentimentBadgeClass = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'bg-success';
      case 'negative': return 'bg-danger';
      case 'neutral': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Anonymous Feedback ({feedback.length})</h5>
      </div>
      <div className="card-body">
        {feedback.length === 0 ? (
          <p className="text-muted">No feedback received yet.</p>
        ) : (
          <div className="list-group">
            {feedback.map((item, index) => (
              <div key={item.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <span className={`badge ${getSentimentBadgeClass(item.sentiment)} me-2`}>
                      {item.sentiment.toUpperCase()}
                    </span>
                    <span className="text-warning me-2">
                      {renderStars(item.rating)}
                    </span>
                    <small className="text-muted">
                      {item.department} • {item.date}
                    </small>
                  </div>
                </div>
                <p className="mb-0">{item.feedback}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;
