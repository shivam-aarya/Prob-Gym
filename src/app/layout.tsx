import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { GlobalPluginInitializer } from "@/components/GlobalPluginInitializer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CogGym - Cognitive Science Research Platform",
  description: "A large-scale, collaborative platform where artificial intelligence meets cognitive science",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            try {
              const root = document.documentElement;
              const storedTheme = localStorage.getItem('theme');

              // Remove any existing theme classes
              root.classList.remove('light', 'dark');

              // Set theme based on stored preference, default to light
              if (storedTheme === 'dark') {
                root.classList.add('dark');
              } else {
                root.classList.add('light');
              }
            } catch (e) {
              // Fallback to light theme
              document.documentElement.classList.add('light');
            }
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200`}>
        <GlobalPluginInitializer />
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
