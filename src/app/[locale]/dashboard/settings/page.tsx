"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import CryptoAddress from "./add-crypto-address";
import CashAppAddress from "./add-cashapp-address";

export default function page() {
  async function changePin() {
    toast("You submitted the following values:", {
      description: "Page still under construction",
    });
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-xl font-semibold text-center mb-10">Settings</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Change withdrawal pin</AccordionTrigger>
          <AccordionContent>
            <Card className="w-fit mx-auto">
              <CardHeader>
                <CardTitle>Change Pin</CardTitle>
                <CardDescription>
                  Your pin is sensitive. Don&apos;t expose it to third parties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={changePin}
                  className="flex gap-4 flex-wrap items-end"
                >
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="oldpin">Old pin</Label>
                    <InputOTP
                      maxLength={4}
                      inputMode="numeric"
                      pattern={`^[0-9]*$`}
                      type="pin"
                      name="oldPin"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">New pin</Label>
                    <InputOTP
                      maxLength={4}
                      inputMode="numeric"
                      pattern={`^[0-9]*$`}
                      type="password"
                      name="pin"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button>Change pin</Button>
                </form>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Change/Add withdraw details</AccordionTrigger>
          <AccordionContent>
            <Tabs defaultValue="crypto" className="w-[400px] mx-auto">
              <Card className="max-w-lg w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  <TabsTrigger value="cashapp">CashApp/Wave</TabsTrigger>
                </TabsList>
                <TabsContent value="crypto">
                  <CryptoAddress />
                </TabsContent>
                <TabsContent value="cashapp">
                  <CashAppAddress />
                </TabsContent>
              </Card>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
