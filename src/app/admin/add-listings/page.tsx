import AddHotel from "@/components/add-hotel";
import AddNFT from "@/components/add-NFT";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function page() {
  return (
    <>
      <h1 className="text-xl font-semibold text-center">Add listings</h1>
      {/* <Separator className="w-40 bg-primary mx-auto" /> */}
      <Tabs defaultValue="hotel" className="w-full mt-8">
        <TabsList>
          <TabsTrigger value="hotel">Hotel</TabsTrigger>
          <TabsTrigger value="NFT">NFT</TabsTrigger>
        </TabsList>
        <TabsContent value="hotel">
          <AddHotel />
        </TabsContent>
        <TabsContent value="NFT">
          <AddNFT />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default page;
