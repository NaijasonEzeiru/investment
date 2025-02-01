import React from "react";
import ProductCard from "./productCard";

function HomeProducts() {
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
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <div className="mt-8 flex items-center justify-center sm:justify-between">
          <p className="text-sm text-gray-700 hidden sm:block">
            Showing 1 to 8 of 40 results
          </p>
          <div className="flex items-center space-x-2">
            <button
              //   disabled=""
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
            >
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
                className="lucide lucide-chevron-left w-5 h-5"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
              1
            </button>
            <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
              4
            </button>
            <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
              5
            </button>
            <button className="p-2 rounded-md border border-gray-300 disabled:opacity-50">
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
                className="lucide lucide-chevron-right w-5 h-5"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeProducts;
