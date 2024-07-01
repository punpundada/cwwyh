import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/navbar/NavBar";
import { cn } from "@/lib/utils";
import {getAllRecipeService} from "@/services/recipeService";

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
  //prefetching the recipes query
  getAllRecipeService(0,undefined)
  return (
    <html lang="en">
      <body className={cn(inter.className,"w-screen min-h-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <main className="">
            <NavBar />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
