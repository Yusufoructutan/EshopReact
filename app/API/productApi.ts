import apiClient from './index';




export const fetchProductsData = () => {
    return apiClient.get('/Product')
        .then(response => response.data)
        .catch(error => {
            throw new Error(`Error fetching products: ${error.message}`);
        });
};




export const fetchProductsByCategory = (categoryId: number) => {
    return apiClient.get(`/Product/category/${categoryId}`)
        .then(response => response.data)
        .catch(error => {
            throw new Error(`Failed to fetch products by category: ${error.message}`);
        });
};


export const fetchProductDetails = (productId: number, token: string) => {
    return apiClient.get(`/Product/${productId}`)
        .then(response => response.data)
        .catch(error => {
            throw new Error(`Failed to fetch product details: ${error.message}`);
        });
};

export const fetchProductById = async (productId: number): Promise<Product> => {
    try {
      const response = await apiClient.get(`/Product/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error('Ürün bilgileri alınırken bir hata oluştu.');
    }
  }
