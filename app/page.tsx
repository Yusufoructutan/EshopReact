import Image from 'next/image'
import HomeBanner from './components/NavBar/HomeBanner'
import Container from './components/container'
import ProductsList from './components/Pages/ProductList'

import Link from 'next/link';

export default function Home() {
  return (
    <div className='p-8'>
      <Container>
        <div>
          <HomeBanner/>
        </div>
        <div>
          <ProductsList/>
        </div>
        
      </Container>
    </div>
  )
}
