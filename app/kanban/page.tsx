// import { KanbanBoard } from "@/components/kanban-board";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]/auth"
// import { redirect } from "next/navigation"

import dynamic from "next/dynamic";

const KanbanBoard = dynamic(() => import("@/components/kanban-board"), {
  ssr: false,
});

export default async function KanbanPage() {
  // const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect('/login')
  // }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Quadro Kanban</h1>
      <KanbanBoard />
    </div>
  );
}
