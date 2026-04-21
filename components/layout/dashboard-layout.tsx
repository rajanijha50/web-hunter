import { TopNav } from "./top-nav";
import { Sidebar } from "./sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="flex-1 md:pl-64 overflow-y-auto">
          <div className="p-6 md:p-8 xl:p-10 max-w-[1400px] mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
