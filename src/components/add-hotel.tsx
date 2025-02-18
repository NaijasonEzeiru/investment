"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { HotelSchema } from "@/lib/zodSchema";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useEffect } from "react";

export default function AddHotel() {
  const form = useForm<z.infer<typeof HotelSchema>>({
    resolver: zodResolver(HotelSchema),
  });

  const { formState, reset } = form;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({});
    }
  }, [formState, reset]);

  async function onSubmit(body: z.infer<typeof HotelSchema>) {
    console.log({ body });
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body, type: "hotel" }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        toast("Added successfully");
      } else {
        toast.error("Could not list hotel", {
          description: "Something went wrong",
        });
      }
    } catch (error) {
      toast.error("Could not list hotel", {
        description: "Something went wrong",
      });
      console.log("error", error);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Hotel listing</CardTitle>
          {/* <CardDescription>Enter your details to sign up</CardDescription> */}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg: Grand Plaza Hotel &amp; Spa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="eg: Experience luxury and comfort in our premium accommodations with world..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 w-full items-center">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field: { onChange } }) => (
                    <FormItem className="space-y-0.5 grow">
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <Slider max={5} step={0.1} onChange={onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="border-border border p-2 rounded size-10 items-center flex justify-center">
                  {form.watch("rating")}
                </p>
              </div>
              <FormField
                control={form.control}
                name="totalRatings"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Total ratings</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: 672" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imgUrl"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Picture</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dailyProfits"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Daily profits</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalReturns"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Total returns</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={formState.isSubmitting} className="w-full">
                {formState.isSubmitting && <Loader className="animate-spin" />}
                Add hotel listing
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
