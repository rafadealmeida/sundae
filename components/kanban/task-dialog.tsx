import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/types/kanban";
import { useState, useEffect } from "react";
import { category as categories, mockProjects } from "@/util/arraysMocks";
import { Session } from "next-auth";

type Priority = "low" | "medium" | "high";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task;
  onSave: (task: Partial<Task>) => void;
  session: Session;
}

export function TaskDialog({
  open,
  onOpenChange,
  task,
  onSave,
  session,
}: TaskDialogProps) {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: "medium" as Priority,
    status: "todo",
    project: "",
    category: "",
    user: session.user.name,
    image: session.user.image,
  });

  console.log("formData", formData);

  useEffect(() => {
    if (session) {
      if (task) {
        setFormData(task);
      } else {
        setFormData({
          title: "",
          description: "",
          priority: "medium" as Priority,
          status: "todo",
          project: "",
          category: "",
          user: session.user.name,
          image: session.user.image,
        });
      }
    }
  }, [task, open, session]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setFormData({
            title: "",
            description: "",
            priority: "medium" as Priority,
            status: "todo",
            project: "",
            category: "",
            user: "",
            image: "",
          });
        }
        onOpenChange(isOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {task ? "Editar tarefa" : "Adicionar Nova Tarefa"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium"> Nome da Tarefa</label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">Descrição</label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">Prioridade</label>
            <Select
              value={formData.priority}
              onValueChange={(value: Priority) =>
                setFormData({ ...formData, priority: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Baixo</SelectItem>
                <SelectItem value="medium">Médio</SelectItem>
                <SelectItem value="high">Alto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Categoria</label>
            <Select
              value={formData.category}
              onValueChange={(value: Priority) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Projeto</label>
            <Select
              value={formData.project}
              onValueChange={(value: Priority) =>
                setFormData({ ...formData, project: value })
              }
            >
              <SelectTrigger id="project">
                <SelectValue placeholder="Selecione um projeto" />
              </SelectTrigger>
              <SelectContent>
                {mockProjects.map((proj) => (
                  <SelectItem key={proj} value={proj}>
                    {proj}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Sair
          </Button>
          <Button
            onClick={() => {
              setFormData({
                ...formData,
                user: session.user.name,
                image: session.user.image,
              });
              onSave(formData);
              onOpenChange(false);
            }}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
