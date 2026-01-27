import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import PrimaryButton from '../../components/common/PrimaryButton';
import { useTheme, Spacing, Typography } from '../../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short!').required('Required'),
});

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { login } = useAuth();
    const { colors, primary } = useTheme();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values: any) => {
        setLoading(true);
        try {
            await login(values.email, values.password);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text.primary }]}>Welcome Back!</Text>
                    <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Sign in to access local services</Text>
                    
                    {/* Demo Credentials Hint */}
                    <View style={[styles.demoHint, { backgroundColor: primary + '10', borderColor: primary + '30' }]}>
                        <Text style={[styles.demoTitle, { color: primary }]}>🎉 Demo Account</Text>
                        <Text style={[styles.demoText, { color: colors.text.secondary }]}>
                            Email: demo@famousconnect.com{'\n'}
                            Password: demo123
                        </Text>
                    </View>
                </View>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={handleLogin}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.form}>
                            <Input
                                label="Email Address"
                                placeholder="Enter your email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                error={errors.email}
                                touched={touched.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                error={errors.password}
                                touched={touched.password}
                                secureTextEntry
                            />

                            <TouchableOpacity
                                onPress={() => navigation.navigate('ForgotPassword')}
                                style={styles.forgotPassword}
                            >
                                <Text style={[styles.forgotText, { color: primary }]}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <PrimaryButton
                                title="Login"
                                onPress={handleSubmit}
                                loading={loading}
                                style={styles.loginButton}
                            />

                            <View style={styles.footer}>
                                <Text style={[styles.footerText, { color: colors.text.secondary }]}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                    <Text style={[styles.signupText, { color: primary }]}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: Spacing.lg,
        justifyContent: 'center',
    },
    header: {
        marginBottom: Spacing.xl,
        alignItems: 'center',
    },
    title: {
        ...Typography.h1,
        textAlign: 'center',
    },
    subtitle: {
        ...Typography.body,
        textAlign: 'center',
        marginTop: Spacing.sm,
    },
    form: {
        width: '100%',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: Spacing.lg,
    },
    forgotText: {
        ...Typography.caption,
        fontWeight: '600',
    },
    loginButton: {
        marginTop: Spacing.md,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.xl,
    },
    footerText: {
        ...Typography.body,
    },
    signupText: {
        ...Typography.body,
        fontWeight: '700',
    },
    demoHint: {
        marginTop: Spacing.lg,
        padding: Spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
    },
    demoTitle: {
        ...Typography.caption,
        fontWeight: '700',
        marginBottom: 4,
    },
    demoText: {
        ...Typography.caption,
        textAlign: 'center',
        fontFamily: 'monospace',
    },
});

export default LoginScreen;
