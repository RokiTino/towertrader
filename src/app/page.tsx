"use client";

import Link from "next/link";
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
            <div className="space-y-4">
              <Link
                href="/auth"
                className="block w-full text-center py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-200"
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