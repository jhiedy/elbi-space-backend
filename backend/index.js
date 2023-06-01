import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cloudinary from 'cloudinary';
// import cors from 'cors';

// import UserSchema from "./models/user.js";
import "./controller.js";
import setUpRoutes from "./routes.js";
// import { dbConfig } from "./config/db.config.js";

// connect to Mongo DB
// mongoose.connect(`
//   mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,  
//   { useNewUrlParser:true, useUnifiedTopology:true },
//   (err) => {
//     if(err) { console.log(err) }
//     else{ console.log("Successfully connected to DBTeam!" ) }
//   }
// );

// Configuration 
cloudinary.config({
  cloud_name: "dallscgfp",
  api_key: "166751186939533",
  api_secret: "meKTGcLeSjyv9V1B0-gqGcHfNmI"
});


try {
  mongoose.connect("mongodb+srv://128team:3x_3d_3xWjdcVhp@128-stals.nl5qcfg.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }, () => {
    console.log("MongoDB database connection established successfully");
  });
} catch (error) {
  throw error;
}

const port = process.env.PORT || 3001;

// initialize the server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

// allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://elbi-space.onrender.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, Accept, Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// setup routes
setUpRoutes(app);

// start server
app.listen(port, (err) => {
  if (err) { console.log(err); }
  else { console.log(`Server listening at port ${port}`); }
});