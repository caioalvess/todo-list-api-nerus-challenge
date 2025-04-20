export type CreateTodoInput = {
  title: string;
  description?: string;
  completed?: boolean;
};

export type UpdateTodoInput = {
  title?: string;
  description?: string;
  completed?: boolean;
};
