// utils/apiUtils.ts

export const fetchProductsData = async () => {
    try {
      const response = await fetch('https://localhost:7125/api/Product');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      const data = JSON.parse(text);
      return data;
    } catch (error: any) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  };
  // API çağrısı için yardımcı fonksiyon
export const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const response = await fetch(`https://localhost:7125/api/Product/category
/${categoryId}`);
  if (!response.ok) {
      throw new Error('Failed to fetch products by category');
  }
  return response.json();
};
