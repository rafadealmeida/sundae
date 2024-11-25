import { ReportsPage } from "@/components/reports-page";
import { auth } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export default async function ReportsPageWrapper() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return <ReportsPage />;
}
