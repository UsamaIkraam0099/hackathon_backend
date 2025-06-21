import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT;
export const environment = process.env.NODE_ENV;
export const jwt_secret: string | any = process.env.JWT_SECRET;

export const db = {
  name: process.env.DB_NAME || "",
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT || "",
  user: process.env.DB_USER || "",
  mongo_uri: process.env.MONGO_URI || "",
  password: process.env.DB_USER_PWD || "",
};
