import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function LimitsScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-8">
        
        {/* Header */}
        <View className="pt-4 flex-row justify-between items-center mb-10">
          <TouchableOpacity onPress={() => router.back()} className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center border border-white/5">
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-black uppercase tracking-widest text-[10px]">Guardrail Settings</Text>
          <View className="w-12" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-white text-3xl font-black tracking-tight mb-2">Spending Limits</Text>
          <Text className="text-slate-500 font-bold mb-10 text-base">Configure threshold alerts for your hardware nodes.</Text>

          <LimitCard title="Daily Transaction Limit" amount="$5,000" sub="Resets in 14h 22m" icon="today-outline" color="#3b82f6" />
          <LimitCard title="Monthly Nexus Limit" amount="$50,000" sub="Founder Tier Max" icon="calendar-outline" color="#a855f7" />
          <LimitCard title="ATM Withdrawal" amount="$1,000" sub="Daily limit" icon="cash-outline" color="#10b981" />

          {/* 🚨 Emergency Kill Switch */}
          <TouchableOpacity 
            className="mt-12 p-8 bg-red-500/5 border border-red-500/20 rounded-[40px] items-center"
            onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)}
          >
            <View className="w-14 h-14 bg-red-500/10 rounded-full items-center justify-center mb-4">
               <Ionicons name="nuclear" size={28} color="#ef4444" />
            </View>
            <Text className="text-red-500 font-black uppercase text-xs tracking-[4px]">Freeze All Transactions</Text>
            <Text className="text-red-500/50 font-bold text-[10px] mt-2 text-center px-6">
              Instant lock on all hardware and virtual nodes.
            </Text>
          </TouchableOpacity>
          
          <View className="h-20" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function LimitCard({ title, amount, sub, icon, color }: any) {
  return (
    <TouchableOpacity className="flex-row items-center p-6 bg-slate-900/40 border border-white/5 rounded-[32px] mb-4">
      <View style={{ backgroundColor: `${color}15` }} className="w-12 h-12 rounded-2xl items-center justify-center border border-white/5">
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-white font-black text-base">{title}</Text>
        <Text className="text-slate-500 font-bold text-xs">{sub}</Text>
      </View>
      <Text className="text-white font-black text-lg">{amount}</Text>
    </TouchableOpacity>
  );
}