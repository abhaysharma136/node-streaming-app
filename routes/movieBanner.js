import express from 'express';
import { auth } from '../middleware/auth.js';
import { CreateBanners, GetAllBanners } from './helper.js';
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


export const moviesBannerRouter=router;


