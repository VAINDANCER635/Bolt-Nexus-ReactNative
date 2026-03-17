import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  reason: string;
}

export default function BiometricOverlay({ onSuccess, onFailure, reason }: Props) {
  
  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      onFailure(); // Fallback to PIN if no biometrics
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: reason,
      fallbackLabel: "Use Access Key",
      disableDeviceFallback: false,
    });

    if (result.success) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  return (
    <Animated.View 
      entering={FadeIn} 
      exiting={FadeOut} 
      className="absolute inset-0 z-50"
    >
      <BlurView intensity={30} tint="dark" className="flex-1 items-center justify-center">
        <View className="bg-slate-900 border border-white/10 p-8 rounded-[40px] items-center">
          <View className="w-20 h-20 bg-emerald-500/10 rounded-full items-center justify-center mb-6">
            <Ionicons name="finger-print" size={40} color="#10b981" />
          </View>
          <Text className="text-white font-black text-xl mb-2">Security Verification</Text>
          <Text className="text-slate-500 font-bold text-center text-xs uppercase tracking-widest">
            {reason}
          </Text>
        </View>
      </BlurView>
    </Animated.View>
  );
}