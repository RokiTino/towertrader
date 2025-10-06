"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../app/lib/firebase"; // import your initialized Firebase Auth
import styles from "../app/styles/Home.module.css";
import Header from "./components/Header";
import PropertyCard from "./components/PropertCard";
import NoImage from "../../public/images/download.png";

// Define the property type based on your backend
interface Property {
  id: string;
  title: string;
  price: string;
  imageUrl?: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch properties from Spring Boot backend
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/properties");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('data', data)
        setProperties(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Find your next investment</h1>
        {loading && <p>Loading properties...</p>}
        {error && <p className={styles.error}>{error}</p>}
        
        <div className={styles.propertyGrid}>
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              price={property.price}
              imageUrl={property.imageUrl || NoImage}
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
