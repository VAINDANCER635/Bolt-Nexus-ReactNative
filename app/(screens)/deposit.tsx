import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export default function DepositScreen() {
  const router = useRouter();

  const handleSelectSource = (name: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Future logic: Trigger Plaid or Card Input Modal
    console.log(`Initializing ${name} protocol...`);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-8">
        
        {/* Header */}
        <View className="pt-4 flex-row justify-between items-center">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center border border-white/5"
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <View className="bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            <Text className="text-blue-500 font-black text-[10px] uppercase tracking-widest">Funding Portal</Text>
          </View>
        </View>

        <Animated.View entering={FadeInUp.delay(200)} className="mt-10">
          <Text className="text-white text-4xl font-black tracking-tighter">Deposit Funds</Text>
          <Text className="text-slate-500 font-bold mt-2 text-base leading-6">
            Inject capital into your Bolt Nexus node via secure channels.
          </Text>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false} className="mt-10">
          <Text className="text-slate-600 font-black text-[10px] uppercase tracking-[3px] mb-6">Recommended</Text>
          
          <DepositMethod 
            onPress={() => handleSelectSource("Plaid")}
            title="Instant Bank Link"
            sub="Zero fees • Secure via Plaid"
            icon="business"
            color="#3b82f6"
            badge="Fastest"
          />

          <Text className="text-slate-600 font-black text-[10px] uppercase tracking-[3px] mt-8 mb-6">Standard Protocols</Text>

          <DepositMethod 
            onPress={() => handleSelectSource("Card")}
            title="Debit or Credit Card"
            sub="2.9% fee • Instant arrival"
            icon="card"
            color="#a855f7"
          />

          <DepositMethod 
            onPress={() => handleSelectSource("Wire")}
            title="Wire Transfer"
            sub="No limit • 1-2 business days"
            icon="swap-vertical"
            color="#10b981"
          />

          <DepositMethod 
            onPress={() => handleSelectSource("ApplePay")}
            title="Apple Pay"
            sub="Biometric auth • Instant"
            icon="logo-apple"
            color="#ffffff"
          />

          {/* Security Footer */}
          <View className="mt-10 mb-20 items-center">
            <View className="flex-row items-center bg-slate-900/40 px-4 py-3 rounded-2xl border border-white/5">
              <Ionicons name="shield-checkmark" size={16} color="#475569" />
              <Text className="text-slate-500 font-bold text-[10px] uppercase tracking-wider ml-2">
                AES-256 Encrypted Connection
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function DepositMethod({ title, sub, icon, color, badge, onPress }: any) {
  return (
    <Animated.View entering={FadeInDown.delay(300)}>
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.7}
        className="flex-row items-center p-6 bg-slate-900/30 border border-white/5 rounded-[32px] mb-4"
      >
        <View style={{ backgroundColor: `${color}15` }} className="w-14 h-14 rounded-[22px] items-center justify-center border border-white/5">
          <Ionicons name={icon} size={26} color={color} />
        </View>
        
        <View className="ml-5 flex-1">
          <View className="flex-row items-center">
            <Text className="text-white font-black text-lg">{title}</Text>
            {badge && (
              <View className="bg-emerald-500/10 px-2 py-0.5 rounded-md ml-2 border border-emerald-500/20">
                <Text className="text-emerald-500 font-black text-[8px] uppercase">{badge}</Text>
              </View>
            )}
          </View>
          <Text className="text-slate-500 font-bold text-xs mt-0.5">{sub}</Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#334155" />
      </TouchableOpacity>
    </Animated.View>
  );
}