"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { HotelBusinessSchema } from "@/lib/zodSchema";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import Image from "next/image";
import { PayBTC } from "../pay-btc";
import { PayCashApp } from "../pay-cashApp";
import { useTranslations } from "next-intl";

export default function HotelBusiness({
  setIndex,
}: {
  setIndex: Dispatch<SetStateAction<number>>;
}) {
  const t = useTranslations("hotel-business");
  const [addressImg, setAddressImg] = useState("");
  // const [file, setFile] = useState<File | null>(null);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [paymentMethod, setPaymentmethod] = useState("");
  const [payment, setPayment] = useState(false);
  const form = useForm<z.infer<typeof HotelBusinessSchema>>({
    resolver: zodResolver(HotelBusinessSchema),
  });

  const { formState } = form;

  const handleAddressImgChange = (img: File | undefined) => {
    if (img) {
      const validate = z
        .any()
        .refine((files) => files.size <= 5000000, t("max"))
        .safeParse(img);
      if (validate?.error) {
        form.setError("imgUrl", {
          message: validate.error?.issues[0].message,
        });
        return;
      }
      // setFile(img);
      setAddressImg(URL.createObjectURL(img));
    }
  };

  function onSubmit() {
    setShowPaymentPage(true);
  }

  if (showPaymentPage) {
    return (
      <>
        {!payment && (
          <>
            <DialogHeader>
              <Button
                size="icon"
                variant="secondary"
                className="relative bottom-3"
                onClick={() => setShowPaymentPage(false)}
              >
                <ArrowLeft />
              </Button>
              <DialogTitle className="text-left">{t("method")}</DialogTitle>
              <DialogDescription className="text-left">
                <p>{t("charge")}</p>
                <p>{t("methods-available")}</p>
              </DialogDescription>
            </DialogHeader>
            <Select onValueChange={setPaymentmethod}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder={t("select")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("method")}</SelectLabel>
                  <SelectItem value="cashapp/wave">
                    {t("cash-app")}/{t("wave")}
                  </SelectItem>
                  <SelectItem value="crypto">{t("crypto")}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button onClick={() => setPayment(true)}>{t("next")}</Button>
            </DialogFooter>{" "}
          </>
        )}
        {payment && paymentMethod == "crypto" && <PayBTC amount={1000.99} />}
        {payment && paymentMethod == "cashapp/wave" && (
          <PayCashApp amount={1000.99} />
        )}
      </>
    );
  } else
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
          <DialogTitle className="text-left">{t("get-ratings")}</DialogTitle>
          <DialogDescription className="text-left">
            {t("listed")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormLabel>{t("title")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("grand-plaza")} {...field} />
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
                  <FormLabel>{t("description")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("luxury")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative">
              <p className="text-sm font-medium mb-1.5">{t("image")}</p>
              <label
                className="grid relative items-center w-full h-56 sm:h-[335px] grow rounded-3xl border border-border"
                tabIndex={0}
                aria-label="Add image"
              >
                {!addressImg ? (
                  <div className="grid items-center justify-center justify-items-center p-2 h-full">
                    <p className="text-4xl text-center text-muted-foreground">
                      +
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
                  name="imgUrl"
                  render={({
                    field: { onChange, onBlur, value, name, ref, disabled },
                  }) => (
                    <FormItem className="space-y-0.5 hidden">
                      <FormLabel>{t("image")}</FormLabel>
                      <FormControl>
                        <input
                          accept="image/*"
                          type="file"
                          hidden
                          onChange={(e) => {
                            onChange(e);
                            handleAddressImgChange(e.target.files?.[0]);
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
                {form.formState.errors?.imgUrl?.message as string}
              </p>
            </div>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormLabel>{t("country")}</FormLabel>
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
                  <FormLabel>
                    {t("state")}/{t("city")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={formState.isSubmitting} className="w-full">
              {formState.isSubmitting && <Loader className="animate-spin" />}
              {t("add")}
            </Button>
          </form>
        </Form>
      </>
    );
}
