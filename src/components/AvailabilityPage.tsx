import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getHotelDetails } from '../services/api';
import type { HotelDetails as ApiHotelDetails } from '../services/api';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Divider,
  Stack,
  Button,
  ImageList,
  ImageListItem,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PetsIcon from '@mui/icons-material/Pets';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import PoolIcon from '@mui/icons-material/Pool';

const facilityIcons: { [key: string]: React.ReactNode } = {
  'Free Wi-Fi': <WifiIcon />,
  'On-site Parking': <LocalParkingIcon />,
  'Restaurant & Bar': <RestaurantIcon />,
  'Air Conditioning': <AcUnitIcon />,
  'Pet Friendly': <PetsIcon />,
  'Airport Shuttle': <AirportShuttleIcon />,
  'Gym': <FitnessCenterIcon />,
  'Laundry Service': <LocalLaundryServiceIcon />,
  'Indoor Pool': <PoolIcon />,
};

const AvailabilityPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');

  const [hotelDetails, setHotelDetails] = useState<ApiHotelDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      if (!checkIn || !checkOut || !guests) {
        setError('Missing required parameters');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/hotels/a2b6503c-78a7-402c-a56d-8f5030ecead1?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
        if (!response.ok) {
          throw new Error('Failed to fetch hotel details');
        }
        const data = await response.json();
        setHotelDetails(data);
      } catch (err) {
        setError('Failed to fetch hotel details');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [checkIn, checkOut, guests]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography>Loading hotel details...</Typography>
        </Box>
      </Container>
    );
  }

  if (error || !hotelDetails) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography color="error">{error || 'Hotel details not found'}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Hotel Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          {hotelDetails.hotelName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography color="text.secondary">
            {hotelDetails.addressLine}, {hotelDetails.city}, {hotelDetails.country}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={`${hotelDetails.averageRating.toFixed(1)}/10`}
            color="primary"
            sx={{ fontWeight: 'bold' }}
          />
          <Typography variant="body2">
            {hotelDetails.totalReviews} reviews
          </Typography>
        </Box>
      </Box>

      {/* Hotel Images */}
      <Box sx={{ mb: 4 }}>
        <ImageList
          sx={{
            width: '100%',
            height: 450,
            borderRadius: 2,
            overflow: 'hidden',
          }}
          variant="quilted"
          cols={4}
          rowHeight={225}
        >
          <ImageListItem cols={2} rows={2}>
            <img
              src={hotelDetails.imageUrl}
              alt={hotelDetails.hotelName}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </ImageListItem>
          {hotelDetails.rooms[0]?.images.slice(0, 3).map((image, index) => (
            <ImageListItem key={index}>
              <img
                src={image}
                alt={`Room ${index + 1}`}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* Facilities */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Popular Facilities
        </Typography>
        <Grid container spacing={2}>
          {hotelDetails.facilities.map((facility, index) => (
            <Grid item key={index}>
              <Chip
                icon={facilityIcons[facility]}
                label={facility}
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* Room Types */}
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
        Available Rooms
      </Typography>
      <Stack spacing={4}>
        {hotelDetails.rooms.map((room) => (
          <Card key={room.roomCategoryId} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ width: { xs: '100%', md: '35%' }, position: 'relative' }}>
              <CardMedia
                component="img"
                height="250"
                image={room.images[0]}
                alt={room.roomTypeName}
                sx={{ objectFit: 'cover' }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {room.roomTypeName}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Room facilities:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {room.facilities.map((facility, index) => (
                      <Chip
                        key={index}
                        label={facility}
                        size="small"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Bed options:
                  </Typography>
                  {room.beds.map((bed, index) => (
                    <Typography key={index} variant="body2">
                      {bed.bedCount}x {bed.bedTypeName}
                    </Typography>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Price per night
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      £{room.baseRate.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Includes taxes and charges
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      textTransform: 'none',
                      minWidth: 200,
                      fontWeight: 'bold',
                    }}
                  >
                    Reserve
                  </Button>
                </Box>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Stack>

      {/* Reviews Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
          Guest Reviews
        </Typography>
        <Grid container spacing={3}>
          {hotelDetails.reviews.map((review, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Anonymous
                    </Typography>
                    <Chip
                      label={`${review.rating.toFixed(1)}/10`}
                      color="primary"
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {review.comment}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AvailabilityPage;