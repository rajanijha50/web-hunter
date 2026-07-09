import { Header } from "@/components/layout/Header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-12">{children}</div>
    </div>
  );
}
