import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Pressable, KeyboardAvoidingView, TouchableOpacity, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import Animated, { FadeIn, FadeInUp, FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import Screen from "@/components/layout/screen";
import Button from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import LoadingScreen from "@/app/loading";
import BiometricOverlay from "@/context/BiometricOverlay"; // ✅ Import our new overlay

export default function Login() {
  const router = useRouter();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  // ✅ Biometric State
  const [showBiometrics, setShowBiometrics] = useState(false);
  const userPrefersBiometrics = true; // This should eventually come from your settings/storage

  // ✅ Auto-trigger biometrics on mount
  useEffect(() => {
    if (userPrefersBiometrics && !loading) {
      // Small delay to let the UI settle before showing the system prompt
      const timer = setTimeout(() => setShowBiometrics(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const validateEmail = (value: string) => {
    if (!value) return "Required";
    if (!value.includes("@")) return "Invalid format";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "Required";
    if (value.length < 6) return "Min 6 characters";
    return "";
  };

  const handleLogin = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    try {
      await login(email, password);
      router.replace("../dashboard");
    } catch (err: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      alert(err.message);
    }
  };

  // ✅ Handle Successful Biometric Auth
  const handleBiometricSuccess = () => {
    setShowBiometrics(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Directly bypass to dashboard since identity is verified
    router.replace("../dashboard");
  };

  const isFormValid = email.includes("@") && password.length >= 6;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Screen className="bg-black">
      {/* 🛡️ BIOMETRIC OVERLAY */}
      {showBiometrics && (
        <BiometricOverlay 
          reason="Authorize Nexus Access"
          onSuccess={handleBiometricSuccess}
          onFailure={() => setShowBiometrics(false)}
        />
      )}

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        className="flex-1 px-8 justify-center"
      >
        {/* ⚡ LOGO SECTION */}
        <Animated.View entering={FadeInUp.duration(1000).springify()} className="items-center mb-12">
          <View className="w-20 h-20 bg-emerald-500 rounded-[24px] items-center justify-center shadow-2xl shadow-emerald-500/50">
            <Ionicons name="flash" size={42} color="black" />
          </View>
          <Text className="text-white text-4xl font-black tracking-tighter mt-6">
            BOLT<Text className="text-emerald-500">NEXUS</Text>
          </Text>
          <Text className="text-slate-500 font-medium tracking-widest uppercase text-[10px] mt-2">
            Secure Wealth Interface
          </Text>
        </Animated.View>

        {/* ✉️ EMAIL INPUT */}
        <Animated.View entering={FadeInDown.delay(200).duration(800)} className="mb-4">
          <View className={`flex-row items-center bg-slate-900/50 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-4 h-16`}>
            <Ionicons name="mail-outline" size={20} color={email ? "#10b981" : "#475569"} />
            <TextInput
              value={email}
              onChangeText={(v) => {
                setEmail(v);
                setErrors(p => ({ ...p, email: validateEmail(v) }));
              }}
              placeholder="System Identity (Email)"
              placeholderTextColor="#475569"
              className="flex-1 ml-3 text-white font-bold"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </Animated.View>

        {/* 🔑 PASSWORD INPUT */}
        <Animated.View entering={FadeInDown.delay(400).duration(800)} className="mb-8">
          <View className={`flex-row items-center bg-slate-900/50 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-4 h-16`}>
            <Ionicons name="lock-closed-outline" size={20} color={password ? "#10b981" : "#475569"} />
            <TextInput
              value={password}
              onChangeText={(v) => {
                setPassword(v);
                setErrors(p => ({ ...p, password: validatePassword(v) }));
              }}
              placeholder="Access Key"
              placeholderTextColor="#475569"
              secureTextEntry={!showPassword}
              className="flex-1 ml-3 text-white font-bold"
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#475569" />
            </Pressable>
          </View>
        </Animated.View>

        {/* 🚀 ACTION ROW: SIGN IN + BIOMETRIC QUICK-KEY */}
        <Animated.View entering={FadeInDown.delay(600).duration(800)} className="flex-row gap-x-3">
          <View className="flex-1">
            <Button
              title="AUTHORIZE ACCESS"
              onPress={handleLogin}
              disabled={!isFormValid || loading}
              loading={loading}
              variant={isFormValid ? "primary" : "secondary"}
              style={{ height: 64, borderRadius: 20, backgroundColor: isFormValid ? '#10b981' : '#1e293b' }}
            />
          </View>

          {/* Quick Fingerprint Access */}
          <TouchableOpacity 
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setShowBiometrics(true);
            }}
            className="w-16 h-16 bg-slate-900 border border-white/10 rounded-[20px] items-center justify-center"
          >
            <Ionicons name="finger-print" size={28} color="#10b981" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(1000)} className="mt-8">
          <Link href="/(auth)/register" asChild>
            <Pressable>
              <Text className="text-center text-slate-500 font-bold tracking-tight">
                New to the Nexus? <Text className="text-emerald-500">Initialize Account</Text>
              </Text>
            </Pressable>
          </Link>
        </Animated.View>
      </KeyboardAvoidingView>
    </Screen>
  );
}