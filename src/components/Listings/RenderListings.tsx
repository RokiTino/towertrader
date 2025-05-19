import Image from "next/image";
import router from "../../../node_modules/next/router";
import styles from "./RenderListings.module.css";

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
    <div className={styles.gridContainer}>
      {listings.map((listing) => (
        <div onClick={() => {
          
        }} key={listing.id} className={styles.listingCard}>
          {
              
           <Image
            src={listing.image } // Default image if none is provided
            alt={listing.title}
            width={300}
            height={300}
            className={styles.listingImage}
          /> }
          <h3 className={styles.listingTitle}>{listing.title}</h3>
          <p className={styles.listingPrice}>{listing.price}</p>

          {/* Progress bar at the bottom */}
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarFill}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
