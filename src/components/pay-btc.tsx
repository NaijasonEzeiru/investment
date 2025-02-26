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
import { Clipboard, ClipboardCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

export function PayBTC({ amount }: { amount: number }) {
  const [copied, setCopied] = useState(false);

  function copyAddress() {
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
    // TODO: change to correct address
    navigator.clipboard.writeText("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
  }

  return (
    <Card className="max-w-lg w-full mx-auto">
      <CardHeader>
        <CardTitle>Pay with Bitcoin</CardTitle>
        <CardDescription>
          To complete this payment, send exactly this amount to the address
          provided
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-slate-200 flex justify-between">
          <p>BTC</p>
          <p>{(amount / 87000).toFixed(8)}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <p>Amount</p>
          <p className="">
            {(amount / 87000).toFixed(8)}BTC (${amount})
          </p>
        </div>
        <Separator />
        <Image
          alt="wallet address"
          src="/wallet-address.png"
          width={400}
          height={400}
          className="w-10/12 h-10/12 mx-auto"
        />
        <div className="rounded-full px-3 h-10 flex relative items-center bg-slate-200">
          <p>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</p>
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
      <CardFooter>
        This feature requires network confirmations before crediting your
        payment. Your merchant will update you on transaction progress.
      </CardFooter>
    </Card>
  );
}
