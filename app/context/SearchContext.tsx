'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

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

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
