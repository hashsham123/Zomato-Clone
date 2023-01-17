import express from "express";
import dotenv from "dotenv";
import passport from "passport";

// Database connection
import ConnectDB from "./database/connection";
import Auth from "./api/auth";
import Food from "./api/food";
import Restaurant from "./api/restaurant";
import User from "./api/user";
import Menu from "./api/menu";
import Order from "./api/order";
import Review from "./api/review";


dotenv.config();

const zomato = express();


zomato.use(express.json());

zomato.get("/", (req, res) => {
  res.json({
    message: "Server is running..",
  });
});

// /auth/signup
zomato.use("/auth", Auth);
zomato.use("/food", Food);
zomato.use("/res", Restaurant);
zomato.use("/user", User);
zomato.use("/menu", Menu);
zomato.use("/order", Order);
zomato.use("/review", Review);

const PORT = 4000;

zomato.listen(PORT, () => {
  ConnectDB()
    .then(() => {
      console.log("Server is running !!");
    })
    .catch((error) => {
      console.log("Server is running, but the database connection failed");
      console.log(error);
    });
  // console.log("Server is running !!");
});