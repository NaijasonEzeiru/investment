"use client";

import { useContext, useState } from "react";

import AuthContext from "@/components/auth-context";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PaymentSchema as P } from "@/lib/zodSchema";
import WithdrawCrypto from "./withdraw-crypto";
import WithdrawCashApp from "./withdraw-cash-app";
import { useTranslations } from "next-intl";

export default function Page() {
  const { user } = useContext(AuthContext);
  const t = useTranslations("Withdraw");
  const ze = useTranslations("ZodError");
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState<"crypto" | "" | "cashapp/wave">("");
  const PaymentSchema = P(ze);

  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      amount: 0,
    },
  });

  async function onSubmit(body: z.infer<typeof PaymentSchema>) {
    if (user && +user?.interest < body.amount) {
      form.setError("amount", {
        message: t("insufficient"),
      });
      return;
    }
    setAmount(body.amount);
    setMethod(body.method);
  }

  if (amount && method) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-xl font-semibold text-center mb-10">
          {t("withdraw")}
        </h1>
        {!(method == "crypto") ? (
          <WithdrawCashApp
            amount={amount}
            pin={user?.transferPin}
            address={user?.tag}
          />
        ) : (
          <WithdrawCrypto
            amount={amount}
            pin={user?.transferPin}
            address={user?.address}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
      <h1 className="text-xl font-semibold text-center mb-8">
        {t("withdraw")}
      </h1>
      <Card className="w-[350px] mx-auto justify-self-center items-center">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <p>{t("withdraw")}</p>
              <ArrowDownRight />
            </div>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-200">
            <p className="text-sm">{t("available")}</p>
            <p className="text-lg">
              ${user && (+user?.interest).toLocaleString()}
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>{t("amount")}</FormLabel>
                    <FormControl>
                      <span className="flex items-center gap-2">
                        $<Input {...field} />
                      </span>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("select")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cashapp/wave">
                          Cashapp/Wave
                        </SelectItem>
                        <SelectItem value="crypto">{t("crypto")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mx-auto block"
                disabled={!!(user && user?.level < 3)}
              >
                {t("proceed")}
              </Button>
            </form>
          </Form>
        </CardContent>
        {user && user?.level < 3 && (
          <CardFooter>{t("no-withdrawal")}</CardFooter>
        )}
      </Card>
    </div>
  );
}
