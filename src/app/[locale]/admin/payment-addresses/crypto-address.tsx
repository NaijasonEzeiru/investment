"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CryptoPayment } from "@/db/schema/schema";
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
import { AddressesSchema } from "@/lib/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function CryptoAddresses() {
  // const [gettingAddresses, setGettingAddresses] = useState(false);
  const [addresses, setAddresses] = useState<CryptoPayment | null>(null);
  const [openSheet, setOpenSheet] = useState(false);
  const [addressImg, setAddressImg] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [deletingAddress, setDeletingAddress] = useState(false);

  const form = useForm<z.infer<typeof AddressesSchema>>({
    resolver: zodResolver(AddressesSchema),
  });

  const handleAddressImgChange = (img: File | undefined) => {
    if (img) {
      const validate = z
        .any()
        .refine((files) => files.size <= 5000000, "Max image size is 5MB.")
        .safeParse(img);
      if (validate?.error) {
        form.setError("imgURL", {
          message: validate.error?.issues[0].message,
        });
        return;
      }
      setFile(img);
      setAddressImg(URL.createObjectURL(img));
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  async function deleteAddress(id: string) {
    try {
      setDeletingAddress(true);
      const res = await fetch(`/api/addresses/${id}`, {
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
      const res = await fetch("/api/addresses", {
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

  async function onSubmit(body: z.infer<typeof AddressesSchema>) {
    try {
      let imgURL = undefined;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "u16vszak");
        formData.append("cloud_name", "dyez5iyvm");
        const imgUrl = await fetch(
          `https://api.cloudinary.com/v1_1/dyez5iyvm/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        imgURL = await imgUrl.json();
        body.imgURL = imgURL.url;
      }

      console.log({ imgURL });

      const res = await fetch("/api/addresses", {
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
        form.setError("coin", {
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
                name="coin"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Coin/Platform</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: BTC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Wallet Address</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: bc1qp3a80dx..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Current value</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: 2800" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="relative">
                <label
                  className="grid relative items-center w-full h-56 sm:h-[335px] grow rounded-3xl border border-border"
                  tabIndex={0}
                  aria-label="Add image"
                >
                  {!addressImg ? (
                    <div className="grid items-center justify-center justify-items-center p-2 h-full">
                      <FormLabel>QR code image (optional)</FormLabel>
                      <p className="text-4xl text-center text-muted-foreground">
                        +
                      </p>
                      <p className="text-xs">
                        Note: Only png and webp files are accepted
                      </p>
                    </div>
                  ) : (
                    <span className="w-full h-56 sm:h-[335px]">
                      <Image
                        src={addressImg}
                        alt={`image -`}
                        className="h-full w-full object-cover rounded-lg"
                        width={215}
                        height={335}
                      />
                    </span>
                  )}
                  <FormField
                    control={form.control}
                    name="imgURL"
                    render={({
                      field: { onChange, onBlur, value, name, ref, disabled },
                    }) => (
                      <FormItem className="space-y-0.5 hidden">
                        <FormLabel>QR code image (optional)</FormLabel>
                        <FormControl>
                          <input
                            accept="image/png image/webp"
                            type="file"
                            hidden
                            onChange={(e) => {
                              onChange(e);
                              handleAddressImgChange(e.target.files?.[0]);
                              //   setUrlImg(
                              //     URL.createObjectURL(e.target.files?.[0]!)
                              //   );
                            }}
                            ref={ref}
                            disabled={disabled}
                            name={name}
                            onBlur={onBlur}
                            value={value}
                          />
                        </FormControl>
                        <FormMessage className="absolute" />
                      </FormItem>
                    )}
                  />
                </label>
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors?.imgURL?.message as string}
                </p>
              </div>
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
            <Card className="px-4 py-4 grow" key={address.id}>
              <CardHeader>
                <CardTitle>{address?.coin}</CardTitle>
                <CardDescription>{address?.address}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Value:</p>
                <p>{address?.value}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
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
