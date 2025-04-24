import { Request, Response, NextFunction } from "express";
import * as todoService from "../services/TodoService";

export const getTodosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const filters = Object.fromEntries(
      Object.entries(req.query).map(([key, value]) => {
        if (key === "completed") {
          return [key, value === "true"];
        }
        return [key, value];
      })
    );

    const todosResponse = await todoService.getTodos(
      userId,
      page,
      limit,
      filters
    );
    res.json(todosResponse);
  } catch (error) {
    next(error);
  }
};
