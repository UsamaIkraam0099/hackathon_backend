import mongoose from "mongoose";

// others
import { db } from "./index";

// const MONGO_URI = `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`;

mongoose
  .connect(db.mongo_uri)
  .then(() => console.log("MongoDB Connected!"))
  .catch((error) => console.log(`MongoDB Error: ${error}`));
