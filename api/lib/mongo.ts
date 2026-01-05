import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const options: MongoClientOptions = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 0,
  // MongoDB Atlas requires TLS
  tls: true,
  tlsAllowInvalidCertificates: false,
};

let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function getMongoClient(): Promise<MongoClient> {
  try {
    return await clientPromise;
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
}
