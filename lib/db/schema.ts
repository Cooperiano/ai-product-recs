import { Product } from '@/types'

export const DATABASE_SCHEMA = `
-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('laptop', 'phone', 'workstation', 'tablet', 'monitor')),
  price NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  specs JSONB NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  affiliate_links JSONB NOT NULL DEFAULT '[]',
  average_rating NUMERIC DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  availability TEXT NOT NULL CHECK (availability IN ('in_stock', 'out_of_stock', 'pre_order')) DEFAULT 'in_stock',
  use_cases TEXT[] DEFAULT '{}',
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_availability ON products(availability);
CREATE INDEX IF NOT EXISTS idx_products_use_cases ON products USING GIN(use_cases);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
`

export async function initializeDatabase() {
  console.log('Initialize database by running the SQL in lib/db/schema.ts in Supabase SQL Editor')
}