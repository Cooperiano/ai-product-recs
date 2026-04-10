import { supabase } from './client'
import { Product, ProductCategory } from '@/types'

export async function getProducts(options?: {
  category?: ProductCategory
  brand?: string
  minPrice?: number
  maxPrice?: number
  availability?: 'in_stock' | 'out_of_stock' | 'pre_order'
  limit?: number
}): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*')
    .order('average_rating', { ascending: false })

  if (options?.category) {
    query = query.eq('category', options.category)
  }

  if (options?.brand) {
    query = query.eq('brand', options.brand)
  }

  if (options?.minPrice) {
    query = query.gte('price', options.minPrice)
  }

  if (options?.maxPrice) {
    query = query.lte('price', options.maxPrice)
  }

  if (options?.availability) {
    query = query.eq('availability', options.availability)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as Product
}

export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,brand.ilike.%${query}%`)
    .order('average_rating', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error searching products:', error)
    return []
  }

  return data as Product[]
}

export async function getProductsByUseCases(
  useCases: string[]
): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .contains('use_cases', useCases)
    .order('average_rating', { ascending: false })

  if (error) {
    console.error('Error fetching products by use cases:', error)
    return []
  }

  return data as Product[]
}