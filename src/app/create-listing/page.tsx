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
    address: "",
    facilities: "",
    progress: "0",
    latitude: "0",
    longitude: "0",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = "http://localhost:8080";

      // Create FormData to send both JSON and file
      const formData = new FormData();
      
      // Add all form fields
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("progress", form.progress);
      formData.append("latitude", form.latitude);
      formData.append("longitude", form.longitude);
      formData.append("facilities", form.facilities);
      
      // Add image if selected
      if (image) {
        formData.append("image", image);
      }

      // Send POST request with FormData
      const response = await fetch(`${apiUrl}/api/properties`, {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - browser will set it automatically with boundary
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to create property: ${response.status}`);
      }

      const createdProperty = await response.json();
      console.log("Property created successfully:", createdProperty);

      alert("Listing created successfully!");
      router.push("/"); // Redirect to home page
      
    } catch (err) {
      console.error("Error creating listing:", err);
      setError(err instanceof Error ? err.message : "Failed to create listing. Please try again.");
    } finally {
      setLoading(false);
    }
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

      {error && (
        <div style={{ 
          padding: "12px", 
          marginBottom: "20px", 
          backgroundColor: "#fee", 
          color: "#c33", 
          borderRadius: "4px" 
        }}>
          {error}
        </div>
      )}

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
            disabled={loading}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Price (€)</span>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="150000"
            step="0.01"
            min="0"
            disabled={loading}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Address</span>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Street 13"
            disabled={loading}
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
              disabled={loading}
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
          <span className={styles.fieldLabel}>Facilities</span>
          <input
            type="text"
            name="facilities"
            value={form.facilities}
            onChange={handleChange}
            className={styles.input}
            placeholder="Pool, Gym, Parking"
            disabled={loading}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Progress (%)</span>
          <input
            type="number"
            name="progress"
            value={form.progress}
            onChange={handleChange}
            className={styles.input}
            placeholder="0"
            min="0"
            max="100"
            disabled={loading}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Latitude</span>
          <input
            type="number"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            className={styles.input}
            placeholder="41.9973"
            step="any"
            disabled={loading}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Longitude</span>
          <input
            type="number"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            className={styles.input}
            placeholder="21.4280"
            step="any"
            disabled={loading}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.inputFile}
            disabled={loading}
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
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish Listing"}
        </button>
      </form>
    </div>
  );
}
