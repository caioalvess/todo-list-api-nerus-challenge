import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodosFromDb = async () => {
  return await prisma.todo.findMany();
};

export const getTodoByIdFromDb = async (id: number) => {
  return await prisma.todo.findUnique({ where: { id } });
};

export const createTodoInDb = async (data: {
  title: string;
  description: string;
  completed?: boolean;
}) => {
  return await prisma.todo.create({ data });
};

export const updateTodoInDb = async (
  id: number,
  data: { title: string; description: string; completed?: boolean }
) => {
  return await prisma.todo.update({
    where: { id },
    data,
  });
};

export const deleteTodoFromDb = async (id: number) => {
  return await prisma.todo.delete({ where: { id } });
};
