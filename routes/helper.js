import { ObjectId } from 'mongodb';
import { Client } from '../index.js  ';

export async function UpdateMovieById(id, data) {
    return await Client
        .db("Onstream-db")
        .collection("movies")
        .updateOne({ _id: ObjectId(id) }, { $set: data });
}
export async function CreateMovies(data) {
    return await Client
        .db("Onstream-db")
        .collection("movies")
        .insertMany(data);
}
export async function CreateMovie(data) {
    return await Client
        .db("Onstream-db")
        .collection("movies")
        .insertOne(data);
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

export async function GetLastMovies(request) {
    return await Client
        .db("Onstream-db")
        .collection("movies")
        .find(request.query).sort({$natural:-1}).limit(10)
        .toArray();
        db.yourcollectionname.find({$query: {}, $orderby: {$natural : -1}}).limit(yournumber)
}

export async function GetAllUsers(request) {
    return await Client
        .db("Onstream-db")
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
    return await Client
        .db("Onstream-db")
        .collection("users")
        .insertOne(data);
}

export async function getUserByname(email) {
    return await Client
        .db("Onstream-db")
        .collection("users")
        .findOne({email:email});
}

export async function GetUserById(id) {
    return await Client
        .db("Onstream-db")
        .collection("users")
        .findOne({ _id: ObjectId(id) });
}

export async function UpdateUserById(id, data) {
    return await Client
        .db("Onstream-db")
        .collection("users")
        .updateOne({ _id: ObjectId(id) }, { $set: data });
}

export async function UpdateUserByEmail(email, data) {
    return await Client
        .db("Onstream-db")
        .collection("users")
        .updateOne({ email: email }, { $set: data });
}