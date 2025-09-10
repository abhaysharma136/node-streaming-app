import express from "express";
import { auth } from "../middleware/auth.js";
import {
  CreateBanner,
  CreateBanners,
  DeleteBannerById,
  GetAllBanners,
  GetBannerById,
  UpdateBannerById,
} from "./helper.js";
const router = express.Router();
const getClient = (request) => {
  return request.app.locals.mongoClient;
};
//GET all Banners
router.get("/", auth, async function (request, response) {
  const Client = getClient(request);
  //Get movie with name,rating
  const movies = await GetAllBanners(request, Client);
  // console.log(movies);
  response.send(movies);
});

//POST all Banners
router.post("/", async function (request, response) {
  const Client = getClient(request);
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data)
  const result = await CreateBanners(data, Client);
  // const movie=movies.find((mv)=>mv.id===id);

  response.send(result);
});

//DELETE Banner with id
router.delete("/:id", async function (request, response) {
  const Client = getClient(request);
  const { id } = request.params;
  console.log(request.params, id);
  //db.collection.find({id:id})
  const result = await DeleteBannerById(id, Client);
  // const movie=movies.find((mv)=>mv.id===id);
  console.log(result);

  result.deletedCount > 0
    ? response.send({ msg: "Banner Succesfully Deleted" })
    : response.status(404).send({ msg: "Movie not Found" });
});

//Create Banner
router.post("/add", async function (request, response) {
  const Client = getClient(request);
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data)
  const result = await CreateBanner(data, Client);
  // const movie=movies.find((mv)=>mv.id===id);

  response.send(result);
});

//Get MovieBanner By Id
router.get("/:id", async function (request, response) {
  const Client = getClient(request);
  const { id } = request.params;
  console.log(request.params, id);
  //db.collection.find({id:id})
  const movie = await GetBannerById(id, Client);
  // const movie=movies.find((mv)=>mv.id===id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "Movie not Found" });
});

//UPDATE movieBanner by id
router.put("/:id", async function (request, response) {
  const Client = getClient(request);
  const { id } = request.params;
  console.log(request.params, id);
  const data = request.body;
  //db.collection.UpdateOne({id:id},{$set:data})
  const result = await UpdateBannerById(id, data, Client);

  console.log(result);

  response.send(result);
});

export const moviesBannerRouter = router;
