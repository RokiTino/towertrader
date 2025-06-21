import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/PropertyCard.module.css';

interface PropertyCardProps {
  id: string; // Added ID for routing
  title: string;
  price: string | number;
  imageUrl: string;
  progress?: number; // Optional progress percentage (0-100)
}

export default function PropertyCard({ 
  id, 
  title, 
  price, 
  imageUrl, 
  progress = 50 // Default progress
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`} className={styles.propertyCardLink}>
      <div className={styles.propertyCard}>
        <div className={styles.imageContainer}>
          <Image 
            src={imageUrl} 
            alt={title} 
            width={300} 
            height={200}
            className={styles.propertyImage}
          />
        </div>
        <div className={styles.propertyDetails}>
          <h3>{title}</h3>
          
          {/* Progress Bar */}
          <div className={styles.progressContainer}>
            <div 
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className={styles.price}>{price}</p>
        </div>
      </div>
    </Link>
  );
}