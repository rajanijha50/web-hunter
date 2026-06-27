"use client";
import { Header } from "@/components/layout/Header";
import { useEffect } from "react";
import LandingPage from "@/components/layout/LandingPage";
import Trending from "@/components/layout/Trending";
import Testimonials from "@/components/layout/Testimonials";
import Footer from "@/components/layout/Footer";

export default function Page() {

  const fetchTest = async () => {
    try {
      const res = await fetch("/api/websites");
      const data = await res.json();
      if (data.success) {
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetchTest();
  }, []);

  return (
    <div>
      <Header />
      <LandingPage />
      <Trending />
      <Testimonials />
      <Footer />
    </div>
  );
}
