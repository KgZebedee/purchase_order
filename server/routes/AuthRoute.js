import express from "express";
import { registerAdmin, loginUser, createUser, deleteUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const Authroute = express.Router();

// Register Admin (Only One Allowed) - Open to anyone initially
Authroute.post("/register-admin", registerAdmin);

// Login - Open to all users
Authroute.post("/login", loginUser);

// Protected routes (Require authentication)
Authroute.post("/create-user", authMiddleware, createUser);
Authroute.delete("/delete-user/:id", authMiddleware, deleteUser);

export default Authroute;
  