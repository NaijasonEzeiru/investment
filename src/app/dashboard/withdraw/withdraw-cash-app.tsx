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

const pinSchema = z.object({
  transferPin: z.string().length(4, { message: "Must be 4 digits long" }),
});

export default function WithdrawCashApp({
  amount,
  address,
  pin,
}: {
  amount: number;
  address?: string | null;
  pin?: string | null;
}) {
  const [openAlert, setOpenAlert] = useState(false);

  const form = useForm<z.infer<typeof pinSchema>>({
    resolver: zodResolver(pinSchema),
  });

  async function onSubmit(data: z.infer<typeof pinSchema>) {
    await setTimeout(() => {}, 3000);
    if (data.transferPin != pin) {
      form.setError("transferPin", {
        message: "Incorrect pin",
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
            <AlertTitle>Ooops!</AlertTitle>
            <AlertDescription className="text-black">
              <p>You have not added your CashApp/Wave withdrawal details.</p>
              <p>
                <Link
                  href="/dashboard/settings"
                  className="text-blue-700 underline"
                >
                  Click here
                </Link>{" "}
                to go to settings page and add your CashApp/Wave withdrawal
                details.
              </p>
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Please confirm!</AlertDialogTitle>
                  <AlertDialogDescription>
                    You are about to send{" "}
                    <span className="font-bold">${amount}</span> to this
                    account: {address}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
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
                      <FormLabel>Transfer pin</FormLabel>
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
                <Button className="w-full">Withdraw</Button>
              </form>
            </Form>
          </>
        )}
      </CardContent>
    </Card>
  );
}
