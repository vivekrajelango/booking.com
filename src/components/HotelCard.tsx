import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { Hotel } from '../services/api';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' },
      mb: 2,
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <CardMedia
        component="img"
        sx={{ 
          width: { xs: '100%', sm: 200 },
          height: { xs: 200, sm: 200 },
          objectFit: 'cover'
        }}
        image={hotel.thumbnailUrl || 'https://via.placeholder.com/300x200?text=Hotel+Image'}
        alt={hotel.name}
      />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            {hotel.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOnIcon color="action" sx={{ fontSize: '1rem', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {hotel.location}, {hotel.city}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {hotel.info}
          </Typography>
        </CardContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2
        }}>
          <Box>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              ${hotel.price}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total price
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: 1,
              textTransform: 'none',
              px: 3
            }}
          >
            Book now
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default HotelCard;