import { Suspense } from "react";

import { getListings } from "@/actions/actions";
import ProductCard, { ProductCardSkeleton } from "./productCard";

export default async function HomeProducts({ featured }: { featured: string }) {
  const listings = await getListings();

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{featured}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Suspense fallback={<ProductCardSkeleton />}>
            {Array.isArray(listings.listings) &&
              listings.listings.map((list) => (
                <ProductCard list={list} key={list.id} />
              ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
