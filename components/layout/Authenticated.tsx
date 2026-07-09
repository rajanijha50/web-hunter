import { DashboardLayout } from "@/features/discover/DiscoverLayout";
import { DiscoverFeed } from "@/features/discover/DiscoverFeed";

export default function Authenticated() {
  return (
    <DashboardLayout>
      <DiscoverFeed />
    </DashboardLayout>
  );
}
