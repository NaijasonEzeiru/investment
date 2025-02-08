"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { login } from "@/actions/actions";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [res, action, isPending] = useActionState(login, null);

  useEffect(() => {
    if (res?.code) {
      if (res?.code < 300) {
        console.log({ res });
      } else if (res?.message) {
        toast.error("Login failed", {
          description: res?.message,
        });
      }
    }
  }, [res]);

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
          <form className="grid gap-6" action={action}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email/username</Label>
                <Input placeholder="email/username" required name="email" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input type="password" required name="password" />
              </div>
              <Button disabled={isPending} className="w-full">
                {isPending && <Loader className="animate-spin" />}
                Register
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
