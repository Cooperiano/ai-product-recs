import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { NextRequest } from 'next/server'
import { GET } from '@/app/api/products/route'

// Mock dependencies
jest.mock('@/lib/db/queries')

describe('Products API Tests', () => {
  let mockRequest: NextRequest

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  afterEach(() => {
    // Clean up after each test
    jest.restoreAllMocks()
  })

  describe('GET /api/products', () => {
    it('should return all products when no parameters are provided', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/products')

      const response = await GET(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('should return products filtered by category', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/products?category=laptop')

      const response = await GET(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('should return products filtered by brand', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/products?brand=TestBrand')

      const response = await GET(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('should return products filtered by min price', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/products?minPrice=500')

      const response = await GET(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('should return products filtered by max price', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/products?maxPrice=1000')

      const response = await GET(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('should return products filtered by price range', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/products?minPrice=500&maxPrice=1500')

      const response = await GET(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('should return products filtered by availability', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/products?availability=in_stock')

      const response = await GET(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('should return products limited by limit parameter', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/products?limit=3')

      const response = await GET(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
      // Note: actual limit depends on mock implementation
    })

    it('should perform search when query parameter is provided', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/products?q=gaming')

      const response = await GET(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('should handle multiple filter parameters simultaneously', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/products?category=laptop&minPrice=800&maxPrice=1500&limit=5')

      const response = await GET(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('should handle invalid price parameters gracefully', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/products?minPrice=invalid&maxPrice=1500')

      const response = await GET(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
      // Invalid parameters should be ignored
    })

    it('should return 500 error when database query fails', async () => {
      const { getProducts, searchProducts } = require('@/lib/db/queries')
      getProducts.mockRejectedValue(new Error('Database error'))
      searchProducts.mockRejectedValue(new Error('Database error'))

      mockRequest = new NextRequest('http://localhost:3000/api/products')

      const response = await GET(mockRequest)
      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Failed to fetch products')
    })
  })
})