'use client'

import { useState, useRef, useEffect } from 'react'
import { Message } from '@/types'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { Loader2 } from 'lucide-react'

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        products: data.products || [],
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b bg-background p-4">
        <h1 className="text-2xl font-bold">AI Product Recommendations</h1>
        <p className="text-sm text-muted-foreground">
          Get personalized product recommendations based on your needs
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 border-t bg-background p-4">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">Thinking...</span>
        </div>
      )}

      <ChatInput onSend={handleSendMessage} disabled={isLoading} />

      <div ref={messagesEndRef} />
    </div>
  )
}
