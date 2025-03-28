import AuthContext from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const AppSchema = z.object({
  app: z.string(),
  tag: z.string(),
});

export default function CashAppAddress() {
  const t = useTranslations("Settings");
  const { user, checkUserLoggedIn } = useContext(AuthContext);
  const form = useForm<z.infer<typeof AppSchema>>({
    resolver: zodResolver(AppSchema),
    defaultValues: {
      app: user?.app || "",
      tag: user?.tag || "",
    },
  });

  async function onSubmit(body: z.infer<typeof AppSchema>) {
    try {
      const res = await fetch(`/api/user/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        console.log(data);
        toast(data.message);
        // @ts-expect-error: Should not be undefined
        checkUserLoggedIn();
      } else {
        toast.error(t("not-added"), {
          description: t("wrong"),
        });
      }
    } catch (error) {
      toast.error(t("not-added"), {
        description: t("wrong"),
      });
      console.log("error", error);
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle>
          {user?.tag ? t("change") : t("add")} CashApp/Wave {t("address")}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
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
                <FormItem className="space-y-0.5 relative">
                  <FormLabel>{t("tag/number")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">
              {user?.tag ? t("change") : t("add")} {t("address")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
