// Product types
export interface Product {
  id: string
  name: string
  brand: string
  category: ProductCategory
  price: number
  currency: string
  specs: ProductSpecs
  images: string[]
  affiliateLinks: AffiliateLink[]
  averageRating: number
  reviewCount: number
  availability: 'in_stock' | 'out_of_stock' | 'pre_order'
  createdAt: Date
  updatedAt: Date
}

export type ProductCategory = 'laptop' | 'phone' | 'workstation' | 'tablet' | 'monitor'

export interface ProductSpecs {
  // Laptop/Workstation specs
  processor?: string
  ram?: number
  storage?: number
  gpu?: string
  display?: DisplaySpecs
  battery?: number
  weight?: number

  // Phone specs
  screen_size?: number
  camera?: string
  storage_capacity?: number

  // Common specs
  os?: string
  connectivity?: string[]
}

export interface DisplaySpecs {
  size: number
  resolution: string
  refresh_rate?: number
  panel_type?: string
}

export interface AffiliateLink {
  platform: string
  url: string
  commission_rate?: number
}

// Chat types
export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  products?: Product[]
}

export interface ChatSession {
  id: string
  messages: Message[]
  userPreferences?: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  budget?: {
    min: number
    max: number
  }
  preferredBrands?: string[]
  requiredFeatures?: string[]
  useCases?: string[]
}

// Recommendation types
export interface Recommendation {
  product: Product
  score: number
  reasoning: string
  pros: string[]
  cons: string[]
  alternatives?: Product[]
}

export interface RecommendationRequest {
  query: string
  category?: ProductCategory
  budget?: number
  preferences?: UserPreferences
}