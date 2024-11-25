import { TaskManagementSystem } from "@/components/task-management-system";
import { auth } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return <TaskManagementSystem />;
}
