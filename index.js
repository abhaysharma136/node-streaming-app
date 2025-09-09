import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";
import cors from "cors";
import { usersRouter } from "./routes/users.js";
import { emailRouter } from "./routes/sentmail.js";
import { moviesBannerRouter } from "./routes/movieBanner.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const Mongo_URL = process.env.Mongo_URL;
const PORT = process.env.PORT || 9000;

async function createConnection() {
  const Client = new MongoClient(Mongo_URL);
  await Client.connect();
  console.log("Mongo is Connected🎊🎊🎊🎊");
  return Client;
}

// Initialize the app
async function initializeApp() {
  try {
    const client = await createConnection();

    // Store client in app locals for use in routes
    app.locals.mongoClient = client;

    //Welcome Response
    app.get("/", function (request, response) {
      response.send("Welcome to Onstream");
    });

    app.use("/movies", moviesRouter);
    app.use("/users", usersRouter);
    app.use("/email", emailRouter);
    app.use("/banners", moviesBannerRouter);

    // Only listen locally, not in Vercel environment
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => console.log(`App started in ${PORT}`));
    }

    return app;
  } catch (error) {
    console.error("Failed to initialize app:", error);
    throw error;
  }
}

// Initialize the app
const expressApp = initializeApp();

// Export for Vercel serverless
export default async function handler(req, res) {
  try {
    const app = await expressApp;
    return app(req, res);
  } catch (error) {
    console.error("Error in serverless function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
