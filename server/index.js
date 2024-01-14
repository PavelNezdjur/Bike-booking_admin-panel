import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { getAllBicycles, createBicycle, editBicycle, deleteBicycle, statistics } from "./controller/bicycle.js";

const app = express();
dotenv.config();

// DB Constants
const PORT = process.env.PORT || 3060;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());


// API

//get all
app.get("/bicycles", getAllBicycles);

//create
app.post("/create", createBicycle);

//edit put
app.put("/edit/:id", editBicycle);

// delete
app.delete("/delete/:id", deleteBicycle);

// statistics
app.get("/statistics", statistics)



async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@bicycleservice.yxqnwzc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );

    app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
start();
