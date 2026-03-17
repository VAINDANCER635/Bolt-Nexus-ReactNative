import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useAuth } from "@/context/auth-context";
import { getFirstNameFromEmail } from "@/utils/getfirstname";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

export default function DashboardHeader() {
  const { user } = useAuth();
  const router = useRouter();
  const firstName = getFirstNameFromEmail(user?.email);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(800).springify()}
      className="px-6 pt-14 pb-8 bg-slate-900 dark:bg-black rounded-b-[40px] border-b border-white/5"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 30,
        shadowOffset: { width: 0, height: 15 },
        elevation: 10,
      }}
    >
      <View className="flex-row justify-between items-center">
        {/* Left Side: Greeting */}
        <View>
          <Animated.Text
            entering={FadeIn.delay(300)}
            className="text-emerald-500 text-xs font-black uppercase tracking-[3px] mb-1"
          >
            {getGreeting()}
          </Animated.Text>
          <Text className="text-3xl font-black text-white tracking-tighter">
            {firstName}
          </Text>
        </View>

        {/* Right Side: Notifications + Premium Profile */}
        <View className="flex-row items-center gap-x-4">
          {/* Notification Icon with Red Dot */}
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push("/notification");
            }}
            className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center border border-white/5 relative"
          >
            <Ionicons name="notifications-outline" size={24} color="white" />
            <View className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-black" />
          </TouchableOpacity>

          {/* Premium Profile Trigger */}
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/profile");
            }}
            className="relative"
          >
            <View className="p-[2px] rounded-[22px] bg-gradient-to-tr from-emerald-500 to-blue-500 shadow-lg shadow-emerald-500/20">
              <View className="bg-black rounded-[20px] p-[2px]">
                <View className="w-10 h-10 rounded-[18px] bg-slate-800 items-center justify-center overflow-hidden border border-white/10">
                   <Ionicons name="person" size={24} color="#94a3b8" />
                  {/* Later: <Image source={{ uri: user.avatar }} className="w-full h-full" /> */}
                </View>
              </View>
            </View>
            {/* Verified Badge */}
            <View className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
              <Ionicons name="checkmark-circle" size={14} color="#10b981" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats/Status Bar */}
      <View className="flex-row mt-6 gap-x-3">
        <View className="flex-row items-center bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <View className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
          <Text className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
            Live Market
          </Text>
        </View>
        <View className="flex-row items-center bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <Text className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
            🔒 Encrypted
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}