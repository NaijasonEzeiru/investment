"use client";

import { Home, User, Menu, Circle, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import Link from "next/link";
import Header from "./header";
import { usePathname } from "next/navigation";

const menu = [
  {
    id: 1,
    name: "Dashboard",
    href: `/dashboard`,
    icon: <Home className="h-4 w-4" />,
    iconMobile: <Home className="h-5 w-5" />,
  },
  {
    id: 2,
    name: "Profile",
    href: `/dashboard/profile`,
    icon: <User className="h-4 w-4" />,
    iconMobile: <User className="h-5 w-5" />,
  },
  {
    id: 3,
    name: "Deposit",
    href: `/dashboard/deposit`,
    icon: <ArrowUp className="h-4 w-4" />,
    iconMobile: <ArrowUp className="h-5 w-5" />,
  },
  {
    id: 4,
    name: "Withdraw",
    href: `/dashboard/withdraw`,
    icon: <ArrowDown className="h-4 w-4" />,
    iconMobile: <ArrowDown className="h-5 w-5" />,
  },
  // {
  //   id: 5,
  //   name: "Settings",
  //   href: `/dashboard/Settings`,
  //   icon: <Settings className="h-4 w-4" />,
  //   iconMobile: <Settings className="h-5 w-5" />,
  // },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [openNav, setOpenNav] = useState(false);
  const pathName = usePathname();
  console.log({ pathName });

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-primary md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 fixed text-primary-foreground w-[220px] lg:w-[280px]">
          <div className="flex h-14 items-center border-b lg:h-[60px] border-muted-foreground bg-background">
            <span className="flex px-4 lg:px-6 w-full h-full items-center gap-2 font-semibold bg-muted/40 text-foreground">
              {/* <Circle className="h-6 w-6" /> */}
              <Link href="/">CuratedHub</Link>
            </span>
          </div>
          <div className="flex-1 mt-4">
            <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
              {menu.map((menu) => (
                <Link
                  key={menu.id}
                  href={menu.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-blue-700 ${
                    pathName == menu.href && "bg-blue-500"
                  }`}
                >
                  {menu.icon}
                  {menu.name}
                </Link>
              ))}
            </nav>
          </div>
          <span className="gap-1 mt-auto text-[10px] py-7 px-5 lg:px-7 font-light flex flex-col">
            <p className="font-bold">CuratedHub</p>
            <p>All Rights Reserved ©2024</p>
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between lg:justify-end">
          <Sheet open={openNav} onOpenChange={setOpenNav}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />

                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col bg-primary text-primary-foreground"
            >
              <SheetHeader className="sr-only">Navigation bar</SheetHeader>
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Circle className="h-6 w-6" />
                  <span className="sr-only">Institution&apos;s logo</span>
                  <span>CuratedHub</span>
                </Link>
                {menu.map((menu) => (
                  <Link
                    key={menu.id}
                    href={menu.href}
                    onClick={() => setOpenNav(false)}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 mt-4 hover:bg-blue-700 ${
                      pathName == menu.href && "bg-blue-500"
                    }`}
                  >
                    {menu.iconMobile}
                    {menu.name}
                  </Link>
                ))}
              </nav>
              <span className="gap-1 mt-auto text-xs pt-7 px-3 items-center font-light flex flex-col w-fit">
                <p className="font-bold">CuratedHub</p>
                <p>All Rights Reserved ©2024</p>
              </span>
            </SheetContent>
          </Sheet>
          <Header />
        </header>
        <main className="flex-1 p-4 lg:gap-6 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
