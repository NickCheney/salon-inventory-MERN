import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

dotenv.config({path: '../.env'});

const DB_URI = process.env.DB_CONN_STRING || "";
const DB_NAME = process.env.DB_NAME || "";
const PROD_CLTN_NAME = process.env.PRODUCTS_COLLECTION_NAME || "";

const client = new mongoDB.MongoClient(DB_URI);

async function run() {
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        await db.createCollection(
            PROD_CLTN_NAME, 
            {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        title: "Product Object Validation",
                        required: ["brand","name","price", "inStock"],
                        properties: {
                            brand: {
                                bsonType: "string",
                                description: "'brand' must be a string and is required"
                            },
                            name: {
                                bsonType: "string",
                                description: "'name' must be a string and is required"
                            },
                            price: {
                                bsonType: "double",
                                description: "'price' must be a double and is required"
                            },
                            inStock: {
                                bsonType: "int",
                                description: "'inStock' must be an integer and is required"
                            },
                            size: {
                                bsonType: "string",
                                description: "'size' must be a string if the field exists"
                            },
                            description: {
                                bsonType: "string",
                                description: "'description' must be a string if the field exists"
                            },
                            imageURL: {
                                bsonType: "string",
                                description: "'imageURL' must be a string if the field exists"
                            }
                        }
                    }
                }
            } 
        );
        // Create compound unique index to avoid duplication on (brand, name) pairs
        await db.collection(PROD_CLTN_NAME).createIndex(["brand", "name"], {unique: true});

    } finally {
        // Ensures the client closes
        await client.close();
    }
}
run().catch(err=>console.error(err));