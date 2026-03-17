import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSequence, 
  withTiming, 
  FadeIn 
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export default function SendFunds() {
  const router = useRouter();
  const [amount, setAmount] = useState("0");
  const scale = useSharedValue(1);

  const handleKeyPress = (val: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Pulse animation on the amount text
    scale.value = withSequence(withTiming(1.1, { duration: 50 }), withTiming(1));

    if (val === "delete") {
      setAmount(prev => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      return;
    }

    if (amount === "0" && val !== ".") {
      setAmount(val);
    } else if (amount.length < 9) {
      setAmount(prev => prev + val);
    }
  };

  const animatedAmountStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const Key = ({ value, icon }: { value: string, icon?: string }) => (
    <TouchableOpacity 
      onPress={() => handleKeyPress(value)}
      className="w-[30%] h-20 items-center justify-center rounded-3xl active:bg-emerald-500/10"
    >
      {icon ? (
        <Ionicons name={icon as any} size={24} color="white" />
      ) : (
        <Text className="text-white text-2xl font-black">{value}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-8 py-6">
        
        {/* Header */}
        <View className="flex-row justify-between items-center mb-12">
          <TouchableOpacity onPress={() => router.back()} className="p-2 bg-white/5 rounded-full">
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-black tracking-widest uppercase text-[10px]">Transfer Funds</Text>
          <View className="w-10" />
        </View>

        {/* Recipient Preview */}
        <Animated.View entering={FadeIn} className="items-center mb-10">
          <View className="w-16 h-16 bg-emerald-500 rounded-full items-center justify-center mb-3">
            <Text className="text-black font-black text-xl">JD</Text>
          </View>
          <Text className="text-white font-bold">John Doe</Text>
          <Text className="text-slate-500 text-xs">nexus-id: 8829-x</Text>
        </Animated.View>

        {/* Amount Display */}
        <View className="flex-1 justify-center items-center">
          <View className="flex-row items-baseline">
            <Text className="text-emerald-500 text-3xl font-black mr-2">$</Text>
            <Animated.Text 
              style={animatedAmountStyle}
              className="text-white text-7xl font-black tracking-tighter"
            >
              {amount}
            </Animated.Text>
          </View>
          <Text className="text-slate-500 font-bold mt-4 uppercase tracking-[2px] text-[10px]">
            Max Available: $12,450.00
          </Text>
        </View>

        {/* Keypad */}
        <View className="flex-row flex-wrap justify-center gap-y-2 mb-8">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "delete"].map((k) => (
            <Key key={k} value={k} icon={k === "delete" ? "backspace-outline" : undefined} />
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          className={`h-16 rounded-[24px] items-center justify-center flex-row ${amount === "0" ? 'bg-slate-900 opacity-50' : 'bg-emerald-500'}`}
          disabled={amount === "0"}
          onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
        >
          <Text className="text-black font-black tracking-widest uppercase mr-2">Initiate Transfer</Text>
          <Ionicons name="arrow-forward" size={18} color="black" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}