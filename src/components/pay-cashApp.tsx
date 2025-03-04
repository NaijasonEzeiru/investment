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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function PayCashApp({ amount }: { amount: number }) {
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
    // TODO: change to correct address
    navigator.clipboard.writeText(val);
  }

  return (
    <Tabs defaultValue="cashApp" className="w-[400px] mx-auto">
      <Card className="max-w-lg w-full">
        {loadingAddresses ? (
          <p>Loading...</p>
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
                    Pay with <span className="uppercase">{val.app}</span>
                  </CardTitle>
                  <CardDescription>
                    To complete this payment, send exactly this amount to the{" "}
                    <span className="uppercase">{val.app}</span> details below
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="">
                    <p className="text-lg font-medium">APP</p>
                    <p>Cash App</p>
                  </div>
                  <div className="">
                    <p className="text-lg font-medium">
                      {val.app == "wave" ? "NUMBER" : "TAG"}
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
                            <p>Copy number</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  </div>
                  <div className="">
                    <p className="text-lg font-medium">AMOUNT</p>
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
