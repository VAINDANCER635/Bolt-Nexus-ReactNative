import React from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

// ✅ Create animated touchable
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function SupportScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 px-8" showsVerticalScrollIndicator={false}>
        {/* 🛰️ Header */}
        <View className="flex-row items-center justify-between pt-4 mb-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center border border-white/5"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="items-center">
            <Text className="text-white font-black uppercase tracking-[2px] text-[10px]">
              Secure Channel
            </Text>
            <View className="flex-row items-center mt-1">
              <View className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
              <Text className="text-emerald-500 font-bold text-[10px] uppercase">
                Agent Online
              </Text>
            </View>
          </View>
          <View className="w-12" />
        </View>

        {/* Title */}
        <Animated.View entering={FadeInUp.delay(100)}>
          <Text className="text-white text-4xl font-black tracking-tighter">Support Center</Text>
          <Text className="text-slate-500 font-bold mt-2 leading-6">
            Direct uplink to Nexus Command for technical or financial assistance.
          </Text>
        </Animated.View>

        {/* 🔍 Search */}
        <View className="mt-8 bg-slate-900/50 border border-white/10 rounded-3xl flex-row items-center px-5 h-16">
          <Ionicons name="search" size={20} color="#475569" />
          <TextInput
            placeholder="Search documentation..."
            placeholderTextColor="#475569"
            className="flex-1 ml-3 text-white font-bold"
          />
        </View>

        {/* 🛠️ Support Modules */}
        <View className="mt-10 gap-y-4">
          <SupportModule
            title="Live Chat Support"
            sub="Response time: ~2 mins"
            icon="chatbubbles"
            color="#10b981"
            entering={FadeInDown.delay(200)}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
          />
          <SupportModule
            title="Knowledge Base"
            sub="Protocol guides & FAQs"
            icon="book"
            color="#3b82f6"
            entering={FadeInDown.delay(300)}
          />
          <SupportModule
            title="Ticket History"
            sub="3 active resolutions"
            icon="time"
            color="#a855f7"
            entering={FadeInDown.delay(400)}
          />
        </View>

        {/* 📑 FAQ Quick-Links */}
        <View className="mt-12 mb-20">
          <Text className="text-slate-600 font-black text-[10px] uppercase tracking-[3px] mb-6 ml-2">
            Trending Queries
          </Text>
          {[
            "Node Synchronization Issues",
            "Increasing Spending Power",
            "International Wire Protocols",
          ].map((q, i) => (
            <AnimatedTouchableOpacity
              key={q}
              entering={FadeInDown.delay(500 + i * 100)}
              onPress={() => Haptics.selectionAsync()}
              className="py-5 border-b border-white/5 flex-row justify-between items-center"
            >
              <Text className="text-slate-300 font-bold text-base">{q}</Text>
              <Ionicons name="arrow-forward" size={18} color="#1e293b" />
            </AnimatedTouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 📞 Urgent Hotline FAB */}
      <View className="absolute bottom-10 left-8 right-8">
        <AnimatedTouchableOpacity
          entering={FadeInUp.delay(600)}
          className="bg-red-500/10 border border-red-500/20 h-16 rounded-3xl flex-row items-center justify-center"
          onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)}
        >
          <Ionicons name="call" size={20} color="#ef4444" />
          <Text className="text-red-500 font-black uppercase tracking-widest ml-3">
            Emergency Line
          </Text>
        </AnimatedTouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function SupportModule({ title, sub, icon, color, entering, onPress }: any) {
  return (
    <AnimatedTouchableOpacity
      entering={entering}
      onPress={onPress}
      className="flex-row items-center p-6 bg-slate-900/30 border border-white/5 rounded-[32px]"
    >
      <View
        style={{ backgroundColor: `${color}15` }}
        className="w-14 h-14 rounded-2xl items-center justify-center border border-white/5"
      >
        <Ionicons name={icon} size={26} color={color} />
      </View>
      <View className="ml-5 flex-1">
        <Text className="text-white font-black text-lg">{title}</Text>
        <Text className="text-slate-500 font-bold text-xs mt-0.5">{sub}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#1e293b" />
    </AnimatedTouchableOpacity>
  );
}