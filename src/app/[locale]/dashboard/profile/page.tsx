"use client";

import { useContext } from "react";
import { CircleUser, Dot, Loader, PencilLine } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import "react-phone-number-input/style.css";

import AuthContext from "@/components/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditProfileSchema } from "@/lib/zodSchema";

export default function Page() {
  const { user } = useContext(AuthContext);
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: { ...user },
  });

  async function onSubmit(body: z.infer<typeof EditProfileSchema>) {
    console.log({ body });
    try {
      const res = await fetch(`/api/user/${user?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        console.log(data);
        toast("Update successful");
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
        toast.error("Update failed", {
          description: "Something went wrong",
        });
      }
    } catch (error) {
      toast.error("Update failed", {
        description: "Something went wrong",
      });
      console.log("error", error);
    }
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex gap-2 items-center">
        <CircleUser className="size-10" strokeWidth={1} />
        <span>
          <p className="text-xl font-medium">
            {user?.firstName} {user?.lastName}
          </p>
          <div className="flex text-xs items-center">
            @{user?.username}
            <Dot />
            {user?.role}
          </div>
        </span>
      </div>
      <div className="">
        <p className="text-lg font-medium">Bio</p>
      </div>
      <p className="text-sm font-light">
        {/* @ts-expect-error: I dunno */}
        Registered {user?.updatedAt?.split("T")[0]}
      </p>
      <div className="bg-slate-100 p-3 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium">Personal data</h4>
          <Button variant="outline">
            <PencilLine /> Edit Profile
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input className="bg-white" {...field} />
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
                      <Input className="bg-white" {...field} />
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
                      <Input className="bg-white" {...field} />
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
                      <Input className="bg-white" {...field} type="email" />
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
            </div>

            <Button
              disabled={form.formState.isSubmitting}
              className="w-full max-w-52 mt-5 mx-auto block"
            >
              {form.formState.isSubmitting && (
                <Loader className="animate-spin" />
              )}
              Edit profile
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
