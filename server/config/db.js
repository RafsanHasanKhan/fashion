const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection URI from environment variables
    const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ahlge.mongodb.net/fashion?retryWrites=true&w=majority&appName=fashion`;
    // Connect to MongoDB using Mongoose
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;