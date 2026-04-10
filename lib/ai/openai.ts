import OpenAI from 'openai'
import { ChatCompletionRequest, ChatCompletionResponse } from './types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function createChatCompletion(
  request: ChatCompletionRequest
): Promise<ChatCompletionResponse> {
  try {
    const response = await openai.chat.completions.create({
      model: request.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.max_tokens ?? 1000,
    })

    return response as ChatCompletionResponse
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error(`Failed to get AI response: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function createStreamingChatCompletion(
  request: ChatCompletionRequest
): Promise<AsyncIterable<ChatCompletionResponse>> {
  try {
    const stream = await openai.chat.completions.create({
      model: request.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.max_tokens ?? 1000,
      stream: true,
    })

    return stream as AsyncIterable<ChatCompletionResponse>
  } catch (error) {
    console.error('OpenAI API streaming error:', error)
    throw new Error(`Failed to get AI streaming response: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}