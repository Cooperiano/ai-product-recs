import { NextRequest, NextResponse } from 'next/server'
import { createChatCompletion } from '@/lib/ai/openai'
import { buildSystemPrompt } from '@/lib/ai/prompts'
import { getProducts, getProductsByUseCases } from '@/lib/db/queries'
import { OpenAIMessage } from '@/lib/ai/types'

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Build conversation history
    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: buildSystemPrompt(),
      },
    ]

    // Add conversation history
    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-10)) {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
        })
      }
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message,
    })

    // Get AI response
    const response = await createChatCompletion({
      messages,
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
      temperature: 0.7,
      max_tokens: 800,
    })

    const aiMessage = response.choices[0].message.content

    // Check if AI is asking for product recommendations
    const needsProducts = await detectProductIntent(message)

    let products = []
    if (needsProducts) {
      // Extract category and budget from message
      const category = extractCategory(message)
      const budget = extractBudget(message)

      // Fetch relevant products
      if (category) {
        products = await getProducts({
          category,
          maxPrice: budget?.max,
          limit: 5,
        })
      } else {
        // Search by use cases
        const useCases = extractUseCases(message)
        if (useCases.length > 0) {
          products = await getProductsByUseCases(useCases)
        }
      }
    }

    return NextResponse.json({
      message: aiMessage,
      products: products.length > 0 ? products : undefined,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}

// Helper functions
async function detectProductIntent(message: string): Promise<boolean> {
  const keywords = [
    'recommend',
    'suggest',
    'looking for',
    'need',
    'want',
    'buy',
    'laptop',
    'computer',
    'phone',
  ]

  const lowerMessage = message.toLowerCase()
  return keywords.some((keyword) => lowerMessage.includes(keyword))
}

function extractCategory(message: string): string | null {
  const categories = ['laptop', 'phone', 'workstation', 'tablet', 'monitor']
  const lowerMessage = message.toLowerCase()

  for (const category of categories) {
    if (lowerMessage.includes(category)) {
      return category
    }
  }

  return null
}

function extractBudget(message: string): { min?: number; max?: number } | null {
  // Look for price patterns like "under $1000", "between $500 and $1000"
  const pricePattern = /\$?(\d{3,5})/g
  const matches = message.match(pricePattern)

  if (!matches) return null

  const prices = matches.map((m) => parseInt(m.replace('$', '')))

  if (message.toLowerCase().includes('under') || message.toLowerCase().includes('less than')) {
    return { max: Math.min(...prices) }
  }

  if (message.toLowerCase().includes('over') || message.toLowerCase().includes('more than')) {
    return { min: Math.max(...prices) }
  }

  if (prices.length >= 2) {
    return { min: Math.min(...prices), max: Math.max(...prices) }
  }

  return null
}

function extractUseCases(message: string): string[] {
  const useCaseMap: Record<string, string[]> = {
    gaming: ['gaming', 'games', 'gamer'],
    video_editing: ['video editing', 'video', 'editing', 'premiere', 'after effects', 'davinci'],
    content_creation: ['content creation', 'creative', 'creator', 'design'],
    software_development: ['programming', 'coding', 'development', 'developer', 'software engineer'],
    business: ['business', 'work', 'office'],
    students: ['student', 'school', 'college', 'university'],
    general: ['everyday', 'general', 'basic'],
  }

  const foundUseCases: string[] = []
  const lowerMessage = message.toLowerCase()

  for (const [useCase, keywords] of Object.entries(useCaseMap)) {
    if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
      foundUseCases.push(useCase)
    }
  }

  return foundUseCases
}
