import Link from "next/link";
import styles from "../app/styles/Home.module.css";
import Header from "./components/Header";
import PropertyCard from "./components/PropertCard";
import UrbanLoft from "../../public/images/UrbanLoft.jpg";
import BeachFrontVilla from "../../public/images/BeachFrontVilla.jpg";
import NoImage from "../../public/images/download.png";

export default function Home() {
  const properties = [
    {
      id: "1",
      title: "Urban Loft",
      price: "2.000.000$",
      imageUrl: UrbanLoft,
    },
    {
      id: "2",
      title: "Beach Front Villa",
      price: "1.500.000$",
      imageUrl: BeachFrontVilla,
    },
    {
      id: "3",
      title: "City Penthouse",
      price: "3.200.000$",
      imageUrl: NoImage,
    },
  ];

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Find your next investment</h1>
        <div className={styles.propertyGrid}>
          {properties.map((property, index) => (
            <PropertyCard
              id={property.id}
              key={index}
              title={property.title}
              price={property.price}
              imageUrl={property.imageUrl}
            />
          ))}
        </div>

        <div className={styles.buttonWrapper}>
          <Link href="/create-listing" className={styles.addListingButton}>
            Add Listing
          </Link>
        </div>
      </main>
    </div>
  );
}
