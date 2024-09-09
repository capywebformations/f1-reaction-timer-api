import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? 'mongodb://mongo:27017/f1reactiontimer');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Helper function to ensure the database is connected
export const ensureDatabaseConnection = async () => {
  if (mongoose.connection.readyState !== 1) {
    // 1 means connected
    await new Promise((resolve, reject) => {
      mongoose.connection.once('open', resolve);
      mongoose.connection.once('error', reject);
    });
  }
};

export default connectDB;
