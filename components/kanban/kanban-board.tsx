"use client";

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import { Column, Task, TaskPriority, TaskStatus } from "@/types/kanban";
import { KanbanColumn } from "./kanban-column";
import { TaskDialog } from "./task-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Session } from "next-auth";

export default function KanbanBoard({ session }: { session: Session }) {
  const initialTasks = [
    {
      id: "1",
      title: "Implementar login",
      description: "Criar tela de login e integrar com backend",
      user: session.user.name,
      project: "MPA",
      category: "Front-End",
      status: "backlog",
      image: session.user.image,
      priority: "low",
    },
    {
      id: "2",
      title: "Permissões",
      description: "Criar estrutura de permissionamento de páginas",
      user: session.user.name,
      project: "MPA",
      category: "Front-End",
      status: "doing",
      image: session.user.image,
      priority: "high",
    },
    {
      id: "3",
      title: "Testes de integração",
      description: "Escrever e executar testes de integração",
      user: session.user.name,
      project: "Sesc App",
      category: "Front-End",
      status: "todo",
      image: session.user.image,
      priority: "low",
    },
    {
      id: "4",
      title: "Otimização de performance",
      description: "Melhorar o tempo de carregamento da aplicação",
      user: session.user.name,
      project: "Sesc App",
      category: "Front-End",
      status: "done",
      image: session.user.image,
      priority: "medium",
    },
  ];

  const initialColumns: Column[] = [
    {
      id: "backlog",
      title: "Backlog",
      tasks: initialTasks
        .filter((task) => task.status === "backlog")
        .map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          content: task.description,
          status: task.status as TaskStatus,
          createdAt: new Date(),
          user: task.user as string,
          project: task.project,
          category: task.category,
          image: task.image as string,
          priority: task.priority as TaskPriority,
        })),
    },
    {
      id: "todo",
      title: "A Fazer",
      tasks: initialTasks
        .filter((task) => task.status === "todo")
        .map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          content: task.description,
          status: task.status as TaskStatus,
          createdAt: new Date(),
          user: task.user as string,
          project: task.project,
          category: task.category,
          image: task.image as string,
          priority: task.priority as TaskPriority,
        })),
    },
    {
      id: "in-progress",
      title: "Em Andamento",
      tasks: initialTasks
        .filter((task) => task.status === "doing")
        .map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          content: task.description,
          status: task.status as TaskStatus,
          createdAt: new Date(),
          user: task.user as string,
          project: task.project,
          category: task.category,
          image: task.image as string,
          priority: task.priority as TaskPriority,
        })),
    },
    {
      id: "done",
      title: "Concluído",
      tasks: initialTasks
        .filter((task) => task.status === "done")
        .map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          content: task.description,
          status: task.status as TaskStatus,
          createdAt: new Date(),
          user: task.user as string,
          project: task.project,
          category: task.category,
          image: task.image as string,
          priority: task.priority as TaskPriority,
        })),
    },
  ];
  // const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [columns, setColumns] = useLocalStorage<Column[]>(
    "kanban-columns",
    initialColumns
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleAddTask = () => {
    setEditingTask({
      id: "",
      title: "",
      content: "",
      description: "",
      status: "todo",
      createdAt: new Date(),
      project: "",
      category: "",
      user: session.user.name as string,
      image: session.user.image as string,
    });
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    const newColumns = columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => task.id !== taskId),
    }));
    setColumns(newColumns);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask?.id) {
      const newColumns = columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...taskData } : task
        ),
      }));
      setColumns(newColumns);
    } else {
      console.log("taskData", taskData);
      const newTask: Task = {
        id: uuidv4(),
        title: taskData.title ?? "",
        content: taskData.description ?? "",
        description: taskData.description ?? "",
        status: "todo",
        priority: taskData.priority,
        createdAt: new Date(),
        user: taskData.user ?? "",
        project: taskData.project ?? "",
        category: taskData.category ?? "",
        image: taskData.image ?? "",
      };

      const newColumns = columns.map((column) =>
        column.id === "todo"
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      );
      setColumns(newColumns);
    }
    setDialogOpen(false);
    setEditingTask(undefined);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const newColumns = [...columns];
    const sourceCol = newColumns.find((col) => col.id === source.droppableId);
    const destCol = newColumns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceCol || !destCol) return;

    const [movedTask] = sourceCol.tasks.splice(source.index, 1);
    movedTask.status = destination.droppableId as TaskStatus;
    destCol.tasks.splice(destination.index, 0, movedTask);

    setColumns(newColumns);
  };

  return (
    <>
      <div className="mb-4">
        <Button onClick={handleAddTask}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Tarefa
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-board rounded-lg">
          {columns.map((column) => (
            <div key={column.id} className="w-full md:w-[350px]">
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <KanbanColumn
                    column={column}
                    provided={provided}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                  />
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editingTask}
        onSave={handleSaveTask}
        session={session}
      />
    </>
  );
}
