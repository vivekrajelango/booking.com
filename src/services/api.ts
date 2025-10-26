// Hotel search API service

export interface Bed {
  bedTypeName: string;
  bedCount: number;
}

export interface Availability {
  date: string;
  availableCount: number;
}

export interface RoomCategory {
  roomCategoryId: string;
  roomTypeName: string;
  maximumGuests: number;
  baseRate: number;
  info: string;
}

export interface Room extends RoomCategory {
  images: string[];
  facilities: string[];
  beds: Bed[];
  availability: Availability[];
}

export interface Review {
  rating: number;
  comment: string;
  createdAt: string;
  authorName: string;
}

export interface Hotel {
  hotelId: string;
  hotelName: string;
  city: string;
  country: string;
  addressLine: string;
  summary: string | null;
  imageUrl: string;
  averageRating: number;
  totalReviews: number;
  comment: string;
  roomCategories: RoomCategory[];
}

export interface HotelDetails extends Omit<Hotel, 'roomCategories'> {
  facilities: string[];
  rooms: Room[];
  reviews: Review[];
}

export interface ApiResponse {
  data: Hotel[];
}

export interface SearchParams {
  query: string;
  from: string;
  to: string;
  adults: number;
  children: number;
}

// API configuration
export const API_BASE_URL = '/api/v1';

// Fetch hotel details
export const getHotelById = async (
  hotelId: string,
  checkIn: string,
  checkOut: string,
  guests: string
): Promise<HotelDetails> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/hotels/${hotelId}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '1',
          'Origin': window.location.origin,
        },
        mode: 'cors',
        credentials: 'omit'
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HotelDetails = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw error;
  }
};

// Real API call to search hotels
export const searchHotels = async (params: SearchParams): Promise<Hotel[]> => {
  console.log('Searching hotels with params:', params);
  
  try {
    // Build query parameters
    const queryParams = new URLSearchParams({
      name: params.query,
      checkIn: params.from,
      checkOut: params.to,
      guests: (params.adults + params.children).toString(),
      page: '1',
      pageSize: '10'
    });

    const response = await fetch(`${API_BASE_URL}/hotels/search?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '1',
        'Origin': window.location.origin,
      },
      mode: 'cors',
      credentials: 'omit'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};