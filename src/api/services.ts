import axios from 'axios';
import { ApiResponse, Service } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiService = {
    getProducts: async (limit = 10, skip = 0, query = '', category = '') => {
        let url = '/products';

        if (query) {
            url = `/products/search?q=${query}&limit=${limit}&skip=${skip}`;
        } else if (category && category !== 'All') {
            url = `/products/category/${category.toLowerCase()}?limit=${limit}&skip=${skip}`;
        } else {
            url = `/products?limit=${limit}&skip=${skip}`;
        }

        const response = await apiClient.get<ApiResponse<Service>>(url);
        return response.data;
    },

    getCategories: async () => {
        const response = await apiClient.get<string[]>('/products/categories');
        // Map to a friendlier format if needed, but strings are fine for chips
        return ['All', ...response.data.map((c: any) => typeof c === 'object' ? c.name : c)];
    },

    getProductById: async (id: number) => {
        const response = await apiClient.get<Service>(`/products/${id}`);
        return response.data;
    },
};

export default apiClient;
