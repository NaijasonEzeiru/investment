"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import GetStartedIndex from ".";
import { Dialog, DialogContent } from "../ui/dialog";
import HotelBusiness from "./hotel-business";
import NFTCreator from "./nft-creator";
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
        {index == 2 && <HotelBusiness setIndex={setIndex} />}
        {index == 3 && <NFTCreator setIndex={setIndex} />}
      </DialogContent>
    </Dialog>
  );
}
