import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import IconInput from "@/components/inputs/IconInput";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";

export default function LoginScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        console.log("Login:", email, password);
    };

    const handleGoogleLogin = async () => {
        console.log("Google login pressed");
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            enableOnAndroid
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            className="bg-white dark:bg-slate-950"
        >
            <View className="px-6 py-6">
                <View className="items-center mb-10">
                    <View className="w-16 h-16 bg-gray-100 dark:bg-slate-900 rounded-2xl items-center justify-center mb-4">
                        <Ionicons
                            name="log-in"
                            size={32}
                            color={isDark ? "white" : "black"}
                        />
                    </View>
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white">
                        З поверненням!
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400 mt-2 text-base text-center">
                        Увійдіть, щоб продовжити
                    </Text>
                </View>

                <View>
                    <IconInput
                        icon="mail-outline"
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <IconInput
                        icon="lock-closed-outline"
                        placeholder="Пароль"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        rightIcon={
                            <Pressable onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color={isDark ? "#94A3B8" : "#6B7280"}
                                />
                            </Pressable>
                        }
                    />
                </View>

                <Pressable className="self-end mt-1 mb-8">
                    <Text className="text-blue-600 dark:text-blue-400 font-medium">
                        Забули пароль?
                    </Text>
                </Pressable>

                <Pressable
                    onPress={handleLogin}
                    className="bg-black dark:bg-white py-4 rounded-xl shadow-md active:opacity-90 active:scale-[0.98]"
                >
                    <Text className="text-white dark:text-black text-center font-bold text-lg">
                        Увійти
                    </Text>
                </Pressable>

                <View className="flex-row items-center my-8">
                    <View className="flex-1 h-[0.5px] bg-gray-200 dark:bg-slate-800" />
                    <Text className="mx-4 text-gray-400 font-medium text-sm">Або</Text>
                    <View className="flex-1 h-[0.5px] bg-gray-200 dark:bg-slate-800" />
                </View>

                <Pressable
                    onPress={handleGoogleLogin}
                    className="flex-row items-center justify-center bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 py-4 rounded-xl shadow-sm active:bg-gray-50 dark:active:bg-slate-800"
                >
                    <Ionicons name="logo-google" size={20} color="#DB4437" />
                    <Text className="text-gray-700 dark:text-gray-200 font-bold text-lg ml-3">
                        Увійти через Google
                    </Text>
                </Pressable>

                <View className="flex-row justify-center mt-10">
                    <Text className="text-gray-500 dark:text-gray-400 text-base">
                        Немає акаунту?{" "}
                    </Text>
                    <Link href="/register" asChild>
                        <Pressable>
                            <Text className="text-black dark:text-white font-bold text-base">
                                Створити
                            </Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}