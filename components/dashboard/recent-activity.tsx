import React, { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import Animated, { 
  FadeInUp, 
  FadeOut,
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  Layout
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const mockActivity = [
  { id: 1, label: "Netflix Subscription", amount: "-$14.99", date: "Today, 12:40 PM", icon: "play", color: "#E50914" },
  { id: 2, label: "Salary Deposit", amount: "+$2,500.00", date: "Yesterday", icon: "briefcase", color: "#10b981" },
  { id: 3, label: "Whole Foods", amount: "-$82.40", date: "Jan 15", icon: "cart", color: "#f59e0b" },
];

const ActivityItem = ({ item, index }: { item: any; index: number }) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(0.96);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        layout={Layout.springify()}
        style={animatedStyle}
        className="flex-row justify-between items-center p-4 mb-2 bg-slate-100/50 dark:bg-white/5 rounded-[24px] border border-transparent dark:border-white/5"
      >
        <View className="flex-row items-center flex-1">
          <View style={{ backgroundColor: `${item.color}15` }} className="w-12 h-12 rounded-2xl items-center justify-center">
            <Ionicons name={item.icon as any} size={20} color={item.color} />
          </View>
          <View className="ml-4">
            <Text className="text-[15px] font-black text-slate-900 dark:text-slate-100">{item.label}</Text>
            <Text className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{item.date}</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className={`text-[16px] font-black ${item.amount.startsWith("+") ? "text-emerald-500" : "text-slate-900 dark:text-white"}`}>
            {item.amount}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default function RecentActivity() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) setSearchQuery("");
  };

  const handleViewAll = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Adjust this path to wherever you saved transactions.tsx (e.g., /(tabs)/history)
    router.push("/(screens)/transactions"); 
  };

  return (
    <Animated.View
      layout={Layout.springify()}
      entering={FadeInUp.duration(800)}
      className="bg-white dark:bg-slate-900/40 rounded-[40px] overflow-hidden border border-slate-100 dark:border-white/5"
    >
      {/* Header Section */}
      <View className="px-6 pt-6 pb-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Activity</Text>
            <Text className="text-[10px] text-emerald-500 font-black uppercase tracking-[2px] mt-0.5">Nexus Ledger</Text>
          </View>
          
          <View className="flex-row items-center gap-x-2">
            <Pressable 
              onPress={toggleSearch}
              className={`p-2.5 rounded-2xl ${isSearchOpen ? 'bg-emerald-500' : 'bg-slate-100 dark:bg-white/5'}`}
            >
              <Ionicons 
                name={isSearchOpen ? "close" : "search"} 
                size={18} 
                color={isSearchOpen ? "black" : "#64748b"} 
              />
            </Pressable>
            
            <Pressable 
              onPress={handleViewAll}
              className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-2xl"
            >
              <Text className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">View All</Text>
            </Pressable>
          </View>
        </View>

        {/* Slide-out Search Bar */}
        {isSearchOpen && (
          <Animated.View 
            entering={FadeInUp.springify().damping(15)}
            exiting={FadeOut.duration(200)}
            className="mt-4 flex-row items-center bg-slate-100 dark:bg-black/40 rounded-2xl px-4 py-3 border border-slate-200 dark:border-white/5"
          >
            <Ionicons name="search" size={18} color="#475569" />
            <TextInput
              autoFocus
              placeholder="Filter Ledger..."
              placeholderTextColor="#475569"
              className="ml-3 flex-1 text-slate-900 dark:text-white font-bold"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </Animated.View>
        )}
      </View>

      {/* List Container */}
      <View className="px-4 pb-4">
        {mockActivity
          .filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((item, index) => (
            <ActivityItem key={item.id} item={item} index={index} />
        ))}
      </View>
    </Animated.View>
  );
}