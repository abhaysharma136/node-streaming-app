import express from 'express';
import { CreateUser, GetUserById, getUserByname, UpdateUserByEmail, UpdateUserById } from './helper.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Client } from '../index.js  ';
import { auth } from '../middleware/auth.js';
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
            confirm:false
        });
        response.send({result,message:"Email Sent to registered Email"});
    }
    
});

router.post("/login", async function(request,response){
    const {email,password}=request.body;

    const UserFromDB=await getUserByname(email);
    console.log(UserFromDB);
    if(!UserFromDB){
        response.status(400).send({message:"email does not match"});
    }else if(UserFromDB.confirm===false){
        response.status(400).send({message:"Account not Verified"})
    }else
    {
       const storedpassword=UserFromDB.password;
       const isPasswordMatch=await bcrypt.compare(password,storedpassword);
       console.log(isPasswordMatch);
       if(email==="abhaysharmajr@gmail.com"){
        if(isPasswordMatch){
            const token=jwt.sign({id:UserFromDB._id},process.env.SECRET_KEY);
            response.send({message:"Succesfull Admin Login",token:token,id:UserFromDB._id});
           }
           else{
            response.status(401).send({message:"Invalid Credentials"});
           }
       }
       else{
        if(isPasswordMatch){
            const token=jwt.sign({id:UserFromDB._id},process.env.SECRET_KEY);
            response.send({message:"Succesfull Login",token:token,id:UserFromDB._id});
           }
           else{
            response.status(401).send({message:"Invalid Credentials"});
           }
       }
       
    }
    
});
//Forgot Password
router.post("/forgotPassword", async function(request,response){
    const {email}=request.body;

    const UserFromDB=await getUserByname(email);
    console.log(UserFromDB);
    if(!UserFromDB){
        response.status(400).send({message:"email not found "});
    }else if(UserFromDB.confirm===false){
        response.status(400).send({message:"email is not verified. Please try to verrify first! "});
    }
    else
    {
        response.status(401).send({message:"email Sent"});  
    }
    
});

//Check if provided email Exists, allready verified or notverified
router.post("/verfyaccountstatus", async function(request,response){
    const {email}=request.body;

    const UserFromDB=await getUserByname(email);
    console.log(UserFromDB);
    if(!UserFromDB){
        response.status(400).send({message:"email not found!!. Please register first "});
    }else if(UserFromDB.confirm===true){
        response.status(400).send({message:"email is allready verified. Please Login! "});
    }
    else{
        response.status(401).send({message:"email Sent"});  
    }
    
});

//Update user data from Email 
router.put("/ConfirmAccount/:email", async function(request,response){
    const {email}=request.params;

    console.log(request.params,email);
    const data=request.body;
    //db.collection.UpdateOne({id:id},{$set:data})
    const result=await UpdateUserByEmail(email, data);
    
    console.log(result);

    response.send(result);
    
});


//Update user password from Email 
router.put("/updatepassword/:email", async function(request,response){
    const {email}=request.params;

    console.log(request.params,email);
    const {password}=request.body;
    //db.collection.UpdateOne({id:id},{$set:data})
    const hashedPassword=await genHashedpassword(password);
    const result=await UpdateUserByEmail(email, {
        password:hashedPassword
    });
    
    console.log(result);

    response.send(result);
    
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

//GET USER COUNT
router.get("/Count/All",auth,async function(request,response){
    //Get movie with name,rating
    
    console.log(request.query)
    const users=await Client.db("Onstream-db")
    .collection("users").count(request.query,function(err,result){
        if(err){
            response.send(err)
        }
        else{
            response.json(result)
        }
    });
    
    // response.status(404).sendStatus(movies);
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

//sent Registration email
router.post("/newuser", async function(request,response){
    const {email}=request.body;

    const UserFromDB=await getUserByname(email);
    console.log(UserFromDB);
    if(UserFromDB){
        response.status(400).send({message:"email allready exists"});
    }else{
        response.send({message:"Email Sent to registered Email"});
    }
});

export const usersRouter=router;


