import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

export default function RootLayout() {
    const { colorScheme } = useColorScheme();

    return (
        <SafeAreaProvider>
            <View className="flex-1 bg-white dark:bg-slate-950">
                <Slot />
                <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            </View>
        </SafeAreaProvider>
    );
}