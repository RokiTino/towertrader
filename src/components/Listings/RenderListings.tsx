import Image from "next/image";

interface Listing {
  id: number;
  title: string;
  price: string;
  image: string;
}

interface RenderListingsProps {
    listings: Listing[];
  }
 
  export default function RenderListings({ listings }: RenderListingsProps) {
    return (
      
      <div className="grid grid-cols-3  gap-4">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center max-w-xs"
          >
            <Image
              src={listing.image}
              alt={listing.title}
              width={300}
              height={200}
              className="rounded-md"
            />
            <h3 className="text-lg font-semibold mt-4">{listing.title}</h3>
            <p className="text-gray-600">{listing.price}</p>
          </div>
        ))}
      </div>
    );
  };