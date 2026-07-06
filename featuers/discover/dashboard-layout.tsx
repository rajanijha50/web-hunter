export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <main className="flex-1 overflow-y-auto">
          <div className="p-10 max-w-[1400px] mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
