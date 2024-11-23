"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Isso deve ser buscado do seu backend em uma aplicação real
const mockProjects = [
  "MPA",
  "Sesc",
  "Sesc App",
  "Migração",
  "CLDF",
  "Projetos Internos",
  "SIGA",
  "Day Offs",
];

const activityCategories = [
  "QA",
  "Levantamento de Requisitos",
  "Desenvolvimento",
  "Design",
  "Testes",
  "Documentação",
  "Reunião",
  "Planejamento",
];

export function AddActivityModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activityName, setActivityName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você normalmente lidaria com a adição da atividade ao seu backend
    console.log("Adicionando atividade:", {
      nome: activityName,
      projeto: selectedProject,
      categoria: selectedCategory,
    });
    setActivityName("");
    setSelectedProject("");
    setSelectedCategory("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Atividade</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="activityName"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Nome da Atividade
            </label>
            <Input
              id="activityName"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="project"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Projeto
            </label>
            <Select onValueChange={setSelectedProject} value={selectedProject}>
              <SelectTrigger id="project">
                <SelectValue placeholder="Selecione um projeto" />
              </SelectTrigger>
              <SelectContent>
                {mockProjects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Categoria
            </label>
            <Select
              onValueChange={setSelectedCategory}
              value={selectedCategory}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {activityCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Adicionar Atividade</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
