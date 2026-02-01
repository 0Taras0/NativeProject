import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';
import { useSelector } from 'react-redux';
import { RootState } from "@/store";
import { IChatMessage } from "@/types/сhat/IChatMessage";
import { APP_URLS } from "@/constants/Urls";
import { useGetChatMessagesQuery } from "@/services/chatService";

interface Props {
    chatId: number;
    chatName: string;
    onBack: () => void;
}

export default function ChatDetailScreen({ chatId, chatName, onBack }: Props) {
    const { user } = useSelector((state: RootState) => state.auth);
    const [messages, setMessages] = useState<IChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const connectionRef = useRef<HubConnection | null>(null);

    const { data: historyMessages, isLoading: isHistoryLoading } = useGetChatMessagesQuery(chatId);

    useEffect(() => {
        if (historyMessages) {
            const sortedMessages = [...historyMessages].reverse();
            setMessages(sortedMessages);
        }
    }, [historyMessages]);

    useEffect(() => {
        if (!user?.token) return;

        const startConnection = async () => {
            try {
                const hubUrl = `${APP_URLS.BASE_URL}/hubs/chat`;
                const connection = new HubConnectionBuilder()
                    .withUrl(hubUrl, { accessTokenFactory: () => user.token })
                    .withAutomaticReconnect()
                    .configureLogging(LogLevel.Information)
                    .build();

                connection.on("ReceiveMessage", (msg: IChatMessage) => {
                    setMessages(prev => [msg, ...prev]);
                });

                await connection.start();
                setIsConnected(true);
                await connection.invoke("JoinChat", chatId);
                connectionRef.current = connection;
            } catch (err) {
                console.error("❌ Connection failed:", err);
            }
        };

        startConnection();

        return () => {
            if (connectionRef.current) {
                connectionRef.current.invoke("LeaveChat", chatId).catch(() => {});
                connectionRef.current.stop();
            }
        };
    }, [chatId, user?.token]);

    const handleSend = async () => {
        if (!inputText.trim() || !connectionRef.current) return;
        try {
            await connectionRef.current.invoke("SendMessage", { chatId, message: inputText });
            setInputText('');
        } catch (err) {
            console.error("❌ Send failed:", err);
        }
    };

    const renderItem = ({ item }: { item: IChatMessage }) => {
        console.log(item.isMine)
        return (
            <View className={`my-1 mx-3 max-w-[80%] p-3 rounded-2xl ${
                item.isMine ? "self-end bg-blue-600 rounded-br-none" : "self-start bg-gray-200 dark:bg-slate-800 rounded-bl-none"
            }`}>
                <Text className={`${item.isMine ? "text-white" : "text-black dark:text-white"}`}>
                    {item.message}
                </Text>
                <Text className={`text-[10px] mt-1 text-right ${item.isMine ? "text-blue-200" : "text-gray-500"}`}>
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={['top']}>
            {/* KeyboardAvoidingView тепер обгортає все КРІМ SafeAreaView або всередині неї */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                // На iOS 90 — це приблизна висота хедеру, якщо ви використовуєте Expo Router/Stack
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                {/* Header */}
                <View className="flex-row items-center p-4 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950">
                    <TouchableOpacity onPress={onBack} className="mr-4 p-2">
                        <Text className="text-blue-600 font-bold text-lg">←</Text>
                    </TouchableOpacity>
                    <View>
                        <Text className="font-bold text-lg text-black dark:text-white">{chatName}</Text>
                        <Text className={`text-xs ${isConnected ? "text-green-500" : "text-orange-500"}`}>
                            {isConnected ? "У мережі" : "З'єднання..."}
                        </Text>
                    </View>
                </View>

                {/* Chat Area */}
                <View className="flex-1">
                    {isHistoryLoading ? (
                        <View className="flex-1 justify-center items-center">
                            <ActivityIndicator size="large" color="#2563EB" />
                        </View>
                    ) : (
                        <FlatList
                            data={messages}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            inverted={true}
                            contentContainerStyle={{ paddingVertical: 10 }}
                            keyboardDismissMode="interactive"
                            automaticallyAdjustKeyboardInsets={true} // Працює на нових версіях RN
                        />
                    )}
                </View>

                {/* Input Area */}
                <View className="p-3 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950">
                    <View className="flex-row items-center">
                        <TextInput
                            className="flex-1 bg-gray-100 dark:bg-slate-900 text-black dark:text-white rounded-2xl px-4 py-3 mr-3"
                            placeholder="Напишіть повідомлення..."
                            placeholderTextColor="#9CA3AF"
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                        />
                        <TouchableOpacity
                            onPress={handleSend}
                            disabled={!isConnected || !inputText.trim()}
                            className={`w-12 h-12 rounded-full items-center justify-center ${
                                !isConnected || !inputText.trim() ? 'bg-gray-300' : 'bg-blue-600'
                            }`}
                        >
                            <Text className="text-white text-xl font-bold">↑</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}