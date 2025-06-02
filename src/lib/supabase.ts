// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definition for the car_listings table
export interface CarListing {
  id: string
  car_name: string
  car_model: string
  car_type: string
  car_description: string
  car_img: string
  price: number
  personality_options?: string
  created_at: string
  updated_at?: string
}