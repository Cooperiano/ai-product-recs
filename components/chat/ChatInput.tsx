'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t bg-background p-4">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about products..."
        disabled={disabled}
        className="flex-1"
      />
      <Button type="submit" disabled={disabled || !input.trim()} size="icon">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
