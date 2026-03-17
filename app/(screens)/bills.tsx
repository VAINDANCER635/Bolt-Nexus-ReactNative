import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp, SlideInRight } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const BILL_GROUPS = [
  {
    title: "Essential Amenities",
    items: [
      { id: "1", name: "Grid Electricity", provider: "Nexus Power Corp", amount: "$142.50", icon: "flash", color: "#f59e0b", due: "In 3 days" },
      { id: "2", name: "Water & Sewage", provider: "City Utility", amount: "$64.20", icon: "water", color: "#3b82f6", due: "In 12 days" },
    ],
  },
  {
    title: "Digital Subscriptions",
    items: [
      { id: "3", name: "Netflix", provider: "Premium 4K", amount: "$19.99", icon: "play-circle", color: "#e50914", due: "Tomorrow" },
      { id: "4", name: "iCloud+", provider: "2TB Storage", amount: "$9.99", icon: "cloud-done", color: "#ffffff", due: "Paid" },
      { id: "5", name: "Spotify", provider: "Family Plan", amount: "$16.99", icon: "musical-notes", color: "#1db954", due: "Paid" },
    ],
  },
];

export default function BillsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView showsVerticalScrollIndicator={false} className="px-8">
        {/* Header */}
        <View className="pt-4 flex-row justify-between items-center mb-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center border border-white/5"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-black uppercase tracking-widest text-[10px]">Nexus Billing</Text>
          <TouchableOpacity className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center border border-white/5">
            <Ionicons name="add" size={24} color="#f59e0b" />
          </TouchableOpacity>
        </View>

        {/* Burn Rate Summary */}
        <Animated.View entering={FadeInUp} className="bg-slate-900/40 border border-white/5 p-8 rounded-[40px] mb-10">
          <Text className="text-slate-500 font-bold uppercase tracking-[2px] text-[10px]">Monthly Commitment</Text>
          <View className="flex-row items-baseline mt-2">
            <Text className="text-white text-5xl font-black tracking-tighter">$253</Text>
            <Text className="text-slate-400 font-black text-xl ml-1">.68</Text>
          </View>
          <View className="h-1.5 w-full bg-slate-800 rounded-full mt-6 overflow-hidden">
            <View className="h-full bg-amber-500 w-[65%]" />
          </View>
          <Text className="text-slate-600 font-bold text-[10px] uppercase mt-3 tracking-wider">
            65% of monthly budget utilized
          </Text>
        </Animated.View>

        {/* Bill Groups */}
        {BILL_GROUPS.map((group, gIdx) => (
          <View key={group.title} className="mb-10">
            <Text className="text-slate-500 font-black text-[10px] uppercase tracking-[3px] mb-6 ml-2">
              {group.title}
            </Text>

            {group.items.map((item, iIdx) => (
              <Animated.View key={item.id} entering={SlideInRight.delay(gIdx * 100 + iIdx * 50)}>
                <TouchableOpacity
                  onPress={() => Haptics.selectionAsync()}
                  className="flex-row items-center p-5 bg-slate-900/20 border border-white/5 rounded-[32px] mb-3"
                >
                  <View
                    style={{ backgroundColor: `${item.color}15` }}
                    className="w-12 h-12 rounded-2xl items-center justify-center border border-white/5"
                  >
                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                  </View>

                  <View className="ml-4 flex-1">
                    <Text className="text-white font-black text-base">{item.name}</Text>
                    <Text className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">{item.provider}</Text>
                  </View>

                  <View className="items-end">
                    <Text className="text-white font-black text-base">{item.amount}</Text>
                    <Text
                      className={`font-bold text-[10px] uppercase tracking-tighter ${
                        item.due === "Paid" ? "text-emerald-500" : "text-amber-500"
                      }`}
                    >
                      {item.due}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        ))}

        <View className="h-20" />
      </ScrollView>

      {/* Primary Action Button */}
      <TouchableOpacity
        className="absolute bottom-10 left-8 right-8 h-16 bg-amber-500 rounded-3xl items-center justify-center flex-row shadow-2xl shadow-amber-500/20"
        onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
      >
        <Ionicons name="checkmark-circle" size={20} color="black" />
        <Text className="text-black font-black uppercase tracking-widest ml-2">
          Pay Outstanding ($226.69)
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}