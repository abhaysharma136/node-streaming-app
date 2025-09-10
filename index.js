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
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://prismatic-syrniki-2f6692.netlify.app/", // Replace with your Netlify URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
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
    app.options("*", cors());

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
