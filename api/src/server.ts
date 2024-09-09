import app from './app';
import connectDB from './config/database';

const PORT = process.env.PORT ?? 3000;

try {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error('Failed to launch server', error);
}