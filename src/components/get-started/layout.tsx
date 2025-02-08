"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import GetStartedIndex from ".";
import { Dialog, DialogContent } from "../ui/dialog";
import RemoteWorker from "./remote-worker";

export default function GetStarted() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  function handleOpenChange() {
    router.replace("/");
  }
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-[90vw] md:max-w-lg rounded-xl">
        {index == 0 && <GetStartedIndex setIndex={setIndex} />}
        {index == 1 && <RemoteWorker setIndex={setIndex} />}
        {index == 2 && (
          <p className="text-center text-orange-700 text-lg">Not built yet</p>
        )}
        {index == 3 && (
          <p className="text-center text-orange-700 text-lg">Not built yet</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
