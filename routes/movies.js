import express from "express";
import { auth } from "../middleware/auth.js";
import {
  GetAllMovies,
  DeleteMovieById,
  GetMovieById,
  CreateMovies,
  UpdateMovieById,
  CreateMovie,
  GetLastMovies,
  GetMoviesByName,
  GetAllAdminMovies,
} from "./helper.js";

const router = express.Router();
// Helper function to get client from request
const getClient = (request) => {
  return request.app.locals.mongoClient;
};

//GET all Movies
router.get("/", async function (request, response) {
  const Client = getClient(request);
  //Get movie with name,rating
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log(request.query);
  const movies = await GetAllMovies(request, Client);
  // console.log(movies);
  response.send(movies);
});

//Search Movies Functionality
router.get("/search/", auth, async function (request, response) {
  const Client = getClient(request);
  const { name } = request.query;
  console.log(name);
  const movies = await GetMoviesByName(name, Client);
  console.log(movies);
  response.send(movies);
});

//GET LAST 10 Movies
router.get("/last/10", async function (request, response) {
  const Client = getClient(request);
  //Get movie with name,rating
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log(request.query);
  const movies = await GetLastMovies(request, Client);
  // console.log(movies);
  response.send(movies);
});

//GET ALL Movies Pagination
router.get("/page/movie/:pagenumber", async function (request, response) {
  const Client = getClient(request);
  const { pagenumber } = request.params;
  console.log(pagenumber);
  //Get movie with name,rating
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log("requestQuery", request.query);
  const movies = await GetAllAdminMovies(request, pagenumber, Client);
  // console.log(movies);
  response.send(movies);
});

//GET all Movies Count
router.get("/Count/All", async function (request, response) {
  const Client = getClient(request);
  //Get movie with name,rating
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log(request.query);
  const movies = await Client.db("Onstream-db")
    .collection("movies")
    .count(request.query, function (err, result) {
      if (err) {
        response.send(err);
      } else {
        response.json(result);
      }
    });

  // response.status(404).sendStatus(movies);
});

//DELETE Movie with id
router.delete("/:id", async function (request, response) {
  const Client = getClient(request);
  const { id } = request.params;
  console.log(request.params, id);
  //db.collection.find({id:id})
  const result = await DeleteMovieById(id, Client);
  // const movie=movies.find((mv)=>mv.id===id);
  console.log(result);

  result.deletedCount > 0
    ? response.send({ msg: "Movie Succesfully Deleted" })
    : response.status(404).send({ msg: "Movie not Found" });
});

//Get Movie By Id
router.get("/:id", async function (request, response) {
  const Client = getClient(request);
  const { id } = request.params;
  console.log(request.params, id);
  //db.collection.find({id:id})
  const movie = await GetMovieById(id, Client);
  // const movie=movies.find((mv)=>mv.id===id);
  console.log(movie);

  movie
    ? response.send(movie)
    : response.status(404).send({ message: "Movie not Found" });
});

//Create Movies
router.post("/", async function (request, response) {
  const Client = getClient(request);
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data)
  const result = await CreateMovies(data, Client);
  // const movie=movies.find((mv)=>mv.id===id);

  response.send(result);
});

//Create Movie
router.post("/add", async function (request, response) {
  const Client = getClient(request);
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data)
  const result = await CreateMovie(data, Client);
  // const movie=movies.find((mv)=>mv.id===id);

  response.send(result);
});

//Update Movie By ID
router.put("/:id", async function (request, response) {
  const Client = getClient(request);
  const { id } = request.params;
  console.log(request.params, id);
  const data = request.body;
  //db.collection.UpdateOne({id:id},{$set:data})
  const result = await UpdateMovieById(id, data, Client);

  console.log(result);

  response.send(result);
});

export const moviesRouter = router;
