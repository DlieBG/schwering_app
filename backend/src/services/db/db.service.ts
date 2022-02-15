import { Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';

@Injectable()
export class DbService {

    async getCollection(collectionName: string): Promise<Collection> {
        let client = new MongoClient(process.env.MONGO_URI, { ssl: true });
        await client.connect();
        return client.db(process.env.MONGO_DB_NAME).collection(collectionName);
    }

}
