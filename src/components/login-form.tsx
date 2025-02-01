"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

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
import { toast } from "sonner";
import { RegisterSchema } from "@/lib/zodSchema";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = false;

  async function onSubmit(body: z.infer<typeof RegisterSchema>) {
    try {
      //   const response = await fetch(".....");
      //   if (response.error) {
      //     toast.error("Registration failed", {
      //       description: response?.error?.data?.message,
      //     });
      //   } else {
      //     toast(response.data.message);
      //   }
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
          <CardDescription>
            Enter your details to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Username/Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
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
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        type={showPassword ? "text" : "password"}
                      />
                    </FormControl>
                    <Button
                      className={`absolute right-0 bottom-0 ${
                        isLoading && "text-border"
                      }`}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} className="w-full">
                {isLoading && <Loader className="animate-spin" />}
                Login
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
