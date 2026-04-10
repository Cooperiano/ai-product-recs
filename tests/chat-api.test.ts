import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { NextRequest, NextResponse } from 'next/server'
import { POST } from '@/app/api/chat/route'

// Mock dependencies
jest.mock('@/lib/ai/openai')
jest.mock('@/lib/db/queries')
jest.mock('@/lib/ai/prompts')

describe('Chat API Tests', () => {
  let mockRequest: NextRequest

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()

    // Reset the createChatCompletion mock to return successful response
    const { createChatCompletion } = require('@/lib/ai/openai')
    createChatCompletion.mockResolvedValue({
      choices: [
        {
          message: {
            content: 'Mocked AI response for testing purposes',
          },
        },
      ],
    })
  })

  afterEach(() => {
    // Clean up after each test
    jest.restoreAllMocks()
  })

  describe('POST /api/chat', () => {
    it('should return 400 error when message is missing', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      const response = await POST(mockRequest)
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Message is required')
    })

    it('should return 400 error when message is not a string', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 123, history: [] }),
      })

      const response = await POST(mockRequest)
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Message is required')
    })

    it('should return AI response without products for general chat', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello, how are you?',
          history: []
        }),
      })

      const response = await POST(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.message).toBeDefined()
      expect(data.message).toBe('Mocked AI response for testing purposes')
      expect(data.products).toBeUndefined()
    })

    it('should return AI response with products when product intent is detected', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'I need a laptop recommendation',
          history: []
        }),
      })

      const response = await POST(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.message).toBeDefined()
      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
      expect(data.products.length).toBeGreaterThan(0)
    })

    it('should return products filtered by category when category is specified', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Looking for a phone under $500',
          history: []
        }),
      })

      const response = await POST(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('should return products filtered by budget when budget is specified', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'I need a laptop under $1000',
          history: []
        }),
      })

      const response = await POST(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('should handle conversation history correctly', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello there',
          history: [
            { role: 'user', content: 'Hi' },
            { role: 'assistant', content: 'Hello! How can I help you?' }
          ]
        }),
      })

      const response = await POST(mockRequest)
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.message).toBeDefined()
      expect(data.products).toBeUndefined()
    })

    it('should return 500 error when OpenAI API fails', async () => {
      // Store original mock
      const { createChatCompletion } = require('@/lib/ai/openai')
      const originalMock = createChatCompletion.mockImplementation

      // Mock to throw error
      createChatCompletion.mockImplementation(() => {
        throw new Error('OpenAI API error')
      })

      mockRequest = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello',
          history: []
        }),
      })

      const response = await POST(mockRequest)
      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Failed to process chat message')

      // Restore original mock
      createChatCompletion.mockImplementation(originalMock)
    })

    it('should limit conversation history to last 10 messages', async () => {
      const longHistory = Array.from({ length: 15 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i + 1}`
      }))

      mockRequest = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello',
          history: longHistory
        }),
      })

      const response = await POST(mockRequest)
      expect(response.status).toBe(200)

      // Verify that only the last 10 messages were processed
      const { createChatCompletion } = require('@/lib/ai/openai')
      const callArgs = createChatCompletion.mock.calls[0][0].messages
      expect(callArgs.length).toBe(12) // 1 system + 10 from history + 1 current
    })
  })
})