import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const ProductsByCategory: NextPage = () => {
  const router = useRouter()

  return <div>slug: {router.query?.slug}</div>
}

export default ProductsByCategory
