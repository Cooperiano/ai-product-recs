'use client'

import { Message } from '@/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { User, Bot, ExternalLink, Star } from 'lucide-react'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
      )}

      <div className={`flex max-w-[80%] flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        </div>

        {message.products && message.products.length > 0 && (
          <div className="flex w-full flex-col gap-3">
            {message.products.map((product) => (
              <Card key={product.id} className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{product.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.average_rating}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{product.brand}</span>
                      <Badge variant={product.availability === 'in_stock' ? 'default' : 'secondary'}>
                        {product.availability === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold">
                      {product.currency} {product.price}
                    </p>
                    {product.specs.processor && (
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Processor: {product.specs.processor}</p>
                        <p>RAM: {product.specs.ram}GB</p>
                        <p>Storage: {product.specs.storage}GB</p>
                        {product.specs.gpu && <p>GPU: {product.specs.gpu}</p>}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full flex-col gap-2">
                    {product.pros && product.pros.length > 0 && (
                      <div>
                        <p className="mb-1 text-xs font-semibold text-green-600">Pros:</p>
                        <ul className="list-inside list-disc text-xs text-muted-foreground">
                          {product.pros.map((pro, idx) => (
                            <li key={idx}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {product.cons && product.cons.length > 0 && (
                      <div>
                        <p className="mb-1 text-xs font-semibold text-red-600">Cons:</p>
                        <ul className="list-inside list-disc text-xs text-muted-foreground">
                          {product.cons.map((con, idx) => (
                            <li key={idx}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {product.affiliate_links && product.affiliate_links.length > 0 && (
                      <div className="flex gap-2 pt-2">
                        {product.affiliate_links.map((link, idx) => (
                          <Button key={idx} variant="outline" size="sm" asChild>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <span>View on {link.platform}</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <span className="text-xs text-muted-foreground">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  )
}
