import { supabase } from './supabase'
import type { CarListing } from './supabase'

export class CarListingsService {
  // Get all car listings
  static async getAllCarListings() {
    const { data, error } = await supabase
      .from('car_listings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  // Get a single car listing by ID
  static async getCarListing(id: string) {
    const { data, error } = await supabase
      .from('car_listings')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  // Create a new car listing
  static async createCarListing(carData: Omit<CarListing, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('car_listings')
      .insert([carData])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Update a car listing
  static async updateCarListing(id: string, updates: Partial<CarListing>) {
    const { data, error } = await supabase
      .from('car_listings')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Delete a car listing
  static async deleteCarListing(id: string) {
    const { error } = await supabase
      .from('car_listings')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  // Search car listings by name or model
  static async searchCarListings(searchTerm: string) {
    const { data, error } = await supabase
      .from('car_listings')
      .select('*')
      .or(`car_name.ilike.%${searchTerm}%,car_model.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  // Filter by car type
  static async getCarListingsByType(carType: string) {
    const { data, error } = await supabase
      .from('car_listings')
      .select('*')
      .eq('car_type', carType)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  // Filter by price range
  static async getCarListingsByPriceRange(minPrice: number, maxPrice: number) {
    const { data, error } = await supabase
      .from('car_listings')
      .select('*')
      .gte('price', minPrice)
      .lte('price', maxPrice)
      .order('price', { ascending: true })
    
    if (error) throw error
    return data
  }

  // Subscribe to real-time changes
  static subscribeToCarListings(callback: (payload: any) => void) {
    const subscription = supabase
      .channel('car_listings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'car_listings'
        },
        callback
      )
      .subscribe()

    return subscription
  }

  // Get car listings with pagination
  static async getCarListingsPaginated(page: number = 1, limit: number = 10) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('car_listings')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)
    
    if (error) throw error
    
    return {
      data,
      totalCount: count || 0,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / limit),
      hasMore: (count || 0) > to + 1
    }
  }
}