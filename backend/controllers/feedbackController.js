const sentimentService = require('../services/sentimentService');
const cosmosService = require('../services/cosmosService');

class FeedbackController {
  async submitFeedback(req, res) {
    try {
      const { name, department, rollNumber, email, feedback, rating, facultyName } = req.body;
      
      // Validate required fields
      if (!name || !department || !rollNumber || !email || !feedback || !rating || !facultyName) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Analyze sentiment
      const sentimentResult = await sentimentService.analyzeSentiment(feedback);
      
      // Create anonymous student ID
      const studentAnonId = `S${rollNumber.slice(-4)}`;
      
      // Prepare feedback data
      const feedbackData = {
        facultyName,
        department,
        feedback,
        rating: parseInt(rating),
        sentiment: sentimentResult.sentiment,
        sentimentScores: sentimentResult.confidenceScores,
        studentAnonId,
        submissionDate: new Date().toISOString()
      };
      
      // Store in Cosmos DB
      const savedFeedback = await cosmosService.createFeedback(feedbackData);
      
      res.status(201).json({
        message: 'Feedback submitted successfully',
        feedbackId: savedFeedback.id,
        sentiment: sentimentResult.sentiment
      });
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new FeedbackController();
