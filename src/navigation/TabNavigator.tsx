import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, LayoutGrid, Heart, User } from 'lucide-react-native';
import HomeScreen from '../screens/main/HomeScreen';
import ServicesScreen from '../screens/main/ServicesScreen';
import FavoritesScreen from '../screens/main/FavoritesScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { HomeTabParamList } from '../types';
import { useTheme } from '../theme';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const TabNavigator = () => {
    const { colors, primary } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: primary,
                tabBarInactiveTintColor: colors.text.muted,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    height: 90,
                    paddingBottom: 30,
                    paddingTop: 10,
                },
                tabBarIcon: ({ color, size }) => {
                    switch (route.name) {
                        case 'Home': return <Home size={size} color={color} />;
                        case 'Services': return <LayoutGrid size={size} color={color} />;
                        case 'Favorites': return <Heart size={size} color={color} />;
                        case 'Profile': return <User size={size} color={color} />;
                        default: return null;
                    }
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Services" component={ServicesScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
