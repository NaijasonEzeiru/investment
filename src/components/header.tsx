"use client";

import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import AuthContext from "./auth-context";
import LocaleSwitcher from "./LocaleSwitcher";
import { Button } from "./ui/button";

export default function Header() {
  const t = useTranslations("Navigation");
  const [openNav, setOpenNav] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setOpenNav(false);
  }, [pathName]);

  return (
    <header className="fixed w-full bg-white backdrop-blur-sm z-40 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer">
            <Link href="/" className="text-2xl font-bold text-blue-700">
              CuratedHub
            </Link>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpenNav(!openNav)}
            aria-expanded={openNav}
            className="lg:hidden"
          >
            <svg
              width="9"
              height="34"
              viewBox="0 0 9 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.417969 16.9987C0.417969 18.1038 0.848177 19.1636 1.61395 19.945C2.37972 20.7264 3.41833 21.1654 4.5013 21.1654C5.58427 21.1654 6.62288 20.7264 7.38865 19.945C8.15443 19.1636 8.58463 18.1038 8.58463 16.9987C8.58463 15.8936 8.15443 14.8338 7.38865 14.0524C6.62288 13.271 5.58427 12.832 4.5013 12.832C3.41833 12.832 2.37972 13.271 1.61395 14.0524C0.848177 14.8338 0.417969 15.8936 0.417969 16.9987ZM0.417969 4.4987C0.417969 5.60377 0.848177 6.66357 1.61395 7.44498C2.37972 8.22638 3.41833 8.66536 4.5013 8.66536C5.58427 8.66536 6.62288 8.22638 7.38865 7.44498C8.15443 6.66357 8.58463 5.60377 8.58463 4.4987C8.58463 3.39363 8.15443 2.33382 7.38865 1.55242C6.62288 0.771018 5.58427 0.332031 4.5013 0.332031C3.41833 0.332031 2.37972 0.771018 1.61395 1.55242C0.848177 2.33382 0.417969 3.39363 0.417969 4.4987ZM0.417969 29.4987C0.417969 30.6038 0.848177 31.6636 1.61395 32.445C2.37972 33.2264 3.41833 33.6654 4.5013 33.6654C5.58427 33.6654 6.62288 33.2264 7.38865 32.445C8.15443 31.6636 8.58463 30.6038 8.58463 29.4987C8.58463 28.3936 8.15443 27.3338 7.38865 26.5524C6.62288 25.771 5.58427 25.332 4.5013 25.332C3.41833 25.332 2.37972 25.771 1.61395 26.5524C0.848177 27.3338 0.417969 28.3936 0.417969 29.4987Z"
                fill="currentColor"
              />
            </svg>
          </Button>
          <div
            className={`${
              !openNav && "-translate-y-full"
            } flex bg-background text-foreground items-center justify-center lg:h-auto bg-customRed py-6 px-14 lg:px-0 lg:gap-6 w-full left-0 fixed h-screen text-xl gap-20 transition-transform top-0 lg:w-auto lg:static lg:translate-y-0 lg:py-0 lg:text-lg flex-col lg:flex-row z-50 duration-500`}
          >
            <button
              aria-expanded={openNav}
              onClick={() => setOpenNav((prev) => !prev)}
              id="close"
              className="text-4xl right-12 top-12 fixed lg:hidden"
            >
              X
            </button>
            {/* <Link href="#" className="px-3 opacity-70 hover:opacity-100">
              Hotels
            </Link>
            <Link href="#" className="px-3 opacity-70 hover:opacity-100">
              NFTs
            </Link> */}
            <Link href="/work" className="px-3 opacity-70 hover:opacity-100">
              {t("work")}
            </Link>
            <Link
              href="/about-us"
              className="px-3 opacity-70 hover:opacity-100"
            >
              {t("about")}
            </Link>
            <AuthButton />
            <LocaleSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}

function AuthButton() {
  const t = useTranslations("Navigation");
  const { user, signingOut, authChecking, signout } = useContext(AuthContext);

  if (authChecking) {
    return (
      <Button
        disabled
        className="text-white px-4 py-2 rounded-lg transition-colors lg:w-fit w-full text-center"
      >
        <Loader className="animate-spin" />
      </Button>
    );
  } else if (user) {
    return (
      <>
        <Link href="/dashboard" className="px-3 opacity-70 hover:opacity-100">
          {t("dashboard")}
        </Link>
        {user?.role == "admin" && (
          <Link
            href="/admin/users"
            className="px-3 opacity-70 hover:opacity-100"
          >
            {t("admin")}
          </Link>
        )}
        <Button
          onClick={signout}
          disabled={signingOut}
          className="text-white px-4 py-2 rounded-lg transition-colors lg:w-fit w-full text-center"
        >
          {signingOut ? <Loader className="animate-spin" /> : t("logout")}
        </Button>
      </>
    );
  } else if (!user) {
    return (
      <>
        <Link
          href="/login"
          className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
        >
          {t("login")}
        </Link>
        <Link
          href="/signup"
          className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
        >
          {t("signup")}
        </Link>
      </>
    );
  } else {
    return <p>How</p>;
  }
}
