"use client";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const user = useUserStore((state) => state.user);

  const social = [
    {
      name: "github",
      href: process.env.NEXT_PUBLIC_GITHUB || "https://github.com/",
      icon: FaGithub,
    },
    {
      name: "instagram",
      href: process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/",
      icon: FaInstagram,
    },
    {
      name: "linkedin",
      href: process.env.NEXT_PUBLIC_LINKEDIN || "https://www.linkedin.com/",
      icon: FaLinkedin,
    },
    {
      name: "twitter",
      href: process.env.NEXT_PUBLIC_TWITTER || "https://twitter.com/",
      icon: FaXTwitter,
    },
  ];

  return (
    <>
      {/* Footer */}
      <footer className="text-sm bg-background text-primary dark:text-foreground py-16 border-t border-border px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-8 p-5 md:p-10">
          <div className="w-full md:max-w-1/2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-2xl tracking-tight">
                Web
                <span className="font-medium text-muted-foreground">
                  Hunter
                </span>
              </span>
            </Link>
            <p className="mb-6">
              Discovery redefined. We hunt for the websites that the algorithms
              forgot to show you.
            </p>
            <div className="flex gap-4">
              {social.map((s) => {
                return (
                  <Link
                    key={s.name}
                    href={s.href}
                    className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent cursor-pointer transition-all duration-300 hover:scale-110 "
                  >
                    <span className="text-lg">
                      <s.icon />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col mx-auto w-full md:max-w-1/2">
            <h5 className="font-bold mb-4 uppercase">Pages</h5>
            <div className="flex flex-col text-sm gap-2">
              {user && (
                <Link
                  href="/favorites"
                  className="capitalize hover:underline w-fit"
                >
                  My Favorites
                </Link>
              )}

              <Link href="/about" className="capitalize hover:underline w-fit">
                About
              </Link>
            </div>
          </div>
        </div>

        {/* bottom part */}
        <div className="container mx-auto max-w-6xl mt-16 pt-8 border-t border-border text-[10px] flex flex-col md:flex-row justify-between items-center gap-4 uppercase tracking-widest">
          <span>
            © {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="font-semibold cursor-pointer transition-all duration-200 hover:underline"
            >
              Web Hunter
            </Link>
            . Discovery Redefined.
          </span>
          <div className="flex gap-8">
            <Link
              href={"/"}
              className="hover:underline cursor-pointer transition-all duration-200"
            >
              Privacy
            </Link>
            <Link
              href={"/"}
              className="hover:underline cursor-pointer transition-all duration-200"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
