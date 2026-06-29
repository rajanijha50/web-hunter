import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-10 max-w-[1400px] mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
