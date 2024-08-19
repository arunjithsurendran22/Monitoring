import mongoose from 'mongoose';

const connectToMongo = async () => {
  const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/device-monitoring';

  try {
    await mongoose.connect(MONGO_URL); // No need to pass deprecated options
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error code
  }

  mongoose.connection.on('connected', () => {
    console.info('Connected to MongoDB!');
  });

  mongoose.connection.on('reconnected', () => {
    console.info('MongoDB reconnected!');
  });

  mongoose.connection.on('error', (error: any) => {
    console.error(`Error in MongoDB connection: ${error}`);
    mongoose.disconnect();
  });

  mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected! Reconnecting in 5 seconds...');
    setTimeout(connectToMongo, 5000);
  });
};

export default connectToMongo;
