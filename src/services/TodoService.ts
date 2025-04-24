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
  return todoRepo.updateTodoInDb(userId, id, data);
};

export const deleteTodo = async (userId: number, id: number) => {
  return todoRepo.deleteTodoFromDb(userId, id);
};
