import { ObjectId } from 'mongodb';
import { Client } from '../index.js  ';

export async function UpdateMovieById(id, data) {
    return await Client
        .db("Onstream-db")
        .collection("movies")
        .updateOne({ _id: ObjectId(id) }, { $set: data });
}
export async function newFunction(data) {
    return await Client
        .db("Onstream-db")
        .collection("movies")
        .insertMany(data);
}
export async function GetMovieById(id) {
    return await Client
        .db("Onstream-db")
        .collection("movies")
        .findOne({ _id: ObjectId(id) });
}
export async function DeleteMovieById(id) {
    return await Client
        .db("Onstream-db")
        .collection("movies")
        .deleteOne({ _id: ObjectId(id) });
}
export async function GetAllMovies(request) {
    return await Client
        .db("Onstream-db")
        .collection("movies")
        .find(request.query)
        .toArray();
}
