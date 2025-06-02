// src/components/CarListings.tsx
import React, { useState, useEffect } from 'react'
import { CarListingsService } from '../lib/carListingService'
import type { CarListing } from '../lib/supabase'

export function CarListings() {
  const [carListings, setCarListings] = useState<CarListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('')

  useEffect(() => {
    loadCarListings()
    
    // Subscribe to real-time updates
    const subscription = CarListingsService.subscribeToCarListings((payload) => {
      console.log('Real-time update:', payload)
      loadCarListings() // Reload data when changes occur
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadCarListings = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await CarListingsService.getAllCarListings()
      setCarListings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load car listings')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadCarListings()
      return
    }

    try {
      setLoading(true)
      const data = await CarListingsService.searchCarListings(searchTerm)
      setCarListings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  const handleTypeFilter = async (type: string) => {
    setSelectedType(type)
    
    if (!type) {
      loadCarListings()
      return
    }

    try {
      setLoading(true)
      const data = await CarListingsService.getCarListingsByType(type)
      setCarListings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Filter failed')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
        <span className="ml-2 text-primary">Loading car listings...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button 
          onClick={loadCarListings}
          className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        
        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="flex">
              <input
                type="text"
                placeholder="Search by car name or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-2 border border-muted rounded-l-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-secondary text-white rounded-r-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                Search
              </button>
            </div>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => handleTypeFilter(e.target.value)}
            className="px-4 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">All Types</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
            <option value="coupe">Coupe</option>
            <option value="sport">Sport</option>
            <option value="convertible">Convertible</option>
          </select>
        </div>
      </div>

      {carListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No car listings found.</p>
          {searchTerm && (
            <button 
              onClick={() => {
                setSearchTerm('')
                loadCarListings()
              }}
              className="mt-2 text-primary hover:text-primary/80"
            >
              Clear search and show all listings
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carListings.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={car.car_img}
                  alt={car.car_name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://via.placeholder.com/400x200?text=No+Image'
                  }}
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-primary">{car.car_name}</h3>
                  <span className="text-2xl font-bold text-primary">{formatPrice(car.price)}</span>
                </div>
                
                <p className="text-muted-foreground mb-2">{car.car_model}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-accent">
                    {car.car_type}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {car.car_description}
                </p>
                
                {car.personality_options && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-primary">Features: </span>
                    <span className="text-sm text-primary">{car.personality_options}</span>
                  </div>
                )}
                
                <a href={`/cardetails/${car.id}`}>
                  <button className="w-full bg-primary text-accent py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200">
                    View Details
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}