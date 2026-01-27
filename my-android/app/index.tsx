import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function Index() {
    const router = useRouter();
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <>
            <View className="flex-row justify-end px-6 pt-8">
                <Pressable
                    onPress={toggleColorScheme}
                    className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 active:opacity-70"
                >
                    <Ionicons
                        name={isDark ? "sunny" : "moon"}
                        size={24}
                        color={isDark ? "#FACC15" : "#1E293B"}
                    />
                </Pressable>
            </View>

            <View className="flex-1 justify-center px-6">
                <Text className="text-3xl font-bold text-center mb-4 text-black dark:text-white">
                    Ласкаво просимо
                </Text>

                <Text className="text-gray-500 dark:text-gray-400 text-center mb-10 text-base">
                    Створіть обліковий запис, щоб продовжити
                </Text>

                <Pressable
                    onPress={() => router.push("/screens/RegisterScreen")}
                    className="bg-black dark:bg-white py-4 rounded-2xl mb-4 shadow-sm active:opacity-80"
                >
                    <Text className="text-white dark:text-black text-center font-bold text-base">
                        Реєстрація
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => router.push("/screens/LoginScreen")}
                    className="border border-gray-300 dark:border-slate-700 py-4 rounded-2xl active:bg-gray-50 dark:active:bg-slate-900"
                >
                    <Text className="text-center font-bold text-base text-black dark:text-white">
                        Вхід
                    </Text>
                </Pressable>
            </View>
        </>
    );
}