import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme, Spacing, Typography } from '../../theme';

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    style,
    variant = 'primary'
}) => {
    const { colors, primary, secondary, error, white } = useTheme();
    const isOutline = variant === 'outline';

    const getBackgroundColor = () => {
        if (disabled) return colors.muted;
        switch (variant) {
            case 'secondary': return secondary;
            case 'outline': return 'transparent';
            case 'danger': return error;
            default: return primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return colors.text.muted;
        if (isOutline) return primary;
        return white;
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor() },
                isOutline && { borderWidth: 1.5, borderColor: primary },
                style
            ]}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: Spacing.lg,
    },
    text: {
        ...Typography.button,
    },
});

export default PrimaryButton;
