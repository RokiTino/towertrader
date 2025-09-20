"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/CreateListing.module.css";

export default function CreateListing() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    city: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Listing:", form, image);
    alert(`Listing submitted successfully in ${form.city || "N/A"}!`);
  };

  const macedonianCities = [
    "Skopje",
    "Bitola",
    "Ohrid",
    "Tetovo",
    "Gostivar",
    "Kumanovo",
    "Prilep",
    "Strumica",
    "Štip",
    "Veles",
    "Kavadarci",
    "Struga",
    "Kičevo",
    "Debar",
    "Gevgelija",
    "Radoviš",
    "Kratovo",
    "Kruševo",
    "Makedonski Brod",
    "Delčevo",
  ];
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.backButton}>
          ← Back
        </button>
        <h1 className={styles.title}>Create New Listing</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Property Title</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Modern Apartment in Skopje"
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Price (€)</span>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="150,000"
          />
        </div>


        <div className={styles.field}>
          <span className={styles.fieldLabel}>Address</span>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Street 13"
          />
        </div>

        <div className={styles.field}>
        <span className={styles.fieldLabel}>City</span>
        <div className={styles.customSelectWrapper}>
            <select
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className={styles.customSelect}
            >
            <option value="">Select a city</option>
            {macedonianCities.map((city) => (
                <option key={city} value={city}>
                {city}
                </option>
            ))}
            </select>
        </div>
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.inputFile}
          />
          {preview && (
            <img src={preview} alt="Preview" className={styles.imagePreview} />
          )}
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className={styles.textarea}
            placeholder="Describe the property, and key features..."
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Publish Listing
        </button>
      </form>
    </div>
  );
}
