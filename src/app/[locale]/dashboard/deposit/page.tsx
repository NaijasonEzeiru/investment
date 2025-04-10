"use client";

import { useContext, useState } from "react";

import AuthContext from "@/components/auth-context";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PayBTC } from "@/components/pay-btc";
import { PayCashApp } from "@/components/pay-cashApp";
import { PaymentSchema as P } from "@/lib/zodSchema";
import { useTranslations } from "next-intl";

export default function Page() {
  const { user } = useContext(AuthContext);
  const t = useTranslations("Deposit");
  const ze = useTranslations("ZodError");
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState<"crypto" | "cashapp/wave">(
    "cashapp/wave"
  );

  const PaymentSchema = P(ze);

  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      amount: 0,
    },
  });

  async function onSubmit(body: z.infer<typeof PaymentSchema>) {
    // if (body.method == "") {
    //   form.setError("method", {
    //     message: "Please select a payment method",
    //   });
    // }
    setAmount(body.amount);
    setMethod(body.method);
  }

  if (amount && method) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-xl font-semibold text-center mb-10">
          {t("deposit")}
        </h1>
        {method == "crypto" ? (
          <PayBTC amount={amount} />
        ) : (
          <PayCashApp amount={amount} />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-xl font-semibold text-center mb-10">
        {t("deposit")}
      </h1>
      <Card className="max-w-lg w-full mx-auto">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <p>{t("deposit")}</p>
              <ArrowUpRight />
            </div>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-200">
            <p className="text-sm">{t("available-bal")}</p>
            <p className="text-lg">
              ${user && (+user?.balance).toLocaleString()}
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>{t("to-deposit")}</FormLabel>
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
                    <FormLabel>{t("Select")}</FormLabel>
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
                          Cash App/Wave
                        </SelectItem>
                        <SelectItem value="crypto">{t("crypto")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mx-auto block">{t("proceed")}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
