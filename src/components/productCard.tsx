import { Listing } from "@/db/schema/schema";
import { DollarSign, MapPin, Palette, TrendingUp } from "lucide-react";
import Image from "next/image";
import React from "react";

function ProductCard({ list }: { list: Listing }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
      <div className="relative pb-[75%] overflow-hidden">
        <Image
          src={list.imgUrl}
          width={286}
          height={214.5}
          alt={list.title}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {list.type}
          </span>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center">
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
                className="lucide lucide-star w-4 h-4 text-yellow-400 fill-current"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span className="ml-1 text-sm">
                {list.rating} ({list.totalRatings})
              </span>
            </div>
            <div className="text-lg font-bold">${list.price}</div>
          </div>
        </div>
      </div>
      <div className="p-4">
        {list.type == "hotel" ? (
          <div className="flex items-center mb-2">
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">
              {list.state}, {list.country}
            </span>
          </div>
        ) : (
          <div className="flex items-center mb-2">
            <Palette className="w-4 h-4 text-gray-400 mr-1" />{" "}
            <p className="text-sm text-gray-600">{list.category}</p>
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {list.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {list.description}
        </p>
        {list.type === "hotel" ? (
          <div className="mt-4 bg-green-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-green-700">
                <DollarSign className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Daily Profit</span>
              </div>
              <span className="text-green-700 font-bold">
                ${list.dailyProfits}.00
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-green-700">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Total Returns</span>
              </div>
              <span className="text-green-700 font-bold">
                ${list?.totalReturns?.toLocaleString()}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 bg-purple-50 rounded-lg p-3 relative top-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-purple-700">
                <Palette className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Collection</span>
              </div>
              <span className="text-purple-700 font-medium text-sm">
                {list.collection}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
