import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { products?: mongoDB.Collection } = {};

export async function connectToDatabase () {
    dotenv.config({path:'../.env'});

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING || "");            
    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    const productsCollection: mongoDB.Collection = db.collection(
        process.env.PRODUCTS_COLLECTION_NAME || ""
    );
 
    collections.products = productsCollection;
       
    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ` +
        `${productsCollection.collectionName}`
    );
 }