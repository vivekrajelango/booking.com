import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getHotelById } from '../services/api';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

interface LocationState {
  hotelId: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

const AvailabilityPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  const [hotelDetails, setHotelDetails] = useState<ApiHotelDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      if (!state || !state.hotelId || !state.checkIn || !state.checkOut || !state.guests) {
        setError('Please go back and select dates and guests');
        setLoading(false);
        return;
      }

      try {
        const data = await getHotelById(state.hotelId, state.checkIn, state.checkOut, state.guests);
        setHotelDetails(data);
      } catch (err) {
        setError('Failed to fetch hotel details');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [state]);

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
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="text"
          color="primary"
          onClick={() => window.history.back()}
          startIcon={<ArrowBackIcon />}
          sx={{ 
            textTransform: 'none',
            fontWeight: 'medium',
            fontSize: '1rem'
          }}
        >
          Back to search results
        </Button>
      </Box>

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
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
      <Grid container spacing={3}>
        {hotelDetails.rooms.map((room, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={room.images[0]}
                  alt={room.roomTypeName}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    {room.roomTypeName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Max guests: {room.maximumGuests} • {room.info}
                  </Typography>
                  
                  {/* Bed Configuration */}
                  <Typography variant="subtitle2" gutterBottom>
                    Bed Options:
                  </Typography>
                  {room.beds.map((bed, idx) => (
                    <Typography key={idx} variant="body2">
                      {bed.bedCount}x {bed.bedTypeName}
                    </Typography>
                  ))}

                  {/* Room Facilities */}
                  <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                    {room.facilities.map((facility, idx) => (
                      <Chip
                        key={idx}
                        label={facility}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Stack>

                  {/* Price and Availability */}
                  <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6" color="primary">
                        ${room.baseRate.toFixed(2)}
                      </Typography>
                      <Typography variant="caption">per night</Typography>
                    </Box>
                    <Button variant="contained" color="primary">
                      Reserve
                    </Button>
                  </Box>
                </CardContent>
              </Card>
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
          </Grid>
        ))}
      </Grid>

      {/* Reviews Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
          Guest Reviews
        </Typography>
        <Grid container spacing={3}>
          {hotelDetails.reviews.map((review, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                    <Rating value={review.rating / 2} precision={0.5} readOnly size="small" />
                  </Box>
                  <Typography variant="body2">{review.comment}</Typography>
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