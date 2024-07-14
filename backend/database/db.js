import mongoose  from 'mongoose';
import { MONGO_URL } from './config.js';

const Connection = async () => {
    const URL = MONGO_URL

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {   
        console.log('Error while connecting with the database ', error);
    }
}

export default Connection;