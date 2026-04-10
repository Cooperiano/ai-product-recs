'use client'

import { Message } from '@/types'
import { MessageBubble } from './MessageBubble'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Bot className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Welcome to AI Product Recommendations</h2>
          <p className="text-sm text-muted-foreground">
            Ask me anything about laptops, phones, workstations, tablets, or monitors.
            I'll help you find the perfect product based on your needs and budget.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            Best gaming laptop under $1500
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            Phone with best camera
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            Workstation for video editing
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="flex h-full flex-col">
      <div className="flex flex-col gap-4 p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  )
}
