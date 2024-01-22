import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/navbar/NavBar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CWWYH",
  description: "Cook With What You Have",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className,"w-screen h-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full h-[9%] focus-visible:outline-border">
          <Toaster />
            <NavBar />
          </div>
          <main className="w-full h-[91%]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
