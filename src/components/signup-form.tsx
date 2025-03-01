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
import { RegisterSchema } from "@/lib/zodSchema";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import AuthContext from "./auth-context";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

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
        toast("Registration successful", { description: "Please log in" });
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
        toast.error("Registration failed", {
          description: "Something went wrong",
        });
      }
    } catch (error) {
      toast.error("Registration failed", {
        description: "Something went wrong",
      });
      console.log("error", error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Enter your details to sign up</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>First Name</FormLabel>
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
                    <FormLabel>Last Name</FormLabel>
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
                    <FormLabel>Username</FormLabel>
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
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Phone number</FormLabel>
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
              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Referral code (optional)</FormLabel>
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
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="password"
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
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password"
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
                Register
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  log in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By registering, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
