import { getProductById } from '@/lib/queries/products'
import { ProductDetailClient } from '@/components/ecommerce/product-detail-client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return {
      title: 'Product Not Found | PetNest',
    }
  }

  return {
    title: `${product.name} | PetNest`,
    description: product.description?.slice(0, 160) ?? `Buy ${product.name} at PetNest — India's premium pet essentials store.`,
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160) ?? '',
      images: product.image_url ? [{ url: product.image_url, width: 800, height: 800 }] : [],
      type: 'website',
    },
  }
}

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
