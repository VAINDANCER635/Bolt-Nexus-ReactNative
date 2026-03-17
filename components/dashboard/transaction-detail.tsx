import React, { useRef } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import ViewShot from "react-native-view-shot";
import * as Sharing from 'expo-sharing';

interface DetailProps {
  transaction: any;
  onClose: () => void;
}

export default function TransactionDetail({ transaction, onClose }: DetailProps) {
  const viewShotRef = useRef<any>(null);

  const handleExportImage = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    try {
      const uri = await viewShotRef.current.capture();
      await Sharing.shareAsync(uri, {
        mimeType: 'image/jpeg',
        dialogTitle: `Bolt Nexus Receipt - ${transaction.label}`,
        UTI: 'public.jpeg'
      });
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <View className="flex-1 justify-end">
      <TouchableOpacity 
        activeOpacity={1} 
        onPress={onClose} 
        className="absolute inset-0 bg-black/60" 
      />

      <Animated.View 
        entering={SlideInDown.springify().damping(20)}
        className="bg-slate-900 border-t border-white/10 rounded-t-[48px] pt-10 pb-12"
      >
        {/* VIEWSHOT WRAPPER - This is what gets turned into a JPEG */}
        <ViewShot 
          ref={viewShotRef} 
          options={{ format: "jpg", quality: 0.9 }}
          style={{ backgroundColor: '#0f172a' }} // Matches slate-900
        >
          <View className="px-8 py-4">
            {/* ⚡ LOGO FOR RECEIPT (Hidden on UI, visible on capture) */}
            <View className="flex-row items-center justify-between mb-8">
               <View className="flex-row items-center">
                  <View className="w-8 h-8 bg-emerald-500 rounded-lg items-center justify-center mr-2">
                    <Ionicons name="flash" size={18} color="black" />
                  </View>
                  <Text className="text-white font-black tracking-tighter text-sm">BOLT NEXUS</Text>
               </View>
               <Text className="text-slate-500 font-bold text-[10px]">OFFICIAL RECEIPT</Text>
            </View>

            {/* Header: Logo & Amount */}
            <View className="items-center mb-8">
              <View style={{ backgroundColor: `${transaction.color}15` }} className="w-20 h-20 rounded-[30px] items-center justify-center mb-4 border border-white/5">
                <Ionicons name={transaction.icon} size={36} color={transaction.color} />
              </View>
              <Text className="text-white text-4xl font-black tracking-tighter">
                {transaction.amount}
              </Text>
              <Text className="text-slate-400 font-bold text-lg mt-1">{transaction.label}</Text>
              
              <View className="mt-4 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
                <Text className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                  Success / Verified
                </Text>
              </View>
            </View>

            {/* Info Grid */}
            <View className="bg-white/5 rounded-[32px] p-6 mb-6">
              <DetailRow label="Timestamp" value={transaction.date} />
              <DetailRow label="Nexus ID" value={`TXN-${transaction.id}X88-2026`} />
              <DetailRow label="Category" value={transaction.category || "General"} />
              <DetailRow label="Network Fee" value="$0.00" last />
            </View>

            {/* Receipt Footer (Watermark) */}
            <Text className="text-center text-slate-700 text-[9px] font-bold uppercase tracking-[4px] mb-4">
              Authorized via Nexus Secure Node
            </Text>
          </View>
        </ViewShot>

        {/* ACTIONS - (Outside ViewShot so they don't appear in the image) */}
        <View className="flex-row gap-x-4 px-8 mt-2">
          <TouchableOpacity 
            onPress={handleExportImage}
            className="flex-1 h-16 bg-slate-800 rounded-3xl items-center justify-center flex-row border border-white/5"
          >
            <Ionicons name="image-outline" size={20} color="white" />
            <Text className="text-white font-black uppercase text-xs tracking-widest ml-2">Save Image</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-1 h-16 bg-emerald-500 rounded-3xl items-center justify-center"
            onPress={onClose}
          >
            <Text className="text-black font-black uppercase text-xs tracking-widest">Dismiss</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

function DetailRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View className={`flex-row justify-between py-3 ${!last ? 'border-b border-white/5' : ''}`}>
      <Text className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">{label}</Text>
      <Text className="text-slate-200 font-bold text-xs">{value}</Text>
    </View>
  );
}