import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Product } from '@/types'

interface ProductComparisonProps {
  products: Product[]
  onRemoveProduct?: (productId: string) => void
  onClearAll?: () => void
  maxProducts?: number
}

export function ProductComparison({
  products,
  onRemoveProduct,
  onClearAll,
  maxProducts = 4
}: ProductComparisonProps) {
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

  const renderSpecRow = (label: string, value1: any, value2: any) => {
    const getValue = (value: any) => {
      if (value === undefined || value === null) return 'N/A'
      if (Array.isArray(value)) return value.join(', ')
      return value.toString()
    }

    return (
      <tr className="border-t border-b border-muted">
        <td className="py-2 font-medium text-sm">{label}</td>
        <td className="py-2 text-sm">{getValue(value1)}</td>
        <td className="py-2 text-sm">{getValue(value2)}</td>
      </tr>
    )
  }

  const renderRating = (rating: number, reviewCount: number) => {
    if (rating === 0 || reviewCount === 0) {
      return <span className="text-sm text-muted-foreground">No reviews</span>
    }

    const stars = '★'.repeat(Math.floor(rating)) +
                 '☆'.repeat(5 - Math.floor(rating))

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        <span className="text-yellow-500 text-sm">{stars}</span>
        <span className="text-sm text-muted-foreground">({reviewCount})</span>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No products to compare. Add products to see comparison.</p>
        </CardContent>
      </Card>
    )
  }

  if (products.length > maxProducts) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Maximum {maxProducts} products can be compared at once.
          </p>
          <p className="text-sm text-muted-foreground">
            Remove some products to continue.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Product Comparison ({products.length} of {maxProducts})
            </CardTitle>
            {onClearAll && products.length > 0 && (
              <Button variant="outline" size="sm" onClick={onClearAll}>
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium">Feature</th>
                  {products.map((product) => (
                    <th key={product.id} className="py-3 px-4 text-center">
                      <div className="space-y-2">
                        <h3 className="font-semibold truncate max-w-[200px] mx-auto">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          {product.brand}
                        </p>
                        {onRemoveProduct && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => onRemoveProduct(product.id)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-muted/50">
                  <td className="py-3 px-4 font-medium">Price</td>
                  {products.map((product) => (
                    <td key={product.id} className="py-3 px-4 text-center">
                      <div className="text-lg font-bold text-primary">
                        {formatPrice(product.price, product.currency)}
                      </div>
                      <Badge className={getAvailabilityColor(product.availability)} variant="secondary">
                        {product.availability.replace('_', ' ')}
                      </Badge>
                    </td>
                  ))}
                </tr>

                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Rating</td>
                  {products.map((product) => (
                    <td key={product.id} className="py-3 px-4 text-center">
                      {renderRating(product.average_rating, product.review_count)}
                    </td>
                  ))}
                </tr>

                {products[0].specs.processor && (
                  renderSpecRow('Processor', products[0].specs.processor, products[1]?.specs.processor)
                )}

                {products[0].specs.ram && (
                  renderSpecRow('RAM', `${products[0].specs.ram}GB`, `${products[1]?.specs.ram}GB`)
                )}

                {products[0].specs.storage && (
                  renderSpecRow('Storage', `${products[0].specs.storage}GB`, `${products[1]?.specs.storage}GB`)
                )}

                {products[0].specs.gpu && (
                  renderSpecRow('GPU', products[0].specs.gpu, products[1]?.specs.gpu)
                )}

                {products[0].specs.display?.size && (
                  renderSpecRow('Display Size', `${products[0].specs.display.size}"`, `${products[1]?.specs.display?.size}"`)
                )}

                {products[0].specs.display?.resolution && (
                  renderSpecRow('Resolution', products[0].specs.display.resolution, products[1]?.specs.display?.resolution)
                )}

                {products[0].specs.os && (
                  renderSpecRow('OS', products[0].specs.os, products[1]?.specs.os)
                )}

                {products[0].use_cases.length > 0 && (
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Use Cases</td>
                    {products.map((product) => (
                      <td key={product.id} className="py-3 px-4 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {product.use_cases.slice(0, 2).map((useCase, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {useCase}
                            </Badge>
                          ))}
                          {product.use_cases.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.use_cases.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                )}

                {products[0].pros.length > 0 && (
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Pros</td>
                    {products.map((product) => (
                      <td key={product.id} className="py-3 px-4 text-center">
                        <ul className="text-xs text-muted-foreground space-y-1 text-left">
                          {product.pros.slice(0, 2).map((pro, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span>✓</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                          {product.pros.length > 2 && (
                            <li className="text-muted-foreground">
                              +{product.pros.length - 2} more
                            </li>
                          )}
                        </ul>
                      </td>
                    ))}
                  </tr>
                )}

                {products[0].cons.length > 0 && (
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Cons</td>
                    {products.map((product) => (
                      <td key={product.id} className="py-3 px-4 text-center">
                        <ul className="text-xs text-muted-foreground space-y-1 text-left">
                          {product.cons.slice(0, 2).map((con, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span>✗</span>
                              <span>{con}</span>
                            </li>
                          ))}
                          {product.cons.length > 2 && (
                            <li className="text-muted-foreground">
                              +{product.cons.length - 2} more
                            </li>
                          )}
                        </ul>
                      </td>
                    ))}
                  </tr>
                )}

                {products[0].affiliate_links.length > 0 && (
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Where to Buy</td>
                    {products.map((product) => (
                      <td key={product.id} className="py-3 px-4 text-center">
                        <div className="space-y-1">
                          {product.affiliate_links.slice(0, 2).map((link, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs w-full"
                              onClick={() => window.open(link.url, '_blank')}
                            >
                              {link.platform}
                            </Button>
                          ))}
                          {product.affiliate_links.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{product.affiliate_links.length - 2} more
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {products.length < maxProducts && (
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Add more products to compare them side by side (maximum {maxProducts}).
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}