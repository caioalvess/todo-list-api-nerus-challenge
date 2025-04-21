import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodosFromDb = async (
  filters: { [key: string]: string | number | boolean },
  limit: number,
  offset: number
) => {
  const where: any = { ...filters };

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

export const countTodos = async (filters: { [key: string]: string | number | boolean }) => {
  const where: any = { ...filters };

  if (typeof filters.title === "string") {
    where.title = { contains: filters.title, mode: "insensitive" }; // Busca parcial
  }

  if (typeof filters.description === "string") {
    where.description = { contains: filters.description, mode: "insensitive" }; // Busca parcial
  }

  if (typeof filters.completed === "boolean") {
    where.completed = filters.completed; // Filtro exato
  }

  return prisma.todo.count({
    where,
  });
};
