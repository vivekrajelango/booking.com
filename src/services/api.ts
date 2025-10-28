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

export interface HotelDetailsResponse {
  success: boolean;
  message: string;
  data: HotelDetails;
}

export interface SearchParams {
  query: string;
  from: string;
  to: string;
  adults: number;
  children: number;
}

// API configuration
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://api-gateway.happyforest-8a2b009f.uksouth.azurecontainerapps.io/api/v1'
  : '/api/v1';

// Auth interfaces
export interface LoginCredentials {
  emailAddress: string;
  password: string;
}


export interface SignupCredentials {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message?: string;
  userId?: string;
}

// Signup function
export const signup = async (credentials: SignupCredentials): Promise<SignupResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        message: 'Registration successful!',
        userId: data.userId || data.id,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Registration failed. Please try again.',
      };
    }
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      message: 'An error occurred during registration. Please try again.',
    };
  }
};

// Fetch hotel details
export const getHotelById = async (
  hotelId: string,
  checkIn: string,
  checkOut: string,
  guests: string
): Promise<HotelDetailsResponse> => {
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

    const data = await response.json();
    return data as HotelDetailsResponse;
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

    const data = await response.json();
    console.log('API response:', data);
    
    // Check if the response has the expected structure from the screenshot
    if (data.data && data.data.items && Array.isArray(data.data.items)) {
      return data.data.items; // Return the items array from the response
    } else if (data.data && Array.isArray(data.data)) {
      return data.data; // Fallback to the original structure
    } else {
      console.error('Unexpected API response structure:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

// Login API interface
export interface LoginCredentials {
  emailAddress: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

// Login API call
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  console.log('Logging in with:', credentials.emailAddress);
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin,
      },
      body: JSON.stringify(credentials),
      mode: 'cors',
      credentials: 'omit'
    });

    const data = await response.json();
    console.log('Login response:', data);
    
    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Login failed. Please check your credentials.'
      };
    }
    
    return {
      success: true,
      message: data.message || 'Login successful',
      token: data.token,
      user: data.user
    };
  } catch (error) {
    console.error('Error during login:', error);
    return {
      success: false,
      message: 'An error occurred during login. Please try again.'
    };
  }
};