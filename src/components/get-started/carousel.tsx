import { Clock, Loader } from "lucide-react";
import Image from "next/image";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import AuthContext, { TUser } from "../auth-context";
import { Listing } from "@/db/schema/schema";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { VIPTASKS } from "@/lib/variables";
import { useTranslations } from "next-intl";

export default function RemoteWorkerCarousel({ user }: { user: TUser }) {
  const { checkUserLoggedIn, authChecking } = useContext(AuthContext);
  const t = useTranslations("RemoteWorkerCarousel");
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
    if (user) {
      try {
        const res = await fetch(
          `/api/listings?len=${VIPTASKS[user?.level - 1]}`
        );
        const data = (await res.json()) as { l: Listing[] };
        setLoadingListings(false);
        if (res.ok) {
          console.log({ data });
          const l = data.l.filter((val) => !user?.reviewed.includes(val.id));
          console.log({ l: user?.reviewed });
          setListings(l);
        } else {
          toast(t("unable"), {
            description: t("err"),
          });
        }
      } catch (error) {
        setLoadingListings(false);
        console.log(t("listings-failed"), error);
      }
    }
    setLoadingListings(false);
  }

  async function submitTask(id: string) {
    setLoading(true);
    if (user && +user?.balance < VIPTASKS[user.level - 1].cost) {
      toast.error(t("not-submit"), {
        description: t("insufficient"),
      });
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          userId: user?.id,
          cost: user && VIPTASKS[user?.level - 1].cost,
          reward: user && VIPTASKS[user?.level - 1].reward,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        // @ts-expect-error: Should not be undefined
        checkUserLoggedIn();
        toast(data?.message);
      } else {
        toast.error(t("not-submit"), {
          description: t("err"),
        });
      }
    } catch (error) {
      toast.error(t("not-submit"), {
        description: t("err"),
      });
      console.log("error", error);
    }
    setLoading(false);
  }

  if (user && VIPTASKS[user?.level - 1].tasks == user.completedTasks) {
    return (
      <p className="px-2">
        {t("completed")} <br /> {t("contact-admin")} -{" "}
        <a
          href="mailto:admin@curatedhub.org"
          className="font-semibold text-lg hover:underline text-primary"
        >
          admin@curatedhub.org
        </a>{" "}
        {t("upgrade")}
      </p>
    );
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
                        <p>{t("review-hotel")}</p>
                        <p className="text-xs">
                          {t("location")}: {listing.state}, {listing.country}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>{t("review-NFT")}</p>
                        <p className="text-xs">
                          {t("category")}: {listing.category}
                        </p>
                      </>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="flex gap-1 items-center">
                        <p className="text-xl text-green-700">$</p>
                        <span>
                          <p className="text-xs">{t("earnings")}</p>
                          <p className="text-lg font-bold">
                            ${user && VIPTASKS[user.level - 1].reward}
                          </p>
                        </span>
                      </span>
                      <span className="flex gap-1 items-center">
                        <Clock size={20} className="text-green-700" />
                        <span>
                          <p className="text-xs">{t("duration")}</p>
                          <p className="text-lg font-bold">2-3 {t("hours")}</p>
                        </span>
                      </span>
                      <span className="flex gap-1 items-center">
                        <p className="text-xl text-green-700">$</p>
                        <span>
                          <p className="text-xs">{t("price")}</p>
                          <p className="text-lg font-bold">
                            ${user && VIPTASKS[user.level - 1].cost}
                          </p>
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
                      {t("submit-order")}
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" /> */}
        </Carousel>
      ) : (
        <Card className="bg-gradient-to-br from-fuchsia-700 via-fuchsia-600 to-fuchsia-700 text-white">
          <CardHeader className="text-centerr">
            <CardTitle>{t("reviewed-all")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("check-back")}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
