import express from "express";
import {
  CreateUser,
  DeleteuserById,
  GetAllUsers,
  GetUserById,
  getUserByname,
  UpdateUserByEmail,
  UpdateUserById,
} from "./helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";
const router = express.Router();
const getClient = (request) => {
  return request.app.locals.mongoClient;
};
async function genHashedpassword(password) {
  const NO_OF_ROUND = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUND);
  const hashedPassord = await bcrypt.hash(password, salt);
  console.log(salt, hashedPassord);
  return hashedPassord;
}

//GET ALL User
router.get("/", async function (request, response) {
  const Client = getClient(request);
  //Get movie with name,rating
  // if(request.query.rating){
  //     request.query.rating=+request.query.rating;
  // }
  console.log(request.query);
  const users = await GetAllUsers(request, Client);
  // console.log(movies);
  response.send(users);
});

//Create User
router.post("/signup", async function (request, response) {
  const Client = getClient(request);
  const { email, password, FirstName, LastName } = request.body;

  const UserFromDB = await getUserByname(email, Client);
  console.log(UserFromDB);
  if (UserFromDB) {
    response.status(400).send({ message: "email allready exists" });
  } else if (password.length < 8) {
    response.send({ message: "password must be atleast 8 characters" });
  } else {
    const hashedPassword = await genHashedpassword(password);
    console.log(hashedPassword);
    //db.movies.insertOne(data)
    const result = await CreateUser(
      {
        email: email,
        password: hashedPassword,
        FirstName: FirstName,
        LastName: LastName,
        confirm: false,
      },
      Client
    );
    response.send({ result, email, message: "Email Sent to registered Email" });
  }
});

router.post("/login", async function (request, response) {
  const Client = getClient(request);
  const { email, password } = request.body;

  const UserFromDB = await getUserByname(email, Client);
  const username = `${UserFromDB?.FirstName} ${UserFromDB?.LastName}`;
  console.log("userName:", username);
  console.log(UserFromDB);
  if (!UserFromDB) {
    response.status(400).send({ message: "email does not match" });
  } else if (UserFromDB.confirm === false) {
    response.status(400).send({ message: "Account not Verified" });
  } else {
    const storedpassword = UserFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password, storedpassword);
    console.log(isPasswordMatch);
    if (email === "abhaysharmajr@gmail.com") {
      if (isPasswordMatch) {
        const token = jwt.sign({ id: UserFromDB._id }, process.env.SECRET_KEY);
        response.send({
          message: "Succesfull Admin Login",
          token: token,
          id: UserFromDB._id,
          user_name: username,
          email: UserFromDB?.email,
        });
      } else {
        response.status(401).send({ message: "Invalid Credentials" });
      }
    } else {
      if (isPasswordMatch) {
        const token = jwt.sign({ id: UserFromDB._id }, process.env.SECRET_KEY);
        response.send({
          message: "Succesfull Login",
          token: token,
          id: UserFromDB._id,
          user_name: username,
          email: UserFromDB?.email,
        });
      } else {
        response.status(401).send({ message: "Invalid Credentials" });
      }
    }
  }
});
//Forgot Password
router.post("/forgotPassword", async function (request, response) {
  const Client = getClient(request);
  const { email } = request.body;

  const UserFromDB = await getUserByname(email, Client);
  console.log(UserFromDB);
  if (!UserFromDB) {
    response.status(401).send({ message: "email not found " });
  } else if (UserFromDB.confirm === false) {
    response.status(401).send({
      message: "email is not verified. Please try to verrify first! ",
    });
  } else {
    response.status(200).send({ email, message: "email Sent" });
  }
});

//Check if provided email Exists, allready verified or notverified
router.post("/verfyaccountstatus", async function (request, response) {
  const Client = getClient(request);
  const { email } = request.body;

  const UserFromDB = await getUserByname(email, Client);
  console.log(UserFromDB);
  if (!UserFromDB) {
    response
      .status(400)
      .send({ message: "email not found!!. Please register first " });
  } else if (UserFromDB.confirm === true) {
    response
      .status(400)
      .send({ message: "email is allready verified. Please Login! " });
  } else {
    response.status(401).send({ email, message: "email Sent" });
  }
});

//Update user data from Email
router.put("/ConfirmAccount/:email", async function (request, response) {
  const Client = getClient(request);
  const { email } = request.params;

  console.log(request.params, email);
  const data = request.body;
  //db.collection.UpdateOne({id:id},{$set:data})
  const result = await UpdateUserByEmail(email, data, Client);

  console.log(result);

  response.send(result);
});

//Update user password from Email
router.put("/updatepassword/:email", async function (request, response) {
  const Client = getClient(request);
  const { email } = request.params;

  console.log(request.params, email);
  const { password } = request.body;
  //db.collection.UpdateOne({id:id},{$set:data})
  const hashedPassword = await genHashedpassword(password);
  const result = await UpdateUserByEmail(
    email,
    {
      password: hashedPassword,
    },
    Client
  );

  console.log(result);

  response.send(result);
});

