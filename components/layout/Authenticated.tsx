import { DashboardLayout } from "@/featuers/discover/DiscoverLayout";
import { DiscoverFeed } from "@/featuers/discover/DiscoverFeed";

export default function Authenticated() {
  return (
    <DashboardLayout>
      <DiscoverFeed />
    </DashboardLayout>
  );
}
