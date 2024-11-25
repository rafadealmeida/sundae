"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddProjectModal } from "@/components/add-project-modal";
import { AddCategoryModal } from "@/components/add-category-modal";
import Link from "next/link";

export function AdminDashboard() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Button onClick={() => setIsProjectModalOpen(true)}>
          Adicionar Projeto
        </Button>
        <Button onClick={() => setIsCategoryModalOpen(true)}>
          Adicionar Categoria
        </Button>
        <Link href="/admin/users" className="hover:text-gray-600">
          <Button variant={"secondary"}>Ver relátorios</Button>
        </Link>
      </div>
      <AddProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </div>
  );
}
