import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export default function SecurityScreen() {
  const router = useRouter();

  // Local state for UI toggles
  const [biometrics, setBiometrics] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  const toggleSwitch = (setter: (v: boolean) => void, current: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setter(!current);
  };

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
          <Text className="text-white font-black uppercase tracking-widest text-[10px]">Security Protocols</Text>
          <View className="w-12" />
        </View>

        {/* Security Health Status */}
        <Animated.View entering={FadeInUp} className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-[32px] mb-10 flex-row items-center">
          <View className="w-12 h-12 bg-emerald-500/10 rounded-2xl items-center justify-center">
            <Ionicons name="shield-checkmark" size={24} color="#10b981" />
          </View>
          <View className="ml-4">
            <Text className="text-emerald-500 font-black text-base">Node is Secure</Text>
            <Text className="text-emerald-500/60 font-bold text-[10px] uppercase tracking-wider">All systems operational</Text>
          </View>
        </Animated.View>

        {/* Biometric Logic Group */}
        <SecurityGroup title="Access Control">
          <SecurityToggle 
            label="Biometric Authorization" 
            sub="Use FaceID or Fingerprint" 
            value={biometrics} 
            onToggle={() => toggleSwitch(setBiometrics, biometrics)} 
            icon="finger-print"
          />
          <SecurityToggle 
            label="Two-Factor (2FA)" 
            sub="Required for transfers > $5k" 
            value={twoFactor} 
            onToggle={() => toggleSwitch(setTwoFactor, twoFactor)} 
            icon="key-outline"
          />
        </SecurityGroup>

        {/* Privacy Logic Group */}
        <SecurityGroup title="Data Privacy">
          <SecurityToggle 
            label="Privacy Mode" 
            sub="Hide balances on Dashboard" 
            value={privacyMode} 
            onToggle={() => toggleSwitch(setPrivacyMode, privacyMode)} 
            icon="eye-off-outline"
          />
          <TouchableOpacity className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center">
              <Ionicons name="timer-outline" size={20} color="#475569" className="mr-3" />
              <View>
                <Text className="text-white font-bold">Auto-Lock Timer</Text>
                <Text className="text-slate-500 text-xs">Lock after 5 minutes</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#1e293b" />
          </TouchableOpacity>
        </SecurityGroup>

        {/* Hardware & Devices */}
        <SecurityGroup title="Hardware Nodes">
          <TouchableOpacity className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center">
              <Ionicons name="phone-portrait-outline" size={20} color="#475569" className="mr-3" />
              <View>
                <Text className="text-white font-bold italic">iPhone 15 Pro Max (This Node)</Text>
                <Text className="text-emerald-500 text-[10px] font-black uppercase">Primary Device</Text>
              </View>
            </View>
          </TouchableOpacity>
        </SecurityGroup>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}

function SecurityGroup({ title, children }: any) {
  return (
    <View className="mb-10">
      <Text className="text-slate-600 font-black text-[10px] uppercase tracking-[3px] mb-6 ml-2">{title}</Text>
      <View className="bg-slate-900/30 border border-white/5 rounded-[32px] px-6 py-2">
        {children}
      </View>
    </View>
  );
}

function SecurityToggle({ label, sub, value, onToggle, icon }: any) {
  return (
    <View className="flex-row items-center justify-between py-4 border-b border-white/5">
      <View className="flex-row items-center flex-1">
        <Ionicons name={icon} size={20} color="#475569" className="mr-3" />
        <View className="flex-1">
          <Text className="text-white font-bold">{label}</Text>
          <Text className="text-slate-500 text-xs">{sub}</Text>
        </View>
      </View>
      <Switch 
        value={value} 
        onValueChange={onToggle}
        trackColor={{ false: '#1e293b', true: '#065f46' }}
        thumbColor={value ? '#10b981' : '#475569'}
      />
    </View>
  );
}