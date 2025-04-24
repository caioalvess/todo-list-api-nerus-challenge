import * as todoRepo from "../repositories/TodoRepository";

export const getTodos = async (
  userId: number,
  page: number,
  limit: number,
  filters: { [key: string]: string | number | boolean }
) => {
  const offset = (page - 1) * limit;

  const todos = await todoRepo.getTodosFromDb(userId, filters, limit, offset);
  const total = await todoRepo.countTodos(userId, filters);
  const totalCompleted = await todoRepo.countTodos(userId, {
    ...filters,
    completed: true,
  });
  const totalPending = await todoRepo.countTodos(userId, {
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

export const getTodoById = async (userId: number, id: number) => {
  const todo = await todoRepo.getTodoByIdFromDb(userId, id);
  if (!todo) {
    const error = new Error("Task not found in the database.");
    error.name = "NotFoundError";
    throw error;
  }
  return todo;
};

export const createTodo = async (
  userId: number,
  data: { title: string; description: string; completed?: boolean }
) => {
  return todoRepo.createTodoInDb(userId, data);
};

export const updateTodo = async (
  userId: number,
  id: number,
  data: { title: string; description: string; completed?: boolean }
) => {
  const updatedTodo = await todoRepo.updateTodoInDb(userId, id, data);
  if (!updatedTodo) {
    const error = new Error("Task not found in the database.");
    error.name = "NotFoundError";
    throw error;
  }
  return updatedTodo;
};

export const deleteTodo = async (userId: number, id: number) => {
  const deleted = await todoRepo.deleteTodoFromDb(userId, id);
  if (!deleted) {
    const error = new Error("Task not found in the database.");
    error.name = "NotFoundError";
    throw error;
  }
  return deleted;
};
