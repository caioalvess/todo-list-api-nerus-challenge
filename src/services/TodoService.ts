import * as todoRepo from "../repositories/TodoRepository";
import { CreateTodoInput, UpdateTodoInput } from "../types/TodoTypes";

export const getTodos = () => {
  return todoRepo.getTodosFromDb();
};

export const getTodoById = (id: number) => {
  return todoRepo.getTodoByIdFromDb(id);
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
