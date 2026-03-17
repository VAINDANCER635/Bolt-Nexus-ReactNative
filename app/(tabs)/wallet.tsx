import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as LocalAuthentication from 'expo-local-authentication'; 
import { useRouter } from "expo-router";
import BottomNav from "@/components/ui/bottom-nav";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WalletScreen() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  const flipRotation = useSharedValue(0);
  const freezeProgress = useSharedValue(0);
  const router = useRouter();

  const actions = [
    { name: "Send", icon: "paper-plane", color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
    {
      name: "Freeze",
      icon: isFrozen ? "snow" : "snow-outline",
      color: "#3b82f6",
      bg: isFrozen ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.1)",
    },
    { name: "Limits", icon: "speedometer", color: "#a855f7", bg: "rgba(168, 85, 247, 0.1)" },
    { name: "Add", icon: "add", color: "#94a3b8", bg: "rgba(148, 163, 184, 0.1)" },
  ];

  const handleFlip = async () => {
    if (isFrozen) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    if (!isFlipped) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authorize Card Decryption',
      });
      if (!result.success) return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newValue = isFlipped ? 0 : 180;
    flipRotation.value = withSpring(newValue, { damping: 15, stiffness: 90 });
    setIsFlipped(!isFlipped);
  };

  const handleFreeze = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const targetValue = isFrozen ? 0 : 1;
    freezeProgress.value = withTiming(targetValue, { duration: 500 });
    setIsFrozen(!isFrozen);
    if (!isFrozen && isFlipped) {
        flipRotation.value = withSpring(0);
        setIsFlipped(false);
    }
  };

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${flipRotation.value}deg` }],
    opacity: flipRotation.value > 90 ? 0 : 1,
    zIndex: flipRotation.value > 90 ? 0 : 1,
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${flipRotation.value + 180}deg` }],
    opacity: flipRotation.value > 90 ? 1 : 0,
    zIndex: flipRotation.value > 90 ? 1 : 0,
  }));

  const lockOverlayStyle = useAnimatedStyle(() => ({
    opacity: freezeProgress.value,
    transform: [{ scale: interpolate(freezeProgress.value, [0, 1], [0.5, 1]) }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 120 }}
      >
        <Text className="text-white text-4xl font-black tracking-tighter mb-8">My Wallet</Text>
        
        {/* 💳 3D CARD SECTION */}
       <View className="h-56 w-full" style={{ transform: [{ perspective: 1200 }] }}>
          <Pressable onPress={handleFlip} disabled={isFrozen}>
            
            {/* FRONT: Refactored Titanium Design */}
            <Animated.View style={[frontAnimatedStyle, { backfaceVisibility: "hidden" }]} className="w-full h-full">
              <View className="absolute w-full h-full bg-slate-900 rounded-[40px] p-8 border border-white/10 justify-between overflow-hidden">
                {/* Visual state for Frozen */}
                {isFrozen && <View className="absolute inset-0 bg-slate-900/80 z-10" />}
                
                <View className="flex-row justify-between items-start">
                  <Ionicons name="flash" size={32} color="#f97316" />
                  <View className="items-end">
                    <Text className="text-white font-black italic text-xs">FOUNDER TIER</Text>
                    <Text className="text-orange-500/50 font-bold text-[8px] tracking-widest uppercase">
                      Nexus-X1 Node
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className="text-white text-2xl font-black tracking-[4px]">
                    ••••  ••••  ••••  6355
                  </Text>
                  <View className="flex-row justify-between mt-6 items-end">
                    <View>
                      <Text className="text-slate-500 font-bold text-[8px] uppercase mb-1">
                        Node Commander
                      </Text>
                      <Text className="text-white font-bold uppercase text-[10px] tracking-widest">
                        Adam Korrison
                      </Text>
                    </View>
                    <Ionicons name="logo-apple-ar" size={24} color="white" />
                  </View>
                </View>
              </View>
            </Animated.View>

            {/* BACK: Secure Data */}
            <Animated.View 
              style={[backAnimatedStyle, { backfaceVisibility: "hidden", position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
            >
              <View className="h-full w-full bg-slate-800 rounded-[40px] p-8 border border-white/10 justify-center items-center">
                <View className="bg-black w-[115%] h-12 absolute top-10" />
                <View className="mt-6 items-center">
                  <View className="bg-slate-900 px-6 py-3 rounded-2xl border border-white/5 items-center">
                    <Text className="text-slate-500 font-black text-[10px] uppercase mb-1">Secure CVV</Text>
                    <Text className="text-white font-black text-xl tracking-[8px]">882</Text>
                  </View>
                  <Text className="text-white/20 text-[7px] uppercase font-black tracking-[2px] mt-6 text-center px-6">
                    This node is cryptographically linked to your biometric identity.
                  </Text>
                </View>
              </View>
            </Animated.View>
          </Pressable>

          {/* LOCK OVERLAY */}
          <Animated.View
            pointerEvents="none"
            style={[lockOverlayStyle, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
            className="items-center justify-center bg-black/40 rounded-[40px]"
          >
            <View className="bg-black/80 p-4 rounded-full border border-white/20">
              <Ionicons name="lock-closed" size={32} color="white" />
            </View>
          </Animated.View>
        </View>

        {/* ⚡ QUICK ACTIONS */}
        <View className="flex-row justify-between mt-10">
          {actions.map((action) => (
            <TouchableOpacity
              key={action.name}
              onPress={
                action.name === "Freeze" ? handleFreeze : 
                action.name === "Send" ? () => router.push("/send") : 
                () => Haptics.selectionAsync()
              }
              className="items-center"
            >
              <View style={{ backgroundColor: action.bg }} className="w-16 h-16 rounded-[24px] items-center justify-center border border-white/5 mb-3">
                <Ionicons name={action.icon as any} size={24} color={action.color} />
              </View>
              <Text className="text-slate-500 text-[10px] font-black uppercase tracking-wider">{action.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 🧊 FILTER CHIPS */}
        <View className="flex-row gap-x-3 mt-10 mb-4">
          {["All", "Income", "Spending"].map((chip, i) => (
            <TouchableOpacity
              key={chip}
              className={`px-6 py-2.5 rounded-full border ${i === 0 ? "bg-white border-white" : "border-white/10"}`}
            >
              <Text className={`text-[10px] font-black uppercase tracking-widest ${i === 0 ? "text-black" : "text-slate-500"}`}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}
