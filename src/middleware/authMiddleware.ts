import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

// others
import User from "../models/userModel";
import { jwt_secret } from "../config";
import { AuthenticatedRequest } from "../../types/request";

const protect = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token: string = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // get token from header
        token = req.headers.authorization.split(" ")[1];

        // verify token
        const decoded = jwt.verify(token, jwt_secret as string) as {
          id: string;
        };

        // get user from the token
        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized!");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, token is missing.");
    }
  }
);

export { protect };
