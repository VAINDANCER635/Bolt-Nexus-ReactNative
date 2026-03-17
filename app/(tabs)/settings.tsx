import React, { useState } from "react";
import { View, Text, ScrollView, Switch, TouchableOpacity, Modal } from "react-native";
import Animated, { FadeInDown, FadeInRight, SlideInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import BottomNav from "@/components/ui/bottom-nav";

export default function SettingsScreen() {
  const router = useRouter();
  const [isBiometric, setIsBiometric] = useState(true);
  const [isNotifications, setIsNotifications] = useState(true);

  // Modal States
  const [activeModal, setActiveModal] = useState<"theme" | "currency" | null>(null);

  const toggleSwitch = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setter(prev => !prev);
  };

  const handleMenuPress = (label: string) => {
    Haptics.selectionAsync();
    if (label === "Interface Theme") setActiveModal("theme");
    else if (label === "Base Currency") setActiveModal("currency");
    else if (label === "Support Center") router.push("/support");
  };

  // 🚪 Termination Logic
  const handleTerminate = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    // Replace with your actual auth/login route name
    router.replace("/login"); 
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['bottom']}>
      <ScrollView 
        className="flex-1 px-8" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 60, paddingBottom: 140 }}
      >
        {/* ⚡ Header Section */}
        <Animated.View entering={FadeInDown.duration(800)}>
          <Text className="text-white text-4xl font-black tracking-tighter mb-2">
            System Config
          </Text>
          <Text className="text-slate-500 font-bold uppercase text-[10px] tracking-[4px] mb-10">
            Node: BN-Nexus-X1
          </Text>
        </Animated.View>

        {/* 🛡️ Security Module */}
        <Animated.Text 
          entering={FadeInDown.delay(100)} 
          className="text-emerald-500 text-[10px] font-black uppercase tracking-[3px] mb-4 ml-2"
        >
          Security Protocols
        </Animated.Text>
        
        <Animated.View 
          entering={FadeInRight.delay(200)} 
          className="bg-slate-900/30 rounded-[32px] border border-white/5 p-4 mb-10"
        >
          <View className="flex-row items-center justify-between mb-6 p-2">
            <View className="flex-row items-center gap-x-4">
              <View className="w-12 h-12 bg-emerald-500/10 rounded-2xl items-center justify-center border border-emerald-500/20">
                <Ionicons name="finger-print" size={22} color="#10b981" />
              </View>
              <View>
                <Text className="text-white font-bold text-base">Biometric Auth</Text>
                <Text className="text-slate-500 text-[10px] font-bold uppercase">Identity Lock</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: "#1e293b", true: "#10b981" }}
              thumbColor={"#fff"}
              onValueChange={() => toggleSwitch(setIsBiometric)}
              value={isBiometric}
            />
          </View>

          <View className="flex-row items-center justify-between p-2">
            <View className="flex-row items-center gap-x-4">
              <View className="w-12 h-12 bg-blue-500/10 rounded-2xl items-center justify-center border border-blue-500/20">
                <Ionicons name="notifications" size={22} color="#3b82f6" />
              </View>
              <View>
                <Text className="text-white font-bold text-base">Push Alerts</Text>
                <Text className="text-slate-500 text-[10px] font-bold uppercase">System Broadcast</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: "#1e293b", true: "#3b82f6" }}
              thumbColor={"#fff"}
              onValueChange={() => toggleSwitch(setIsNotifications)}
              value={isNotifications}
            />
          </View>
        </Animated.View>

        {/* ⚙️ Preferences Module */}
        <Animated.Text 
          entering={FadeInDown.delay(300)} 
          className="text-slate-500 text-[10px] font-black uppercase tracking-[3px] mb-4 ml-2"
        >
          Operational Prefs
        </Animated.Text>

        <Animated.View 
          entering={FadeInRight.delay(400)} 
          className="bg-slate-900/30 rounded-[32px] border border-white/5 p-2 mb-10"
        >
          {[
            { icon: "color-palette-outline", label: "Interface Theme", sub: "Obsidian Neon", color: "#a855f7" },
            { icon: "globe-outline", label: "Base Currency", sub: "USD - United States", color: "#f59e0b" },
            { icon: "shield-checkmark-outline", label: "Support Center", sub: "Encrypted Line", color: "#f43f5e" },
          ].map((item, i) => (
            <TouchableOpacity 
              key={item.label}
              onPress={() => handleMenuPress(item.label)}
              className={`flex-row items-center justify-between p-4 ${i !== 2 ? 'border-b border-white/5' : ''}`}
            >
              <View className="flex-row items-center gap-x-4">
                <View style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}30` }} className="w-12 h-12 rounded-2xl border items-center justify-center">
                  <Ionicons name={item.icon as any} size={22} color={item.color} />
                </View>
                <View>
                  <Text className="text-white font-bold text-base">{item.label}</Text>
                  <Text className="text-slate-500 text-[10px] font-bold uppercase">{item.sub}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#475569" />
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* 🚪 Termination Section */}
        <TouchableOpacity 
          className="mt-4 py-6 rounded-[32px] border border-red-500/20 bg-red-500/5 items-center justify-center active:bg-red-500/10"
          onPress={handleTerminate}
        >
          <Text className="text-red-500 font-black tracking-[4px] uppercase text-xs">Terminate Session</Text>
        </TouchableOpacity>

        <View className="items-center mt-12">
          <Text className="text-slate-800 text-[10px] font-black uppercase tracking-[5px]">Bolt Nexus v1.0.4</Text>
        </View>
      </ScrollView>

      {/* --- REUSABLE ACTION SHEET MODAL --- */}
      <Modal
        visible={activeModal !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModal(null)}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => setActiveModal(null)} 
          className="flex-1 bg-black/80 justify-end"
        >
          <Animated.View 
            entering={SlideInUp.duration(400)}
            className="bg-slate-900 rounded-t-[40px] p-8 border-t border-white/10"
          >
            <View className="w-12 h-1.5 bg-slate-800 rounded-full self-center mb-8" />
            
            <Text className="text-white text-xl font-black mb-6">
              {activeModal === "theme" ? "Interface Theme" : "Base Currency"}
            </Text>

            {(activeModal === "theme" 
              ? ["Obsidian Neon", "Titanium Light", "Cyber Emerald"] 
              : ["USD - Dollar", "EUR - Euro", "GBP - Pound", "JPY - Yen"]
            ).map((opt) => (
              <TouchableOpacity 
                key={opt}
                className="flex-row items-center justify-between py-5 border-b border-white/5"
                onPress={() => {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                  setActiveModal(null);
                }}
              >
                <Text className="text-slate-300 font-bold text-lg">{opt}</Text>
                { (opt.includes("Obsidian") || opt.includes("USD")) && (
                  <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                )}
              </TouchableOpacity>
            ))}
            <View className="h-10" />
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      <BottomNav />
    </SafeAreaView>
  );
}

        