import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router"; // ✅ Import Router
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import TransactionDetail from "@/components/dashboard/transaction-detail";

const TRANSACTIONS = [
  { id: '1', label: 'Apple Store', category: 'Technology', amount: "-$1,299.00", date: 'Today, 2:15 PM', icon: 'logo-apple', color: '#ffffff' },
  { id: '2', label: 'Stripe Payout', category: 'Income', amount: "+$4,500.00", date: 'Today, 9:00 AM', icon: 'wallet-outline', color: '#10b981' },
  { id: '3', label: 'Starbucks', category: 'Food & Drink', amount: "-$6.50", date: 'Yesterday, 4:20 PM', icon: 'cafe-outline', color: '#00704A' },
  { id: '4', label: 'Netflix', category: 'Entertainment', amount: "-$19.99", date: 'Yesterday, 11:00 AM', icon: 'play', color: '#E50914' },
];

export default function TransactionHistory() {
  const router = useRouter(); // ✅ Initialize Router
  const [search, setSearch] = useState("");
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back(); // ✅ Navigate back to Dashboard
  };

  const handleFilterPress = () => {
    Haptics.selectionAsync();
    Alert.alert("Nexus Filter", "Advanced filtering protocols coming soon.");
  };

  const handleOpenDetail = (tx: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedTx(tx);
  };

  const handleCloseDetail = () => {
    setSelectedTx(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <View className="px-6 pt-4 pb-2">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity 
            onPress={handleBack} 
            className="w-10 h-10 items-center justify-center rounded-full bg-white/5"
          >
             <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <Text className="text-white text-xl font-black tracking-tight">Ledger</Text>
          
          {/* ✅ Filter Icon - Styled to look interactive */}
          <TouchableOpacity 
            onPress={handleFilterPress}
            className="w-10 h-10 bg-slate-900 rounded-2xl items-center justify-center border border-white/5"
          >
            <Ionicons name="options-outline" size={18} color="#10b981" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-slate-900/50 border border-white/10 rounded-2xl px-4 h-14 mb-6">
          <Ionicons name="search" size={18} color="#475569" />
          <TextInput 
            placeholder="Search Ledger..." 
            placeholderTextColor="#475569"
            className="flex-1 ml-3 text-white font-bold"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {['Today', 'Yesterday'].map((dateGroup) => (
          <View key={dateGroup} className="mb-8">
            <Text className="text-slate-500 text-[10px] font-black uppercase tracking-[3px] mb-4 ml-1">
              {dateGroup}
            </Text>
            
            <View className="bg-slate-900/20 border border-white/5 rounded-[32px] overflow-hidden">
              {TRANSACTIONS
                .filter(t => t.date.includes(dateGroup) && t.label.toLowerCase().includes(search.toLowerCase()))
                .map((item, i, arr) => (
                <TouchableOpacity 
                  key={item.id}
                  onPress={() => handleOpenDetail(item)}
                  activeOpacity={0.7}
                  className={`flex-row items-center justify-between p-5 ${i !== arr.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <View className="flex-row items-center gap-x-4">
                    <View style={{ backgroundColor: `${item.color}15` }} className="w-12 h-12 rounded-2xl items-center justify-center border border-white/5">
                      <Ionicons name={item.icon as any} size={20} color={item.color} />
                    </View>
                    <View>
                      <Text className="text-white font-black text-base">{item.label}</Text>
                      <Text className="text-slate-500 text-[10px] font-black uppercase tracking-wider">{item.category}</Text>
                    </View>
                  </View>
                  <Text className={`font-black text-base ${item.amount.startsWith("+") ? 'text-emerald-500' : 'text-white'}`}>
                    {item.amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 🧾 Transaction Detail Modal */}
      <Modal
        visible={!!selectedTx}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseDetail}
      >
        <TransactionDetail 
          transaction={selectedTx} 
          onClose={handleCloseDetail} 
        />
      </Modal>
    </SafeAreaView>
  );
}