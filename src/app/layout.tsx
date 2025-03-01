import { AuthProvider } from "@/components/auth-context";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CuratedHub",
  description: "CuratedHub",
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased w-screen overflow-x-hidden min-h-screen font-[family-name:var(--font-geist-sans)]`}
      >
        <AuthProvider>
          {auth}
          {children}
          <Toaster richColors toastOptions={{}} theme="light" />
        </AuthProvider>
      </body>
    </html>
  );
}
