import { Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';

@Injectable()
export class DbService {

    client: MongoClient;

    constructor() {
        this.client = new MongoClient(process.env.MONGO_URI);
        this.client.connect();
    }

    async getCollection(collectionName: string): Promise<Collection> {
        let client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        return client.db(process.env.MONGO_DB_NAME).collection(collectionName);
    }

}
