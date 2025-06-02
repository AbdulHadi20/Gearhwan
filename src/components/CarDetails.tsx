import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase.ts'; // Client-side Supabase instance

// Define the CarListing interface, consistent with your other components
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

interface CarDetailsProps {
  carId: string; // The ID of the car to display
}

const CarDetails: React.FC<CarDetailsProps> = ({ carId }) => {
  const [car, setCar] = useState<CarListing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch a single car listing by its ID
        // .eq('id', carId) filters by the id column
        // .single() is used when you expect exactly one row. It will throw an error if multiple or no rows are found.
        const { data, error } = await supabase
          .from('car_listings')
          .select('*')
          .eq('id', carId)
          .single();

        if (error) {
          throw error;
        }

        // Set the fetched car data
        setCar(data);
      } catch (err: any) {
        console.error(`Error fetching car with ID ${carId}:`, err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if carId is provided
    if (carId) {
      fetchCarDetails();
    } else {
      setLoading(false);
      setError("No car ID provided.");
    }
  }, [carId]); // Re-run effect if carId changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-center text-muted p-4 animate-pulse text-lg">Loading car details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-center text-red-600 p-4 text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-600 text-center p-4 text-lg">Car not found.</p>
      </div>
    );
  }

  return (
    <div className="container p-8 mx-auto my-10">
      <h1 className="text-4xl font-extrabold text-destructive mb-6 text-center">
        {car.car_name} - {car.car_model}
      </h1>

      {car.car_img ? (
        <img
          src={car.car_img}
          alt={car.car_name}
          className="w-full h-96 object-cover rounded-lg mb-8 shadow-md"
          onError={(e) => { e.currentTarget.src = `https://placehold.co/800x600/cccccc/333333?text=Image+Not+Found`; }}
        />
      ) : (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 text-xl rounded-lg mb-8 shadow-md">
          No Image Available
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
        <div>
          <p className="text-lg text-destructive mb-2">
            <span className="font-semibold">Type:</span> {car.car_type}
          </p>
          <p className="text-lg text-destructive mb-2">
            <span className="font-semibold">Price:</span> <span className="text-primary font-bold text-2xl">${car.price.toLocaleString()}</span>
          </p>
          {car.personality_options && (
            <p className="text-lg text-destructive mb-2">
              <span className="font-semibold">Features:</span> {car.personality_options}
            </p>
          )}
        </div>
        <div>
          <p className="text-lg text-destructive mb-2">
            <span className="font-semibold">Listed:</span> {new Date(car.created_at).toLocaleDateString()}
          </p>
          {car.updated_at && (
            <p className="text-lg text-destructive mb-2">
              <span className="font-semibold">Last Updated:</span> {new Date(car.updated_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {car.car_description && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-destructive mb-3">Description</h3>
          <p className="text-destructive leading-relaxed">
            {car.car_description}
          </p>
        </div>
      )}

      <div className="text-right">
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-accent bg-secondary hover:bg-primary transition-colors duration-300"
        >
          &larr; Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default CarDetails;
