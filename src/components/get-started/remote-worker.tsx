"use client";

import { VIPTASKS } from "@/lib/variables";
import {
  ArrowLeft,
  Check,
  DollarSign,
  Loader,
  Star,
  TrendingUp,
} from "lucide-react";
import { Dispatch, SetStateAction, useContext } from "react";

import AuthContext from "../auth-context";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Progress } from "../ui/progress";
import RemoteWorkerCarousel from "./carousel";

export default function RemoteWorker({
  setIndex,
}: {
  setIndex: Dispatch<SetStateAction<number>>;
}) {
  const { user } = useContext(AuthContext);

  console.log({ user });

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
              <p className="text-xs px-3 py-1 rounded-full bg-violet-300/35 font-extralight">
                Level: VIP {user?.level}
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3 flex-col md:flex-row">
              <span className="p-4 flex justify-between items-center rounded-lg w-full bg-violet-300/35">
                <span>
                  <p className="text-xs font-light">Completed</p>
                  <p>{user?.completedTasks} Tasks</p>
                </span>
                <Check className="p-1 border rounded-full border-white" />
              </span>
              <span className="p-4 flex justify-between items-center rounded-lg w-full bg-violet-300/35">
                <span>
                  <p className="text-xs font-light">Remaining</p>
                  {user ? (
                    <p>
                      {VIPTASKS[user.level - 1] - user?.completedTasks} Tasks
                    </p>
                  ) : (
                    <p></p>
                  )}
                </span>
                <Loader className="p-1 border rounded-full border-white" />
              </span>
            </div>
            <div className="">
              <p className="text-xs font-light">Progress</p>
              <Progress
                value={
                  user
                    ? (user?.completedTasks / VIPTASKS[user.level - 1]) * 100
                    : 0
                }
                className="bg-violet-400 rounded w-full"
                indicatorColor="#9ce2b6"
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
                  <p className="text-xs font-light">Amount Available</p>
                </span>
                <p>${user?.balance.toLocaleString()}</p>
                <i className="text-xs font-light whitespace-nowrap">
                  Based on completed tasks
                </i>
              </span>
              <span className="p-4 grid gap-1.5 rounded-lg w-full bg-purple-300/35">
                <span className="flex items-center gap-1">
                  <TrendingUp size={12} />
                  <p className="text-xs font-light">Profit Potential</p>
                </span>
                <p>$1,350</p>
                <i className="text-xs font-light whitespace-nowrap">
                  Today&apos;s Commision
                </i>
              </span>
            </div>
          </CardContent>
        </Card>
        <RemoteWorkerCarousel user={user} />
      </div>
    </>
  );
}
