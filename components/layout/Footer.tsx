import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const pages = [
    { name: "diary", href: "/diary" },
    { name: "todos", href: "/todo" },
    { name: "notes", href: "/note" },
    { name: 'pomodoro', href: '/timer' },
  ];
  const navlinks = [
    { name: "home", href: "/" },
    { name: "about", href: "/about" },
    { name: "feedback", href: "/feedback" },
    { name: "contribute", href: "/contribute" },
  ];
  const social = [
    { name: 'github', href: process.env.NEXT_PUBLIC_GITHUB || 'https://github.com/', icon: FaGithub },
    { name: 'instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM || 'https://www.instagram.com/', icon: FaInstagram },
    { name: 'linkedin', href: process.env.NEXT_PUBLIC_LINKEDIN || 'https://www.linkedin.com/', icon: FaLinkedin },
    { name: 'twitter', href: process.env.NEXT_PUBLIC_TWITTER || 'https://twitter.com/', icon: FaXTwitter }
  ];

  return (
    <>
      {/* Footer */}
      <footer className="bg-background text-muted-foreground py-16 border-t border-border px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-xl tracking-tight text-foreground">
                Web
                <span className="font-medium text-muted-foreground">
                  Hunter
                </span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground mb-6">
              Discovery redefined. We hunt for the websites that the algorithms
              forgot to show you.
            </p>
            <div className="flex gap-4">
              {
                social.map((s) => {
                  return (
                    <Link href={s.href} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent cursor-pointer transition-colors">
                      <span className="text-lg"><s.icon/></span>
                    </Link>
                  )
                })
              }
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <h5 className="font-bold text-[10px] text-foreground mb-4 uppercase tracking-wider">
                Platform
              </h5>
              <ul className="space-y-3 text-xs">
                <li>
                  <Link
                    href="/discover"
                    className="hover:text-primary transition-colors"
                  >
                    Discover
                  </Link>
                </li>
                <li>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    Curators
                  </span>
                </li>
                
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-[10px] text-foreground mb-4 uppercase tracking-wider">
                Support
              </h5>
              <ul className="space-y-3 text-xs">
                <li>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    Help Center
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    Contact Us
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    Guidelines
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-[10px] text-foreground mb-4 uppercase tracking-wider">
                Company
              </h5>
              <ul className="space-y-3 text-xs">
                <li>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    About
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    Careers
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    Privacy
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mx-auto max-w-6xl mt-16 pt-8 border-t border-border text-[10px] flex flex-col md:flex-row justify-between items-center gap-4 uppercase tracking-widest text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Web Hunter. Discovery Redefined.
          </span>
          <div className="flex gap-8">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Terms
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
