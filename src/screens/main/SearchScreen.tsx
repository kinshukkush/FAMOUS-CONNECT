import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ChevronLeft, Search as SearchIcon, X } from 'lucide-react-native';
import { useTheme, Spacing, Typography, Shadows } from '../../theme';
import { apiService } from '../../api/services';
import { Service } from '../../types';
import ServiceCard from '../../components/services/ServiceCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types';

type Props = NativeStackScreenProps<MainStackParamList, 'Search'>;

const SearchScreen: React.FC<Props> = ({ navigation, route }) => {
    const { colors, primary } = useTheme();
    const [query, setQuery] = useState(route.params?.query || '');
    const [results, setResults] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.trim()) {
            const delayDebounceFn = setTimeout(() => {
                handleSearch();
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setResults([]);
        }
    }, [query]);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const data = await apiService.getProducts(20, 0, query);
            setResults(data.products);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border, shadowColor: colors.shadow }]}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={colors.text.primary} />
                </TouchableOpacity>
                <View style={[styles.searchContainer, { backgroundColor: colors.background }]}>
                    <SearchIcon size={20} color={colors.text.muted} style={styles.searchIcon} />
                    <TextInput
                        style={[styles.input, { color: colors.text.primary }]}
                        placeholder="Search services..."
                        placeholderTextColor={colors.text.muted}
                        value={query}
                        onChangeText={setQuery}
                        autoFocus
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery('')}>
                            <X size={18} color={colors.text.muted} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={primary} />
                </View>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ paddingHorizontal: Spacing.lg }}>
                            <ServiceCard
                                service={item}
                                onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id, service: item })}
                            />
                        </View>
                    )}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={[styles.emptyText, { color: colors.text.muted }]}>
                                {query.length > 0 ? "No services found." : "Try searching for 'car', 'phone', or 'laptop'"}
                            </Text>
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
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingTop: 60,
        paddingBottom: Spacing.md,
        ...Shadows.sm,
    },
    backBtn: {
        padding: 8,
        marginRight: 8,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        ...Typography.body,
    },
    listContent: {
        paddingTop: Spacing.lg,
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
        textAlign: 'center',
        paddingHorizontal: 40,
    },
});

export default SearchScreen;
