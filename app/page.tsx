"use client";
import { Header } from "@/components/layout/Header";
import { useEffect } from "react";
import Footer from "@/components/layout/Footer";
import { useUserStore } from "@/store/userStore";
import Authenticated from "@/components/layout/Authenticated";
import Anonymous from "@/components/layout/Anonymous";
import { useWebsiteStore } from "@/store/websiteStore";

export default function Page() {
  const user = useUserStore((state) => state.user);
  const {fetchWebsites} = useWebsiteStore()

  useEffect(() => {
    fetchWebsites()
  }, [])
  return (
    <>
      <Header />
      {user ? <Authenticated /> : <Anonymous />}
      <Footer />
    </>
  );
}
