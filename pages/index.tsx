import type { NextPage, GetServerSideProps } from 'next'
import type { IProducts } from '../types'
import Image from 'next/image'
import Slider from 'react-slick'
import client from '../client'
import { StyledHome, ProductContainer, Banner } from '../styles/Home'
import ProductCard from '../components/ProductCard'
import Head from 'next/head'

type HomeProps = {
  products: IProducts
}

const Home: NextPage<HomeProps> = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const banners = [
    { imageUrl: '/image 1.png', description: 'First Banner' },
    { imageUrl: '/image 2.png', description: 'Second Banner' },
    { imageUrl: '/image 3.png', description: 'Third Banner' }
  ]

  return (
    <StyledHome className="container">
      <Head>
        <title>Adidas</title>
      </Head>
      <div id="banner">
        <Slider {...settings}>
          {banners.map((banner, bannerIndex) => (
            <Banner key={bannerIndex} id="banner">
              <Image
                src={banner.imageUrl}
                layout="fill"
                objectFit="cover"
                alt="first banner"
              />
            </Banner>
          ))}
        </Slider>
      </div>
      <ProductContainer>
        {products.items.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ProductContainer>
    </StyledHome>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: products } = await client.get<IProducts>('/products')

  return {
    props: {
      products
    }
  }
}

export default Home
