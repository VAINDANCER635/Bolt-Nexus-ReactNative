import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const NOTIFS = [
  { id: '1', title: 'Security Alert', msg: 'New login detected from Node: SF-88', time: '2m ago', icon: 'shield-alert', color: '#ef4444', type: 'security' },
  { id: '2', title: 'Incoming Transfer', msg: 'You received $450.00 from @stark', time: '1h ago', icon: 'arrow-down-circle', color: '#10b981', type: 'finance' },
  { id: '3', title: 'Portfolio Milestone', msg: 'BTC crossed your $100k price alert', time: '4h ago', icon: 'trending-up', color: '#3b82f6', type: 'market' },
];

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-8 pt-4 flex-row justify-between items-center mb-8">
        <TouchableOpacity onPress={() => router.back()} className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center border border-white/5">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-black tracking-tight text-xl">Nexus Inbox</Text>
        <TouchableOpacity onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
          <Text className="text-emerald-500 font-bold text-xs uppercase tracking-widest">Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="px-8" showsVerticalScrollIndicator={false}>
        {NOTIFS.map((n, i) => (
          <Animated.View 
            key={n.id} 
            entering={FadeInDown.delay(i * 100)}
            className="mb-4"
          >
            <TouchableOpacity className="flex-row items-start p-5 bg-slate-900/40 border border-white/5 rounded-[32px]">
              <View style={{ backgroundColor: `${n.color}15` }} className="w-12 h-12 rounded-2xl items-center justify-center">
                <Ionicons name={n.icon as any} size={22} color={n.color} />
              </View>
              
              <View className="ml-4 flex-1">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-white font-black text-base">{n.title}</Text>
                  <Text className="text-slate-600 font-bold text-[10px] uppercase">{n.time}</Text>
                </View>
                <Text className="text-slate-400 font-medium text-sm leading-5">{n.msg}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Empty State Footer */}
        <View className="mt-10 items-center">
          <Ionicons name="ellipsis-horizontal" size={24} color="#1e293b" />
          <Text className="text-slate-700 font-bold text-[10px] uppercase tracking-[5px] mt-4">End of Transmission</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}