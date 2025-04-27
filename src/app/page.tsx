"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/utils/registerServiceWorker";
import Header from "@/components/layout/Header";

// Listing data i listing cards vo components
import { mockListings } from "@/components/Listings/Listing_data";
import RenderListings from "@/components/Listings/RenderListings";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-8 pt-32">
   
     
      <Header />

          {/*Rendering listings from render listing function*/}
          <h2 className="text-2xl font-bold mb-6 text-center featured"></h2>
          <RenderListings listings={mockListings} />
        </div>
      </div>
    </main>
  );
}
