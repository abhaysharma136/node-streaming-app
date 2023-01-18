import express from "express";
import { auth } from "../middleware/auth.js";
import { CreateTask, CreateTasks, GetAllTasks } from "./helper.js";

// import { Client } from "../index.js  ";
const router = express.Router();

router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data)
  const result = await CreateTasks(data);
  // const movie=movies.find((mv)=>mv.id===id);

  response.send(result);
});

router.post("/add", async function (request, response) {
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data)
  const result = await CreateTask(data);
  // const movie=movies.find((mv)=>mv.id===id);

  response.send(result);
});

//GET All Tasks by ID
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  //db.collection.find({id:id})
  const user = await GetTasksById(id);
  // const movie=movies.find((mv)=>mv.id===id);
  console.log(user);

  user
    ? response.send(user)
    : response.status(404).send({ message: "User not Found" });
});

//GET all Tasks
router.get("/", async function (request, response) {
  //Get movie with name,rating
  console.log(request.query);
  const movies = await GetAllTasks(request);
  // console.log(movies);
  response.send(movies);
});

export const todoItemRouter = router;
