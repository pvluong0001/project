import mongoose from 'mongoose';

export function connectDb() {
  /** connect db */
  return mongoose.connect(`${process.env.MONGO_DB_URL}/project`)
}