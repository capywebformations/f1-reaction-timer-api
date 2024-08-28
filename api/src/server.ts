import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
