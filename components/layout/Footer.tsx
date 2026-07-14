"use client";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";

export default function Footer() {
  const user = useUserStore((state) => state.user);

  return (
    <>
      {/* Footer */}
      <footer role="contentinfo" className="text-sm bg-background text-primary dark:text-foreground py-16 border-t border-border px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-8 p-5 md:p-10">
          <div className="w-full md:max-w-1/2">
            <Link href="/" className="text-2xl md:text-3xl flex items-center space-x-2 mb-4">
              <span className="font-bold tracking-tight">
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
            <span>Made with ❤️ by {" "}
              <Link className="underline lowercase font-semibold" href={process.env.NEXT_PUBLIC_GITHUB!} target="_blank" rel="noopener noreferrer">rajanijha50</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
 