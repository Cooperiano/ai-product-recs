import { Message } from '@/types'

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatCompletionRequest {
  messages: OpenAIMessage[]
  model: 'gpt-4o-mini' | 'gpt-4o'
  temperature?: number
  max_tokens?: number
  functions?: FunctionCall[]
  function_call?: 'auto' | { name: string }
}

export interface FunctionCall {
  name: string
  description: string
  parameters: Record<string, unknown>
}

export interface ChatCompletionResponse {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    message: {
      role: string
      content: string | null
      function_call?: {
        name: string
        arguments: string
      }
    }
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface ProductSearchFunctionParams {
  category?: string
  min_price?: number
  max_price?: number
  brand?: string
  required_features?: string[]
}