require('dotenv').config();

module.exports = {
  textAnalytics: {
    endpoint: process.env.TEXT_ANALYTICS_ENDPOINT,
    key: process.env.TEXT_ANALYTICS_KEY
  },
  cosmos: {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY
  }
};
