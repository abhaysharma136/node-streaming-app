import express from "express";

const router = express.Router();

router.get("/:email", auth, async function (request, response) {
  //Get Todo Array
  const movies = await GetAllMovies(request);
  // console.log(movies);
  response.send(movies);
});

export const todoRouter = router;
