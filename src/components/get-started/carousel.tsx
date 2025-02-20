import { Clock, HeartCrack, Loader } from "lucide-react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import AuthContext, { TUser } from "../auth-context";
import { Listing } from "@/db/schema/schema";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { VIPTASKS } from "@/lib/variables";

export default function RemoteWorkerCarousel({ user }: { user: TUser }) {
  const { checkUserLoggedIn, authChecking } = useContext(AuthContext);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingListings, setLoadingListings] = useState(false);

  useEffect(() => {
    if (user) {
      getListings();
    }
  }, [user]);

  async function getListings() {
    setLoadingListings(true);
    try {
      const res = await fetch(`/api/listings?len=VIPTASKS[user.level - 1]`);
      const data = (await res.json()) as { listings: Listing[] };
      setLoadingListings(false);
      if (res.ok) {
        const l = data.listings.filter(
          (val) => !user?.reviewed.includes(val.id)
        );
        console.log({ l: user?.reviewed });
        setListings(l);
      } else {
        toast("Unable to get listings", {
          description: "Something went wrong",
        });
      }
    } catch (error) {
      setLoadingListings(false);
      console.log("get listings failed", error);
    }
  }

  async function submitTask(id: string) {
    setLoading(true);
    if (user && user?.balance < VIPTASKS[user.level - 1]) {
      toast.error("Unable to submit order", {
        description: "Balance insufficient",
      });
      setLoading(false);
      return;
    }
    if (user && user?.completedTasks == VIPTASKS[user.level - 1]) {
      try {
        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, userId: user?.id, upgrade: true }),
        });
        const data = await res.json();
        if (res.ok) {
          // @ts-expect-error: Should not be undefined
          checkUserLoggedIn();
          toast.success(data?.message);
        } else {
          toast.error("Could not submit order", {
            description: "Something went wrong",
          });
        }
      } catch (error) {
        toast.error("Could not submit order", {
          description: "Something went wrong",
        });
        console.log("error", error);
      }
      setLoading(false);
      return;
    }
    // const newListings = listings.unshift()
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, userId: user?.id }),
      });
      const data = await res.json();
      if (res.ok) {
        // @ts-expect-error: Should not be undefined
        checkUserLoggedIn();
        toast(data?.message);
      } else {
        toast.error("Could not submit order", {
          description: "Something went wrong",
        });
      }
    } catch (error) {
      toast.error("Could not submit order", {
        description: "Something went wrong",
      });
      console.log("error", error);
    }
    setLoading(false);
  }

  if (loadingListings) {
    return (
      <div className="relative h-[430px]">
        <Skeleton className="w-full h-48" />
        <div className="space-y-3 p-3 bg-muted">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-6 w-10/12" />
          <Skeleton className="h-4 w-40" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-11 w-24" />
            <Skeleton className="h-11 w-24" />
            <Skeleton className="h-11 w-24" />
          </div>
          <Skeleton className="w-full h-9" />
        </div>
      </div>
    );
  }

  return (
    <>
      {listings.length ? (
        <Carousel className="w-full mx-auto overflow-hidden rounded-lg">
          {/* TODO: add skeleton when loading */}
          <CarouselContent>
            {listings?.map((listing, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[430px]">
                  <Image
                    src={listing.imgUrl}
                    width={286}
                    height={214.5}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="bg-muted h-full space-y-3 p-3">
                    <h3 className="text-lg font-semibold">{listing.title}</h3>
                    {listing.type === "hotel" ? (
                      <>
                        {" "}
                        <p>
                          Review hotel amenities, quality, and overall
                          confidence
                        </p>
                        <p className="text-xs">
                          Location: {listing.state}, {listing.country}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Review NFT visual appeal, originality, and
                          craftmanship
                        </p>
                        <p className="text-xs">Category: {listing.category}</p>
                      </>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="flex gap-1 items-center">
                        <p className="text-xl text-green-700">$</p>
                        <span>
                          <p className="text-xs">Earnings</p>
                          <p className="text-lg font-bold">$45</p>
                        </span>
                      </span>
                      <span className="flex gap-1 items-center">
                        <Clock size={20} className="text-green-700" />
                        <span>
                          <p className="text-xs">Duration</p>
                          <p className="text-lg font-bold">2-3 hours</p>
                        </span>
                      </span>
                      <span className="flex gap-1 items-center">
                        <p className="text-xl text-green-700">$</p>
                        <span>
                          <p className="text-xs">Price</p>
                          <p className="text-lg font-bold">$30</p>
                        </span>
                      </span>
                    </div>
                    <Button
                      onClick={() => submitTask(listing.id)}
                      disabled={loading || authChecking}
                      className="w-full mt-6"
                    >
                      {(loading || authChecking) && (
                        <Loader className="animate-spin" />
                      )}
                      Continue Task
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      ) : (
        <Card className="bg-gradient-to-br from-fuchsia-700 via-fuchsia-600 to-fuchsia-700 text-white">
          <CardHeader className="text-centerr">
            <CardTitle>You have reviewed all available listings</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <p>Check back later for new listings</p>
            <HeartCrack />
          </CardContent>
        </Card>
      )}
      {/* <Button onClick={submitTask} disabled={loading || authChecking}>
        {(loading || authChecking) && <Loader className="animate-spin" />}
        Continue Task
      </Button> */}
    </>
  );
}
