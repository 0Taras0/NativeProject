import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const chats = [
    { id: '1', name: 'Збережені', message: 'Файл_проєкту.zip', time: '12:00', avatar: 'https://risshunter.com/image/cache/catalog/ima/ima%20200-550x550.jpeg', unread: 0 },
    { id: '2', name: 'Робота', message: 'Коли дедлайн?', time: '11:45', avatar: 'https://www.meme-arsenal.com/memes/1f8b07de4f7371652bb266f6c63e2199.jpg', unread: 2 },
    { id: '3', name: 'Новини', message: 'React Native оновився...', time: 'Пн', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcS3Xw0fRukwFS8GAQj2ndMo5-yBH7AzcfmQ&s', unread: 0 },
    { id: '4', name: 'Друзі', message: 'Йдемо в кіно?', time: '10:00', avatar: 'https://lh3.googleusercontent.com/proxy/fVpnJkGZS0nA7GCLJUKxH8Zr1mYLRZpOJ9aW-CreKlUkejo0QHvo8AvT-AJut1QGhiUKojuoRm8NoYWwyEexFOGo_3J4ZFHPWsLCBdcJV8vs1nRcPQGiQ_fl-ufN1Ek', unread: 1 },
];

export default function ChatsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={['top']}>
            <View className="flex-1">
                <FlatList
                    data={chats}
                    keyExtractor={(item) => item.id}
                    contentContainerClassName="pb-20"
                    renderItem={({ item }) => (
                        <TouchableOpacity className="flex-row items-center p-3 active:bg-gray-100 dark:active:bg-slate-900">
                            <Image
                                source={{ uri: item.avatar }}
                                className="w-14 h-14 rounded-full bg-gray-200 dark:bg-slate-800"
                            />

                            <View className="flex-1 ml-3 border-b border-gray-100 dark:border-slate-800 pb-3 justify-center">
                                <View className="flex-row justify-between mb-1">
                                    <Text className="font-bold text-lg text-black dark:text-white">{item.name}</Text>
                                    <Text className="text-gray-400 text-xs">{item.time}</Text>
                                </View>

                                <View className="flex-row justify-between items-center">
                                    <Text className="text-gray-500 dark:text-gray-400 text-sm flex-1 mr-2" numberOfLines={1}>
                                        {item.message}
                                    </Text>
                                    {item.unread > 0 && (
                                        <View className="bg-blue-500 rounded-full px-2 py-0.5 min-w-[20px] items-center justify-center">
                                            <Text className="text-white text-xs font-bold">{item.unread}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}