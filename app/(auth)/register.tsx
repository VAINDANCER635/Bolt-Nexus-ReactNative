import React, { useState } from "react";
import { Text, View, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import Screen from "@/components/layout/screen";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validateName = (value: string) => {
    if (!value) return "Required";
    if (value.length < 3) return "Min 3 characters";
    return "";
  };

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

  const handleRegister = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.replace("/(tabs)/dashboard");
  };

  const isFormValid = name.length > 2 && email.includes("@") && password.length >= 6;

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 🛡️ Header Section */}
          <Animated.View entering={FadeInUp.duration(800).springify()} className="mb-10">
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-emerald-500 rounded-2xl items-center justify-center mr-4 shadow-lg shadow-emerald-500/40">
                <Ionicons name="person-add" size={24} color="black" />
              </View>
              <Text className="text-white text-3xl font-black tracking-tight">Initialize</Text>
            </View>
            <Text className="text-slate-500 text-base leading-6">
              Create your secure <Text className="text-emerald-500 font-bold">Nexus Node</Text> to begin managing your global assets.
            </Text>
          </Animated.View>

          {/* 👤 Full Name */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)} className="mb-4">
            <View className={`flex-row items-center bg-slate-900/50 border ${errors.name ? "border-red-500/50" : "border-white/10"} rounded-2xl px-4 h-16`}>
              <Ionicons name="person-outline" size={20} color={name ? "#10b981" : "#475569"} />
              <Input
                placeholder="Operational Name"
                placeholderTextColor="#475569"
                value={name}
                onChangeText={(v) => {
                  setName(v);
                  setErrors((p) => ({ ...p, name: validateName(v) }));
                }}
                error={errors.name}
                className="flex-1 ml-3 text-white font-bold border-0"
              />
            </View>
          </Animated.View>

          {/* ✉️ Email */}
          <Animated.View entering={FadeInDown.delay(300).duration(600)} className="mb-4">
            <View className={`flex-row items-center bg-slate-900/50 border ${errors.email ? "border-red-500/50" : "border-white/10"} rounded-2xl px-4 h-16`}>
              <Ionicons name="mail-outline" size={20} color={email ? "#10b981" : "#475569"} />
              <Input
                placeholder="Registry Email"
                placeholderTextColor="#475569"
                value={email}
                onChangeText={(v) => {
                  setEmail(v);
                  setErrors((p) => ({ ...p, email: validateEmail(v) }));
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                className="flex-1 ml-3 text-white font-bold border-0"
              />
            </View>
          </Animated.View>

          {/* 🔑 Password */}
          <Animated.View entering={FadeInDown.delay(400).duration(600)} className="mb-8">
            <View className={`flex-row items-center bg-slate-900/50 border ${errors.password ? "border-red-500/50" : "border-white/10"} rounded-2xl px-4 h-16`}>
              <Ionicons name="shield-checkmark-outline" size={20} color={password ? "#10b981" : "#475569"} />
              <Input
                placeholder="Secure Access Key"
                placeholderTextColor="#475569"
                value={password}
                onChangeText={(v) => {
                  setPassword(v);
                  setErrors((p) => ({ ...p, password: validatePassword(v) }));
                }}
                secureTextEntry={!showPassword}
                error={errors.password}
                className="flex-1 ml-3 text-white font-bold border-0"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#475569" />
              </Pressable>
            </View>
          </Animated.View>

          {/* 🔘 Action Button */}
          <Animated.View entering={FadeInDown.delay(500).duration(600)}>
            <Button
              title="CREATE SECURE IDENTITY"
              onPress={handleRegister}
              disabled={!isFormValid}
              variant={isFormValid ? "primary" : "secondary"}
              style={{ height: 64, borderRadius: 20, backgroundColor: isFormValid ? "#10b981" : "#1e293b" }}
            />
          </Animated.View>

          {/* 🔗 Footer */}
          <Animated.View entering={FadeIn.delay(800)} className="mt-8 mb-10">
            <Link href="/(auth)/login" asChild>
              <Pressable>
                <Text className="text-center text-slate-500 font-bold">
                  Already registered? <Text className="text-emerald-500">Access Vault</Text>
                </Text>
              </Pressable>
            </Link>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}