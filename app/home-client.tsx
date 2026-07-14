"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useUserStore } from "@/store/userStore";
import Authenticated from "@/components/layout/Authenticated";
import Anonymous from "@/components/layout/Anonymous";
import { useWebsiteStore } from "@/store/websiteStore";

export default function HomeClient() {
  const user = useUserStore((state) => state.user);
  const { fetchWebsites } = useWebsiteStore();

  useEffect(() => {
    fetchWebsites();
  }, []);

  return (
    <>
      <Header />
      {user ? <Authenticated /> : <Anonymous />}
      <Footer />
    </>
  );
}
