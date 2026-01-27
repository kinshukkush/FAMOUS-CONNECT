/**
 * Type Definitions for Famous Connect
 */

export interface User {
    id: string;
    email: string;
    name: string;
    profilePic?: string;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface ApiResponse<T> {
    products: T[];
    total: number;
    skip: number;
    limit: number;
}

// Navigation Types
export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
    ForgotPassword: undefined;
};

export type MainStackParamList = {
    HomeTabs: undefined;
    ServiceDetails: { serviceId: number; service: Service };
    Search: { query?: string };
    Chat: { serviceId: number; providerName: string };
};

export type HomeTabParamList = {
    Home: undefined;
    Services: undefined;
    Favorites: undefined;
    Profile: undefined;
};
