import React from 'react';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useLocation } from 'react-router-dom';

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Default data in case location state is missing
  const defaultBookingData = {
    bookingId: 'BOOKING-123456',
    hotel: {
      name: 'Sample Hotel',
      address: '123 Main Street, City, Country',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945'
    },
    rooms: [
      { roomType: 'Deluxe Room', quantity: 1, price: 150 }
    ],
    checkIn: new Date().toISOString(),
    checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    guests: {
      adults: 2,
      children: 0
    },
    totalPrice: 150
  };

  const defaultFormData = {
    firstName: 'Guest',
    lastName: 'User',
    email: 'guest@example.com',
    phone: '+1234567890',
    specialRequests: ''
  };

  // Use location state if available, otherwise use default data
  const bookingData = location.state?.bookingData || defaultBookingData;
  const formData = location.state?.formData || defaultFormData;

  // Handle both array and single object formats for rooms
  const roomsArray = Array.isArray(bookingData.rooms) 
    ? bookingData.rooms 
    : [bookingData.rooms];

  const handleBackToHome = () => {
    navigate('/', { replace: true });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        <CheckCircleOutlineIcon 
          color="success" 
          sx={{ fontSize: 64, mb: 2 }} 
        />
        
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Booking Confirmed!
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
          Your booking has been confirmed. Thank you for choosing us!
        </Typography>
        
        <Box 
          sx={{ 
            width: '100%', 
            mt: 4, 
            p: 2, 
            bgcolor: 'primary.light', 
            color: 'primary.contrastText',
            borderRadius: 1
          }}
        >
          <Typography variant="h6" gutterBottom>
            Booking ID: {bookingData.bookingId}
          </Typography>
        </Box>

        <Box sx={{ width: '100%', mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Hotel Details
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
            <Box 
              component="img"
              src={bookingData.hotel.image}
              alt={bookingData.hotel.name}
              sx={{ 
                width: { xs: '100%', sm: 200 },
                height: { xs: 200, sm: 150 },
                objectFit: 'cover',
                borderRadius: 1
              }}
            />
            
            <Box>
              <Typography variant="h6">{bookingData.hotel.name}</Typography>
              <Typography variant="body1" color="text.secondary">
                {bookingData.hotel.address}
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Check-in:</strong> {formatDate(bookingData.checkIn)}
                </Typography>
                <Typography variant="body2">
                  <strong>Check-out:</strong> {formatDate(bookingData.checkOut)}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Typography variant="h5" gutterBottom>
            Room Details
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            {roomsArray.map((room: { roomType: string; quantity: number; price: number }, index: number) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  p: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Box>
                  <Typography variant="body1">
                    {room.roomType} x {room.quantity}
                  </Typography>
                </Box>
                <Typography variant="body1">
                  ${room.price * room.quantity}
                </Typography>
              </Box>
            ))}
            
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                p: 2,
                fontWeight: 'bold'
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                Total Guests: {
                  (bookingData.guests?.adults || 0) + (bookingData.guests?.children || 0)
                }
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                Total: ${bookingData.totalPrice || roomsArray.reduce((sum: number, room: { price: number; quantity: number }) => sum + (room.price * room.quantity), 0)}
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="h5" gutterBottom>
            Guest Information
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1">
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {formData.email}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {formData.phone}
            </Typography>
            
            {formData.specialRequests && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Special Requests:</strong>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {formData.specialRequests}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={handleBackToHome}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default ConfirmationPage;