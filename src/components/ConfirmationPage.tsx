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
  const { bookingDetails, formData } = location.state as LocationState;

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
            Thank you for your booking, {formData.firstName}! Your reservation has been confirmed.
          </Typography>
        </Box>

        <Box sx={{ mb: 4, textAlign: 'left' }}>
          <Typography variant="h6" gutterBottom>
            Booking Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            Hotel: {bookingDetails.hotelInfo.hotelName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Room: {bookingDetails.roomInfo.roomType}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Check-in: {bookingDetails.bookingDates.checkIn.date} at {bookingDetails.bookingDates.checkIn.time}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Check-out: {bookingDetails.bookingDates.checkOut.date} at {bookingDetails.bookingDates.checkOut.time}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Guests: {bookingDetails.roomInfo.guests}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Total Price: ${bookingDetails.roomInfo.price.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ mb: 4, textAlign: 'left' }}>
          <Typography variant="h6" gutterBottom>
            Guest Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            Name: {formData.firstName} {formData.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {formData.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Phone: {formData.phone}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Address: {formData.address}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {formData.city}, {formData.zipCode}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Country: {formData.country}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            A confirmation email has been sent to {formData.email}
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