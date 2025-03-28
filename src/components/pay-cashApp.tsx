import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppPayment } from "@/db/schema/schema";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function PayCashApp({ amount }: { amount: number }) {
  const t = useTranslations("Deposit");
  const [copied, setCopied] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [wallets, setWallets] = useState<AppPayment[]>([]);

  console.log({ len: wallets.length });

  useEffect(() => {
    getAddresses();
  }, []);

  async function getAddresses() {
    setLoadingAddresses(true);
    try {
      const res = await fetch("/api/addresses/app-addresses");
      const data = (await res.json()) as { addresses: AppPayment[] };
      setLoadingAddresses(false);
      if (res.ok) {
        console.log({ data });
        setWallets(data.addresses);
      } else {
        toast("Unable to get addresses", {
          description: "Something went wrong",
        });
      }
    } catch (error) {
      setLoadingAddresses(false);
      console.log({ error });
    }

    setLoadingAddresses(false);
  }

  function copyAddress(val: string) {
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
    navigator.clipboard.writeText(val);
  }

  return (
    <Tabs defaultValue="cashApp" className="w-[400px] mx-auto">
      <Card className="max-w-lg w-full">
        {loadingAddresses ? (
          <>
            <Separator className="h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full" />
            <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <div className="flex flex-col space-y-1.5 p-6">
                <Separator className="w-36 h-4" />
                <Separator className="w-full h-10" />
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="space-y-1">
                  <Separator className="w-32 h-4" />
                  <Separator className="w-48 h-4" />
                </div>
                <div>
                  <Separator className="w-32 h-4" />
                  <span className="flex justify-between items-center">
                    <Separator className="w-56 h-4" />
                    <Separator className="size-6 bg-secondary rounded" />
                  </span>
                </div>
                <div className="space-y-1">
                  <Separator className="w-40 h-4" />
                  <Separator className="w-32 h-4" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <TabsList className={`grid w-full grid-cols-${wallets.length}`}>
              {wallets.map((val) => (
                <TabsTrigger
                  value={val.app}
                  key={val.app}
                  className="uppercase"
                >
                  {val.app}
                </TabsTrigger>
              ))}
            </TabsList>
            {wallets.map((val) => (
              <TabsContent value={val.app} key={val.app}>
                <CardHeader>
                  <CardTitle>
                    {t("pay-with")} <span className="uppercase">{val.app}</span>
                  </CardTitle>
                  <CardDescription>
                    {t("send")} <span className="uppercase">{val.app}</span>{" "}
                    {t("below")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="">
                    <p className="text-lg font-medium">{t("APP")}</p>
                    <p>Cash App</p>
                  </div>
                  <div className="">
                    <p className="text-lg font-medium">
                      {val.app == "wave" ? t("NUMBER") : t("TAG")}
                    </p>
                    <span className="flex justify-between items-center">
                      <p>{val.tag}</p>{" "}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              onClick={() => {
                                copyAddress(val.tag);
                              }}
                              variant="secondary"
                            >
                              {copied ? (
                                <ClipboardCheck className="size-8" />
                              ) : (
                                <Clipboard className="size-8" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-slate-100 text-black">
                            <p>{t("copy")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  </div>
                  <div className="">
                    <p className="text-lg font-medium">{t("AMOUNT")}</p>
                    <p>${amount}</p>
                  </div>
                </CardContent>
              </TabsContent>
            ))}
          </>
        )}
        {/* <CardFooter>
          This feature requires network confirmations before crediting your
          payment. Your merchant will update you on transaction progress.
        </CardFooter> */}
      </Card>
    </Tabs>
  );
}
