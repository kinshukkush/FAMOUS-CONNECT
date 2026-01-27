import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme, Spacing, Typography } from '../../theme';
import { Service } from '../../types';
import ServiceCard from '../../components/services/ServiceCard';
import { favoritesStorage } from '../../storage/favorites';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types';

const FavoritesScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const { colors } = useTheme();
    const [favorites, setFavorites] = useState<Service[]>([]);

    const loadFavorites = async () => {
        const favs = await favoritesStorage.getFavorites();
        setFavorites(favs);
    };

    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [])
    );

    const toggleFavorite = async (service: Service) => {
        await favoritesStorage.removeFavorite(service.id);
        loadFavorites();
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text.primary }]}>My Favorites</Text>
            </View>

            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ServiceCard
                        service={item}
                        onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id, service: item })}
                        isFavorite={true}
                        onToggleFavorite={() => toggleFavorite(item)}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>No Favorites Yet</Text>
                        <Text style={[styles.emptySubtitle, { color: colors.text.secondary }]}>Start exploring and save services you love!</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: Spacing.lg,
        paddingTop: 60,
        paddingBottom: Spacing.md,
    },
    title: {
        ...Typography.h2,
    },
    listContent: {
        padding: Spacing.lg,
        paddingBottom: 40,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
    },
    emptyTitle: {
        ...Typography.h3,
        marginBottom: 8,
    },
    emptySubtitle: {
        ...Typography.body,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
});

export default FavoritesScreen;
