import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/common/Input';
import PrimaryButton from '../../components/common/PrimaryButton';
import { useTheme, Spacing, Typography } from '../../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
    const { colors } = useTheme();
    const [loading, setLoading] = useState(false);

    const handleReset = async (values: any) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            Alert.alert(
                "Reset Email Sent",
                "If an account exists with this email, you will receive instructions shortly.",
                [{ text: "OK", onPress: () => navigation.navigate('Login') }]
            );
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
                    <Text style={[styles.title, { color: colors.text.primary }]}>Forgot Password?</Text>
                    <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Enter your email to receive a reset link</Text>
                </View>

                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={ForgotSchema}
                    onSubmit={handleReset}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.form}>
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

                            <PrimaryButton
                                title="Send Reset Link"
                                onPress={handleSubmit}
                                loading={loading}
                                style={styles.resetButton}
                            />

                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={styles.backButton}
                            >
                                <Text style={[styles.backText, { color: colors.text.secondary }]}>Back to Login</Text>
                            </TouchableOpacity>
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
    resetButton: {
        marginTop: Spacing.md,
    },
    backButton: {
        marginTop: Spacing.lg,
        alignItems: 'center',
    },
    backText: {
        ...Typography.body,
        fontWeight: '600',
    },
});

export default ForgotPasswordScreen;
