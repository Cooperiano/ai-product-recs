// Test setup file
import { jest } from '@jest/globals'

// Mock OpenAI API to avoid actual API calls during tests
const mockCreateChatCompletion = jest.fn().mockResolvedValue({
  choices: [
    {
      message: {
        content: 'Mocked AI response for testing purposes',
      },
    },
  ],
})

jest.mock('@/lib/ai/openai', () => ({
  createChatCompletion: mockCreateChatCompletion,
  createStreamingChatCompletion: jest.fn(),
}))

// Mock database queries to avoid actual database calls
const mockGetProducts = jest.fn().mockResolvedValue([
  {
    id: 1,
    name: 'Test Product',
    category: 'laptop',
    brand: 'Test Brand',
    price: 999.99,
    description: 'A test product',
    specifications: {},
    use_cases: ['general'],
    availability: 'in_stock',
  },
])

const mockSearchProducts = jest.fn().mockResolvedValue([
  {
    id: 3,
    name: 'Search Result Product',
    category: 'phone',
    brand: 'Search Brand',
    price: 299.99,
    description: 'A search result product',
    specifications: {},
    use_cases: ['general'],
    availability: 'in_stock',
  },
])

const mockGetProductsByUseCases = jest.fn().mockResolvedValue([
  {
    id: 2,
    name: 'Test Product 2',
    category: 'phone',
    brand: 'Test Brand 2',
    price: 499.99,
    description: 'Another test product',
    specifications: {},
    use_cases: ['gaming'],
    availability: 'in_stock',
  },
])

jest.mock('@/lib/db/queries', () => ({
  getProducts: mockGetProducts,
  searchProducts: mockSearchProducts,
  getProductsByUseCases: mockGetProductsByUseCases,
  getProductById: jest.fn().mockResolvedValue(null),
}))

// Mock system prompt builder
jest.mock('@/lib/ai/prompts', () => ({
  buildSystemPrompt: jest.fn().mockReturnValue('You are a helpful AI assistant for product recommendations.'),
}))

// Mock Supabase client
jest.mock('@/lib/db/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          eq: jest.fn(() => ({
            gte: jest.fn(() => ({
              lte: jest.fn(() => ({
                eq: jest.fn(() => ({
                  limit: jest.fn(() => Promise.resolve({
                    data: [
                      {
                        id: 1,
                        name: 'Test Product',
                        category: 'laptop',
                        brand: 'Test Brand',
                        price: 999.99,
                        description: 'A test product',
                        specifications: {},
                        use_cases: ['general'],
                        availability: 'in_stock',
                      },
                    ],
                    error: null,
                  })),
                })),
              })),
            })),
          })),
        })),
      })),
    })),
  },
}))