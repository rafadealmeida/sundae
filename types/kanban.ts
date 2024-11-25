export type TaskStatus = "backlog" | "todo" | "doing" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  content: string;
  status: TaskStatus;
  priority?: TaskPriority;
  createdAt: Date;
  user: string;
  project: string;
  category: string;
  image: string;
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};
