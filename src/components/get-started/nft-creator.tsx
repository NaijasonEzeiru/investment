"use client";

import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { NFTCreatorSchema } from "@/lib/zodSchema";
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

export default function NFTCreator({
  setIndex,
}: {
  setIndex: Dispatch<SetStateAction<number>>;
}) {
  const form = useForm<z.infer<typeof NFTCreatorSchema>>({
    resolver: zodResolver(NFTCreatorSchema),
  });

  async function onSubmit(body: z.infer<typeof NFTCreatorSchema>) {
    console.log({ body });
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body, type: "NFT" }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        toast("Added successfully");
      } else {
        toast.error("Could not list NFT", {
          description: "Something went wrong",
        });
      }
    } catch (error) {
      toast.error("Could not list NFT", {
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
          Showcase your digital art and build credibilty
        </DialogTitle>
        <DialogDescription className="text-left">
          Your NFT will be listed if successfully verified by our moderators
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
                    placeholder="eg: Unique digital artwork from a renowned artist, part of an exclusive NFT collection..."
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
            name="category"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collection"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel>Collection</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting} className="w-full">
            {form.formState.isSubmitting && <Loader className="animate-spin" />}
            Add NFT listing
          </Button>
        </form>
      </Form>
    </>
  );
}
