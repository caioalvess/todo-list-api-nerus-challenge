import { Router } from "express";
import {
  getTodosController,
  getTodoByIdController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} from "../controllers/TodoController";

const router = Router();

router.get("/todos", getTodosController);

router.get("/todos/:id", getTodoByIdController);

router.post("/todos", createTodoController);

router.put("/todos/:id", updateTodoController);

router.delete("/todos/:id", deleteTodoController);

export { router as todoRoutes };
