import express from "express";
import { todoRoutes } from "./routes/TodoRoutes";

const app = express();

app.use(express.json());
app.use("/api", todoRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001 🚀");
});
