import {
  ArrowLeft,
  Check,
  Clock,
  DollarSign,
  Loader,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Progress } from "../ui/progress";

export default function RemoteWorker({
  setIndex,
}: {
  setIndex: Dispatch<SetStateAction<number>>;
}) {
  return (
    <>
      <DialogHeader>
        <Button
          size="icon"
          variant="secondary"
          className="relative bottom-3"
          onClick={() => setIndex(0)}
        >
          <ArrowLeft />
        </Button>
        <DialogTitle className="text-left">
          Remote work opportunities
        </DialogTitle>
        {/* <DialogDescription className="text-left">
          Choose how you will like to participate in our platform
        </DialogDescription> */}
      </DialogHeader>
      <div className="grid gap-4 mt-3 max-w-[90vw]">
        <span>
          <h5 className="text-lg font-semibold">Available tasks</h5>
          <p className="text-sm">
            Review and rate properties and artworks to earn rewards
          </p>
        </span>
        <Card className="bg-gradient-to-br from-violet-700 via-violet-600 to-violet-700 text-white">
          <CardHeader className="text-centerr">
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <Star className="text-yellow-400" size={18} fill="yellow" />{" "}
                VIP1 Progress
              </span>
              <p className="text-xs px-3 py-1 opacity-70 rounded-full bg-violet-300/35 font-extralight">
                Level: VIP1
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3 flex-col md:flex-row">
              <span className="p-4 flex justify-between items-center rounded-lg w-full bg-violet-300/35">
                <span>
                  <p className="text-xs font-light opacity-70">Completed</p>
                  <p>3 Tasks</p>
                </span>
                <Check className="p-1 border rounded-full border-white" />
              </span>
              <span className="p-4 flex justify-between items-center rounded-lg w-full bg-violet-300/35">
                <span>
                  <p className="text-xs font-light opacity-70">Remaining</p>
                  <p>7 Tasks</p>
                </span>
                <Loader className="p-1 border rounded-full border-white" />
              </span>
            </div>
            <div className="">
              <p className="text-xs font-light opacity-70">Progress</p>
              <Progress
                value={33}
                className="bg-violet-400 rounded w-full"
                indicatorColor="bg-green-600"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-700 text-white">
          <CardHeader className="text-centerr">
            <CardTitle className="flex justify-between items-center">
              Return Profits
              <TrendingUp />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="gap-3 grid md:grid-cols-2">
              <span className="p-4 grid gap-1.5 rounded-lg w-full bg-purple-300/35">
                <span className="flex items-center gap-1">
                  <DollarSign size={12} />
                  <p className="text-xs font-light opacity-70">
                    Amount Available
                  </p>
                </span>
                <p>$300</p>
                <i className="text-xs font-light opacity-70 whitespace-nowrap">
                  Based on completed tasks
                </i>
              </span>
              <span className="p-4 grid gap-1.5 rounded-lg w-full bg-purple-300/35">
                <span className="flex items-center gap-1">
                  <TrendingUp size={12} />
                  <p className="text-xs font-light opacity-70">
                    Profit Potential
                  </p>
                </span>
                <p>25-40%</p>
                <i className="text-xs font-light opacity-70 whitespace-nowrap">
                  Today&apos;s Commision
                </i>
              </span>
            </div>
          </CardContent>
        </Card>
        <Carousel className="w-full mx-auto overflow-hidden rounded-lg">
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="relative h-96">
                  <Image
                    src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80"
                    width={286}
                    height={214.5}
                    alt="Grand Plaza Hotel &amp; Spa"
                    className="w-full h-48 object-cover"
                  />
                  <div className="bg-muted h-full space-y-3 p-3">
                    <h3 className="text-lg font-semibold">
                      Rate Grand Plaza Hotel &amp; Spa
                    </h3>
                    <p>
                      Review hotel amenities, quality, and overall confidence
                    </p>
                    <p className="text-xs">Location: New York, USA</p>
                    <div className="flex items-center justify-between">
                      <span className="flex gap-1 items-center">
                        <p className="text-xl text-green-700">$</p>
                        <span>
                          <p className="text-xs">Earnings</p>
                          <p className="text-lg font-bold">$30-50</p>
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
      </div>
    </>
  );
}
