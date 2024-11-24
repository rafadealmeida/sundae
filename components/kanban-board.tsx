// "use client";

// import { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import { AddTaskModal } from "./add-task-modal";
// import { TaskCard } from "./task-card";

// // Mock data - replace with actual data fetching in a real application
// const initialTasks = [
//   {
//     id: "1",
//     title: "Implementar login",
//     description: "Criar tela de login e integrar com backend",
//     user: "Alice Johnson",
//     project: "MPA",
//     category: "Desenvolvimento",
//     status: "backlog",
//   },
//   {
//     id: "2",
//     title: "Design da landing page",
//     description: "Criar mockups para a nova landing page",
//     user: "Bob Smith",
//     project: "Sesc",
//     category: "Design",
//     status: "todo",
//   },
//   {
//     id: "3",
//     title: "Testes de integração",
//     description: "Escrever e executar testes de integração",
//     user: "Charlie Brown",
//     project: "Sesc App",
//     category: "QA",
//     status: "doing",
//   },
//   {
//     id: "4",
//     title: "Otimização de performance",
//     description: "Melhorar o tempo de carregamento da aplicação",
//     user: "Diana Ross",
//     project: "CLDF",
//     category: "Desenvolvimento",
//     status: "done",
//   },
// ];

// const columns = ["backlog", "todo", "doing", "done"];

// export function KanbanBoard() {
//   const [tasks, setTasks] = useState(initialTasks);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const newTasks = Array.from(tasks);
//     const [reorderedItem] = newTasks.splice(result.source.index, 1);
//     reorderedItem.status = result.destination.droppableId;
//     newTasks.splice(result.destination.index, 0, reorderedItem);

//     setTasks(newTasks);
//   };

//   const addTask = (newTask) => {
//     setTasks([
//       ...tasks,
//       { ...newTask, id: Date.now().toString(), status: "backlog" },
//     ]);
//   };

//   return (
//     <div className="space-y-4">
//       <Button onClick={() => setIsAddModalOpen(true)}>
//         <Plus className="mr-2 h-4 w-4" /> Adicionar Tarefa
//       </Button>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="grid grid-cols-4 gap-4">
//           {columns.map((column) => (
//             <div key={column} className="bg-gray-100 p-4 rounded-lg">
//               <h2 className="text-lg font-semibold mb-4 capitalize">
//                 {column}
//               </h2>
//               <Droppable droppableId={column}>
//                 {(provided) => (
//                   <div
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                     className="space-y-2"
//                   >
//                     {tasks
//                       .filter((task) => task.status === column)
//                       .map((task, index) => (
//                         <Draggable
//                           key={task.id}
//                           draggableId={task.id}
//                           index={index}
//                         >
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                             >
//                               <TaskCard task={task} />
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>
//       <AddTaskModal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         onAddTask={addTask}
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/task-card";
import { AddTaskModal } from "@/components/add-task-modal";
import { Plus } from "lucide-react";

// Mock data - replace with actual data fetching in a real application
const initialTasks = [
  {
    id: "1",
    title: "Implementar login",
    description: "Criar tela de login e integrar com backend",
    user: "Alice Johnson",
    project: "MPA",
    category: "Desenvolvimento",
    status: "backlog",
  },
  {
    id: "2",
    title: "Design da landing page",
    description: "Criar mockups para a nova landing page",
    user: "Bob Smith",
    project: "Sesc",
    category: "Design",
    status: "todo",
  },
  {
    id: "3",
    title: "Testes de integração",
    description: "Escrever e executar testes de integração",
    user: "Charlie Brown",
    project: "Sesc App",
    category: "QA",
    status: "doing",
  },
  {
    id: "4",
    title: "Otimização de performance",
    description: "Melhorar o tempo de carregamento da aplicação",
    user: "Diana Ross",
    project: "CLDF",
    category: "Desenvolvimento",
    status: "done",
  },
];

const columns = ["backlog", "todo", "doing", "done"];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Se não houver destino ou se o item for solto no mesmo lugar, não faz nada
    if (
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    ) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [reorderedItem] = updatedTasks.splice(source.index, 1);
    reorderedItem.status = destination.droppableId; // Atualizando o status da tarefa
    updatedTasks.splice(destination.index, 0, reorderedItem);

    setTasks(updatedTasks); // Atualizando o estado com a nova lista de tarefas
  };

  const addTask = (newTask) => {
    setTasks([
      ...tasks,
      { ...newTask, id: Date.now().toString(), status: "backlog" },
    ]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-4">
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Tarefa
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <div key={column} className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 capitalize">
                {column}
              </h2>
              <Droppable droppableId={column}>
                {(provided) => (
                  <div
                    ref={provided.innerRef} // Referência correta para o container Droppable
                    {...provided.droppableProps}
                    className="space-y-2 min-h-[200px]"
                  >
                    {tasks
                      .filter((task) => task.status === column)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef} // Referência correta para cada item Draggable
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}{" "}
                    {/* Placeholder para a área de arrasto */}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddTask={addTask}
        />
      </div>
    </DragDropContext>
  );
}
