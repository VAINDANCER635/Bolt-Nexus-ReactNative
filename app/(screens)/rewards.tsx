import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp, SlideInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const REWARDS = [
  { id: '1', title: 'Airport Lounge Access', sub: 'Founder Tier Exclusive', points: 'Unlocked', icon: 'airplane', color: '#f59e0b' },
  { id: '2', title: 'Cashback Boost', sub: '3% on all Tech purchases', points: 'Active', icon: 'trending-up', color: '#10b981' },
  { id: '3', title: 'Concierge Service', sub: '24/7 Personal Assistant', points: '10,000 pts', icon: 'call', color: '#3b82f6' },
];

export default function RewardsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 px-8" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="pt-4 flex-row justify-between items-center mb-10">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center border border-white/5"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-black uppercase tracking-widest text-[10px]">Nexus Rewards</Text>
          <View className="w-12" />
        </View>

        {/* 🌟 Points Balance Card */}
        <Animated.View entering={SlideInDown} className="bg-gradient-to-br from-orange-500 to-amber-600 p-8 rounded-[40px] mb-10 shadow-2xl shadow-orange-500/20">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-black/60 font-black uppercase text-[10px] tracking-widest">Available Points</Text>
              <Text className="text-black text-5xl font-black mt-1">24,850</Text>
            </View>
            <View className="bg-black/10 p-3 rounded-2xl">
              <Ionicons name="sparkles" size={24} color="black" />
            </View>
          </View>
          <TouchableOpacity 
            className="bg-black mt-8 py-4 rounded-2xl items-center"
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
          >
            <Text className="text-white font-black uppercase text-[10px] tracking-widest">Redeem Assets</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Perks List */}
        <Text className="text-slate-600 font-black text-[10px] uppercase tracking-[3px] mb-6 ml-2">Tier Privileges</Text>
        
        {REWARDS.map((reward, idx) => (
          <Animated.View key={reward.id} entering={FadeInUp.delay(idx * 100)}>
            <TouchableOpacity className="flex-row items-center p-6 bg-slate-900/30 border border-white/5 rounded-[32px] mb-4">
              <View style={{ backgroundColor: `${reward.color}15` }} className="w-12 h-12 rounded-2xl items-center justify-center border border-white/5">
                <Ionicons name={reward.icon as any} size={22} color={reward.color} />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-white font-black text-base">{reward.title}</Text>
                <Text className="text-slate-500 font-bold text-xs">{reward.sub}</Text>
              </View>
              <View className={`px-3 py-1 rounded-full ${reward.points === 'Unlocked' || reward.points === 'Active' ? 'bg-emerald-500/10' : 'bg-slate-800'}`}>
                <Text className={`font-black text-[10px] uppercase ${reward.points === 'Unlocked' || reward.points === 'Active' ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {reward.points}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}