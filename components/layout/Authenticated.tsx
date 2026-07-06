import { DashboardLayout } from "@/featuers/discover/dashboard-layout";
import { DiscoverFeed } from "@/featuers/discover/discover-feed";

export default function Authenticated() {
  return (
    <DashboardLayout>
      <DiscoverFeed />
    </DashboardLayout>
  );
}
