import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CryptoPayment } from "@/db/schema/schema";
import { Clipboard, ClipboardCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function PayBTC({ amount }: { amount: number }) {
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [wallets, setWallets] = useState<CryptoPayment[]>([]);

  console.log({ len: wallets.length });

  useEffect(() => {
    getAddresses();
  }, []);

  async function getAddresses() {
    setLoadingAddresses(true);
    try {
      const res = await fetch("/api/addresses");
      const data = (await res.json()) as { addresses: CryptoPayment[] };
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
  return (
    <Tabs defaultValue="BTC" className="w-[400px] mx-auto">
      <Card className="max-w-lg w-full">
        {loadingAddresses ? (
          <p>Loading...</p>
        ) : (
          <>
            <TabsList className={`grid w-full grid-cols-${wallets.length}`}>
              {wallets.map((val) => (
                <TabsTrigger value={val.coin} key={val.coin}>
                  {val.coin}
                </TabsTrigger>
              ))}
            </TabsList>
            {wallets.map((val) => (
              <TabsContent value={val.coin} key={val.coin}>
                <Pay amount={amount} address={val} />
              </TabsContent>
            ))}
          </>
        )}
        <CardFooter>
          <div className="hidden grid-cols-3"></div>
          This feature requires network confirmations before crediting your
          payment. Your merchant will update you on transaction progress.
        </CardFooter>
      </Card>
    </Tabs>
  );
}

const Pay = ({
  amount,
  address,
}: {
  amount: number;
  address: CryptoPayment;
}) => {
  const [copied, setCopied] = useState(false);

  function copyAddress() {
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
    navigator.clipboard.writeText(address.address);
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Pay with {address.coin}</CardTitle>
        <CardDescription>
          To complete this payment, send exactly this amount to the address
          provided
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-slate-200 flex justify-between">
          <p>{address.coin}</p>
          <p>{(amount / +address.value).toFixed(8)}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <p>Amount</p>
          <p className="">
            {(amount / +address.value).toFixed(8)}BTC (${amount})
          </p>
        </div>
        <Separator />
        {address?.imgURL && (
          <Image
            alt="wallet address"
            src={address?.imgURL}
            width={400}
            height={400}
            className="w-10/12 h-10/12 mx-auto"
          />
        )}
        <div className="rounded-full px-3 h-10 flex relative items-center bg-slate-200">
          <p className="truncate">{address.address}</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="absolute right-0 h-full rounded-l-none rounded-r-full"
                  onClick={() => {
                    copyAddress();
                  }}
                >
                  {copied ? (
                    <ClipboardCheck className="size-7" />
                  ) : (
                    <Clipboard className="size-7" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-100 text-black">
                <p>Copy address</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </>
  );
};
