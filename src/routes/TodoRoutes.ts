import { Router } from "express";
import {
  getTodosController,
  getTodoByIdController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} from "../controllers/TodoController";

const router = Router();

// Rota para listar todas as tarefas
router.get("/todos", getTodosController);

// Rota para obter uma tarefa específica pelo ID
router.get("/todos/:id", getTodoByIdController);

// Rota para criar uma nova tarefa
router.post("/todos", createTodoController);

// Rota para atualizar uma tarefa existente
router.put("/todos/:id", updateTodoController);

// Rota para excluir uma tarefa
router.delete("/todos/:id", deleteTodoController);

export { router as todoRoutes };
