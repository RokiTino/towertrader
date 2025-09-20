"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../app/lib/firebase"; // import your initialized Firebase Auth
import styles from "../app/styles/Home.module.css";
import Header from "./components/Header";
import PropertyCard from "./components/PropertCard";
import UrbanLoft from "../../public/images/UrbanLoft.jpg";
import BeachFrontVilla from "../../public/images/BeachFrontVilla.jpg";
import NoImage from "../../public/images/download.png";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const properties = [
    { id: "1", title: "Urban Loft", price: "2.000.000$", imageUrl: UrbanLoft },
    { id: "2", title: "Beach Front Villa", price: "1.500.000$", imageUrl: BeachFrontVilla },
    { id: "3", title: "City Penthouse", price: "3.200.000$", imageUrl: NoImage },
  ];

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Find your next investment</h1>
        <div className={styles.propertyGrid}>
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              price={property.price}
              imageUrl={property.imageUrl}
            />
          ))}
        </div>

        {/* Only show Add Listing if the user is logged in */}
        {user ? (
          <div className={styles.buttonWrapper}>
            <Link href="/create-listing" className={styles.addListingButton}>
              Add Listing
            </Link>
          </div>
        ) : (
          <div className={styles.buttonWrapper}>
            <p className={styles.loginMessage}>
              Login to add a new listing
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
