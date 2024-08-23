interface AuthContextProps {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
  }


interface Props {
    children: React.ReactNode;
}

interface Product {
  productId: number;
  name: string;
  price: number;
  description: string;
  productImage: string;
}

interface SearchContextType {
  searchResults: Product[];
  setSearchResults: (products: Product[]) => void;
}