import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import TanStackProviders from "@/components/providers/tanstack-provider";
import { CustomToaster } from "@/components/feedback/SendNotification";

const domain =
  (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.webhunter.space").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: {
    default: "Web Hunter — Discover Useful Websites & AI Tools",
    template: "%s | Web Hunter",
  },
  description:
    "Curated collection of 500+ useful websites, AI tools, developer utilities, and resources organized across 90+ categories.",
  applicationName: "Web Hunter",
  authors: [{ name: "Web Hunter" }],
  keywords: [
    "Web Hunter",
    "Useful Websites",
    "Free Websites",
    "AI Tools Directory",
    "Best AI Tools",
    "Productivity Tools",
    "Developer Tools",
    "Design Resources",
    "Curated Web Tools",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Web Hunter — Discover Useful Websites & AI Tools",
    description:
      "Curated directory of 500+ free and useful websites, AI tools, and creative utilities.",
    url: domain,
    siteName: "Web Hunter",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/discover.png",
        width: 1200,
        height: 630,
        alt: "Web Hunter - Discover Curated Websites and Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Hunter — Discover Useful Websites & AI Tools",
    description:
      "Curated directory of 500+ free and useful websites, AI tools, and creative utilities.",
    images: ["/assets/images/discover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="font-sans antialiased">
        <SessionProvider>
          <TanStackProviders>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <CustomToaster />
              {children}
            </ThemeProvider>
          </TanStackProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
