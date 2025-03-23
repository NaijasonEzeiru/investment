"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppPayment } from "@/db/schema/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppSchema } from "@/lib/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AppAddresses() {
  // const [gettingAddresses, setGettingAddresses] = useState(false);
  const [addresses, setAddresses] = useState<AppPayment | null>(null);
  const [openSheet, setOpenSheet] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState(false);

  const form = useForm<z.infer<typeof AppSchema>>({
    resolver: zodResolver(AppSchema),
  });

  useEffect(() => {
    getAddresses();
  }, []);

  async function deleteAddress(id: string) {
    try {
      setDeletingAddress(true);
      const res = await fetch(`/api/addresses/app-addresses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      setDeletingAddress(false);
      if (res.ok) {
        toast.success(data.message);
      } else
        toast.error("Unable to delete address", {
          description: "Something went wrong",
        });
    } catch (err) {
      setDeletingAddress(false);
      toast.error("Unable to delete address", {
        description: "Something went wrong",
      });
      console.log({ err });
    }
  }

  const getAddresses = async () => {
    try {
      const res = await fetch("/api/addresses/app-addresses", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setAddresses(data.addresses);
      } else {
        toast.error("Unable to get addresses", {
          description: data?.message || "Something went wrong",
        });
      }
    } catch (error) {
      toast.error("Unable to get addresses", {
        description: "Something went wrong",
      });
      console.log({ error });
    }
  };

  async function onSubmit(body: z.infer<typeof AppSchema>) {
    try {
      const res = await fetch("/api/addresses/app-addresses", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data?.message);
        setOpenSheet(false);
        getAddresses();
        return;
      } else if (data.error) {
        form.setError("app", {
          message: data.error,
        });
        return;
      }
      toast.error("Unable to add addresses", {
        description: "Something went wrong",
      });
    } catch (error) {
      toast.error("Unable to add address", {
        description: "Something went wrong",
      });
      console.log({ error });
    }
  }

  return (
    <>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <Button className="ml-auto mb-4 flex">Add a new address</Button>
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add new address</SheetTitle>
            <SheetDescription>
              Fill the fields below to add a new crypto address. Click &quot;Add
              new address to submit&quot;
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="app"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>CashApp/Wave</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cashApp">Cash App</SelectItem>
                        <SelectItem value="wave">Wave</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Number/Tag</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={form.formState.isSubmitting} className="w-full">
                {form.formState.isSubmitting && (
                  <Loader className="animate-spin" />
                )}
                Add address
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
      <div className="flex gap-6 flex-wrap">
        {Array.isArray(addresses) &&
          addresses?.map((address) => (
            <Card className="px-4 py-4" key={address.id}>
              <CardHeader>
                <CardTitle>
                  {address?.app == "cashApp" ? "Cash App" : "Wave"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 items-center">
                  <p className="font-semibold">
                    {address?.app == "wave" ? "Number" : "Tag"}
                  </p>
                  <p>{address?.tag}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-7">
                <Button variant="outline">Edit</Button>
                <Button
                  onClick={() => {
                    deleteAddress(address.id);
                  }}
                  disabled={deletingAddress}
                >
                  {deletingAddress && <Loader className="animate-spin" />}
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
}
