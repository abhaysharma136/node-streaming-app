// import express from "express";
// import { auth } from "../middleware/auth.js";
// import {
//   CreateTask,
//   CreateTasks,
//   DeleteTaskById,
//   GetAllTasks,
//   GetTaskById,
//   UpdateTaskById,
// } from "./helper.js";

// // import { Client } from "../index.js  ";
// const router = express.Router();

// router.post("/", async function (request, response) {
//   const data = request.body;
//   // console.log(data);
//   //db.movies.insertMany(data)
//   const result = await CreateTasks(data);
//   // const movie=movies.find((mv)=>mv.id===id);

//   response.send(result);
// });
// //Create Single Task
// router.post("/add", async function (request, response) {
//   const data = request.body;
//   // console.log(data);
//   //db.movies.insertMany(data)
//   const result = await CreateTask(data);
//   // const movie=movies.find((mv)=>mv.id===id);

//   response.send(result);
// });

// //Update Task By ID
// router.put("/:id", async function (request, response) {
//   const { id } = request.params;
//   console.log(request.params, id);
//   const data = request.body;
//   //db.collection.UpdateOne({id:id},{$set:data})
//   const result = await UpdateTaskById(id, data);

//   console.log(result);

//   response.send(result);
// });

// //GET All Tasks by ID
// // router.get("/:id", async function (request, response) {
// //   const { id } = request.params;
// //   console.log(request.params, id);
// //   //db.collection.find({id:id})
// //   const user = await GetTasksById(id);
// //   // const movie=movies.find((mv)=>mv.id===id);
// //   console.log(user);

// //   user
// //     ? response.send(user)
// //     : response.status(404).send({ message: "User not Found" });
// // });

// //GET Task by ID
// router.get("/:id", async function (request, response) {
//   const { id } = request.params;
//   // console.log(request.params, id);
//   //db.collection.find({id:id})
//   const movie = await GetTaskById(id);
//   // const movie=movies.find((mv)=>mv.id===id);

//   movie
//     ? response.send(movie)
//     : response.status(404).send({ message: "Movie not Found" });
// });

// //GET all Tasks
// // router.get("/", async function (request, response) {
// //   //Get movie with name,rating
// //   // console.log(request.query);
// //   const movies = await GetAllTasks(request);
// //   // console.log(movies);
// //   response.send(movies);
// // });

// //DELETE Task with id
// router.delete("/:id", async function (request, response) {
//   const { id } = request.params;
//   console.log(request.params, id);
//   //db.collection.find({id:id})
//   const result = await DeleteTaskById(id);
//   // const movie=movies.find((mv)=>mv.id===id);
//   console.log(result);

//   result.deletedCount > 0
//     ? response.send({ msg: "Task Succesfully Deleted" })
//     : response.status(404).send({ msg: "Task not Found" });
// });

// export const todoItemRouter = router;
