import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';
import { ChevronLeft, Star, Heart, Share2, Phone, MessageSquare, MapPin } from 'lucide-react-native';
import { useTheme, Spacing, Typography, Shadows } from '../../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types';
import PrimaryButton from '../../components/common/PrimaryButton';
import { favoritesStorage } from '../../storage/favorites';

type Props = NativeStackScreenProps<MainStackParamList, 'ServiceDetails'>;

const ServiceDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
    const { service } = route.params;
    const { colors, primary, error, accent } = useTheme();

    const [isFavorite, setIsFavorite] = useState(false);
    const [activeImage, setActiveImage] = useState(service.thumbnail);

    useEffect(() => {
        checkFavorite();
    }, []);

    const checkFavorite = async () => {
        const fav = await favoritesStorage.isFavorite(service.id);
        setIsFavorite(fav);
    };

    const toggleFavorite = async () => {
        if (isFavorite) {
            await favoritesStorage.removeFavorite(service.id);
        } else {
            await favoritesStorage.addFavorite(service);
        }
        setIsFavorite(!isFavorite);
    };

    const handleBookNow = () => {
        Alert.alert(
            "Booking Confirmation",
            `Would you like to book "${service.title}" for $${service.price}?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Confirm", onPress: () => Alert.alert("Success", "Booking request sent to provider!") }
            ]
        );
    };

    const onShare = async () => {
        try {
            await Share.share({
                message: `Check out this service on Famous Connect: ${service.title}`,
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {/* Header Image Section */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: activeImage }} style={styles.mainImage} />

                    <View style={styles.topNav}>
                        <TouchableOpacity style={[styles.navBtn, { backgroundColor: colors.surface + 'E6' }]} onPress={() => navigation.goBack()}>
                            <ChevronLeft size={24} color={colors.text.primary} />
                        </TouchableOpacity>
                        <div style={styles.rightNav}>
                            <TouchableOpacity style={[styles.navBtn, { backgroundColor: colors.surface + 'E6' }]} onPress={onShare}>
                                <Share2 size={22} color={colors.text.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.navBtn, { backgroundColor: colors.surface + 'E6' }]} onPress={toggleFavorite}>
                                <Heart size={22} color={isFavorite ? error : colors.text.primary}
                                    fill={isFavorite ? error : 'transparent'} />
                            </TouchableOpacity>
                        </div>
                    </View>
                </View>

                {/* Content Section */}
                <View style={[styles.content, { backgroundColor: colors.surface }]}>
                    <View style={styles.headerInfo}>
                        <View style={[styles.categoryBadge, { backgroundColor: primary + '15' }]}>
                            <Text style={[styles.categoryText, { color: primary }]}>{service.category.toUpperCase()}</Text>
                        </View>
                        <View style={styles.ratingBox}>
                            <Star size={16} color={accent} fill={accent} />
                            <Text style={[styles.ratingValue, { color: colors.text.primary }]}>{service.rating}</Text>
                            <Text style={[styles.reviewCount, { color: colors.text.muted }]}> (120 reviews)</Text>
                        </View>
                    </View>

                    <Text style={[styles.title, { color: colors.text.primary }]}>{service.title}</Text>

                    <View style={styles.locationRow}>
                        <MapPin size={16} color={colors.text.muted} />
                        <Text style={[styles.locationText, { color: colors.text.secondary }]}>123 Business Way, New York, NY</Text>
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>About this service</Text>
                    <Text style={[styles.description, { color: colors.text.secondary }]}>{service.description}</Text>

                    {service.images.length > 0 && (
                        <View style={styles.galleryContainer}>
                            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Gallery</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
                                {service.images.map((img, idx) => (
                                    <TouchableOpacity key={idx} onPress={() => setActiveImage(img)}>
                                        <Image source={{ uri: img }} style={[
                                            styles.galleryImage,
                                            { backgroundColor: colors.surfaceVariant },
                                            activeImage === img && { borderColor: primary, borderWidth: 2 }
                                        ]} />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <View style={styles.contactSection}>
                        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Contact Provider</Text>
                        <View style={styles.contactButtons}>
                            <TouchableOpacity style={[styles.contactBtn, { borderColor: primary }]}
                                onPress={() => Alert.alert("Calling...", "Connecting to provider")}>
                                <Phone size={20} color={primary} />
                                <Text style={[styles.contactBtnText, { color: primary }]}>Call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.contactBtn, { borderColor: primary }]}
                                onPress={() => navigation.navigate('Chat', { serviceId: service.id, providerName: service.brand || 'Provider' })}
                            >
                                <MessageSquare size={20} color={primary} />
                                <Text style={[styles.contactBtnText, { color: primary }]}>Chat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 120 }} />
                </View>
            </ScrollView>

            {/* Bottom Sticky Action Bar */}
            <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border, shadowColor: colors.shadow }]}>
                <View>
                    <Text style={[styles.priceLabel, { color: colors.text.secondary }]}>Total Price</Text>
                    <Text style={[styles.finalPrice, { color: colors.text.primary }]}>${service.price}</Text>
                </View>
                <PrimaryButton
                    title="Book Now"
                    onPress={handleBookNow}
                    style={styles.bookBtn}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        height: 350,
        backgroundColor: '#f1f5f9',
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    topNav: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rightNav: {
        flexDirection: 'row',
    },
    navBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        ...Shadows.sm,
    },
    content: {
        padding: Spacing.lg,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
    },
    headerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    categoryText: {
        ...Typography.caption,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingValue: {
        ...Typography.body,
        fontWeight: '700',
        marginLeft: 4,
    },
    reviewCount: {
        ...Typography.caption,
        marginLeft: 4,
    },
    title: {
        ...Typography.h1,
        fontSize: 26,
        marginBottom: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    locationText: {
        ...Typography.caption,
        marginLeft: 6,
    },
    divider: {
        height: 1,
        marginBottom: 20,
    },
    sectionTitle: {
        ...Typography.h3,
        marginBottom: 8,
    },
    description: {
        ...Typography.body,
        lineHeight: 24,
        marginBottom: 24,
    },
    galleryContainer: {
        marginBottom: 24,
    },
    galleryScroll: {
        marginTop: 10,
    },
    galleryImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 12,
    },
    contactSection: {
        marginBottom: 20,
    },
    contactButtons: {
        flexDirection: 'row',
        marginTop: 8,
    },
    contactBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 16,
    },
    contactBtnText: {
        ...Typography.body,
        fontWeight: '600',
        marginLeft: 8,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Spacing.lg,
        paddingTop: 16,
        paddingBottom: 34,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        ...Shadows.md,
    },
    priceLabel: {
        ...Typography.caption,
    },
    finalPrice: {
        ...Typography.h2,
    },
    bookBtn: {
        width: '60%',
    }
});

export default ServiceDetailsScreen;
