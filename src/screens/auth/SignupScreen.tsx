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

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short!').required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
});

const SignupScreen: React.FC<Props> = ({ navigation }) => {
    const { signup } = useAuth();
    const { colors, primary } = useTheme();
    const [loading, setLoading] = useState(false);

    const handleSignup = async (values: any) => {
        setLoading(true);
        try {
            await signup(values.email, values.password, values.name);
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
                    <Text style={[styles.title, { color: colors.text.primary }]}>Create Account</Text>
                    <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Join our community of service seekers</Text>
                </View>

                <Formik
                    initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSignup}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.form}>
                            <Input
                                label="Full Name"
                                placeholder="John Doe"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                error={errors.name}
                                touched={touched.name}
                            />
                            <Input
                                label="Email Address"
                                placeholder="john@example.com"
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
                                placeholder="********"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                error={errors.password}
                                touched={touched.password}
                                secureTextEntry
                            />
                            <Input
                                label="Confirm Password"
                                placeholder="********"
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                error={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                secureTextEntry
                            />

                            <PrimaryButton
                                title="Sign Up"
                                onPress={handleSubmit}
                                loading={loading}
                                style={styles.signupButton}
                            />

                            <View style={styles.footer}>
                                <Text style={[styles.footerText, { color: colors.text.secondary }]}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={[styles.loginLink, { color: primary }]}>Login</Text>
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
    },
    subtitle: {
        ...Typography.body,
        textAlign: 'center',
        marginTop: Spacing.sm,
    },
    form: {
        width: '100%',
    },
    signupButton: {
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
    loginLink: {
        ...Typography.body,
        fontWeight: '700',
    },
});

export default SignupScreen;
