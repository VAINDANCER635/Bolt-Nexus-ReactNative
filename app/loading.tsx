import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing,
  FadeIn,
  interpolate
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function LoadingScreen() {
  const pulse = useSharedValue(1);
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // 1. Logo Pulse Animation
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 800, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      true
    );

    // 2. Continuous Rotation for the "Scanner" ring
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1
    );

    // 3. Simulated Loading Progress
    progress.value = withTiming(100, { duration: 2500 });
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: interpolate(pulse.value, [1, 1.2], [0.8, 1]),
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <View className="flex-1 items-center justify-center bg-black">
      {/* Background Ambient Glow */}
      <View className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

      <View className="items-center justify-center">
        {/* Rotating Outer Ring */}
        <Animated.View 
          style={ringStyle}
          className="w-32 h-32 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 border-l-emerald-500/40 items-center justify-center"
        />

        {/* Pulsing Logo */}
        <Animated.View 
          style={logoStyle}
          className="absolute w-20 h-20 bg-emerald-500 rounded-[24px] items-center justify-center shadow-2xl shadow-emerald-500/40"
        >
          <Ionicons name="flash" size={40} color="black" />
        </Animated.View>
      </View>

      {/* Loading Text & Progress Bar */}
      <Animated.View entering={FadeIn.delay(300)} className="mt-16 w-64">
        <View className="flex-row justify-between mb-2">
          <Text className="text-slate-500 font-black text-[10px] uppercase tracking-widest">
            Identity Verified
          </Text>
          <Text className="text-emerald-500 font-mono text-[10px]">
            SECURE_INIT
          </Text>
        </View>

        {/* Progress Track */}
        <View className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <Animated.View 
            style={progressStyle}
            className="h-full bg-emerald-500"
          />
        </View>

        <Text className="mt-4 text-slate-500 text-center font-medium text-[11px] italic">
          Synchronizing Nexus Data...
        </Text>
      </Animated.View>

      {/* Footer Branding */}
      <View className="absolute bottom-12">
        <Text className="text-white/20 font-black tracking-[4px] uppercase text-[10px]">
          Bolt Nexus v1.0.4
        </Text>
      </View>
    </View>
  );
}