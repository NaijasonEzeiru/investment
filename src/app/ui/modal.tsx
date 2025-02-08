"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function handleOpenChange() {
    router.replace("/");
  }

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-[90vw] sm:max-w-md min-w-fit rounded-xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Login modal</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
