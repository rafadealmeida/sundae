import { AdminDashboard } from "@/components/admin-dashboard";
import { auth } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>
      <AdminDashboard />
    </main>
  );
}
