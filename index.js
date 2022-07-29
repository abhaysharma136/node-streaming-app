import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

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
   const Client=await createConnection();

   //Welcome Response
app.get("/",function(request,response){
    response.send("Welcome to Onstream");
});

//GET all Movies
app.get("/movies",async function(request,response){
    //Get movie with name,rating
    if(request.query.rating){
        request.query.rating=+request.query.rating;
    }
    console.log(request.query)
    const movies=await Client.db("Onstream-db").collection("movies").find(request.query).toArray();
    // console.log(movies);
    response.send(movies);
});

//DELETE Movie with id
app.delete("/movies/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id);
    //db.collection.find({id:id})
    const result=await Client.db("Onstream-db").collection("movies").deleteOne({id:id});
    // const movie=movies.find((mv)=>mv.id===id);
    console.log(result);

    result.deletedCount>0?response.send({"msg":"Movie Succesfully Deleted"}):response.status(404).send({"msg":"Movie not Found"});
});

//Get Movie By Id
app.get("/movies/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id);
    //db.collection.find({id:id})
    const movie=await Client.db("Onstream-db").collection("movies").findOne({id:id});
    // const movie=movies.find((mv)=>mv.id===id);
    console.log(movie);

    movie?response.send(movie):response.status(404).send({message:"Movie not Found"});
});

//Create Movies 
app.post("/movies", async function(request,response){
    const data=request.body;
    console.log(data);
    //db.movies.insertMany(data)
    const result=await Client.db("Onstream-db").collection("movies").insertMany(data);
    // const movie=movies.find((mv)=>mv.id===id);

    response.send(result);
});

//Update Movie By ID
app.put("/movies/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id);
    const data=request.body;
    //db.collection.UpdateOne({id:id},{$set:data})
    const result=await Client.db("Onstream-db").collection("movies").updateOne({id:id},{$set:data});
    
    console.log(result);

    response.send(result);
});
app.listen(PORT,()=>console.log(`App started in ${PORT}`));