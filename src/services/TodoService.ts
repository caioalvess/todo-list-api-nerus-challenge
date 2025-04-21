import * as todoRepo from "../repositories/TodoRepository";
import { CreateTodoInput, UpdateTodoInput } from "../types/TodoTypes";

export const getTodos = async (
  page: number,
  limit: number,
  filters: { [key: string]: string | number | boolean }
) => {
  const offset = (page - 1) * limit;

  const todos = await todoRepo.getTodosFromDb(filters, limit, offset);

  const total = await todoRepo.countTodos(filters);
  const totalCompleted = await todoRepo.countTodos({
    ...filters,
    completed: true,
  });
  const totalPending = await todoRepo.countTodos({
    ...filters,
    completed: false,
  });

  const totalPages = Math.ceil(total / limit);

  return {
    data: todos,
    totalCompleted,
    totalPending,
    total,
    page,
    limit,
    totalPages,
  };
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
    completed: data.completed || false,
  });
};

export const deleteTodo = (id: number) => {
  return todoRepo.deleteTodoFromDb(id);
};
