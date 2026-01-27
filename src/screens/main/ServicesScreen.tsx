import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme, Spacing, Typography, Shadows } from '../../theme';
import { apiService } from '../../api/services';
import { Service } from '../../types';
import ServiceCard from '../../components/services/ServiceCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types';

const ServicesScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const { colors, primary } = useTheme();

    const [services, setServices] = useState<Service[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);
    const LIMIT = 10;

    const fetchCategories = async () => {
        try {
            const cats = await apiService.getCategories();
            setCategories(cats);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchServices = async (isRefresh = false) => {
        try {
            const currentSkip = isRefresh ? 0 : skip;
            if (currentSkip !== 0) setLoadingMore(true);
            else if (!isRefresh) setLoading(true);

            const data = await apiService.getProducts(LIMIT, currentSkip, '', selectedCategory);

            if (isRefresh) {
                setServices(data.products);
            } else {
                setServices(prev => [...prev, ...data.products]);
            }

            setTotal(data.total);
            setSkip(currentSkip + LIMIT);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            setRefreshing(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        setSkip(0);
        fetchServices(true);
    }, [selectedCategory]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchServices(true);
    };

    const handleLoadMore = () => {
        if (!loadingMore && services.length < total) {
            fetchServices();
        }
    };

    const renderCategoryItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={[
                styles.categoryChip,
                { backgroundColor: colors.surface, borderColor: colors.border },
                selectedCategory === item && { backgroundColor: primary, borderColor: primary }
            ]}
            onPress={() => setSelectedCategory(item)}
        >
            <Text style={[
                styles.categoryText,
                { color: colors.text.secondary },
                selectedCategory === item && { color: '#ffffff' }
            ]}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text.primary }]}>All Services</Text>
                <TouchableOpacity
                    style={[styles.filterBtn, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
                    onPress={() => navigation.navigate('Search', {})}
                >
                    <Search size={22} color={colors.text.primary} />
                </TouchableOpacity>
            </View>

            <View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    keyExtractor={(item) => item}
                    renderItem={renderCategoryItem}
                    contentContainerStyle={styles.categoryList}
                />
            </View>

            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={primary} />
                </View>
            ) : (
                <FlatList
                    data={services}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({ item }) => (
                        <ServiceCard
                            service={item}
                            onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id, service: item })}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={primary} />
                    }
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => (
                        loadingMore ? <ActivityIndicator style={{ margin: 20 }} color={primary} /> : null
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={[styles.emptyText, { color: colors.text.muted }]}>No services found for this category.</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingTop: 60,
        paddingBottom: Spacing.md,
    },
    title: {
        ...Typography.h2,
    },
    filterBtn: {
        padding: 8,
        borderRadius: 12,
        ...Shadows.sm,
    },
    categoryList: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.md,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
    },
    categoryText: {
        ...Typography.caption,
        fontWeight: '600',
    },
    listContent: {
        padding: Spacing.lg,
        paddingBottom: 40,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        ...Typography.body,
    },
});

export default ServicesScreen;
