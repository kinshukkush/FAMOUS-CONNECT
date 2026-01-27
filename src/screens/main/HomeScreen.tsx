import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { Search, Bell } from 'lucide-react-native';
import { useTheme, Spacing, Typography, Shadows } from '../../theme';
import { apiService } from '../../api/services';
import { Service } from '../../types';
import ServiceCard from '../../components/services/ServiceCard';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types';

const CATEGORIES = [
    { id: '1', name: 'Plumbing', icon: '🔧' },
    { id: '2', name: 'Cleaning', icon: '🧹' },
    { id: '3', name: 'Electrician', icon: '⚡' },
    { id: '4', name: 'Painting', icon: '🎨' },
    { id: '5', name: 'Moving', icon: '🚚' },
];

const HomeScreen = () => {
    const { user } = useAuth();
    const { colors, primary, isDark } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    const [trending, setTrending] = useState<Service[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await apiService.getProducts(5, 0);
            setTrending(data.products);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <View>
                <Text style={[styles.welcome, { color: colors.text.primary }]}>Hello, {user?.name || 'Guest'} 👋</Text>
                <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Find help for your home today</Text>
            </View>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
                <Bell size={24} color={colors.text.primary} />
            </TouchableOpacity>
        </View>
    );

    const renderSearchBar = () => (
        <TouchableOpacity
            style={[styles.searchBar, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
            onPress={() => navigation.navigate('Search', {})}
        >
            <Search size={20} color={colors.text.muted} />
            <Text style={[styles.searchPlaceholder, { color: colors.text.muted }]}>Search for services...</Text>
        </TouchableOpacity>
    );

    const renderBanner = () => (
        <View style={[styles.banner, { backgroundColor: primary }]}>
            <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>20% OFF</Text>
                <Text style={styles.bannerText}>on all Cleaning services{"\n"}this weekend!</Text>
                <TouchableOpacity style={styles.bannerButton}>
                    <Text style={[styles.bannerButtonText, { color: primary }]}>Book Now</Text>
                </TouchableOpacity>
            </View>
            <Image
                source={{ uri: 'https://cdn.pixabay.com/photo/2016/11/23/14/45/cleaning-1853299_1280.jpg' }}
                style={styles.bannerImage}
            />
        </View>
    );

    const renderCategory = ({ item }: { item: typeof CATEGORIES[0] }) => (
        <TouchableOpacity
            style={[styles.categoryCard, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
            onPress={() => navigation.navigate('HomeTabs', { screen: 'Services' } as any)}
        >
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={[styles.categoryName, { color: colors.text.primary }]}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={trending}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={() => (
                    <View style={styles.content}>
                        {renderHeader()}
                        {renderSearchBar()}
                        {renderBanner()}

                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Categories</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('HomeTabs', { screen: 'Services' } as any)}>
                                <Text style={[styles.seeAll, { color: primary }]}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={CATEGORIES}
                            keyExtractor={item => item.id}
                            renderItem={renderCategory}
                            contentContainerStyle={styles.categoryList}
                        />

                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Trending Services</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('HomeTabs', { screen: 'Services' } as any)}>
                                <Text style={[styles.seeAll, { color: primary }]}>See All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={{ paddingHorizontal: Spacing.lg }}>
                        <ServiceCard
                            service={item}
                            onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id, service: item })}
                        />
                    </View>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={primary} />
                }
                contentContainerStyle={styles.scrollPadding}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: Spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.lg,
        marginBottom: Spacing.lg,
    },
    welcome: {
        ...Typography.h2,
    },
    subtitle: {
        ...Typography.body,
    },
    iconButton: {
        padding: 8,
        borderRadius: 12,
        ...Shadows.sm,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderRadius: 12,
        ...Shadows.sm,
        marginBottom: Spacing.xl,
    },
    searchPlaceholder: {
        marginLeft: Spacing.sm,
        ...Typography.body,
    },
    banner: {
        borderRadius: 20,
        flexDirection: 'row',
        overflow: 'hidden',
        height: 160,
        marginBottom: Spacing.xl,
    },
    bannerContent: {
        flex: 1,
        padding: Spacing.lg,
        justifyContent: 'center',
    },
    bannerTitle: {
        ...Typography.h1,
        color: '#ffffff',
        fontSize: 28,
    },
    bannerText: {
        ...Typography.caption,
        color: '#ffffff',
        opacity: 0.9,
        marginVertical: 4,
    },
    bannerButton: {
        backgroundColor: '#ffffff',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    bannerButtonText: {
        fontWeight: '700',
        fontSize: 12,
    },
    bannerImage: {
        width: '40%',
        height: '100%',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        ...Typography.h3,
    },
    seeAll: {
        fontWeight: '600',
    },
    categoryList: {
        paddingRight: Spacing.lg,
        marginBottom: Spacing.xl,
    },
    categoryCard: {
        padding: Spacing.md,
        borderRadius: 16,
        alignItems: 'center',
        marginRight: Spacing.md,
        width: 100,
        ...Shadows.sm,
    },
    categoryIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    categoryName: {
        ...Typography.caption,
        fontWeight: '600',
    },
    scrollPadding: {
        paddingBottom: 40,
    },
});

export default HomeScreen;
