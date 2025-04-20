// src/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List API",
      version: "1.0.0",
      description:
        "Documentação da API de tarefas com Node, TypeScript e Prisma",
    },
    servers: [{ url: "http://localhost:3001/api" }],
    components: {
      schemas: {
        Todo: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["src/routes/*.ts", "src/models/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
