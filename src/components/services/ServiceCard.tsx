import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, Heart } from 'lucide-react-native';
import { Service } from '../../types';
import { useTheme, Spacing, Typography, Shadows, Palette } from '../../theme';

interface ServiceCardProps {
    service: Service;
    onPress: () => void;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    service,
    onPress,
    isFavorite,
    onToggleFavorite,
}) => {
    const { colors, primary, accent, error, isDark } = useTheme();

    const discountedPrice = useMemo(() => {
        return (service.price * (1 - service.discountPercentage / 100)).toFixed(2);
    }, [service.price, service.discountPercentage]);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={[styles.container, { backgroundColor: colors.surface }]}
        >
            <Image source={{ uri: service.thumbnail }} style={styles.image} />

            <TouchableOpacity
                style={[styles.favoriteBadge, { backgroundColor: colors.surface + 'E6' }]}
                onPress={onToggleFavorite}
            >
                <Heart
                    size={20}
                    color={isFavorite ? error : colors.text.muted}
                    fill={isFavorite ? error : 'transparent'}
                />
            </TouchableOpacity>

            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={[styles.category, { color: primary }]}>{service.category.toUpperCase()}</Text>
                    <View style={styles.ratingRow}>
                        <Star size={14} color={accent} fill={accent} />
                        <Text style={[styles.ratingText, { color: colors.text.primary }]}>{service.rating}</Text>
                    </View>
                </View>

                <Text style={[styles.title, { color: colors.text.primary }]} numberOfLines={1}>{service.title}</Text>

                <View style={styles.footerRow}>
                    <View>
                        <Text style={[styles.price, { color: colors.text.primary }]}>${discountedPrice}</Text>
                        {service.discountPercentage > 0 && (
                            <Text style={[styles.oldPrice, { color: colors.text.muted }]}>${service.price.toFixed(2)}</Text>
                        )}
                    </View>
                    <View style={[styles.bookButton, { backgroundColor: primary + '15' }]}>
                        <Text style={[styles.bookButtonText, { color: primary }]}>View Details</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        marginBottom: Spacing.md,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 180,
        backgroundColor: '#f1f5f9',
    },
    favoriteBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 8,
        borderRadius: 20,
    },
    content: {
        padding: Spacing.md,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    category: {
        ...Typography.caption,
        fontWeight: '700',
        letterSpacing: 1,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        ...Typography.caption,
        fontWeight: '600',
        marginLeft: 4,
    },
    title: {
        ...Typography.h3,
        marginBottom: Spacing.sm,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    price: {
        ...Typography.h2,
        fontSize: 20,
    },
    oldPrice: {
        ...Typography.caption,
        textDecorationLine: 'line-through',
    },
    bookButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    bookButtonText: {
        ...Typography.caption,
        fontWeight: '700',
    },
});

export default React.memo(ServiceCard);
