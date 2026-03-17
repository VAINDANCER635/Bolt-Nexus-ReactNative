import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/context/auth-context";
import "@/global.css";
import { View, ActivityIndicator } from "react-native";
import { ThemeProvider } from "@/context/theme-context";

function RootStack() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#000" },
      }}
    >
      {!user ? (
        <Stack.Screen
          name="(auth)"
          options={{
            animation: "fade", // 👈 fade for auth screens
          }}
        />
      ) : (
        <Stack.Screen
          name="(tabs)"
          options={{
            animation: "slide_from_right", // 👈 slide for tabs
          }}
        />
      )}
    </Stack>
  );
}
export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    </AuthProvider>
  );
}
