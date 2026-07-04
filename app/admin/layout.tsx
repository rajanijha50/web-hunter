
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { isAdmin } from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  if (!(await isAdmin())) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-12">{children}</div>
    </div>
  );
}
