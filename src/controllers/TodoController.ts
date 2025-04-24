import { Request, Response, NextFunction } from "express";
import * as todoService from "../services/TodoService";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validations/TodoValidation";

export const getTodosController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id; // Obtém o userId do usuário autenticado
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const filters = Object.fromEntries(
      Object.entries(req.query).map(([key, value]) => {
        if (key === "completed") {
          return [key, value === "true"];
        }
        return [key, value];
      })
    );
    delete filters.page;
    delete filters.limit;

    const todosResponse = await todoService.getTodos(
      userId,
      page,
      limit,
      filters as { [key: string]: string | number | boolean }
    );

    res.json(todosResponse);
  } catch (error) {
    next(error);
  }
};

export const getTodoByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id; // Obtém o userId do usuário autenticado
    const id = Number(req.params.id);
    const todo = await todoService.getTodoById(userId, id);

    if (!todo) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const createTodoController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id; // Obtém o userId do usuário autenticado
    const result = createTodoSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.errors });
      return;
    }

    const { title, description, completed } = result.data;
    const newTodo = await todoService.createTodo(userId, {
      title,
      description,
      completed,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const updateTodoController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id; // Obtém o userId do usuário autenticado
    const id = Number(req.params.id);
    const result = updateTodoSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ errors: result.error.errors });
      return;
    }

    const { title, description, completed } = result.data;
    const updated = await todoService.updateTodo(userId, id, {
      title,
      description,
      completed,
    });

    if (!updated) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteTodoController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id; // Obtém o userId do usuário autenticado
    const id = Number(req.params.id);
    const deleted = await todoService.deleteTodo(userId, id);

    if (!deleted) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
