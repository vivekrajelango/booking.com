import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, Chip, Container } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import type { Hotel } from '../services/api';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const navigate = useNavigate();
  
  // Get the cheapest room rate for display
  const cheapestRoom = hotel.roomCategories.reduce((min, room) => 
    room.baseRate < min.baseRate ? room : min
  );

  const handleSeeAvailability = () => {
    // Get the current URL search params
    const searchParams = new URLSearchParams(window.location.search);
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');
    
    // Add parameters to URL for persistence
    const urlParams = new URLSearchParams();
    urlParams.set('hotelId', hotel.hotelId);
    urlParams.set('checkIn', checkIn || '');
    urlParams.set('checkOut', checkOut || '');
    urlParams.set('guests', guests || '');
    
    // Navigate to the availability page and pass data as state
    navigate(`/availability?${urlParams.toString()}`, {
      state: {
        hotelId: hotel.hotelId,
        checkIn,
        checkOut,
        guests
      }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Search Results
                </Typography>
      <Card sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        mb: 2,
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'relative',
        width: '100%',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }
      }}>
        {/* Featured Badge */}
        <Box sx={{ 
          position: 'absolute', 
          top: 8, 
          left: 8, 
          zIndex: 1,
          display: 'flex',
          gap: 1
        }}>
          <Chip 
            label="Featured" 
            size="small"
            sx={{ 
              bgcolor: 'white',
              fontWeight: 'bold',
              fontSize: '0.75rem'
            }} 
          />
        </Box>

        <Box sx={{ 
          position: 'absolute', 
          top: 24, 
          right: 16, 
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            bgcolor: '#003580',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            mb: 1
          }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {hotel.averageRating}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {hotel.totalReviews} reviews
          </Typography>
        </Box>

        <Box sx={{ 
          position: 'relative',
          width: { xs: '100%', sm: '30%' },
          minWidth: { sm: 280 }
        }}>
          <CardMedia
            component="img"
            sx={{ 
              width: '100%',
              height: { xs: 200, sm: 280 },
              objectFit: 'cover'
            }}
            image={hotel.imageUrl || 'https://via.placeholder.com/300x200?text=Hotel+Image'}
            alt={hotel.hotelName}
          />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
          width: { xs: '100%', sm: '70%' }
        }}>
          <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
            {/* Limited-time Deal Badge */}
            <Chip 
              label="Limited-time Deal" 
              size="small"
              sx={{ 
                bgcolor: '#008009',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.75rem',
                mb: 1
              }} 
            />

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              {hotel.hotelName}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon color="action" sx={{ fontSize: '1rem', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {hotel.addressLine}, {hotel.city}, {hotel.country}
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                {cheapestRoom.roomTypeName} • {cheapestRoom.info}
              </Typography>
            </Box>
          </CardContent>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            p: 3,
            pt: 0
          }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Includes taxes and charges
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    textDecoration: 'line-through',
                    color: 'text.secondary'
                  }}
                >
                  £{(cheapestRoom.baseRate * 1.2).toFixed(0)}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  £{cheapestRoom.baseRate.toFixed(0)}
                </Typography>
              </Box>
            </Box>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleSeeAvailability}
              sx={{ 
                borderRadius: 1,
                textTransform: 'none',
                px: 3,
                bgcolor: '#0071c2',
                '&:hover': {
                  bgcolor: '#005999'
                }
              }}
            >
              See availability
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default HotelCard;