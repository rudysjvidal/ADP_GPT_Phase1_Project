const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { MongoClient } = require('mongodb');
const fs = require('fs');

async function importCustomers() {
  const uri = process.env.MONGO_DB_URL;
  const dbName = process.env.MONGO_DB;
  const collectionName = process.env.MONGO_DB_COLLECTION;

  if (!uri || !dbName || !collectionName) {
    throw new Error('Missing MongoDB environment variables. Check your .env file for MONGO_DB_URL, MONGO_DB, and MONGO_DB_COLLECTION.');
  }

  const dataPath = path.join(__dirname, 'data.json');
  let customersRaw = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  let customers = Array.isArray(customersRaw) ? customersRaw : customersRaw.customers;

  if (!Array.isArray(customers)) {
    throw new Error('Parsed customers data is not an array. Check the structure of your data.json file.');
  }

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Remove all existing documents
    await collection.deleteMany({});
    // Insert new documents
    await collection.insertMany(customers);

    console.log('Customers imported successfully!');
  } catch (err) {
    console.error('Error importing customers:', err);
  } finally {
    await client.close();
  }
}

importCustomers();