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
import { useTranslations } from "next-intl";
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
  const t = useTranslations("RemoteWorker");

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
        <DialogTitle className="text-left">{t("title")}</DialogTitle>
        {/* <DialogDescription className="text-left">
          Choose how you will like to participate in our platform
        </DialogDescription> */}
      </DialogHeader>
      <div className="grid gap-4 mt-3 max-w-[90vw]">
        <span>
          <h5 className="text-lg font-semibold">{t("available-tasks")}</h5>
          <p className="text-sm">{t("review")}</p>
        </span>
        <Card className="bg-gradient-to-br from-violet-700 via-violet-600 to-violet-700 text-white">
          <CardHeader className="text-centerr">
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <Star className="text-yellow-400" size={18} fill="yellow" />
                {t("VIP")}
                {user?.level} {t("progress")}
              </span>
              <p className="text-xs px-3 py-1 rounded-full bg-violet-300/35 font-extralight">
                {t("level")}: {t("VIP")} {user?.level}
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3 flex-col md:flex-row">
              <span className="p-4 flex justify-between items-center rounded-lg w-full bg-violet-300/35">
                <span>
                  <p className="text-xs font-light">{t("completed")}</p>
                  <p>
                    {user?.completedTasks} {t("tasks")}
                  </p>
                </span>
                <Check className="p-1 border rounded-full border-white" />
              </span>
              <span className="p-4 flex justify-between items-center rounded-lg w-full bg-violet-300/35">
                <span>
                  <p className="text-xs font-light">{t("remaining")}</p>
                  {user ? (
                    <p>
                      {VIPTASKS[user.level - 1].tasks - user?.completedTasks}{" "}
                      {t("tasks")}
                    </p>
                  ) : (
                    <p></p>
                  )}
                </span>
                <Loader className="p-1 border rounded-full border-white" />
              </span>
            </div>
            <div className="">
              <p className="text-xs font-light">{t("progress")}</p>
              <Progress
                value={
                  user
                    ? (user?.completedTasks / VIPTASKS[user.level - 1].tasks) *
                      100
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
              {t("return-profits")}
              <TrendingUp />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="gap-3 grid md:grid-cols-2">
              <span className="p-4 grid gap-1.5 rounded-lg w-full bg-purple-300/35">
                <span className="flex items-center gap-1">
                  <DollarSign size={12} />
                  <p className="text-xs font-light">{t("amount-available")}</p>
                </span>
                <p>${user && (+user?.balance).toLocaleString()}</p>
                <i className="text-xs font-light whitespace-nowrap">
                  {t("based")}
                </i>
              </span>
              <span className="p-4 grid gap-1.5 rounded-lg w-full bg-purple-300/35">
                <span className="flex items-center gap-1">
                  <TrendingUp size={12} />
                  <p className="text-xs font-light">{t("profit-potential")}</p>
                </span>
                <p>
                  $
                  {user &&
                    (
                      VIPTASKS[user.level - 1].tasks *
                      VIPTASKS[user.level - 1].reward
                    ).toLocaleString()}
                </p>
                <i className="text-xs font-light whitespace-nowrap">
                  {t("today")}
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
