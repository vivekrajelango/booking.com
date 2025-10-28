import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Divider,
  MenuItem,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { dummyBookingDetails } from '../data/checkoutData';
import type { CheckoutFormData, BookingDetails, RoomInfo } from '../types/checkout';
import { countries } from '../data/countries';
import { reserveBooking } from '../services/api';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingState = location.state || { hotelInfo: dummyBookingDetails.hotelInfo, bookingDates: dummyBookingDetails.bookingDates, roomInfo: [] };
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Extract dates from the booking state
      // Ensure dates are properly formatted as strings (YYYY-MM-DD)
      const checkIn = bookingState.bookingDates.checkIn.date;
      const checkOut = bookingState.bookingDates.checkOut.date;
      
      console.log('Booking dates:', { checkIn, checkOut }); // Debug log
      
      // Prepare rooms data for the API
      const rooms = Array.isArray(bookingState.roomInfo) 
        ? bookingState.roomInfo.map((room: RoomInfo) => ({
            roomCategoryId: "04f5f0a3-d3b3-4427-b75a-649526770c1c", // Using the exact ID from the API response
            quantity: room.quantity
          }))
        : [];
      
      // Prepare the booking request payload
      const bookingData = {
        hotelId: bookingState.hotelInfo.hotelId,
        userId: "1e3dd039-690f-47fe-90f1-4d20a4903b00", // Hardcoded for now, should come from auth context
        rooms: rooms,
        guests: 1, // This should be calculated from the actual guests count
        checkIn: checkIn || new Date().toISOString().split('T')[0], // Fallback to today if null
        checkOut: checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0] // Fallback to tomorrow if null
      };
      
      // Call the reserveBooking API
      const response = await reserveBooking(bookingData);
      
      if (response.success) {
        // Navigate to confirmation page with booking details
        navigate('/confirmation', {
          state: {
            bookingDetails: {
              ...bookingState,
              bookingId: response.bookingId || 'BOOKING-123456' // Fallback ID if not provided
            },
            formData
          },
          replace: true // Use replace to ensure back button works correctly
        });
      } else {
        setError(response.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Booking Form */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Enter your details
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Almost done! Just fill in the * required info
            </Typography>
            <form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    helperText="Confirmation email goes to this address"
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Zip/post code (optional)"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    select
                    label="Country/region"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Col>
                <Col xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isSubmitting}
                    sx={{ mt: 2, height: 48 }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Complete Booking'
                    )}
                  </Button>
                </Col>
              </Row>
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </form>
          </Paper>
        </Box>

        {/* Booking Summary */}
        <Box sx={{ width: { xs: '100%', md: '380px' } }}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={bookingState.hotelInfo.image}
              alt={bookingState.hotelInfo.hotelName}
            />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {bookingState.hotelInfo.hotelName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={bookingState.hotelInfo.rating} readOnly precision={0.5} />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {bookingState.hotelInfo.totalReviews} reviews
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {bookingState.hotelInfo.location}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Check-in
                </Typography>
                <Typography variant="body2">
                  {bookingState.bookingDates.checkIn.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {bookingState.bookingDates.checkIn.time}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Check-out
                </Typography>
                <Typography variant="body2">
                  {bookingState.bookingDates.checkOut.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {bookingState.bookingDates.checkOut.time}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Room Details
                </Typography>
                {Array.isArray(bookingState.roomInfo) ? (
                  bookingState.roomInfo.map((room: RoomInfo, index: number) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        {room.roomType} x {room.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${room.price.toFixed(2)} per night
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2">
                    No rooms selected
                  </Typography>
                )}
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Typography variant="body2" color="text.secondary">
                    Total price
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${Array.isArray(bookingState.roomInfo) 
                      ? bookingState.roomInfo.reduce((sum: number, room: RoomInfo) => sum + (room.price * room.quantity), 0).toFixed(2)
                      : "0.00"}
                  </Typography>
                </Box>
              </Box>
              </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default CheckoutPage;