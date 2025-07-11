import express from "express";

// others
import { loginUser, registerUser } from "../controllers/userController";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

export default router;
