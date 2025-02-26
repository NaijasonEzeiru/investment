import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function PayCashApp({ amount }: { amount: number }) {
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
        <CardTitle>Pay with CashApp</CardTitle>
        <CardDescription>
          To complete this payment, send exactly this amount to the account
          details below
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card className="p-3 space-y-4">
          <div className="">
            <p className="text-lg font-medium">BANK NAME</p>
            <p>Cash App</p>
          </div>
          <div className="">
            <p className="text-lg font-medium">Account NAME</p>
            <p>Jane Doe</p>
          </div>
          <div className="">
            <p className="text-lg font-medium">ACCOUNT NUMBER</p>
            <span className="flex justify-between items-center">
              <p>00456177112</p>{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      onClick={() => {
                        copyAddress();
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
                    <p>Copy account number</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </div>
          <div className="">
            <p className="text-lg font-medium">AMOUNT</p>
            <p>${amount}</p>
          </div>
        </Card>
      </CardContent>
      <CardFooter>
        This feature requires network confirmations before crediting your
        payment. Your merchant will update you on transaction progress.
      </CardFooter>
    </Card>
  );
}
