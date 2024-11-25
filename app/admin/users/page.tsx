import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { UserTable } from "@/components/user-table";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Usuários</h1>
      <UserTable />
    </div>
  );
}
