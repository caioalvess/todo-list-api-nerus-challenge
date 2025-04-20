import express from "express";
import { todoRoutes } from "./routes/TodoRoutes";
import { errorHandler } from "./middlewares/ErrorHandler";

export const app = express();

app.use(express.json());
app.use("/api", todoRoutes);
app.use(errorHandler);

export default app;
