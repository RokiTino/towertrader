'use client';
import { useEffect, useState, use } from 'react';
import styles from '../../styles/Home.module.css';
import Header from '../../components/Header';
import UrbanLoft from '../../../../public/images/UrbanLoft.jpg';
import BeachFrontVilla from '../../../../public/images/BeachFrontVilla.jpg'
import NoImage from '../../../../public/images/download.png'
type Property = {
  id: string;
  title: string;
  price: string;
  imageUrl: any;
  progress?: number;
  progressMax?: number;
  gps?: { lat: number; lng: number };
};

type Props = {
  params: Promise<{ id: string }>;
};

async function fetchPropertyById(id: string): Promise<Property> {
  const properties: Record<string, Property> = {
    '1': {
      id: '1',
      title: 'Urban Loft',
      price: '2.000.000$',
      imageUrl: UrbanLoft,
      progress: 40,
      progressMax: 100,
      gps: { lat: 40.7128, lng: -74.006 }
    },
    '2': {
      id: '2',
      title: 'Beach Front Villa',
      price: '1.500.000$',
      imageUrl: BeachFrontVilla,
      progress: 75,
      progressMax: 100,
      gps: { lat: 34.0522, lng: -118.2437 }
    },
    '3': {
      id: '3',
      title: 'City Penthouse',
      price: '3.200.000$',
      imageUrl: NoImage,
      progress: 20,
      progressMax: 60,
      gps: { lat: 51.5074, lng: -0.1278 }
    }
  };
  return properties[id] || {
    id: '0',
    title: 'Not Found',
    price: '0$',
    imageUrl: NoImage
  };
}

function ImageCarousel({ images }: { images: any[] }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;

  function prev() { setIdx(i => (i === 0 ? images.length - 1 : i - 1)); }
  function next() { setIdx(i => (i === images.length - 1 ? 0 : i + 1)); }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 500, margin: '0 auto' }}>
      <img src={images[idx]} alt="" style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 8 }} />
      {images.length > 1 && (
        <>
          <button onClick={prev} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}>&lt;</button>
          <button onClick={next} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>&gt;</button>
        </>
      )}
      <div style={{ textAlign: 'center', marginTop: 4 }}>
        {images.map((_, i) => (
          <span key={i} style={{
            display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
            background: i === idx ? '#333' : '#ccc', margin: '0 2px'
          }} />
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ value, max }: { value: number, max: number }) {
  const percent = Math.round((value / max) * 100);
  return (
    <div style={{ margin: '16px 0' }}>
      <div style={{ background: '#eee', borderRadius: 4, height: 20, width: '100%', position: 'relative' }}>
        <div style={{
          background: 'linear-gradient(90deg, #ac8144, #ac8144)', width: `${percent}%`,
          height: '100%', borderRadius: 4, transition: 'width 0.3s'
        }} />
        <span style={{
          position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)',
          color: '#222', fontWeight: 'bold', fontSize: 14, lineHeight: '20px'
        }}>{value}% / {max}%</span>
      </div>
    </div>
  );
}

export default function PropertyPage({ params }: Props) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  useEffect(() => {
    setLoading(true);
    fetchPropertyById(id)
      .then(setProperty)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div className={styles.container}>
      <Header />
      <main style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
        <ImageCarousel images={[property.imageUrl]} />
        <h1 style={{ marginTop: 24, marginBottom: 8 }}>{property.title}</h1>
        <h2 style={{ marginBottom: 16 }}>{property.price}</h2>
        {property.progress && property.progressMax && (
          <ProgressBar value={property.progress} max={property.progressMax} />
        )}
        {property.gps && (
          <div style={{ marginTop: 16 }}>
            <h3>GPS Location</h3>
            <p>
              Latitude: <b>{property.gps.lat}</b><br />
              Longitude: <b>{property.gps.lng}</b>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}