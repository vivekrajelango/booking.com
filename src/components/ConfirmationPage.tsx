import React from 'react';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useLocation } from 'react-router-dom';
import type { BookingDetails, CheckoutFormData } from '../types/checkout';

interface LocationState {
  bookingDetails: BookingDetails;
  formData: CheckoutFormData;
}

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Default data in case state is missing
  const defaultData = {
    bookingDetails: {
      bookingId: 'BOOKING-' + Math.floor(Math.random() * 1000000),
      hotelInfo: {
        hotelId: 'hotel123',
        hotelName: 'London Central Luxe',
        location: '476 Reina Village, Westminster',
        rating: 4.5,
        totalReviews: 120,
        image: 'https://i.ibb.co/bpHnZdM/poster.jpg'
      },
      bookingDates: {
        checkIn: {
          date: new Date().toISOString().split('T')[0],
          time: '15:00'
        },
        checkOut: {
          date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
          time: '11:00'
        }
      },
      roomInfo: Array.isArray(location.state?.bookingDetails?.roomInfo) 
        ? location.state.bookingDetails.roomInfo 
        : [{
            roomType: 'Deluxe Room',
            quantity: 1,
            price: 210.00
          }]
    },
    formData: {
      firstName: 'Guest',
      lastName: 'User',
      email: 'guest@example.com',
      phone: '+1 234 567 8900',
      address: '123 Main St',
      city: 'London',
      zipCode: 'SW1A 1AA',
      country: 'United Kingdom'
    }
  };
  
  // Use state data if available, otherwise use default data
  const { bookingDetails, formData } = location.state || defaultData;

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Booking Confirmed!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Thank you for your booking, {formData?.firstName || 'Guest'}! Your reservation has been confirmed.
          </Typography>
          <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
            Booking ID: {bookingDetails?.bookingId || defaultData.bookingDetails.bookingId}
          </Typography>
        </Box>

        <Box sx={{ mb: 4, textAlign: 'left' }}>
          <Typography variant="h6" gutterBottom>
            Booking Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            Hotel: {bookingDetails?.hotelInfo?.hotelName || defaultData.bookingDetails.hotelInfo.hotelName}
          </Typography>
          
          {/* Handle both array and single object room info formats */}
          {Array.isArray(bookingDetails?.roomInfo) ? (
            bookingDetails.roomInfo.map((room, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Room: {room.roomType} x {room.quantity}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Price: ${room.price.toFixed(2)} per night
                </Typography>
              </Box>
            ))
          ) : (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" gutterBottom>
                Room: {bookingDetails?.roomInfo?.roomType || defaultData.bookingDetails.roomInfo[0].roomType}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Price: ${(bookingDetails?.roomInfo?.price || defaultData.bookingDetails.roomInfo[0].price).toFixed(2)} per night
              </Typography>
            </Box>
          )}
          
          <Typography variant="body1" gutterBottom>
            Check-in: {bookingDetails?.bookingDates?.checkIn?.date || defaultData.bookingDetails.bookingDates.checkIn.date} 
            at {bookingDetails?.bookingDates?.checkIn?.time || defaultData.bookingDetails.bookingDates.checkIn.time}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Check-out: {bookingDetails?.bookingDates?.checkOut?.date || defaultData.bookingDetails.bookingDates.checkOut.date} 
            at {bookingDetails?.bookingDates?.checkOut?.time || defaultData.bookingDetails.bookingDates.checkOut.time}
          </Typography>
          
          <Typography variant="body1" gutterBottom>
            Guests: {Array.isArray(bookingDetails?.roomInfo) 
              ? bookingDetails.roomInfo.reduce((sum, room) => sum + room.quantity, 0) 
              : (bookingDetails?.roomInfo?.guests || '1')}
          </Typography>
          
          <Typography variant="body1" fontWeight="bold" color="primary" sx={{ mt: 2 }}>
            Total Price: ${Array.isArray(bookingDetails?.roomInfo) 
              ? bookingDetails.roomInfo.reduce((sum, room) => sum + (room.price * room.quantity), 0).toFixed(2)
              : (bookingDetails?.roomInfo?.price || defaultData.bookingDetails.roomInfo[0].price).toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ mb: 4, textAlign: 'left' }}>
          <Typography variant="h6" gutterBottom>
            Guest Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            Name: {formData?.firstName || defaultData.formData.firstName} {formData?.lastName || defaultData.formData.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {formData?.email || defaultData.formData.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Phone: {formData?.phone || defaultData.formData.phone}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Address: {formData?.address || defaultData.formData.address}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {formData?.city || defaultData.formData.city}, {formData?.zipCode || defaultData.formData.zipCode}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Country: {formData?.country || defaultData.formData.country}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            A confirmation email has been sent to {formData?.email || defaultData.formData.email}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReturnHome}
            sx={{ mt: 2 }}
          >
            Return to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ConfirmationPage;