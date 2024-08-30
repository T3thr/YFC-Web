// lib/mongodb.js
import mongoose from 'mongoose';

export default async function mongodbConnect() {
  try {
    mongoose.set("strictQuery", false);
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected!');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}
