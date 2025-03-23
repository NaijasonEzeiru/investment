import { Home, Paintbrush, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

export default function GetStartedIndex({
  setIndex,
}: {
  setIndex: Dispatch<SetStateAction<number>>;
}) {
  const t = useTranslations("GetStartedIndex");

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-left">{t("started")}</DialogTitle>
        <DialogDescription className="text-left">
          {t("started-desc")}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <Button
          className="w-full gap-3 py-10 justify-start hover:bg-primary/15"
          variant="outline"
          onClick={() => setIndex(1)}
        >
          <Users className="text-primary" />
          <span className="flex flex-col items-start">
            <p>{t("remote")}</p>
            <p className="text-sm font-extralight whitespace-break-spaces text-left">
              {t("rate")}
            </p>
          </span>
        </Button>
        <Button
          className="w-full gap-3 py-10 justify-start hover:bg-primary/15"
          variant="outline"
          onClick={() => setIndex(2)}
        >
          <Home className="text-lime-700" />
          <span className="flex flex-col items-start">
            <p>{t("hotel")}</p>
            <p className="text-sm font-extralight whitespace-break-spaces text-left">
              {t("list")}
            </p>
          </span>
        </Button>
        <Button
          className="w-full gap-3 py-10 justify-start hover:bg-primary/15"
          variant="outline"
          onClick={() => setIndex(3)}
        >
          <Paintbrush className="text-rose-700" />
          <span className="flex flex-col items-start">
            <p>{t("NFT-creator")}</p>
            <p className="text-sm font-extralight whitespace-break-spaces text-left">
              {t("showcase")}
            </p>
          </span>
        </Button>
      </div>
    </>
  );
}
