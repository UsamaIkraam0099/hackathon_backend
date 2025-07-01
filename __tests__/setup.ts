import mongoose from "mongoose";

// others
import { db } from "../src/config";

const setup = () => {
  beforeEach(async () => {
    mongoose
      .connect(db.mongo_uri)
      .then(() => console.log("MongoDB Connected!"))
      .catch((error) => console.log(`MongoDB Error: ${error}`));
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
};

export { setup };
