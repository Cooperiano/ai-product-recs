import { supabase } from '@/lib/db/client'
import products from '@/data/seed-products-transformed.json'

async function seedDatabase() {
  console.log('Seeding database with products...')

  const { data, error } = await supabase
    .from('products')
    .upsert(products.products, {
      onConflict: 'id',
      ignoreDuplicates: false,
    })

  if (error) {
    console.error('Error seeding database:', error)
    return
  }

  console.log('Successfully seeded database with', products.products.length, 'products')
}

seedDatabase()