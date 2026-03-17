import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";


export default function ProfileScreen() {
  const router = useRouter();
  const [spendingPower] = useState(50000.0);
  const [currentSpent] = useState(32000.0); // For the progress bar logic

  const menuItems = [
    { id: "accounts", label: "Accounts", icon: "wallet-outline", color: "#3b82f6", route: "/accounts" },
    { id: "security", label: "Security", icon: "shield-checkmark-outline", color: "#10b981", route: "/security" },
    { id: "rewards", label: "Rewards", icon: "gift-outline", color: "#f59e0b", route: "/rewards" },
    { id: "limits", label: "Limits", icon: "options-outline", color: "#a855f7", route: "/limits" },
  ];

  // ✅ Terminate handler
  const handleTerminate = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

    // Optional: Add Alert confirmation here if you want
    router.replace("/login"); // Hard reset to login/auth route
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 px-8" showsVerticalScrollIndicator={false}>
        {/* 🏅 Founder Tier Badge */}
        <View className="items-center mt-4">
          <View className="flex-row items-center bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full">
            <Ionicons name="medal" size={14} color="#f97316" />
            <Text className="text-orange-500 font-black text-[10px] uppercase tracking-widest ml-2">
              Founder Tier
            </Text>
          </View>
        </View>

        {/* 👤 Identity Header */}
        <TouchableOpacity onPress={() => router.push("/identity")} className="items-center mt-8">
          <View className="w-32 h-32 rounded-[40px] bg-slate-900 border-2 border-orange-500/30 items-center justify-center relative shadow-2xl shadow-orange-500/10">
            <Text className="text-white text-5xl font-black">A</Text>
            <View className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-black items-center justify-center">
              <Ionicons name="camera" size={14} color="black" />
            </View>
          </View>
          <Text className="text-white text-2xl font-black mt-6 tracking-tight">adamkorrison63555</Text>
        </TouchableOpacity>

        {/* 💳 Spending Power Card */}
        <View className="mt-10 bg-slate-900/40 border border-white/5 rounded-[32px] p-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
              Spending Power
            </Text>
            <Text className="text-white font-black text-lg">${spendingPower.toLocaleString()}</Text>
          </View>

          <View className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <View
              style={{ width: `${(currentSpent / spendingPower) * 100}%` }}
              className="h-full bg-orange-500"
            />
          </View>
        </View>

        {/* 🎛️ Grid Menu */}
        <View className="flex-row flex-wrap justify-between mt-8">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push(item.route as any);
              }}
              className="w-[48%] bg-slate-900/40 border border-white/5 p-6 rounded-[32px] mb-4 h-32 justify-between"
            >
              <View
                style={{ backgroundColor: `${item.color}15` }}
                className="w-10 h-10 rounded-xl items-center justify-center"
              >
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <Text className="text-white font-black text-base">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ⚠️ Terminate Session */}
        <TouchableOpacity
          className="mt-6 mb-20 py-6 border border-red-500/20 rounded-[32px] items-center bg-red-500/5 active:bg-red-500/10"
          onPress={handleTerminate}
        >
          <Text className="text-red-500 font-black uppercase text-xs tracking-[4px]">
            Terminate Session
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}