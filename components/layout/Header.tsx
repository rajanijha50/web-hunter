"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import SearchWebsite from "@/featuers/search/SearchWebsite";
import { Button } from "@/components/ui/button";
import { LuSearch, LuUser, LuMenu, LuLogOut, LuX } from "react-icons/lu";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const [openSearchWindow, setOpenSearchWindow] = useState(false);
  const { fetchUser, user, loading } = useUserStore();
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  const openSearchWindowByShortcut = (e: KeyboardEvent) => {
    if (e.key === "/" && (pathname === "/" || pathname === "/discover")) {
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
        className={`animate-slide-in-top fixed top-0 left-0 right-0 z-50 backdrop-blur-md md:border-b transition-all text-primary dark:text-foreground`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
          {/* site logo */}
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

          {/* search icon */}
          <div className="hidden md:flex relative w-60 mx-auto xl:w-80">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
            <input
              type="search"
              placeholder="Search 3,200+ websites..."
              aria-label="Search websites"
              readOnly
              onClick={() => setOpenSearchWindow(true)}
              className="pl-10 border p-4 rounded-full cursor-pointer text-sm"
            />
          </div>

          {/* nav links */}

          <nav
            className={`hidden md:flex items-center gap-4 md:gap-6 text-sm font-medium`}
          >
            {/* user menu */}
            <div className="flex items-center gap-6">
              {user ? (
                <>
                  {user?.role == "admin" && (
                    <>
                      <Link href={"/my-favorites"}>My Favorites</Link>

                      <Link href={"/admin"}>Admin</Link>
                    </>
                  )}
                  {/* light and dark mode toggle */}
                  <ThemeToggle />
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
                      variant="default"
                      size="icon"
                      className="text-red-500 hover:bg-red-500/20 bg-transparent"
                      onClick={() => signOut()}
                      title="Log Out"
                    >
                      <LuLogOut className="h-5 w-5" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <ThemeToggle />
                  <Link href="/auth">
                    <Button
                      size="sm"
                      className="rounded-full px-4 font-semibold shadow-sm"
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>

          <div className="flex md:hidden items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenSearchWindow(true)}
            >
              <LuSearch className="w-5 h-5" />
            </Button>
            <ThemeToggle />
            {user ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenu((prev) => !prev)}
              >
                {mobileMenu ? (
                  <LuX className="h-5 w-5" />
                ) : (
                  <LuMenu className="h-5 w-5" />
                )}
              </Button>
            ) : (
              <Link href="/auth">
                <Button
                  size="sm"
                  className="rounded-full px-4 font-semibold shadow-sm"
                >
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>

        <nav
          className={`md:hidden overflow-hidden ${
            mobileMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center px-6 pt-2 gap-5 pb-6 backdrop-blur-lg border-t border-border">
            {user && (
              <>
                {user?.role == "admin" && (
                  <>
                    <Link href={"/my-favorites"}>My Favorites</Link>

                    <Link href={"/admin"}>Admin</Link>
                  </>
                )}
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
                    variant="default"
                    size="icon"
                    className="text-red-500 hover:bg-red-500/20 bg-transparent"
                    onClick={() => signOut()}
                    title="Log Out"
                  >
                    <LuLogOut className="h-5 w-5" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </nav>
      </header>
      <div className="h-16"></div>
      {openSearchWindow && (
        <SearchWebsite onClose={() => setOpenSearchWindow(false)} />
      )}
    </>
  );
}
