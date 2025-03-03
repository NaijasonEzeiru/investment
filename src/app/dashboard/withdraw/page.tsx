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
import { PaymentSchema } from "@/lib/zodSchema";

export default function Page() {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState<"crypto" | "" | "cash-app">("");

  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      amount: 0,
    },
  });

  async function onSubmit(body: z.infer<typeof PaymentSchema>) {
    if (user && +user?.interest < body.amount) {
      form.setError("amount", {
        message: "Insufficient balance",
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
          Withdraw Funds
        </h1>
        {method == "crypto" ? (
          <Card className="w-[350px] mx-auto justify-self-center items-center">
            <CardTitle>Crypto</CardTitle>
          </Card>
        ) : (
          <Card className="w-[350px] mx-auto justify-self-center items-center">
            <CardTitle>CashApp</CardTitle>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
      <h1 className="text-xl font-semibold text-center mb-8">Withdraw Funds</h1>
      <Card className="w-[350px] mx-auto justify-self-center items-center">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <p>Withdraw Funds</p>
              <ArrowDownRight />
            </div>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-200">
            <p className="text-sm">Available amount</p>
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
                    <FormLabel>Amount to withdraw</FormLabel>
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
                    <FormLabel>Select withdrawal method</FormLabel>
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
                        <SelectItem value="cash-app">Cash App</SelectItem>
                        <SelectItem value="crypto">Crypto</SelectItem>
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
                Proceed to withdraw
              </Button>
            </form>
          </Form>
        </CardContent>
        {user && user?.level < 3 && (
          <CardFooter>You can only withdraw when you get to level 3</CardFooter>
        )}
      </Card>
    </div>
  );
}