//Get User Data from Id
router.get("/:id", async function (request, response) {
  const Client = getClient(request);
  const { id } = request.params;
  console.log(request.params, id);
  //db.collection.find({id:id})
  const user = await GetUserById(id, Client);
  // const movie=movies.find((mv)=>mv.id===id);
  console.log(user);

  user
    ? response.send(user)
    : response.status(404).send({ message: "User not Found" });
});

//GET USER COUNT
router.get("/Count/All", auth, async function (request, response) {
  const Client = getClient(request);
  //Get movie with name,rating

  console.log(request.query);
  const users = await Client.db("Onstream-db")
    .collection("users")
    .count(request.query, function (err, result) {
      if (err) {
        response.send(err);
      } else {
        response.json(result);
      }
    });

  // response.status(404).sendStatus(movies);
});

//Update User profile By ID
router.put("/:id", async function (request, response) {
  const Client = getClient(request);
  const { id } = request.params;
  console.log(request.params, id);
  const data = request.body;
  //db.collection.UpdateOne({id:id},{$set:data})
  const result = await UpdateUserById(id, data, Client);

  console.log(result);

  response.send(result);
});

//sent Registration email
router.post("/newuser", async function (request, response) {
  const Client = getClient(request);
  const { email } = request.body;

  const UserFromDB = await getUserByname(email, Client);
  console.log(UserFromDB);
  if (UserFromDB) {
    response.status(400).send({ message: "email allready exists" });
  } else {
    response.send({ message: "Email Sent to registered Email" });
  }
});

//DELETE User with id
router.delete("/:id", async function (request, response) {
  const Client = getClient(request);
  const { id } = request.params;
  console.log(request.params, id);
  //db.collection.find({id:id})
  const result = await DeleteuserById(id, Client);
  // const movie=movies.find((mv)=>mv.id===id);
  console.log(result);

  result.deletedCount > 0
    ? response.send({ msg: "User Succesfully Deleted" })
    : response.status(404).send({ msg: "User not Found" });
});

// Add to your users router or create a new user-movies relationship

// Add movie to user's liked movies
router.post(
  "/user/:userId/like/:movieId",
  auth,
  async function (request, response) {
    const Client = getClient(request);
    const { userId, movieId } = request.params;

    try {
      const user = await GetUserById(userId, Client);

      if (!user) {
        return response.status(404).send({ message: "User not Found" });
      }

      // Initialize likedMovies array if it doesn't exist
      if (!user.likedMovies) {
        user.likedMovies = [];
      }

      // Check if movie is already liked
      const isAlreadyLiked = user.likedMovies.includes(movieId);

      if (isAlreadyLiked) {
        // Remove from liked movies
        user.likedMovies = user.likedMovies.filter((id) => id !== movieId);
      } else {
        // Add to liked movies
        user.likedMovies.push(movieId);
      }

      const result = await UpdateUserById(
        userId,
        {
          likedMovies: user.likedMovies,
        },
        Client
      );

      response.send({
        success: true,
        isLiked: !isAlreadyLiked,
        likedMovies: user.likedMovies,
        message: `Movie ${!isAlreadyLiked ? "liked" : "unliked"} successfully`,
      });
    } catch (error) {
      response
        .status(500)
        .send({ message: "Error updating like status", error: error.message });
    }
  }
);

// Add movie to user's watchlist
router.post(
  "/user/:userId/watchlist/:movieId",
  auth,
  async function (request, response) {
    const Client = getClient(request);
    const { userId, movieId } = request.params;

    try {
      const user = await GetUserById(userId, Client);

      if (!user) {
        return response.status(404).send({ message: "User not Found" });
      }

      if (!user.watchlistMovies) {
        user.watchlistMovies = [];
      }

      const isInWatchlist = user.watchlistMovies.includes(movieId);

      if (isInWatchlist) {
        user.watchlistMovies = user.watchlistMovies.filter(
          (id) => id !== movieId
        );
      } else {
        user.watchlistMovies.push(movieId);
      }

      const result = await UpdateUserById(
        userId,
        {
          watchlistMovies: user.watchlistMovies,
        },
        Client
      );

      response.send({
        success: true,
        inWatchlist: !isInWatchlist,
        watchlistMovies: user.watchlistMovies,
        message: `Movie ${
          !isInWatchlist ? "added to" : "removed from"
        } watchlist`,
      });
    } catch (error) {
      response
        .status(500)
        .send({ message: "Error updating watchlist", error: error.message });
    }
  }
);

// Get user's liked movies and watchlist
router.get(
  "/user/:userId/preferences",
  auth,
  async function (request, response) {
    const Client = getClient(request);
    const { userId } = request.params;

    try {
      const user = await GetUserById(userId, Client);

      if (!user) {
        return response.status(404).send({ message: "User not Found" });
      }

      response.send({
        likedMovies: user.likedMovies || [],
        watchlistMovies: user.watchlistMovies || [],
      });
    } catch (error) {
      response.status(500).send({
        message: "Error fetching user preferences",
        error: error.message,
      });
    }
  }
);

export const usersRouter = router;
