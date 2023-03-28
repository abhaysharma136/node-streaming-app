import { ObjectId } from "mongodb";
import { Client } from "../index.js  ";

export async function UpdateMovieById(id, data) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}

export async function UpdateBannerById(id, data) {
  return await Client.db("Onstream-db")
    .collection("banners")
    .updateOne({ _id: id }, { $set: data });
}

export async function CreateMovies(data) {
  return await Client.db("Onstream-db").collection("movies").insertMany(data);
}

//Query for creating todo tasks
export async function CreateTasks(data) {
  return await Client.db("Onstream-db")
    .collection("todoTasks")
    .insertMany(data);
}

export async function CreateBanners(data) {
  return await Client.db("Onstream-db").collection("banners").insertMany(data);
}

export async function CreateMovie(data) {
  return await Client.db("Onstream-db").collection("movies").insertOne(data);
}
//Query for creating single todo task
export async function CreateTask(data) {
  return await Client.db("Onstream-db").collection("todoTasks").insertOne(data);
}

export async function CreateBanner(data) {
  return await Client.db("Onstream-db").collection("banners").insertOne(data);
}

export async function GetMovieById(id) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}

export async function DeleteMovieById(id) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}

// //Delete Task By Id
// export async function DeleteTaskById(id) {
//   return await Client.db("Onstream-db")
//     .collection("todoTasks")
//     .deleteOne({ _id: ObjectId(id) });
// }
//Delete Task By Id
export async function DeleteTaskById(id) {
  return await Client.db("Onstream-db")
    .collection("todoTasks")
    .deleteOne({ _id: ObjectId(id) });
}

export async function DeleteBannerById(id) {
  return await Client.db("Onstream-db")
    .collection("banners")
    .deleteOne({ _id: id });
}

export async function DeleteuserById(id) {
  return await Client.db("Onstream-db")
    .collection("users")
    .deleteOne({ _id: ObjectId(id) });
}

export async function GetAllMovies(request) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .find(request.query)
    .toArray();
}

//GET All Tasks for user
export async function GetAllTasks(request) {
  return await Client.db("Onstream-db")
    .collection("todoTasks")
    .find(request.query)
    .toArray();
}
//GET Task By Id
export async function GetTaskById(id) {
  return await Client.db("Onstream-db")
    .collection("todoTasks")
    .findOne({ _id: ObjectId(id) });
}

//Update Task by Id
export async function UpdateTaskById(id, data) {
  return await Client.db("Onstream-db")
    .collection("todoTasks")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}

//GET Movies with Limit
export async function GetAllAdminMovies(request, pagenumber) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .find(request.query)
    .limit(10)
    .skip((pagenumber - 1) * 10)
    .toArray();
}
//Get Movies By Name
export async function GetMoviesByName(name) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .find({ name: { $regex: ".*" + name + ".*", $options: "i" } })
    .toArray();
}

export async function GetAllBanners(request) {
  return await Client.db("Onstream-db")
    .collection("banners")
    .find({})
    .toArray();
}

export async function GetLastMovies(request) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .find(request.query)
    .sort({ $natural: -1 })
    .limit(10)
    .toArray();
  // db.yourcollectionname.find({$query: {}, $orderby: {$natural : -1}}).limit(yournumber)
}

export async function GetAllUsers(request) {
  return await Client.db("Onstream-db")
    .collection("users")
    .find(request.query)
    .toArray();
}
// export async function GetAllMoviesCount(request) {
//     return await Client
//         .db("Onstream-db")
//         .collection("movies")
// }
export async function CreateUser(data) {
  return await Client.db("Onstream-db").collection("users").insertOne(data);
}

export async function getUserByname(email) {
  return await Client.db("Onstream-db")
    .collection("users")
    .findOne({ email: email });
}

export async function GetUserById(id) {
  return await Client.db("Onstream-db")
    .collection("users")
    .findOne({ _id: ObjectId(id) });
}

export async function UpdateUserById(id, data) {
  return await Client.db("Onstream-db")
    .collection("users")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}

export async function UpdateUserByEmail(email, data) {
  return await Client.db("Onstream-db")
    .collection("users")
    .updateOne({ email: email }, { $set: data });
}

export async function GetBannerById(id) {
  return await Client.db("Onstream-db")
    .collection("banners")
    .findOne({ _id: id });
}
