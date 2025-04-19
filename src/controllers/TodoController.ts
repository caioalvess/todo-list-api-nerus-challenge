import { Request, Response } from "express";
import * as todoService from "../services/TodoService";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validations/TodoValidation";

export const getTodosController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todos = await todoService.getTodos();
    res.json(todos); // Envia a resposta diretamente
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
};

export const getTodoByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  try {
    const todo = await todoService.getTodoById(id);
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const createTodoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = createTodoSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error.errors });
    return;
  }

  const { title, description } = result.data;

  try {
    const newTodo = await todoService.createTodo({ title, description });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateTodoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);

  const result = updateTodoSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error.errors });
    return;
  }

  const { title, description } = result.data;

  try {
    const updated = await todoService.updateTodo(id, { title, description });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteTodoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  try {
    await todoService.deleteTodo(id);

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
