import { Listing } from "@/db/schema/schema";
import { DollarSign, MapPin, Palette, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Skeleton } from "./ui/skeleton";

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
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-primary">
            {list.type}
          </span>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400" fill="gold" />
              <span className="ml-1 text-sm">
                {list.rating} ({list.totalRatings})
              </span>
            </div>
            {list.type == "hotel" ? (
              <div className="text-lg font-bold">${list.price}</div>
            ) : (
              <div className="text-lg font-bold">{list.price}ETH</div>
            )}
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
          <div className="mt-4 bg-blue-50 rounded-lg p-3 relative top-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-blue-700">
                <Palette className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Collection</span>
              </div>
              <span className="text-blue-700 font-medium text-sm">
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

export function ProductCardSkeleton() {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div className="bg-white rounded-xl shadow-sm" key={i}>
          <div className="relative pb-[75%]">
            <Skeleton className="w-[286px] h-[214.5px] absolute inset-0" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center">
                  <Skeleton className="w-14 h-5" />
                </div>
                <Skeleton className="w-11 h-5" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-2">
              <MapPin className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-600">
                <Skeleton className="h-5 w-20" />
              </span>
            </div>
            <Skeleton className="h-7 w-28 mb-2" />
            <Skeleton className="h-10 w-full mb-3" />
            <Skeleton className="w-full h-20" />
          </div>
        </div>
      ))}
    </>
  );
}
