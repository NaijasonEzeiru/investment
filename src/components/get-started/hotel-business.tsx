"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { HotelBusinessSchema } from "@/lib/zodSchema";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function HotelBusiness({
  setIndex,
}: {
  setIndex: Dispatch<SetStateAction<number>>;
}) {
  const form = useForm<z.infer<typeof HotelBusinessSchema>>({
    resolver: zodResolver(HotelBusinessSchema),
  });

  const { formState, reset } = form;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({});
    }
  }, [formState, reset]);

  async function onSubmit(body: z.infer<typeof HotelBusinessSchema>) {
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
      <DialogHeader>
        <Button
          size="icon"
          variant="secondary"
          className="relative bottom-3"
          onClick={() => setIndex(0)}
        >
          <ArrowLeft />
        </Button>
        <DialogTitle className="text-left">
          List your property and get verified ratings
        </DialogTitle>
        <DialogDescription className="text-left">
          Your property will be listed if successfully verified by our
          moderators
        </DialogDescription>
      </DialogHeader>
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
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel>Picture URL</FormLabel>
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
    </>
  );
}
