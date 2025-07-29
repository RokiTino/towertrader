'use client';
import { useEffect, useState, use } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LocationOn from '@mui/icons-material/LocationOn';
import KingBed from '@mui/icons-material/KingBed';
import Bathtub from '@mui/icons-material/Bathtub';
import SquareFoot from '@mui/icons-material/SquareFoot';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Header from '../../components/Header';
import UrbanLoft from '../../../../public/images/UrbanLoft.jpg';
import BeachFrontVilla from '../../../../public/images/BeachFrontVilla.jpg';
import NoImage from '../../../../public/images/download.png';
import Link from 'next/link';

// Custom color palette based on your CSS
const customColors = {
  primary: '#ac8144',
  primaryHover: '#ac8155',
  background: '#ffffff',
  divider: '#dddddd',
  textPrimary: '#555555',
  textSecondary: '#666666',
  textTertiary: '#999999',
  google: '#db4437',
  facebook: '#4267B2',
  border: '#dddddd',
  lightBackground: '#f5f5f5'
};

type Property = {
  id: string;
  title: string;
  price: string;
  imageUrl: any;
  progress?: number;
  progressMax?: number;
  gps?: { lat: number; lng: number };
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  location?: string;
  images?: string[];
};

type Props = {
  params: Promise<{ id: string }>;
};

