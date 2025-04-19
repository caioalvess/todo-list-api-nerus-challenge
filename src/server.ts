import express from "express";
import { todoRoutes } from "./routes/TodoRoutes";
import { errorHandler } from "./middlewares/ErrorHandler";

const app = express();

app.use(express.json());
app.use("/api", todoRoutes);
app.use(errorHandler);

app.listen(3001, () => {
  console.log("Server running on port 3001 🚀");
});
