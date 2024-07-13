import mongoose  from 'mongoose';
import { MongodbURL } from './config.js';

const Connection = async () => {
    const URL = MongodbURL

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {   
        console.log('Error while connecting with the database ', error);
    }
}

export default Connection;