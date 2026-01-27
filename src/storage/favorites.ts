import AsyncStorage from '@react-native-async-storage/async-storage';
import { Service } from '../types';

const FAVORITES_KEY = '@famous_connect_favorites';

export const favoritesStorage = {
    getFavorites: async (): Promise<Service[]> => {
        try {
            const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error('Error reading favorites', e);
            return [];
        }
    },

    addFavorite: async (service: Service): Promise<void> => {
        try {
            const current = await favoritesStorage.getFavorites();
            if (!current.find(s => s.id === service.id)) {
                const updated = [...current, service];
                await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
            }
        } catch (e) {
            console.error('Error adding favorite', e);
        }
    },

    removeFavorite: async (serviceId: number): Promise<void> => {
        try {
            const current = await favoritesStorage.getFavorites();
            const updated = current.filter(s => s.id !== serviceId);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error('Error removing favorite', e);
        }
    },

    isFavorite: async (serviceId: number): Promise<boolean> => {
        const current = await favoritesStorage.getFavorites();
        return !!current.find(s => s.id === serviceId);
    }
};
