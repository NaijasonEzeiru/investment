import { Clock } from "lucide-react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Hotel } from "@/db/schema/schema";
import { Button } from "../ui/button";

export default function RemoteWorkerCarousel() {
  const [listings, setListings] = useState<Hotel[]>([]);

  useEffect(() => {
    getListings();
  }, []);

  async function getListings() {
    try {
      const res = await fetch("/api/hotel-listing");
      const data = await res.json();
      console.log("🚀 ~ file: Listings.tsx:56 ~ data:", data);
      if (res.ok) {
        setListings(data.listings);
      } else {
        toast("Unable to fetch listings", {
          description: "Something went wrong",
        });
      }
    } catch (error) {
      console.log("get listings failed", error);
    }
  }

  return (
    <>
      <Carousel className="w-full mx-auto overflow-hidden rounded-lg">
        <CarouselContent>
          {listings?.map((listing, index) => (
            <CarouselItem key={index}>
              <div className="relative h-96">
                <Image
                  src={listing.imgUrl}
                  width={286}
                  height={214.5}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="bg-muted h-full space-y-3 p-3">
                  <h3 className="text-lg font-semibold">{listing.title}</h3>
                  <p>Review hotel amenities, quality, and overall confidence</p>
                  <p className="text-xs">
                    Location: {listing.state}, {listing.country}
                  </p>
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
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      <Button>Continue Task</Button>
    </>
  );
}
