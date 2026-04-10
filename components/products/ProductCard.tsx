import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Product, AffiliateLink } from '@/types'

interface ProductCardProps {
  product: Product
  onAddToComparison?: (product: Product) => void
  onAddToCart?: (product: Product) => void
  showActions?: boolean
}

export function ProductCard({
  product,
  onAddToComparison,
  onAddToCart,
  showActions = true
}: ProductCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price)
  }

  const getAvailabilityColor = (availability: Product['availability']) => {
    switch (availability) {
      case 'in_stock':
        return 'bg-green-100 text-green-800'
      case 'out_of_stock':
        return 'bg-red-100 text-red-800'
      case 'pre_order':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderSpecs = () => {
    const { specs } = product

    const specItems = []
    if (specs.processor) specItems.push(`Processor: ${specs.processor}`)
    if (specs.ram) specItems.push(`RAM: ${specs.ram}GB`)
    if (specs.storage) specItems.push(`Storage: ${specs.storage}GB`)
    if (specs.gpu) specItems.push(`GPU: ${specs.gpu}`)
    if (specs.display?.size) specItems.push(`Display: ${specs.display.size}"`)
    if (specs.screen_size) specItems.push(`Screen: ${specs.screen_size}"`)
    if (specs.os) specItems.push(`OS: ${specs.os}`)

    if (specItems.length > 0) {
      return (
        <div className="text-sm text-muted-foreground space-y-1">
          {specItems.map((spec, index) => (
            <div key={index} className="flex items-center gap-1">
              <span>•</span>
              <span>{spec}</span>
            </div>
          ))}
        </div>
      )
    }

    return null
  }

  const renderAffiliateLinks = () => {
    if (!product.affiliate_links || product.affiliate_links.length === 0) {
      return null
    }

    return (
      <div className="space-y-2">
        <p className="text-sm font-medium">Available at:</p>
        {product.affiliate_links.map((link, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => window.open(link.url, '_blank')}
            className="w-full justify-start"
          >
            <span className="mr-2">{link.platform}</span>
            {link.commission_rate && (
              <Badge variant="secondary" className="ml-auto">
                {link.commission_rate}% commission
              </Badge>
            )}
          </Button>
        ))}
      </div>
    )
  }

  const renderRating = () => {
    if (product.average_rating === 0 || product.review_count === 0) {
      return <span className="text-sm text-muted-foreground">No reviews yet</span>
    }

    const stars = '★'.repeat(Math.floor(product.average_rating)) +
                 '☆'.repeat(5 - Math.floor(product.average_rating))

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{product.average_rating.toFixed(1)}</span>
        <span className="text-yellow-500">{stars}</span>
        <span className="text-sm text-muted-foreground">({product.review_count})</span>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {product.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {product.brand}
            </p>
          </div>
          <Badge
            className={getAvailabilityColor(product.availability)}
            variant="secondary"
          >
            {product.availability.replace('_', ' ')}
          </Badge>
        </div>

        {product.images.length > 0 && (
          <div className="mt-4 aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        )}
      </CardHeader>

      <CardContent className="pb-4">
        <div className="mb-4">
          <div className="text-2xl font-bold text-primary">
            {formatPrice(product.price, product.currency)}
          </div>
        </div>

        {renderSpecs()}

        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Use Cases:</p>
          <div className="flex flex-wrap gap-1">
            {product.use_cases.slice(0, 3).map((useCase, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {useCase}
              </Badge>
            ))}
            {product.use_cases.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{product.use_cases.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {renderRating()}
      </CardContent>

      {(showActions && (onAddToComparison || onAddToCart)) && (
        <CardFooter className="pt-4 border-t">
          <div className="w-full space-y-2">
            {onAddToComparison && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onAddToComparison(product)}
              >
                Add to Comparison
              </Button>
            )}
            {onAddToCart && (
              <Button
                className="w-full"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </CardFooter>
      )}

      {showActions && !onAddToComparison && !onAddToCart && renderAffiliateLinks()}
    </Card>
  )
}