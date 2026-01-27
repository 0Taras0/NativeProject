import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AvatarPicker from "@/app/components/pickers/AvatarPicker";
import IconInput from "@/app/components/inputs/IconInput";
import { useColorScheme } from "nativewind";
import {Link} from "expo-router";

export default function RegisterScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    const [image, setImage] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = () => {
        console.log("Register: ", image, email, password);
    };

    const handleGoogleLogin = async () => {
        console.log("Google login pressed");
    };

    return (
        <KeyboardAwareScrollView
            className="bg-white dark:bg-slate-950"
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            enableOnAndroid
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View className="px-6 py-10">
                <Text className="text-3xl font-extrabold text-center mb-8 text-black dark:text-white">
                    Реєстрація
                </Text>

                <AvatarPicker image={image} onChange={setImage} />

                <View className="space-y-1">
                    <IconInput
                        icon="mail-outline"
                        placeholder="Електронна пошта"
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
                                    size={22}
                                    color={isDark ? "#94A3B8" : "#6B7280"}
                                />
                            </Pressable>
                        }
                    />

                    <IconInput
                        icon="lock-closed-outline"
                        placeholder="Підтвердіть пароль"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showPassword}
                    />
                </View>

                <Pressable
                    className="bg-black dark:bg-white py-4 rounded-2xl mt-6 shadow-lg active:opacity-90 active:scale-[0.98]"
                    onPress={handleRegister}
                >
                    <Text className="text-white dark:text-black text-center font-bold text-lg">
                        Зареєструватися
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

                <View className="flex-row justify-center mt-8">
                    <Text className="text-gray-500 dark:text-gray-400 text-base">
                        Вже маєте акаунт?{" "}
                    </Text>
                    <Link href="/screens/LoginScreen" asChild>
                        <Text className="text-black dark:text-white font-bold text-base">
                            Увійти
                        </Text>
                    </Link>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}