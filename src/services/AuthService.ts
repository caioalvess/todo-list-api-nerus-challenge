import * as userRepo from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const register = async (email: string, password: string) => {
  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email já está em uso.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return userRepo.createUser(email, hashedPassword);
};

export const login = async (email: string, password: string) => {
  const user = await userRepo.findUserByEmail(email);
  if (!user) {
    throw new Error("Credenciais inválidas.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Credenciais inválidas.");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token };
};
