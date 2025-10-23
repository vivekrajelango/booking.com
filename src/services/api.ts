// Mock API service for hotel search

export interface Hotel {
  hotelId: string;
  name: string;
  city: string;
  location: string;
  info: string;
  price: number;
  thumbnailUrl: string;
}

export interface SearchParams {
  query: string;
  from: string;
  to: string;
  adults: number;
  children: number;
}

// Mock hotel data
const mockHotels: Hotel[] = [
  {
    hotelId: "b3c1a32a-6c98-49da-a3e9-7f3cb1d9a4ff",
    name: "Ocean View Resort",
    city: "London",
    location: "Westminster",
    info: "2 nights · 2 people",
    price: 360.00,
    thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    hotelId: "a1b9f0b2-6b5d-4321-a81e-03f1ed6bb220",
    name: "The Grand London Hotel",
    city: "London",
    location: "Soho",
    info: "2 nights · 2 people",
    price: 280.00,
    thumbnailUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    hotelId: "c2d8e3f4-7g6h-5i4j-3k2l-1m0n9o8p7q6r",
    name: "Riverside Suites",
    city: "London",
    location: "Greenwich",
    info: "2 nights · 2 people",
    price: 320.00,
    thumbnailUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    hotelId: "d3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8",
    name: "City Center Hotel",
    city: "London",
    location: "Kensington",
    info: "2 nights · 2 people",
    price: 240.00,
    thumbnailUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
];

/**
 * Calculate days between two dates
 */
function getDaysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Mock API call with a delay to simulate network request
export const searchHotels = async (params: SearchParams): Promise<Hotel[]> => {
  console.log('Searching hotels with params:', params);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Update hotel info with actual search parameters
  const results = mockHotels.map(hotel => ({
    ...hotel,
    info: `${getDaysBetween(params.from, params.to)} nights · ${params.adults + params.children} people`
  }));
  
  return results;
};

export type { Hotel, SearchParams };