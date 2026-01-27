import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Spacing, Typography } from '../../theme';

interface InputProps {
    label?: string;
    error?: string;
    touched?: boolean;
    secureTextEntry?: boolean;
    containerStyle?: ViewStyle;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    onBlur?: (e: any) => void;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    touched,
    containerStyle,
    ...props
}) => {
    const { colors, primary, error: errorColor } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const showError = touched && error;
    const borderColor = showError
        ? errorColor
        : isFocused
            ? primary
            : colors.border;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, { color: colors.text.primary }]}>{label}</Text>}
            <View style={[styles.inputContainer, { borderColor, backgroundColor: colors.surface }]}>
                <TextInput
                    style={[styles.input, { color: colors.text.primary }]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false);
                        props.onBlur?.(e);
                    }}
                    placeholderTextColor={colors.text.muted}
                    {...props}
                />
            </View>
            {showError && <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
        width: '100%',
    },
    label: {
        ...Typography.caption,
        fontWeight: '600',
        marginBottom: 6,
        marginLeft: 4,
    },
    inputContainer: {
        height: 52,
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: Spacing.md,
        justifyContent: 'center',
    },
    input: {
        ...Typography.body,
    },
    errorText: {
        ...Typography.caption,
        marginTop: 4,
        marginLeft: 4,
    },
});

export default Input;
