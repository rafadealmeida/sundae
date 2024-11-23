import { ReportsPage } from "@/components/reports-page";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export default async function ReportsPageWrapper() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <ReportsPage />;
}
