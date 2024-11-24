import { UserReport } from "@/components/user-report";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export default async function UserReportPage({
  params,
}: {
  params: { id: string };
}) {
  // const session = await getServerSession(authOptions)

  // if (!session || session.user.role !== 'admin') {
  //   redirect('/login')
  // }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Relatório do Usuário</h1>
      <UserReport userId={params.id} />
    </div>
  );
}
