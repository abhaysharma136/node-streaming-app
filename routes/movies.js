import express from 'express';
import {Client} from '../index.js  ';
const router=express.Router();


//GET all Movies
router.get("/",async function(request,response){
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
router.delete(":id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id);
    //db.collection.find({id:id})
    const result=await Client.db("Onstream-db").collection("movies").deleteOne({id:id});
    // const movie=movies.find((mv)=>mv.id===id);
    console.log(result);

    result.deletedCount>0?response.send({"msg":"Movie Succesfully Deleted"}):response.status(404).send({"msg":"Movie not Found"});
});

//Get Movie By Id
router.get("/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id);
    //db.collection.find({id:id})
    const movie=await Client.db("Onstream-db").collection("movies").findOne({id:id});
    // const movie=movies.find((mv)=>mv.id===id);
    console.log(movie);

    movie?response.send(movie):response.status(404).send({message:"Movie not Found"});
});

//Create Movies 
router.post("", async function(request,response){
    const data=request.body;
    console.log(data);
    //db.movies.insertMany(data)
    const result=await Client.db("Onstream-db").collection("movies").insertMany(data);
    // const movie=movies.find((mv)=>mv.id===id);

    response.send(result);
});

//Update Movie By ID
router.put("/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id);
    const data=request.body;
    //db.collection.UpdateOne({id:id},{$set:data})
    const result=await Client.db("Onstream-db").collection("movies").updateOne({id:id},{$set:data});
    
    console.log(result);

    response.send(result);
});

export const moviesRouter=router;