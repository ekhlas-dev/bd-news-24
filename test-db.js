const { MongoClient } = require("mongodb");
require("dotenv").config();

async function connectDB() {
  const client = new MongoClient(
    process.env.BETTER_AUTH_MONGO_DB_URL
  );

  try {
    await client.connect();

    console.log("MongoDB Connected Successfully!");

    const db = client.db();

    const result = await db.command({ ping: 1 });

    console.log("Ping Result:", result);
  } catch (error) {
    console.log("MongoDB Connection Failed!");
    console.error(error);
  } finally {
    await client.close();
  }
}

connectDB();