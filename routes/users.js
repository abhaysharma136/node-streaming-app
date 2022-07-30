import express from 'express';
import { CreateUser } from './helper.js';
const router=express.Router();




//Create User 
router.post("/signup", async function(request,response){
    const data=request.body;
    console.log(data);
    //db.movies.insertOne(data)
    const result=await CreateUser(data);
    // const movie=movies.find((mv)=>mv.id===id);

    response.send(result);
});



export const usersRouter=router;


