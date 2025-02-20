import { getListings } from "@/actions/actions";
import { Suspense } from "react";
import ProductCard, { ProductCardSkeleton } from "./productCard";

export default async function HomeProducts() {
  const listings = await getListings();

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Listings
          </h2>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-filter w-5 h-5 text-gray-500"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <select className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="all">All Products</option>
              <option value="hotel">Hotels Only</option>
              <option value="nft">NFTs Only</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Suspense fallback={<ProductCardSkeleton />}>
            {Array.isArray(listings.listings) &&
              listings.listings.map((list, index) => (
                <ProductCard list={list} key={index} />
              ))}
          </Suspense>
        </div>
        {/* <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={`/?page=${page - 1}`} />
            </PaginationItem>
            {Array.from({ length: listings?.totalPages ?? 1 }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink href={`/?page=${i + 1}`}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href={`/?page=${page + 1}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
      </div>
    </div>
  );
}
