const { client, databaseId, containerId } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class CosmosService {
  constructor() {
    this.database = client.database(databaseId);
    this.container = this.database.container(containerId);
  }

  async createFeedback(feedbackData) {
    try {
      const item = {
        id: uuidv4(),
        ...feedbackData,
        date: new Date().toISOString().split('T')[0]
      };
      
      const { resource } = await this.container.items.create(item);
      return resource;
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw error;
    }
  }

  async getFeedbackByFaculty(facultyName) {
    try {
      const querySpec = {
        query: 'SELECT * FROM c WHERE c.facultyName = @facultyName',
        parameters: [{ name: '@facultyName', value: facultyName }]
      };
      
      const { resources } = await this.container.items.query(querySpec).fetchAll();
      return resources;
    } catch (error) {
      console.error('Error fetching feedback by faculty:', error);
      throw error;
    }
  }

  async getAllFeedback() {
    try {
      const querySpec = {
        query: 'SELECT * FROM c ORDER BY c.date DESC'
      };
      
      const { resources } = await this.container.items.query(querySpec).fetchAll();
      return resources;
    } catch (error) {
      console.error('Error fetching all feedback:', error);
      throw error;
    }
  }

  async getFacultySentimentStats(facultyName) {
    try {
      const feedback = await this.getFeedbackByFaculty(facultyName);
      
      const stats = {
        total: feedback.length,
        positive: feedback.filter(f => f.sentiment === 'positive').length,
        neutral: feedback.filter(f => f.sentiment === 'neutral').length,
        negative: feedback.filter(f => f.sentiment === 'negative').length,
        averageRating: feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length || 0
      };
      
      return stats;
    } catch (error) {
      console.error('Error calculating sentiment stats:', error);
      throw error;
    }
  }
}

module.exports = new CosmosService();
