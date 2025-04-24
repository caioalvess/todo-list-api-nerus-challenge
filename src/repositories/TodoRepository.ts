import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodosFromDb = async (
  userId: number,
  filters: { [key: string]: string | number | boolean },
  limit: number,
  offset: number
) => {
  const where: any = { ...filters, userId };

  if (typeof filters.title === "string") {
    where.title = { contains: filters.title, mode: "insensitive" };
  }

  if (typeof filters.description === "string") {
    where.description = { contains: filters.description, mode: "insensitive" };
  }

  if (typeof filters.completed === "boolean") {
    where.completed = filters.completed;
  }

  return prisma.todo.findMany({
    where,
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const countTodos = async (
  userId: number,
  filters: { [key: string]: string | number | boolean }
) => {
  const where: any = { ...filters, userId };

  if (typeof filters.title === "string") {
    where.title = { contains: filters.title, mode: "insensitive" };
  }

  if (typeof filters.description === "string") {
    where.description = { contains: filters.description, mode: "insensitive" };
  }

  if (typeof filters.completed === "boolean") {
    where.completed = filters.completed;
  }

  return prisma.todo.count({
    where,
  });
};

export const createTodoInDb = async (
  userId: number,
  data: { title: string; description: string; completed?: boolean }
) => {
  return prisma.todo.create({
    data: { ...data, userId },
  });
};

export const updateTodoInDb = async (
  userId: number,
  id: number,
  data: { title: string; description: string; completed?: boolean }
) => {
  return prisma.todo.updateMany({
    where: { id, userId },
    data,
  });
};

export const deleteTodoFromDb = async (userId: number, id: number) => {
  return prisma.todo.deleteMany({
    where: { id, userId },
  });
};
