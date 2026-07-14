import { Metadata } from "next";
import AdminClient from "./admin-client";

export const metadata: Metadata = {
  title: "Web Hunter — Admin",
  description: "Admin",
  openGraph: {
    title: "Web Hunter — Admin",
    description: "Admin",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/admin`,
  },
  icons: {
    icon: ["/favicon.ico"],
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
