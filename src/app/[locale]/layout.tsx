import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AuthProvider } from "@/components/auth-context";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";

export default async function LocaleLayout({
  children,
  auth,
  params,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="antialiased w-screen overflow-x-hidden min-h-screen">
        <NextIntlClientProvider>
          <AuthProvider>
            {auth}
            {children}
            <Toaster richColors toastOptions={{}} theme="light" />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
