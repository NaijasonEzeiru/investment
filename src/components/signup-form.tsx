"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import { toast } from "sonner";
import "react-phone-number-input/style.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { RegisterSchema as R } from "@/lib/zodSchema";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import AuthContext from "./auth-context";
import { useTranslations } from "next-intl";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const t = useTranslations("sign-up");
  const ze = useTranslations("ZodError");
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const RegisterSchema = R(ze);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      toast("You are already logged in");
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function onSubmit(body: z.infer<typeof RegisterSchema>) {
    console.log({ body });
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        console.log(data);
        // revalidatePath("/admin/users");
        // revalidatePath("en/admin/users");
        // revalidatePath("fr/admin/users");
        toast(t("registration-successful"), {
          description: t("please-log-in"),
        });
        router.push("/login");
      } else {
        if (data.errors) {
          console.log(data.errors);
          data.errors.forEach(
            (err: { path: "username" | "phone"; message: string }) => {
              form.setError(err.path, {
                type: "server",
                message: err.message,
              });
            }
          );
          return;
        }
        toast.error(t("registration-failed"), {
          description: t("wrong"),
        });
      }
    } catch (error) {
      toast.error(t("registration-failed"), {
        description: t("wrong"),
      });
      console.log("error", error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("welcome")}</CardTitle>
          <CardDescription>{t("your-details")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>{t("first-name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>{t("last-name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>{t("username")}</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormItem className="space-y-0.5 relative">
                    <FormLabel>{t("phone-number")}</FormLabel>
                    <FormControl>
                      <PhoneInput
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                      />
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
                    <FormLabel>{t("transfer-pin")}</FormLabel>
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
                name="referralCode"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>{t("Referral")}</FormLabel>
                    <FormControl>
                      <Input placeholder="12345abcde" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0.5 relative">
                    <FormLabel>{t("password")}</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder={t("password")}
                          {...field}
                          type={showPassword ? "text" : "password"}
                        />
                      </FormControl>
                      <Button
                        className={`absolute right-0 bottom-0 ${
                          form.formState.isSubmitting && "text-border"
                        }`}
                        disabled={form.formState.isSubmitting}
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} className="h-4 w-4" />
                        ) : (
                          <Eye size={16} className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-0.5 relative">
                    <div className="relative">
                      <FormLabel>{t("confirm-password")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("password")}
                          {...field}
                          type={showPassword ? "text" : "password"}
                        />
                      </FormControl>
                      <Button
                        className={`absolute right-0 bottom-0 ${
                          form.formState.isSubmitting && "text-border"
                        }`}
                        disabled={form.formState.isSubmitting}
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} className="h-4 w-4" />
                        ) : (
                          <Eye size={16} className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={form.formState.isSubmitting} className="w-full">
                {form.formState.isSubmitting && (
                  <Loader className="animate-spin" />
                )}
                {t("register")}
              </Button>
              <div className="text-center text-sm">
                {t("already")}{" "}
                <Link href="/login" className="underline underline-offset-4">
                  {t("login")}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        {t("agree")} <Link href="/terms-and-conditions">{t("terms")}</Link>
      </div>
    </div>
  );
}
