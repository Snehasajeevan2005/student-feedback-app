const cosmosService = require('../services/cosmosService');

class AdminController {
  async getAdminDashboard(req, res) {
    try {
      // Get all feedback
      const allFeedback = await cosmosService.getAllFeedback();
      
      // Calculate overall statistics
      const overallStats = {
        totalFeedback: allFeedback.length,
        positive: allFeedback.filter(f => f.sentiment === 'positive').length,
        neutral: allFeedback.filter(f => f.sentiment === 'neutral').length,
        negative: allFeedback.filter(f => f.sentiment === 'negative').length,
        averageRating: allFeedback.reduce((sum, f) => sum + f.rating, 0) / allFeedback.length || 0
      };
      
      // Calculate faculty-wise statistics
      const facultyStats = {};
      allFeedback.forEach(feedback => {
        if (!facultyStats[feedback.facultyName]) {
          facultyStats[feedback.facultyName] = {
            total: 0,
            positive: 0,
            neutral: 0,
            negative: 0,
            totalRating: 0
          };
        }
        
        facultyStats[feedback.facultyName].total++;
        facultyStats[feedback.facultyName][feedback.sentiment]++;
        facultyStats[feedback.facultyName].totalRating += feedback.rating;
      });
      
      // Calculate average ratings for each faculty
      Object.keys(facultyStats).forEach(faculty => {
        facultyStats[faculty].averageRating = 
          facultyStats[faculty].totalRating / facultyStats[faculty].total;
      });
      
      res.json({
        overallStats,
        facultyStats,
        recentFeedback: allFeedback.slice(0, 10) // Latest 10 feedback
      });
      
    } catch (error) {
      console.error('Error fetching admin dashboard:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new AdminController();
