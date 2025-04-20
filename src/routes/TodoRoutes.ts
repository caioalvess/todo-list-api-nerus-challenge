import { Router } from "express";
import {
  getTodosController,
  getTodoByIdController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} from "../controllers/TodoController";

const router = Router();

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Lists all tasks
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get("/todos", getTodosController);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Retrieves a task by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Task not found
 */
router.get("/todos/:id", getTodoByIdController);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Creates a new task
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid data
 */
router.post("/todos", createTodoController);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Updates an existing task
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Task not found
 */

router.put("/todos/:id", updateTodoController);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Removes a task by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Task successfully removed
 *       404:
 *         description: Task not found
 */

router.delete("/todos/:id", deleteTodoController);

export { router as todoRoutes };
