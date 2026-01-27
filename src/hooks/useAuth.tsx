import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../api/supabase';
import { User } from '../types';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    signup: (email: string, pass: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo accounts that work without Supabase
const DEMO_ACCOUNTS = [
    { email: 'demo@famousconnect.com', password: 'demo123', name: 'Demo User', id: 'demo-1' },
    { email: 'test@example.com', password: 'test123', name: 'Test User', id: 'demo-2' },
    { email: 'john@example.com', password: 'john123', name: 'John Doe', id: 'demo-3' },
];

const MOCK_USER_KEY = '@famous_connect_mock_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [useMockAuth, setUseMockAuth] = useState(false);

    useEffect(() => {
        initAuth();
    }, []);

    const initAuth = async () => {
        try {
            // Force demo mode (set to false only if you have valid Supabase credentials)
            const shouldUseMock = true; // Change to false when you configure real Supabase
            
            setUseMockAuth(shouldUseMock);

            if (shouldUseMock) {
                // Check for stored mock user
                const storedUser = await AsyncStorage.getItem(MOCK_USER_KEY);
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
                setLoading(false);
            } else {
                // Use Supabase authentication
                checkUser();

                // Listen for auth state changes
                const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                    if (session?.user) {
                        setUser({
                            id: session.user.id,
                            email: session.user.email!,
                            name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
                            profilePic: session.user.user_metadata?.avatar_url,
                        });
                    } else {
                        setUser(null);
                    }
                    setLoading(false);
                });

                return () => subscription.unsubscribe();
            }
        } catch (error) {
            console.error('Init auth error:', error);
            setUseMockAuth(true);
            setLoading(false);
        }
    };

    const checkUser = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email!,
                    name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
                    profilePic: session.user.user_metadata?.avatar_url,
                });
            }
        } catch (error) {
            console.error('Check user error:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, pass: string) => {
        try {
            if (useMockAuth) {
                // Check demo accounts
                const demoAccount = DEMO_ACCOUNTS.find(
                    acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === pass
                );

                if (demoAccount) {
                    const mockUser = {
                        id: demoAccount.id,
                        email: demoAccount.email,
                        name: demoAccount.name,
                    };
                    setUser(mockUser);
                    await AsyncStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
                    return;
                } else {
                    throw new Error('Invalid email or password');
                }
            }

            // Use Supabase authentication
            const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
            if (error) {
                throw error;
            }
        } catch (error: any) {
            Alert.alert('Login Error', error.message || 'Invalid credentials');
            throw error;
        }
    };

    const signup = async (email: string, pass: string, name: string) => {
        try {
            if (useMockAuth) {
                // Create mock user
                const mockUser = {
                    id: `mock-${Date.now()}`,
                    email: email,
                    name: name,
                };
                setUser(mockUser);
                await AsyncStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
                Alert.alert('Success', 'Account created successfully! You are now logged in.');
                return;
            }

            // Use Supabase authentication
            const { error, data } = await supabase.auth.signUp({
                email,
                password: pass,
                options: { data: { name } },
            });
            
            if (error) {
                throw error;
            }

            // Check if email confirmation is required
            if (data?.user && !data.session) {
                Alert.alert('Success', 'Verification email sent! Please check your inbox.');
            } else {
                Alert.alert('Success', 'Account created successfully!');
            }
        } catch (error: any) {
            Alert.alert('Signup Error', error.message || 'Failed to create account');
            throw error;
        }
    };

    const logout = async () => {
        if (useMockAuth) {
            await AsyncStorage.removeItem(MOCK_USER_KEY);
            setUser(null);
        } else {
            await supabase.auth.signOut();
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
