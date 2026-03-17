import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const LINKED_ACCOUNTS = [
  { id: '1', bank: 'Chase Bank', type: 'Checking •••• 8829', balance: '$12,400.00', icon: 'business-outline', color: '#10b981' },
  { id: '2', bank: 'Mercury', type: 'Savings •••• 1104', balance: '$45,000.00', icon: 'briefcase-outline', color: '#3b82f6' },
];

const ACTIVE_CARDS = [
  { id: '3', label: 'Nexus Titanium', type: 'Physical', status: 'Active', icon: 'card-outline', color: '#f59e0b' },
  { id: '4', label: 'Virtual Node', type: 'Digital-Only', status: 'Frozen', icon: 'qr-code-outline', color: '#94a3b8' },
];

export default function AccountsScreen() {
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
          <Text className="text-white font-black uppercase tracking-widest text-[10px]">Financial Nodes</Text>
          <TouchableOpacity 
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
            className="w-12 h-12 bg-emerald-500/10 rounded-2xl items-center justify-center border border-emerald-500/20"
          >
            <Ionicons name="add" size={24} color="#10b981" />
          </TouchableOpacity>
        </View>

        {/* 🏦 Linked Bank Section */}
        <View className="mb-10">
          <Text className="text-slate-600 font-black text-[10px] uppercase tracking-[3px] mb-6">Linked Institutions</Text>
          
          {LINKED_ACCOUNTS.map((acc, idx) => (
            <Animated.View key={acc.id} entering={FadeInDown.delay(idx * 100)}>
              <TouchableOpacity className="flex-row items-center p-6 bg-slate-900/30 border border-white/5 rounded-[32px] mb-4">
                <View style={{ backgroundColor: `${acc.color}15` }} className="w-12 h-12 rounded-2xl items-center justify-center border border-white/5">
                  <Ionicons name={acc.icon as any} size={22} color={acc.color} />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-white font-black text-base">{acc.bank}</Text>
                  <Text className="text-slate-500 font-bold text-xs">{acc.type}</Text>
                </View>
                <Text className="text-white font-black">{acc.balance}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* 💳 Card Management Section */}
        <View className="mb-20">
          <Text className="text-slate-600 font-black text-[10px] uppercase tracking-[3px] mb-6">Payment Instruments</Text>
          
          <View className="flex-row flex-wrap justify-between">
            {ACTIVE_CARDS.map((card, idx) => (
              <Animated.View key={card.id} entering={FadeInRight.delay(idx * 200)} className="w-[48%] mb-4">
                <TouchableOpacity className="p-6 bg-slate-900/40 border border-white/5 rounded-[32px] h-44 justify-between">
                  <View className="flex-row justify-between items-start">
                    <View style={{ backgroundColor: `${card.color}15` }} className="w-10 h-10 rounded-xl items-center justify-center">
                      <Ionicons name={card.icon as any} size={20} color={card.color} />
                    </View>
                    <View className={`px-2 py-0.5 rounded-md ${card.status === 'Active' ? 'bg-emerald-500/10' : 'bg-slate-500/10'}`}>
                       <Text style={{ color: card.status === 'Active' ? '#10b981' : '#94a3b8' }} className="font-black text-[8px] uppercase">{card.status}</Text>
                    </View>
                  </View>
                  <View>
                    <Text className="text-white font-black text-sm">{card.label}</Text>
                    <Text className="text-slate-500 font-bold text-[10px] mt-1 uppercase tracking-tighter">{card.type}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}

            {/* "Add New" Placeholder Card */}
            <TouchableOpacity className="w-[48%] h-44 border-2 border-dashed border-white/5 rounded-[32px] items-center justify-center">
               <View className="w-12 h-12 bg-white/5 rounded-full items-center justify-center mb-3">
                  <Ionicons name="add" size={24} color="#475569" />
               </View>
               <Text className="text-slate-500 font-black text-[10px] uppercase tracking-widest">New Card</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}