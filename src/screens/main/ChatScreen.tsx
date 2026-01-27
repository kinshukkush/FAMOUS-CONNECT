import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { ChevronLeft, Send } from 'lucide-react-native';
import { useTheme, Spacing, Typography, Shadows } from '../../theme';
import { useAuth } from '../../hooks/useAuth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types';
import { supabase } from '../../api/supabase';

type Props = NativeStackScreenProps<MainStackParamList, 'Chat'>;

interface Message {
    id: string;
    text: string;
    sender_id: string;
    created_at: string;
}

const ChatScreen: React.FC<Props> = ({ route, navigation }) => {
    const { serviceId, providerName } = route.params;
    const { user } = useAuth();
    const { colors, primary } = useTheme();

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(true);
    const flatListRef = useRef<FlatList>(null);

    // Simulation of real-time messages if Supabase isn't fully configured
    const isMock = true;

    useEffect(() => {
        fetchMessages();

        // Set up real-time subscription
        const subscription = supabase
            .channel(`chat_${serviceId}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                setMessages(prev => [payload.new as Message, ...prev]);
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        // Mocking initial data
        if (isMock) {
            setMessages([
                { id: '1', text: `Hi! How can I help you with ${providerName}?`, sender_id: 'provider', created_at: new Date().toISOString() },
            ]);
        } else {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('service_id', serviceId)
                .order('created_at', { ascending: false });

            if (!error) setMessages(data);
        }
        setLoading(false);
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender_id: user?.id || 'guest',
            created_at: new Date().toISOString(),
        };

        setMessages(prev => [newMessage, ...prev]);
        setInputText('');

        if (!isMock) {
            await supabase.from('messages').insert([{
                text: inputText,
                sender_id: user?.id,
                service_id: serviceId,
            }]);
        } else {
            // Mock provider response after 1 second
            setTimeout(() => {
                const response: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "I'll get back to you shortly!",
                    sender_id: 'provider',
                    created_at: new Date().toISOString(),
                };
                setMessages(prev => [response, ...prev]);
            }, 1500);
        }
    };

    const renderMessage = ({ item }: { item: Message }) => {
        const isMe = item.sender_id === (user?.id || 'guest');

        return (
            <View style={[
                styles.messageContainer,
                isMe ? styles.myMessage : styles.theirMessage,
                { backgroundColor: isMe ? primary : colors.surfaceVariant }
            ]}>
                <Text style={[
                    styles.messageText,
                    { color: isMe ? colors.text.inverse : colors.text.primary }
                ]}>
                    {item.text}
                </Text>
                <Text style={[
                    styles.timeText,
                    { color: isMe ? 'rgba(255,255,255,0.7)' : colors.text.muted }
                ]}>
                    {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={24} color={colors.text.primary} />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <Text style={[styles.providerName, { color: colors.text.primary }]}>{providerName}</Text>
                    <View style={styles.statusRow}>
                        <View style={styles.onlineDot} />
                        <Text style={[styles.statusText, { color: colors.text.muted }]}>Online</Text>
                    </View>
                </View>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                inverted
                contentContainerStyle={styles.listContent}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={[styles.inputArea, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
                    <TextInput
                        style={[styles.input, { backgroundColor: colors.background, color: colors.text.primary }]}
                        placeholder="Type a message..."
                        placeholderTextColor={colors.text.muted}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendBtn, { backgroundColor: primary }]}
                        onPress={handleSend}
                    >
                        <Send size={20} color={colors.text.inverse} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 15,
        paddingHorizontal: Spacing.lg,
        borderBottomWidth: 1,
        ...Shadows.sm,
    },
    backBtn: {
        padding: 8,
        marginRight: 10,
    },
    headerInfo: {
        flex: 1,
    },
    providerName: {
        ...Typography.h3,
        fontSize: 18,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22c55e',
        marginRight: 6,
    },
    statusText: {
        ...Typography.caption,
    },
    listContent: {
        padding: Spacing.lg,
    },
    messageContainer: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
    },
    myMessage: {
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    theirMessage: {
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        ...Typography.body,
        fontSize: 15,
    },
    timeText: {
        ...Typography.caption,
        fontSize: 10,
        marginTop: 4,
        textAlign: 'right',
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        paddingBottom: Platform.OS === 'ios' ? 34 : Spacing.md,
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        maxHeight: 100,
        ...Typography.body,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
});

export default ChatScreen;
