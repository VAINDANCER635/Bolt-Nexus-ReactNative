import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInUp, FadeInRight } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get('window');

const ASSETS = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', balance: '$42,890.00', change: '+5.2%', color: '#f7931a', icon: 'logo-bitcoin' },
  { id: '2', name: 'Ethereum', symbol: 'ETH', balance: '$12,400.50', change: '+2.1%', color: '#627eea', icon: 'layers-outline' },
  { id: '3', name: 'S&P 500 ETF', symbol: 'VOO', balance: '$8,200.00', change: '-0.4%', color: '#10b981', icon: 'trending-up-outline' },
];

export default function InvestScreen() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("1W");

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="px-8 pt-4 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.back()} className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center border border-white/5">
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-black uppercase tracking-widest text-[10px]">Portfolio Alpha</Text>
          <TouchableOpacity className="w-12 h-12 bg-emerald-500/10 rounded-2xl items-center justify-center border border-emerald-500/20">
            <Ionicons name="notifications-outline" size={20} color="#10b981" />
          </TouchableOpacity>
        </View>

        {/* Portfolio Value */}
        <Animated.View entering={FadeInUp.delay(200)} className="px-8 mt-10">
          <Text className="text-slate-500 font-bold uppercase tracking-[2px] text-[10px]">Total Invested</Text>
          <View className="flex-row items-baseline mt-1">
            <Text className="text-white text-5xl font-black tracking-tighter">$63,490</Text>
            <Text className="text-emerald-500 font-black text-xl ml-2">.50</Text>
          </View>
          <View className="flex-row items-center mt-2">
            <View className="bg-emerald-500/10 px-2 py-1 rounded-md flex-row items-center">
              <Ionicons name="caret-up" size={12} color="#10b981" />
              <Text className="text-emerald-500 font-black text-xs ml-1">+$1,240.20 (2.4%)</Text>
            </View>
            <Text className="text-slate-600 font-bold text-xs ml-3 uppercase">Past 7 Days</Text>
          </View>
        </Animated.View>

        {/* Chart Placeholder */}
        <View className="mt-8 h-48 w-full justify-center">
           {/* Replace this with a real chart library later */}
           <View className="absolute bottom-0 left-0 right-0 h-24 bg-emerald-500/5" />
           <Text className="text-center text-slate-800 font-black uppercase tracking-[10px]">Nexus Data Stream</Text>
           
        </View>

        {/* Timeframe Selector */}
        <View className="flex-row justify-around px-8 mt-6">
          {["1D", "1W", "1M", "1Y", "ALL"].map((t) => (
            <TouchableOpacity 
              key={t}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setTimeframe(t);
              }}
              className={`px-4 py-2 rounded-xl ${timeframe === t ? 'bg-white' : 'bg-transparent'}`}
            >
              <Text className={`font-black text-[10px] ${timeframe === t ? 'text-black' : 'text-slate-500'}`}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Asset Allocation */}
        <View className="px-8 mt-12 mb-20">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-xl font-black tracking-tight">Your Assets</Text>
            <TouchableOpacity>
              <Text className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">Rebalance</Text>
            </TouchableOpacity>
          </View>

          {ASSETS.map((asset, index) => (
            <Animated.View 
              key={asset.id} 
              entering={FadeInRight.delay(400 + (index * 100))}
              className="flex-row items-center justify-between p-5 bg-slate-900/40 border border-white/5 rounded-[28px] mb-3"
            >
              <View className="flex-row items-center">
                <View style={{ backgroundColor: `${asset.color}20` }} className="w-12 h-12 rounded-2xl items-center justify-center">
                  <Ionicons name={asset.icon as any} size={22} color={asset.color} />
                </View>
                <View className="ml-4">
                  <Text className="text-white font-black">{asset.name}</Text>
                  <Text className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">{asset.symbol}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-white font-black">{asset.balance}</Text>
                <Text className={`font-black text-[10px] ${asset.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                  {asset.change}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* Quick Trade Floating Button */}
      <TouchableOpacity 
        className="absolute bottom-10 right-8 left-8 h-16 bg-white rounded-3xl flex-row items-center justify-center shadow-2xl shadow-white/20"
        onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
      >
        <Ionicons name="flash" size={20} color="black" />
        <Text className="text-black font-black uppercase tracking-widest ml-2">Quick Trade</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}