const { TextAnalyticsClient, AzureKeyCredential } = require('@azure/ai-text-analytics');
const azureConfig = require('../config/azure-config');

class SentimentService {
  constructor() {
    this.client = new TextAnalyticsClient(
      azureConfig.textAnalytics.endpoint,
      new AzureKeyCredential(azureConfig.textAnalytics.key)
    );
  }

  async analyzeSentiment(text) {
    try {
      const documents = [{ id: '1', text: text, language: 'en' }];
      const results = await this.client.analyzeSentiment(documents);
      
      if (results.length > 0 && !results[0].error) {
        const result = results[0];
        return {
          sentiment: result.sentiment,
          confidenceScores: result.confidenceScores,
          sentences: result.sentences.map(sentence => ({
            text: sentence.text,
            sentiment: sentence.sentiment,
            confidenceScores: sentence.confidenceScores
          }))
        };
      } else {
        throw new Error('Sentiment analysis failed');
      }
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      throw error;
    }
  }
}

module.exports = new SentimentService();
