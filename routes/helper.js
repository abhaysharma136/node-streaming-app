import { ObjectId } from "mongodb";

export async function UpdateMovieById(id, data, Client) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}

export async function UpdateBannerById(id, data, Client) {
  return await Client.db("Onstream-db")
    .collection("banners")
    .updateOne({ _id: id }, { $set: data });
}

export async function CreateMovies(data, Client) {
  return await Client.db("Onstream-db").collection("movies").insertMany(data);
}

export async function CreateBanners(data, Client) {
  return await Client.db("Onstream-db").collection("banners").insertMany(data);
}

export async function CreateMovie(data, Client) {
  return await Client.db("Onstream-db").collection("movies").insertOne(data);
}

export async function CreateBanner(data, Client) {
  return await Client.db("Onstream-db").collection("banners").insertOne(data);
}

export async function GetMovieById(id, Client) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}

export async function DeleteMovieById(id, Client) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}

export async function DeleteBannerById(id, Client) {
  return await Client.db("Onstream-db")
    .collection("banners")
    .deleteOne({ _id: id });
}

export async function DeleteuserById(id, Client) {
  return await Client.db("Onstream-db")
    .collection("users")
    .deleteOne({ _id: ObjectId(id) });
}

export async function GetAllMovies(request, Client) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .find(request.query)
    .toArray();
}

//GET Movies with Limit
export async function GetAllAdminMovies(request, pagenumber, Client) {
  const pageSize = 10;
  const skip = (pagenumber - 1) * pageSize;

  // Get total count of documents matching the query
  const totalCount = await Client.db("Onstream-db")
    .collection("movies")
    .countDocuments(request.query);

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  // Get paginated movies
  const movies = await Client.db("Onstream-db")
    .collection("movies")
    .find(request.query)
    .limit(pageSize)
    .skip(skip)
    .toArray();

  return {
    movies: movies,
    totalPages: totalPages,
    currentPage: parseInt(pagenumber),
    totalCount: totalCount,
  };
}
//Get Movies By Name
export async function GetMoviesByName(name, Client) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .find({ name: { $regex: ".*" + name + ".*", $options: "i" } })
    .toArray();
}

export async function GetAllBanners(request, Client) {
  return await Client.db("Onstream-db")
    .collection("banners")
    .find({})
    .toArray();
}

export async function GetLastMovies(request, Client) {
  return await Client.db("Onstream-db")
    .collection("movies")
    .find(request.query)
    .sort({ $natural: -1 })
    .limit(10)
    .toArray();
  // db.yourcollectionname.find({$query: {}, $orderby: {$natural : -1}}).limit(yournumber)
}

export async function GetAllUsers(request, Client) {
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
export async function CreateUser(data, Client) {
  return await Client.db("Onstream-db").collection("users").insertOne(data);
}

export async function getUserByname(email, Client) {
  return await Client.db("Onstream-db")
    .collection("users")
    .findOne({ email: email });
}

export async function GetUserById(id, Client) {
  return await Client.db("Onstream-db")
    .collection("users")
    .findOne({ _id: ObjectId(id) });
}

export async function UpdateUserById(id, data, Client) {
  return await Client.db("Onstream-db")
    .collection("users")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}

export async function UpdateUserByEmail(email, data, Client) {
  return await Client.db("Onstream-db")
    .collection("users")
    .updateOne({ email: email }, { $set: data });
}
//get banners by Id
export async function GetBannerById(id, Client) {
  return await Client.db("Onstream-db")
    .collection("banners")
    .findOne({ _id: id });
}
