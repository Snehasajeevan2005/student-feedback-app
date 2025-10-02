const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config();

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY
});

const databaseId = 'StudentFeedbackDB';
const containerId = 'Feedback';

async function initializeDatabase() {
  try {
    // Create database if it doesn't exist
    const { database } = await client.databases.createIfNotExists({
      id: databaseId
    });
    
    // Create container if it doesn't exist
    const { container } = await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: { paths: ['/facultyName'] }
    });
    
    console.log('Database and container initialized successfully');
    return { database, container };
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

module.exports = {
  client,
  databaseId,
  containerId,
  initializeDatabase
};
