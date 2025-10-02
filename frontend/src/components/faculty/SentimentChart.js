import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { SENTIMENT_COLORS } from '../../utils/constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentChart = ({ stats }) => {
  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [stats.positive, stats.neutral, stats.negative],
        backgroundColor: [
          SENTIMENT_COLORS.positive,
          SENTIMENT_COLORS.neutral,
          SENTIMENT_COLORS.negative
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="mb-0">Sentiment Distribution</h5>
      </div>
      <div className="card-body">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default SentimentChart;
