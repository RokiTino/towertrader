'use client';

import Link from "next/link";
import { useEffect } from "react";
import { registerServiceWorker } from "@/utils/registerServiceWorker";

// Listing data i listing cards vo components
import { mockListings } from "@/components/Listings/Listing_data";
import RenderListings from "@/components/Listings/RenderListings";

export default function Home() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#222222]">
      <div className="w-full max-w-md px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">TOWER TRADER</h1>
          
          <nav className="flex justify-center space-x-6 mb-8">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Home
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-gray-800 font-medium">
              Profile
            </Link>
          </nav>


          {/*Rendering listings from render listing function*/}
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Listings</h2>
          <RenderListings listings={mockListings} />
        </div>

        <div className="flex flex-col items-center">

          <div className="space-y-4">
            <Link
              href="/auth"
              className="block w-full text-center py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Start Investing
            </Link>
            <Link
              href="/auth"
              className="block w-full text-center py-3 px-4 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}