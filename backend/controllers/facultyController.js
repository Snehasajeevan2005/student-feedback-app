const cosmosService = require('../services/cosmosService');

class FacultyController {
  async getFacultyDashboard(req, res) {
    try {
      const { facultyName } = req.params;
      
      if (!facultyName) {
        return res.status(400).json({ error: 'Faculty name is required' });
      }

      // Get feedback for this faculty
      const feedback = await cosmosService.getFeedbackByFaculty(facultyName);
      
      // Get sentiment statistics
      const stats = await cosmosService.getFacultySentimentStats(facultyName);
      
      // Prepare anonymized feedback list
      const anonymizedFeedback = feedback.map(f => ({
        id: f.id,
        feedback: f.feedback,
        rating: f.rating,
        sentiment: f.sentiment,
        date: f.date,
        department: f.department
      }));
      
      res.json({
        facultyName,
        stats,
        feedback: anonymizedFeedback
      });
      
    } catch (error) {
      console.error('Error fetching faculty dashboard:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getFacultyList(req, res) {
    try {
      // This would typically come from a separate faculty table
      // For now, returning a static list
      const faculties = [
        'Sandhiya',
        'Ponmani',
        'vinodhini',
        'Kumar',
        'Durai'
      ];
      
      res.json(faculties);
    } catch (error) {
      console.error('Error fetching faculty list:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new FacultyController();
