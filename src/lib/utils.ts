import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const lists = {
  listings: [
    {
      id: "eb272009-6864-4794-9a4a-8dd4acb2337a",
      title: "The Ritz Carlton",
      description:
        "Experience luxury and comfort in our premium accommodations with world-class amenities and exceptional service.",
      number: null,
      type: "hotel",
      rating: "4.5",
      totalRatings: 765,
      imgUrl:
        "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80",
      state: "France",
      country: "Paris",
      dailyProfits: 35,
      totalReturns: 12086,
      collection: null,
      category: null,
      price: "348",
      createdAt: "2025-02-18T10:30:28.266Z",
      updatedAt: "2025-02-18T10:30:28.266Z",
    },
    {
      id: "bddf8c6c-ba5d-4153-9426-ebe9526a2fa3",
      title: "Future Visions",
      description:
        "Unique digital artwork from a renowned artist, part of an exclusive NFT collection.",
      number: 100,
      type: "NFT",
      rating: "4.6",
      totalRatings: 45,
      imgUrl:
        "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&q=80",
      state: null,
      country: null,
      dailyProfits: null,
      totalReturns: null,
      collection: "Future Visions",
      category: "Virtual Visionary",
      price: "7.89",
      createdAt: "2025-02-18T10:57:20.620Z",
      updatedAt: "2025-02-18T10:57:20.620Z",
    },
  ],
};

export const rev = [
  "eb272009-6864-4794-9a4a-8dd4acb2337a",
  "bddf8c6c-ba5d-4153-9426-ebe9526a2fa3",
];