async function fetchPropertyById(id: string): Promise<Property> {
  const properties: Record<string, Property> = {
    '1': {
      id: '1',
      title: 'Urban Loft',
      price: '2,000,000$',
      imageUrl: UrbanLoft,
      images: [UrbanLoft, BeachFrontVilla, NoImage],
      progress: 40,
      progressMax: 100,
      gps: { lat: 40.7128, lng: -74.006 },
      description: 'This stunning urban loft in the heart of the city offers modern living with high ceilings, large windows, and an open floor plan. Perfect for young professionals or couples looking for a stylish downtown lifestyle.',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,200 sq ft',
      location: 'Downtown, New York'
    },
    '2': {
      id: '2',
      title: 'Beach Front Villa',
      price: '1,500,000$',
      imageUrl: BeachFrontVilla,
      images: [BeachFrontVilla, UrbanLoft, NoImage],
      progress: 75,
      progressMax: 100,
      gps: { lat: 34.0522, lng: -118.2437 },
      description: 'Experience luxury beachfront living in this exquisite villa with direct access to pristine sandy beaches. Features include a private pool, expansive terraces, and breathtaking ocean views from every room.',
      bedrooms: 4,
      bathrooms: 3,
      area: '3,500 sq ft',
      location: 'Malibu, California'
    },
    '3': {
      id: '3',
      title: 'City Penthouse',
      price: '3,200,000$',
      imageUrl: NoImage,
      images: [NoImage, BeachFrontVilla, UrbanLoft],
      progress: 20,
      progressMax: 60,
      gps: { lat: 51.5074, lng: -0.1278 },
      description: 'Luxury penthouse with panoramic city views, featuring top-of-the-line appliances, smart home technology, and a spacious rooftop terrace perfect for entertaining.',
      bedrooms: 3,
      bathrooms: 3,
      area: '2,800 sq ft',
      location: 'Central London'
    }
  };
  return properties[id] || {
    id: '0',
    title: 'Not Found',
    price: '0$',
    imageUrl: NoImage,
    description: 'Property not found',
    location: 'Unknown'
  };
}

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: 400, 
      borderRadius: 2, 
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <CardMedia
        component="img"
        image={images[currentIndex]}
        alt="Property image"
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      
      {images.length > 1 && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
              }
            }}
          >
            <ArrowBack />
          </IconButton>
          
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
              }
            }}
          >
            <ArrowForward />
          </IconButton>
          
          <Box sx={{ 
            position: 'absolute', 
            bottom: 16, 
            left: 0, 
            right: 0, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 1 
          }}>
            {images.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: index === currentIndex ? customColors.primary : customColors.textTertiary,
                  cursor: 'pointer'
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: customColors.textPrimary }}>
        Investment Progress
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ 
          width: '100%', 
          bgcolor: customColors.lightBackground, 
          borderRadius: 4, 
          height: 10 
        }}>
          <Box
            sx={{
              width: `${percentage}%`,
              height: '100%',
              bgcolor: customColors.primary,
              borderRadius: 4,
              transition: 'width 0.3s ease'
            }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: customColors.textSecondary }}>
          {value}% / {max}%
        </Typography>
      </Box>
    </Box>
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

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        bgcolor: customColors.background
      }}>
        <CircularProgress sx={{ color: customColors.primary }} />
      </Box>
    );
  }

  if (!property) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        bgcolor: customColors.background
      }}>
        <Typography variant="h5" sx={{ color: customColors.textPrimary }}>
          Property not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: customColors.background }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Link href="/add-listing" passHref>
            <Button 
              variant="contained" 
              sx={{ 
                textTransform: 'none', 
                fontWeight: 'bold',
                bgcolor: customColors.primary,
                '&:hover': {
                  bgcolor: customColors.primaryHover,
                  opacity: 0.9
                }
              }}
            >
              Edit Listing
            </Button>
          </Link>
        </Box>
        
        <Card sx={{ 
          mb: 4,
          bgcolor: customColors.background,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px'
        }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: customColors.textPrimary }}>
              {property.title}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3 
            }}>
              <Typography variant="h5" sx={{ color: customColors.primary }}>
                {property.price}
              </Typography>
              <Chip 
                icon={<LocationOn sx={{ color: customColors.textTertiary }} />} 
                label={property.location} 
                variant="outlined" 
                sx={{ 
                  color: customColors.textSecondary,
                  borderColor: customColors.divider
                }}
              />
            </Box>
            
            <ImageCarousel images={property.images || [property.imageUrl]} />
            
            <Grid container spacing={3} sx={{ my: 2 }}>
              <Grid item xs={4}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <KingBed sx={{ color: customColors.textSecondary }} />
                  <Typography variant="body1" sx={{ color: customColors.textPrimary }}>
                    {property.bedrooms || 'N/A'} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Bathtub sx={{ color: customColors.textSecondary }} />
                  <Typography variant="body1" sx={{ color: customColors.textPrimary }}>
                    {property.bathrooms || 'N/A'} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <SquareFoot sx={{ color: customColors.textSecondary }} />
                  <Typography variant="body1" sx={{ color: customColors.textPrimary }}>
                    {property.area || 'N/A'}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            
            <Divider sx={{ 
              my: 3,
              bgcolor: customColors.divider
            }} />
            
            <Typography variant="h6" gutterBottom sx={{ color: customColors.textPrimary }}>
              Description
            </Typography>
            <Typography variant="body1" paragraph sx={{ 
              whiteSpace: 'pre-line',
              color: customColors.textSecondary
            }}>
              {property.description}
            </Typography>
            
            {property.progress !== undefined && property.progressMax !== undefined && (
              <ProgressBar value={property.progress} max={property.progressMax} />
            )}
            
            {property.gps && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ color: customColors.textPrimary }}>
                  Location
                </Typography>
                <Box 
                  sx={{ 
                    height: 300, 
                    bgcolor: customColors.lightBackground, 
                    borderRadius: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid',
                    borderColor: customColors.divider
                  }}
                >
                  <Typography sx={{ color: customColors.textTertiary }}>
                    Map would display here (Lat: {property.gps.lat}, Lng: {property.gps.lng})
                  </Typography>
                </Box>
              </Box>
            )}
            
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button 
                variant="contained" 
                size="large"
                fullWidth
                sx={{ 
                  py: 1.5, 
                  fontWeight: 'bold',
                  bgcolor: customColors.primary,
                  '&:hover': {
                    bgcolor: customColors.primaryHover,
                    opacity: 0.9
                  }
                }}
              >
                Invest Now
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}