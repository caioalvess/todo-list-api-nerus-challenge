import * as todoRepo from "../repositories/TodoRepository";
import { CreateTodoInput, UpdateTodoInput } from "../types/TodoTypes";

export const getTodos = () => {
  return todoRepo.getTodosFromDb();
};

export const getTodoById = async (id: number) => {
  const todo = await todoRepo.getTodoByIdFromDb(id);
  if (!todo) {
    const error = new Error("Task not found in the database.");
    error.name = "NotFoundError";
    throw error;
  }
  return todo;
};

export const createTodo = (data: CreateTodoInput) => {
  return todoRepo.createTodoInDb({
    ...data,
    description: data.description || "",
  });
};

export const updateTodo = (id: number, data: UpdateTodoInput) => {
  return todoRepo.updateTodoInDb(id, {
    ...data,
    title: data.title || "",
    description: data.description || "",
  });
};

export const deleteTodo = (id: number) => {
  return todoRepo.deleteTodoFromDb(id);
};
