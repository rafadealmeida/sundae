"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ProjectTable } from "@/components/project-table"
import { SelectProjectModal } from "@/components/select-project-modal"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const predefinedProjects = [
  "MPA",
  "Sesc",
  "Sesc App",
  "Migração",
  "CLDF",
  "Projetos Internos",
  "SIGA",
  "Day Offs"
]

export function TaskManagementSystem() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())

  useEffect(() => {
    // Ajusta a data para o início da semana (domingo)
    const today = new Date()
    const diff = today.getDate() - today.getDay()
    setCurrentWeekStart(new Date(today.setDate(diff)))
  }, [])

  const addProject = (project) => {
    setProjects([...projects, project])
    setIsModalOpen(false)
  }

  const updateProjectTime = (index, day, time) => {
    const updatedProjects = [...projects];
    if (!updatedProjects[index].time) {
      updatedProjects[index].time = {};
    }
    updatedProjects[index].time[day] = time;
    setProjects(updatedProjects);
  }

  const navigateWeek = (direction) => {
    setCurrentWeekStart(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
      return newDate
    })
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-primary">Sistema de Controle de Tarefas de Tecnologia</h1>
      <div className="flex justify-between items-center">
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Selecionar Projeto
        </Button>
        <div className="flex items-center space-x-2">
          <Button onClick={() => navigateWeek('prev')} variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>{currentWeekStart.toLocaleDateString()} - {new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
          <Button onClick={() => navigateWeek('next')} variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ProjectTable 
        projects={projects} 
        updateProjectTime={updateProjectTime}
        currentWeekStart={currentWeekStart}
      />
      <SelectProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSelectProject={addProject}
        predefinedProjects={predefinedProjects}
      />
    </div>
  )
}

