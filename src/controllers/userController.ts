import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// others
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // check if any field is missing
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Fields are missing!");
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({ name, email, password: hashPassword });

  if (user)
    res.status(201).json({
      token: generateToken(user._id),
      message: "User successfully registered!",
      userDetails: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      token: generateToken(user._id),
      userDetails: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }
});

export { loginUser, registerUser };
