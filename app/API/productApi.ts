import apiClient from './index';

export const fetchProductsData = () => {
    return apiClient.get('/Product')
        .then(response => response.data)
        .catch(() => {
        });
};

export const fetchProductsDataV2 = () => {
    return apiClient.get('/Producasdasdt')
        .then(response => response.data)
        .catch(() => '');
};


export const fetchProductsByCategory = (categoryId: number) => {
    return apiClient.get(`/Product/category/${categoryId}`)
        .then(response => response.data)
        .catch(() => {
        });
};


export const fetchProductDetails = (productId: number, token: string) => {
    return apiClient.get(`/Product/${productId}`)
        .then(response => response.data)
        .catch(error => {
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
