import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Grid,
  CircularProgress
} from '@mui/material';
import { dummyBookingDetails } from '../data/checkoutData';
import type { BookingDetails, CheckoutFormData } from '../types/checkout';
import { countries } from '../data/countries';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to confirmation page with booking details
      navigate('/confirmation', {
        state: {
          bookingDetails: dummyBookingDetails,
          formData
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Here you could add error handling UI if needed
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Zip/post code (optional)"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>

        {/* Booking Summary */}
        <Box sx={{ width: { xs: '100%', md: '380px' } }}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={dummyBookingDetails.hotelInfo.image}
              alt={dummyBookingDetails.hotelInfo.hotelName}
            />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {dummyBookingDetails.hotelInfo.hotelName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={dummyBookingDetails.hotelInfo.rating} readOnly precision={0.5} />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {dummyBookingDetails.hotelInfo.totalReviews} reviews
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {dummyBookingDetails.hotelInfo.location}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Check-in
                </Typography>
                <Typography variant="body2">
                  {dummyBookingDetails.bookingDates.checkIn.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dummyBookingDetails.bookingDates.checkIn.time}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Check-out
                </Typography>
                <Typography variant="body2">
                  {dummyBookingDetails.bookingDates.checkOut.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dummyBookingDetails.bookingDates.checkOut.time}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Room Details
                </Typography>
                <Typography variant="body2">
                  {dummyBookingDetails.roomInfo.roomType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dummyBookingDetails.roomInfo.guests}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Typography variant="body2" color="text.secondary">
                    Total price
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${dummyBookingDetails.roomInfo.price.toFixed(2)}
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