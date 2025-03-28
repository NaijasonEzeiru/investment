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
import { toast } from "sonner";
import CryptoAddress from "./add-crypto-address";
import CashAppAddress from "./add-cashapp-address";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ChangePinSchema as CPS } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import AuthContext from "@/components/auth-context";

export default function Page() {
  const t = useTranslations("Settings");
  const ze = useTranslations("ZodError");
  const { user } = useContext(AuthContext);
  const ChangePinSchema = CPS(ze);
  const form = useForm<z.infer<typeof ChangePinSchema>>({
    resolver: zodResolver(ChangePinSchema),
  });

  async function changePin(e: z.infer<typeof ChangePinSchema>) {
    // TODO
    if (e.oldPin != user?.transferPin) {
      toast.error(t("incorrect"), {
        description: t("contact"),
        duration: 10000,
      });
    }
    try {
      const res = await fetch(`/api/user/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transferPin: e.transferPin }),
      });
      const data = await res.json();

      if (res.ok) {
        console.log(data);
        toast(t("updated"));
      } else {
        toast.error(t("failed"), {
          description: t("wrong"),
        });
      }
    } catch (error) {
      toast.error(t("failed"), {
        description: t("wrong"),
      });
      console.log("error", error);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-xl font-semibold text-center mb-10">
        {t("settings")}
      </h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{t("change-withdrawal-pin")}</AccordionTrigger>
          <AccordionContent>
            <Card className="w-fit mx-auto">
              <CardHeader>
                <CardTitle>{t("change-pin")}</CardTitle>
                <CardDescription>{t("sensitive")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(changePin)}
                    className="flex gap-4 flex-wrap items-end"
                  >
                    <FormField
                      control={form.control}
                      name="oldPin"
                      render={({ field }) => (
                        <FormItem className="space-y-0.5">
                          <FormLabel>{t("old-pin")}</FormLabel>
                          <FormControl>
                            <InputOTP
                              maxLength={4}
                              {...field}
                              inputMode="numeric"
                              pattern={`^[0-9]*$`}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transferPin"
                      render={({ field }) => (
                        <FormItem className="space-y-0.5">
                          <FormLabel>{t("new-pin")}</FormLabel>
                          <FormControl>
                            <InputOTP
                              maxLength={4}
                              {...field}
                              inputMode="numeric"
                              pattern={`^[0-9]*$`}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button>{t("change-pin")}</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>{t("withdraw-details")}</AccordionTrigger>
          <AccordionContent>
            <Tabs defaultValue="crypto" className="w-[400px] mx-auto">
              <Card className="max-w-lg w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="crypto">{t("crypto")}</TabsTrigger>
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
