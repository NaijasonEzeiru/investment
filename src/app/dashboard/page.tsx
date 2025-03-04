"use client";

import { useContext, useEffect, useState } from "react";

import AuthContext from "@/components/auth-context";
import {
  CircleDollarSign,
  Clipboard,
  ClipboardCheck,
  LockOpen,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { Listing } from "@/db/schema/schema";
import ProductCard, { ProductCardSkeleton } from "@/components/productCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Page() {
  const { user } = useContext(AuthContext);
  const [loadingListings, setLoadingListings] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [copied, setCopied] = useState(false);

  function copyAddress() {
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
    navigator.clipboard.writeText(user?.upline || "");
  }

  useEffect(() => {
    if (user) {
      getListings();
    }
  }, [user]);

  async function getListings() {
    setLoadingListings(true);
    try {
      const res = await fetch("/api/listings");
      const data = (await res.json()) as { l: Listing[] };
      setLoadingListings(false);
      if (res.ok) {
        console.log({ data });
        const l = data.l.filter((val) => user?.reviewed.includes(val.id));
        console.log({ l: user?.reviewed });
        setListings(l);
      } else {
        // toast("Unable to get listings", {
        //   description: "Something went wrong",
        // });
      }
    } catch (error) {
      setLoadingListings(false);
      console.log("get listings failed", error);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <p className="text-2xl">
        <span className="text-primary font-medium">Welcome,</span>{" "}
        {user?.firstName} {user?.lastName}
      </p>
      <div className="grid auto-rows-min gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="aspect-video rounded-xl bg-muted/50 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center text-lg">
            <p>Available balance:</p> <CircleDollarSign strokeWidth={1} />
          </div>
          <p className="text-2xl font-medium">
            {user && (+user?.balance).toLocaleString()}
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center text-lg">
            <p>Interest:</p> <TrendingUp strokeWidth={1} />
          </div>
          <p className="text-2xl font-medium">
            {user && (+user?.interest).toLocaleString()}
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center text-lg">
            <p>Level:</p>
            <LockOpen strokeWidth={1} />
          </div>
          <p className="text-2xl font-medium">VIP{user?.level}</p>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center text-lg">
            <p>Referal code:</p> <UserPlus strokeWidth={1} />
          </div>
          <span className="flex justify-between items-center gap-3">
            <p className="truncate">{user?.upline}</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="p-1 rounded bg-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    onClick={() => {
                      copyAddress();
                    }}
                  >
                    {copied ? (
                      <ClipboardCheck className="size-4" />
                    ) : (
                      <Clipboard className="size-4" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-100 text-black">
                  <p>Copy referal code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </div>
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min p-3">
        <h3 className="mb-5 text-lg font-medium">Listings reviewed by you</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loadingListings && <ProductCardSkeleton />}
          {!loadingListings &&
            listings.map((listing) => (
              <ProductCard list={listing} key={listing.id} />
            ))}
        </div>
        {!loadingListings && listings.length < 1 && (
          <p>You have not reviewed any of our listings yet</p>
        )}
      </div>
    </div>
  );
}
