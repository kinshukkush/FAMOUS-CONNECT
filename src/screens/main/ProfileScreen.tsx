import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { User as UserIcon, LogOut, Settings, Bell, Shield, HelpCircle, Edit3 } from 'lucide-react-native';
import { useTheme, Spacing, Typography, Shadows } from '../../theme';
import { useAuth } from '../../hooks/useAuth';

const ProfileScreen = () => {
    const { user, logout } = useAuth();
    const { colors, primary, error } = useTheme();

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", onPress: logout, style: "destructive" }
            ]
        );
    };

    const renderMenuItem = (icon: any, title: string, tintColor: string = colors.text.primary) => (
        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <View style={[styles.menuIconContainer, { backgroundColor: tintColor + '10' }]}>
                {icon}
            </View>
            <Text style={[styles.menuText, { color: tintColor }]}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
            <Text style={[styles.title, { color: colors.text.primary }]}>Profile</Text>

            <View style={styles.profileHeader}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: user?.profilePic || 'https://i.pravatar.cc/150' }}
                        style={[styles.profileImage, { backgroundColor: colors.border }]}
                    />
                    <TouchableOpacity style={[styles.editBtn, { backgroundColor: primary, borderColor: colors.background }]}>
                        <Edit3 size={16} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.name, { color: colors.text.primary }]}>{user?.name || 'Jane Doe'}</Text>
                <Text style={[styles.email, { color: colors.text.secondary }]}>{user?.email || 'jane@example.com'}</Text>
            </View>

            <View style={[styles.statsRow, { backgroundColor: colors.surface }]}>
                <View style={styles.statBox}>
                    <Text style={[styles.statValue, { color: colors.text.primary }]}>12</Text>
                    <Text style={[styles.statLabel, { color: colors.text.muted }]}>Bookings</Text>
                </View>
                <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
                <View style={styles.statBox}>
                    <Text style={[styles.statValue, { color: colors.text.primary }]}>5</Text>
                    <Text style={[styles.statLabel, { color: colors.text.muted }]}>Favorites</Text>
                </View>
                <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
                <View style={styles.statBox}>
                    <Text style={[styles.statValue, { color: colors.text.primary }]}>4.9</Text>
                    <Text style={[styles.statLabel, { color: colors.text.muted }]}>Rating</Text>
                </View>
            </View>

            <View style={styles.menuSection}>
                <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>Account Settings</Text>
                {renderMenuItem(<UserIcon size={20} color={colors.text.primary} />, "Edit Profile")}
                {renderMenuItem(<Bell size={20} color={colors.text.primary} />, "Notifications")}
                {renderMenuItem(<Settings size={20} color={colors.text.primary} />, "Settings")}
            </View>

            <View style={styles.menuSection}>
                <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>Support</Text>
                {renderMenuItem(<Shield size={20} color={colors.text.primary} />, "Privacy Policy")}
                {renderMenuItem(<HelpCircle size={20} color={colors.text.primary} />, "Help Center")}
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <View style={[styles.menuIconContainerLogout, { backgroundColor: error + '10' }]}>
                    <LogOut size={20} color={error} />
                </View>
                <Text style={[styles.logoutText, { color: error }]}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: Spacing.lg,
        paddingTop: 60,
    },
    title: {
        ...Typography.h2,
        marginBottom: Spacing.xl,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 8,
        borderRadius: 15,
        borderWidth: 3,
    },
    name: {
        ...Typography.h2,
    },
    email: {
        ...Typography.body,
    },
    statsRow: {
        flexDirection: 'row',
        padding: Spacing.md,
        borderRadius: 20,
        marginBottom: Spacing.xl,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        ...Typography.h3,
    },
    statLabel: {
        ...Typography.caption,
    },
    statDivider: {
        width: 1,
        height: '60%',
        alignSelf: 'center',
    },
    menuSection: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        ...Typography.caption,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        marginLeft: 4,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
    },
    menuIconContainer: {
        padding: 8,
        borderRadius: 10,
        marginRight: 12,
    },
    menuText: {
        ...Typography.body,
        fontWeight: '600',
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        padding: 12,
    },
    menuIconContainerLogout: {
        padding: 8,
        borderRadius: 10,
        marginRight: 12,
    },
    logoutText: {
        ...Typography.body,
        fontWeight: '600',
    },
});

export default ProfileScreen;
