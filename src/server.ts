import express from "express";

// others
import "./config/db";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.use(errorHandler);

export default app;
