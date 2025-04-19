import * as todoRepo from "../repositories/TodoRepository";
import { CreateTodoInput, UpdateTodoInput } from "../types/TodoTypes";

export const getTodos = () => todoRepo.getTodosFromDb();
export const getTodoById = (id: number) => todoRepo.getTodoByIdFromDb(id);

export const createTodo = (data: CreateTodoInput) => {
  return todoRepo.createTodoInDb({
    ...data,
    description: data.description || "",
  });
};

export const updateTodo = async (id: number, data: UpdateTodoInput) => {
  const existingTodo = await todoRepo.getTodoByIdFromDb(id);
  if (!existingTodo) {
    throw new Error("Tarefa não encontrada");
  }

  return await todoRepo.updateTodoInDb(id, {
    ...data,
    title: data.title || "",
    description: data.description || "",
  });
};

export const deleteTodo = (id: number) => todoRepo.deleteTodoFromDb(id);
