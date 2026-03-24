import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ToastProvider } from "@outerhaven/framework";
import { RouteTransition, TransitionProvider } from "@/components/route-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-outerhaven-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-outerhaven-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Outer Heaven Framework",
    template: "%s | Outer Heaven Framework",
  },
  description:
    "A tactical Tailwind framework and demo site for command-center interfaces, upload surfaces, and dashboard primitives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plexSans.variable} ${plexMono.variable} antialiased`}>
        <ToastProvider>
          <TransitionProvider excludePatterns={["/dashboard/"]}>
            <div className="min-h-screen bg-background text-foreground">
              <SiteHeader />
              <RouteTransition>
                {children}
              </RouteTransition>
              <SiteFooter />
            </div>
          </TransitionProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
