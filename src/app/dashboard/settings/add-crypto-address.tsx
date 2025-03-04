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
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const AddressesSchema = z.object({
  coin: z.string(),
  address: z.string(),
});

export default function CryptoAddress() {
  const { user, checkUserLoggedIn } = useContext(AuthContext);
  const form = useForm<z.infer<typeof AddressesSchema>>({
    resolver: zodResolver(AddressesSchema),
    defaultValues: {
      coin: user?.coin || "",
      address: user?.address || "",
    },
  });

  async function onSubmit(body: z.infer<typeof AddressesSchema>) {
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
        toast.error("Address not added", {
          description: "Something went wrong",
        });
      }
    } catch (error) {
      toast.error("Address not added", {
        description: "Something went wrong",
      });
      console.log("error", error);
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle>{user?.address ? "Change" : "Add"} crypto address</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="coin"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormLabel>Platform</FormLabel>
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
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-0.5 relative">
                  <FormLabel>Wallet address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">
              {user?.address ? "Change" : "Add"} address
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
