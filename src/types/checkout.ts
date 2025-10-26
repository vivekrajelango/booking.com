export interface BookingDetails {
  hotelInfo: {
    hotelId: string;
    hotelName: string;
    location: string;
    rating: number;
    totalReviews: number;
    image: string;
  };
  bookingDates: {
    checkIn: {
      date: string;
      time: string;
    };
    checkOut: {
      date: string;
      time: string;
    };
  };
  roomInfo: {
    roomType: string;
    guests: string;
    price: number;
  };
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
}