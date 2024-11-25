import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { auth } from "../api/auth/[...nextauth]/auth";

const KanbanBoard = dynamic(() => import("@/components/kanban/kanban-board"), {
  ssr: false,
});

export default async function KanbanPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-4">
      {session && <KanbanBoard session={session} />}
    </div>
  );
}
