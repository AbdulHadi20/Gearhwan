// src/components/RandomCarListings.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.ts'; // Client-side Supabase instance

// Define the CarListing interface directly or import from src/types/supabase.ts
// Assuming src/types/supabase.ts exists and contains this interface:
export interface CarListing {
  id: string;
  car_name: string;
  car_model: string;
  car_type: string;
  car_description: string | null;
  car_img: string | null;
  price: number;
  personality_options: string | null;
  created_at: string;
  updated_at: string | null;
}

const RandomCarListings: React.FC = () => {
  const [randomListings, setRandomListings] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndRandomizeCars = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch all car listings
        const { data, error } = await supabase
          .from('car_listings')
          .select('*');

        if (error) {
          throw error;
        }

        if (!data || data.length === 0) {
          setRandomListings([]);
          return;
        }

        // 2. Randomize the array (Fisher-Yates shuffle algorithm)
        const shuffled = [...data]; // Create a shallow copy to avoid mutating original data
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
        }

        // 3. Display only the first 3 randomized cars
        setRandomListings(shuffled.slice(0, 3));
      } catch (err: any) {
        console.error('Error fetching or randomizing car listings:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndRandomizeCars();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-center text-gray-600 p-4 animate-pulse">Loading featured cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-center text-red-600 p-4">Error: {error}</p>
      </div>
    );
  }

  if (randomListings.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-600 text-center p-4">No featured cars available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {randomListings.map((car) => (
          <div key={car.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 duration-300 ease-in-out">
            {car.car_img ? (
              <img
                src={car.car_img}
                alt={car.car_name}
                className="w-full h-56 object-cover"
                onError={(e) => { e.currentTarget.src = `https://placehold.co/600x400/cccccc/333333?text=Image+Not+Found`; }} // Fallback image
              />
            ) : (
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No Image Available
              </div>
            )}
            <div className="p-5">
              <h3 className="text-2xl font-bold text-primary mb-2">{car.car_name}</h3>
              <p className="text-primary text-base mb-1">Model: <span className="font-medium">{car.car_model}</span></p>
              <p className="text-primary text-base mb-1">Type: <span className="font-medium">{car.car_type}</span></p>
              {car.car_description && (
                <p className="text-primary text-sm mb-3 line-clamp-3">
                  {car.car_description}
                </p>
              )}
              {car.personality_options && (
                <p className="text-gray-600 text-sm mb-3">
                  Features: <span className="font-medium">{car.personality_options}</span>
                </p>
              )}
              <div className="flex justify-between items-center mt-4">
                <p className="text-2xl font-extrabold text-primary">${car.price.toLocaleString()}</p>
                <a href={`/cardetails/${car.id}`}>
                <button className="bg-secondary hover:bg-primary hover:text-primary-foreground text-primary font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">
                  View Details
                </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomCarListings;
