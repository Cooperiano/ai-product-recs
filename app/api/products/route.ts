import { NextRequest, NextResponse } from 'next/server'
import { getProducts, searchProducts } from '@/lib/db/queries'
import { ProductCategory } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Check if this is a search request
    const query = searchParams.get('q')
    if (query) {
      const products = await searchProducts(query)
      return NextResponse.json({ products })
    }

    // Filter parameters
    const category = searchParams.get('category') as ProductCategory | null
    const brand = searchParams.get('brand')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const availability = searchParams.get('availability') as
      | 'in_stock'
      | 'out_of_stock'
      | 'pre_order'
      | null
    const limit = searchParams.get('limit')

    const products = await getProducts({
      category: category || undefined,
      brand: brand || undefined,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      availability: availability || undefined,
      limit: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}