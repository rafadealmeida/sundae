import { UserTable } from "@/components/user-table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  // const session = await getServerSession(authOptions)

  // if (!session || session.user.role !== 'admin') {
  //   redirect('/login')
  // }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Usuários</h1>
      <UserTable />
    </div>
  );
}
