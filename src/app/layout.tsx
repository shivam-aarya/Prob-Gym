import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Study Platform",
  description: "A platform for conducting user studies",
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
              
              // Set theme based on stored preference or system preference
              if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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
      <body className={`${inter.className} transition-colors duration-200`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
