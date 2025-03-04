import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AppAddresses from "./app-address";
import CryptoAddresses from "./crypto-address";

export default function Page() {
  return (
    <>
      <h1 className="text-xl font-semibold text-center mb-8">Addresses</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Crypto addresses</AccordionTrigger>
          <AccordionContent>
            <CryptoAddresses />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Cashapp/wave details</AccordionTrigger>
          <AccordionContent>
            <AppAddresses />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
