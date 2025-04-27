"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/utils/registerServiceWorker";
import Header from "@/components/layout/Header";

// Listing data i listing cards vo components
import { mockListings } from "@/components/Listings/Listing_data";
import RenderListings from "@/components/Listings/RenderListings";

export default function Home() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-8 pt-24">
      <Header />
        <div className="flex flex-col items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {/*Rendering listings from render listing function*/}
          <h2 className="text-2xl font-bold mb-6 text-center mt-20">Featured Listings</h2>
          <RenderListings listings={mockListings} />
        </div>
      </div>
    </main>
  );
}