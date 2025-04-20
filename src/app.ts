import express from "express";
import { todoRoutes } from "./routes/TodoRoutes";
import { errorHandler } from "./middlewares/ErrorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import cors from "cors";

export const app = express();

app.use(cors());

app.use(express.json());

app.use(express.json());

app.use("/api", todoRoutes);

app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
