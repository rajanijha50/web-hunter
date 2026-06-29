"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuBell, LuSearch, LuUser, LuMenu, LuLogOut } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchWebsite from "@/featuers/search/SearchWebsite";
import { useUser } from "@/store/userStore";

export function Header() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  // const { data: session, status } = useSession();
  // console.log(session?.user)
  // const isLoading = status === "loading";
  const [openSearchWindow, setOpenSearchWindow] = useState(false);
  const { fetchUser, user, loading } = useUser();

  useEffect(() => {
    fetchUser();
  }, []);

  // const navlinks = [
  //   {
  //     title: "Discover",
  //     href: "/discover",
  //   },
  //   {
  //     title: "Admin",
  //     href: "/admin",
  //   },
  // ];

  const openSearchWindowByShortcut = (e: KeyboardEvent) => {
    if (e.key === "/" && (pathname === '/' || pathname === '/discover')) {
      e.preventDefault();
      setOpenSearchWindow(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", openSearchWindowByShortcut);
    return () => {
      window.removeEventListener("keydown", openSearchWindowByShortcut);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all ${
          isLandingPage
            ? "bg-background/80 border-border/40"
            : "bg-background/95 border-border"
        }`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight">
                Web
                <span className="font-medium text-muted-foreground">
                  Hunter
                </span>
              </span>
            </Link>
          </div>
          <div className="hidden lg:flex relative w-80 mx-auto xl:w-96">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search 3,200+ websites..."
              aria-label="Search websites"
              readOnly
              onClick={() => setOpenSearchWindow(true)}
              className="flex h-10 w-full rounded-full border border-input bg-muted/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
            />
          </div>

          <nav className="flex items-center gap-4 md:gap-6 text-sm font-medium">
            <div className="hidden md:flex items-center gap-6">
              <Link
                href={"/discover"}
                className={`transition-colors hover:text-primary ${pathname.startsWith("/discover") ? "text-primary" : "text-muted-foreground"}`}
              >
                Discover
              </Link>
              {user?.role == "admin" && (
                <Link
                  href={"/admin"}
                  className={`transition-colors hover:text-primary ${pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground"}`}
                >
                  Admin
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-4 border-l pl-4 md:pl-6 ml-2 border-border/60">
              <ThemeToggle />

              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full border border-border overflow-hidden bg-muted flex items-center justify-center shrink-0 cursor-pointer hover:border-primary/50 transition-colors">
                        {user?.image ? (
                          <Image
                            src={user?.image}
                            alt={user?.name || "User"}
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <LuUser className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => signOut()}
                        title="log out"
                      >
                        <LuLogOut className="h-5 w-5" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Link
                        href="/auth"
                        className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Login
                      </Link>
                      <Link href="/auth">
                        <Button
                          size="sm"
                          className="rounded-full px-4 font-semibold shadow-sm"
                        >
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}

              <Button variant="ghost" size="icon" className="md:hidden">
                <LuMenu className="h-5 w-5" />
              </Button>
            </div>
          </nav>
        </div>
      </header>
      {openSearchWindow && (
        <SearchWebsite onClose={() => setOpenSearchWindow(false)} />
      )}
    </>
  );
}
