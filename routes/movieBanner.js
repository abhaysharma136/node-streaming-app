import express from 'express';
import { auth } from '../middleware/auth.js';
import { CreateBanners, GetAllBanners, GetBannerById, UpdateBannerById } from './helper.js';
const router=express.Router();


//GET all Banners
router.get("/",auth,async function(request,response){
    //Get movie with name,rating
    const movies=await GetAllBanners(request);
    // console.log(movies);
    response.send(movies);
});

//POST all Banners
router.post("/", async function(request,response){
    const data=request.body;
    console.log(data);
    //db.movies.insertMany(data)
    const result=await CreateBanners(data);
    // const movie=movies.find((mv)=>mv.id===id);

    response.send(result);
});

//Get MovieBanner By Id
router.get("/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id);
    //db.collection.find({id:id})
    const movie=await GetBannerById(id);
    // const movie=movies.find((mv)=>mv.id===id);
    console.log(movie);
    movie?response.send(movie):response.status(404).send({message:"Movie not Found"});
});

//UPDATE movieBanner by id
router.put("/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id);
    const data=request.body;
    //db.collection.UpdateOne({id:id},{$set:data})
    const result=await UpdateBannerById(id, data);
    
    console.log(result);

    response.send(result);
});

export const moviesBannerRouter=router;


