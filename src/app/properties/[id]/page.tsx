'use client';
import { useEffect, useState } from 'react';

type Property = {
  id: string;
  images: string[];
  name: string;
  progress: number;
  progressMax: number;
  gps: { lat: number; lng: number };
};

type Props = {
  params: { id: string };
};

// Dummy fetch function (replace with your actual API call)
async function fetchPropertyById(id: string): Promise<Property> {
  // Replace this with a real API call!
  const dummy: Record<string, Property> = {
    '1': {
      id: '1',
      images: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
      ],
      name: 'Skyline Residence',
      progress: 40,
      progressMax: 100,
      gps: { lat: 40.7128, lng: -74.006 },
    },
    // ...other dummy properties
  };
  return dummy[id] || dummy['1'];
}

// Simple Carousel and Progress bar components go here (same as previous answer)

function ImageCarousel({ images }: { images: string[] }) {
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
          background: 'linear-gradient(90deg, #2196f3, #21cbf3)', width: `${percent}%`,
          height: '100%', borderRadius: 4, transition: 'width 0.3s'
        }} />
        <span style={{
          position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)',
          color: '#222', fontWeight: 'bold', fontSize: 14, lineHeight: '20px'
        }}>{value} / {max}</span>
      </div>
    </div>
  );
}

export default function PropertyPage({ params }: Props) {
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    fetchPropertyById(params.id).then(setProperty);
  }, [params.id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Header />
      <main style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
        <ImageCarousel images={property.images} />
        <h1 style={{ marginTop: 24, marginBottom: 8 }}>{property.name}</h1>
        <ProgressBar value={property.progress} max={property.progressMax} />
        <div style={{ marginTop: 16 }}>
          <h3>GPS Location</h3>
          <p>
            Latitude: <b>{property.gps.lat}</b><br />
            Longitude: <b>{property.gps.lng}</b>
          </p>
        </div>
      </main>
    </div>
  );
}
