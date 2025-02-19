import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="px-2.5 md:px-6 my-10 w-full max-w-[100vw] overflow-hidden">
        {children}
      </main>
    </SidebarProvider>
  );
}
