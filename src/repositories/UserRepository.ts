import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (email: string, password: string) => {
  return prisma.user.create({
    data: { email, password },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};
