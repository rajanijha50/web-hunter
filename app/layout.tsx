import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import TanStackProviders from "@/components/providers/tanstack-provider";
import { CustomToaster } from "@/components/feedback/SendNotification";

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
