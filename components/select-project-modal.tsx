"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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

export function SelectProjectModal({ isOpen, onClose, onSelectProject }) {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Aqui você normalmente buscaria as categorias do seu backend
    // Por enquanto, vamos simular isso com um atraso
    setTimeout(() => {
      setCategories([
        "QA",
        "Levantamento de Requisitos",
        "Desenvolvimento Front End",
        "Desenvolvimento Back End",
        "Infraestrutura",
        "Design",
        "Testes Unitários",
        "Documentação",
        "Reunião",
        "Planejamento",
      ]);
    }, 1000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !selectedCategory) {
      setError("É obrigatório selecionar um projeto e uma categoria.");
      return;
    }
    const newProject = {
      name: selectedProject,
      role: selectedCategory,
      dateAdded: new Date().toLocaleDateString(),
      time: {},
    };
    onSelectProject(newProject);
    setSelectedProject("");
    setSelectedCategory("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Selecionar Projeto e Categoria</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
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
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Selecionar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
