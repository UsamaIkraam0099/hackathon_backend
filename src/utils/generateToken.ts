import jwt from "jsonwebtoken";

// others
import { jwt_secret } from "../config/index";

// generate token
const generateToken = (id: string | object) => {
  return jwt.sign({ id }, jwt_secret, {
    expiresIn: "30d",
  });
};

export default generateToken;
