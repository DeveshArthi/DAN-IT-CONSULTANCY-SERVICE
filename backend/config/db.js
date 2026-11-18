
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing in .env');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });

    console.log('MongoDB Atlas connected successfully');
    console.log(`Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection failed');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);

    if (error.reason?.servers) {
      for (const [host, server] of error.reason.servers) {
        console.error('Server:', host);
        console.error('Server error:', server.error?.message || 'Unavailable');
      }
    }

    throw error;
  }
};

module.exports = connectDB;
