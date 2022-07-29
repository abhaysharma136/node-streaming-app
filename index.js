import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";

dotenv.config();
const app=express();
app.use(express.json());
const Mongo_URL=process.env.Mongo_URL;
const PORT=process.env.PORT;

  async function createConnection(){
    const Client=new MongoClient(Mongo_URL);
    await Client.connect();
    console.log("Mongo is COnnected🎊🎊🎊🎊");
    return Client;
   }
   export const Client=await createConnection();

   //Welcome Response
app.get("/",function(request,response){
    response.send("Welcome to Onstream");
});

app.use("/movies",moviesRouter);
app.listen(PORT,()=>console.log(`App started in ${PORT}`));