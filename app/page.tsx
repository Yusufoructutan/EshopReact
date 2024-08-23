import Container from "./components/container";
import HomeBanner from "./components/NavBar/HomeBanner";
import ProductsList from "./components/Products/ProductList";

export default function Home() {

  return (
    <div className='p-8'>
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div>
          <ProductsList />
        </div>
      </Container>
    </div>
  );
}
