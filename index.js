import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";
import cors from "cors";
import { usersRouter } from "./routes/users.js";
import { emailRouter } from "./routes/sentmail.js";
import { moviesBannerRouter } from "./routes/movieBanner.js";
// import { todoItemRouter } from "./routes/todo.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const Mongo_URL = process.env.Mongo_URL;
const PORT = process.env.PORT;

async function createConnection() {
  const Client = new MongoClient(Mongo_URL);
  await Client.connect();
  console.log("Mongo is COnnected🎊🎊🎊🎊");
  return Client;
}
export const Client = await createConnection();

//Welcome Response
app.get("/", function (request, response) {
  response.send("Welcome to Onstream");
});

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
app.use("/email", emailRouter);
app.use("/banners", moviesBannerRouter);
// app.use("/todoItem", todoItemRouter);

app.listen(PORT, () => console.log(`App started in ${PORT}`));
