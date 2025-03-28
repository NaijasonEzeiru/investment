import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { AlertCircle, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { pinSchema as p } from "@/lib/zodSchema";

export default function WithdrawCashApp({
  amount,
  address,
  pin,
}: {
  amount: number;
  address?: string | null;
  pin?: string | null;
}) {
  const t = useTranslations("Withdraw");
  const ze = useTranslations("ZodError");
  const [openAlert, setOpenAlert] = useState(false);
  const pinSchema = p(ze);

  const form = useForm<z.infer<typeof pinSchema>>({
    resolver: zodResolver(pinSchema),
  });

  async function onSubmit(data: z.infer<typeof pinSchema>) {
    await setTimeout(() => {}, 3000);
    if (data.transferPin != pin) {
      form.setError("transferPin", {
        message: t("incorrect"),
      });
    } else {
      setOpenAlert(true);
    }
  }

  return (
    <Card className="w-[350px] mx-auto justify-self-center items-center">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <p>Cashapp/Wave</p>
            <ArrowDownRight />
          </div>
        </CardTitle>{" "}
      </CardHeader>
      <CardContent className="space-y-4">
        {!address ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t("ooops!")}</AlertTitle>
            <AlertDescription className="text-black">
              <p>{t("not-added")}</p>
              <p>
                <Link
                  href="/dashboard/settings"
                  className="text-blue-700 underline"
                >
                  {t("click-here")}
                </Link>{" "}
                {t("go-to-settings")}
              </p>
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("confirm")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("about-to-send")}{" "}
                    <span className="font-bold">${amount}</span>
                    {t("account")} {address}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                  <AlertDialogAction>{t("continue")}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="transferPin"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormLabel>{t("pin")}</FormLabel>
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
                <Button className="w-full">{t("Withdraw")}</Button>
              </form>
            </Form>
          </>
        )}
      </CardContent>
    </Card>
  );
}
