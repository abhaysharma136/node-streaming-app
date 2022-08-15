import express from 'express';
import { CreateUser, GetUserById, getUserByname, UpdateUserById } from './helper.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router=express.Router();


async function genHashedpassword(password){
    const NO_OF_ROUND=10;
    const salt=await bcrypt.genSalt(NO_OF_ROUND);
    const hashedPassord=await bcrypt.hash(password,salt);
    console.log(salt,hashedPassord);
    return hashedPassord;
}

//Create User 
router.post("/signup", async function(request,response){
    const {email,password,FirstName,LastName}=request.body;

    const UserFromDB=await getUserByname(email);
    console.log(UserFromDB);
    if(UserFromDB){
        response.status(400).send({message:"email allready exists"});
    }else if(password.length<8){
        response.send({message:"password must be atleast 8 characters"});
    }else{const hashedPassword=await genHashedpassword(password);
        console.log(hashedPassword);
        //db.movies.insertOne(data)
        const result=await CreateUser({
            email:email,
            password:hashedPassword,
            FirstName:FirstName,
            LastName:LastName,
        });

    
        response.send(result);
    }
    
});

router.post("/login", async function(request,response){
    const {email,password}=request.body;

    const UserFromDB=await getUserByname(email);
    console.log(UserFromDB);
    if(!UserFromDB){
        response.status(400).send({message:"email does not match"});
    }else
    {
       const storedpassword=UserFromDB.password;
       const isPasswordMatch=await bcrypt.compare(password,storedpassword);
       console.log(isPasswordMatch);
       if(isPasswordMatch){
        // const token=jwt.sign({id:UserFromDB._id},process.env.SECRET_KEY);
        response.send({message:"Succesfull Login"});
       }
       else{
        response.status(401).send({message:"Invalid Credentials"});
       }
    }
    
});

router.post("/forgotPassword", async function(request,response){
    const {email}=request.body;

    const UserFromDB=await getUserByname(email);
    console.log(UserFromDB);
    if(!UserFromDB){
        response.status(400).send({message:"email not found "});
    }else
    {
       
        response.status(401).send({message:"email Sent"});
       
    }
    
});
//Get User Data from Id
router.get("/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id);
    //db.collection.find({id:id})
    const user=await GetUserById(id);
    // const movie=movies.find((mv)=>mv.id===id);
    console.log(user);

    user?response.send(user):response.status(404).send({message:"User not Found"});
});

//Update User profile By ID
router.put("/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id);
    const data=request.body;
    //db.collection.UpdateOne({id:id},{$set:data})
    const result=await UpdateUserById(id, data);
    
    console.log(result);

    response.send(result);
});

export const usersRouter=router;


