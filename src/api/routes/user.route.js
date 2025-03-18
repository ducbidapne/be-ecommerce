import express from "express";
import { registerUser, loginUser, logoutUser  } from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser); 

export default userRoutes;
