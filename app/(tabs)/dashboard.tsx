import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Extrapolate,
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

// Components
import BalanceChart from "@/components/dashboard/BalanceChart";
import DashboardHeader from "@/components/dashboard/header";
import RecentActivity from "@/components/dashboard/recent-activity";
import BottomNav from "@/components/ui/bottom-nav";
import StatCard from "@/components/ui/stat-card";

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useSharedValue(0);
  const router = useRouter();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const heroCardStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0], Extrapolate.CLAMP);
    const scale = interpolate(scrollY.value, [0, 120], [1, 0.9], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [0, 120], [0, -20], Extrapolate.CLAMP);
    return { opacity, transform: [{ scale }, { translateY }] };
  });

  const miniBalanceStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [100, 180], [0, 1], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [100, 180], [10, 0], Extrapolate.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });

  const stats = [
    { title: "Balance", value: "$12,450.00" },
    { title: "Transactions", value: "34" },
    { title: "Savings", value: "$3,200.00" },
    { title: "Rewards", value: "1,250 pts" },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  // ✅ New handler for Send
  const handleSendPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/send");
  };

    // ✅ New handler for Deposit
  const handleDepositPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/deposit");
  };


      // ✅ New handler for Invest
  const handleInvestPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/invest");
  };

      // ✅ New handler for Bills
  const handleBillsPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/bills");
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={["top", "bottom"]}>
      {/* --- STICKY HEADER AREA --- */}
      <View className="z-50 bg-white dark:bg-black">
        <DashboardHeader />
        <Animated.View
          pointerEvents="none"
          style={[miniBalanceStyle, { position: "absolute", bottom: 12, alignSelf: "center" }]}
        >
          <Text className="text-black dark:text-white font-black text-lg tracking-tighter">
            $142,850.64
          </Text>
        </Animated.View>
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 160 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f97316" />
        }
      >
        {/* 💎 Total Wealth Hero Card */}
        <Animated.View style={[heroCardStyle, { paddingHorizontal: 24, marginBottom: 24 }]}>
          <LinearGradient
            colors={["#1e293b", "#0f172a"]}
            className="rounded-[40px] p-8 border border-white/10 shadow-2xl shadow-blue-500/20"
          >
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[3px] mb-2">
                  Total Net Worth
                </Text>
                <Text className="text-white text-5xl font-black tracking-tighter">
                  $142,850<Text className="text-emerald-500 text-lg">.64</Text>
                </Text>
              </View>
              <View className="bg-emerald-500/10 px-3 py-1.5 rounded-2xl border border-emerald-500/20">
                <Text className="text-emerald-500 font-black text-xs">+12.4%</Text>
              </View>
            </View>
            <View className="flex-row mt-8 gap-x-4">
              <View className="flex-1 bg-white/5 p-4 rounded-3xl border border-white/5">
                <Text className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-1">
                  Liquid Assets
                </Text>
                <Text className="text-white font-black text-lg">$84.2k</Text>
              </View>
              <View className="flex-1 bg-white/5 p-4 rounded-3xl border border-white/5">
                <Text className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-1">
                  Investments
                </Text>
                <Text className="text-white font-black text-lg">$58.6k</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* 📈 Market Ticker */}
        <View className="mb-8">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 24 }}>
            {[
              { sym: "BTC", price: "$42,105", change: "+2.4%", up: true },
              { sym: "ETH", price: "$2,240", change: "-0.8%", up: false },
              { sym: "TSLA", price: "$182.40", change: "+1.2%", up: true },
              { sym: "NVDA", price: "$594.10", change: "+4.1%", up: true },
            ].map((item) => (
              <View
                key={item.sym}
                className="mr-4 bg-slate-900/40 border border-white/5 px-4 py-2.5 rounded-2xl flex-row items-center"
              >
                <Text className="text-white font-black text-xs mr-2">{item.sym}</Text>
                <Text className="text-slate-400 text-[11px] mr-2">{item.price}</Text>
                <Text
                  className={
                    item.up
                      ? "text-emerald-500 text-[10px] font-bold"
                      : "text-red-500 text-[10px] font-bold"
                  }
                >
                  {item.change}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 📊 Wealth Composition */}
        <Animated.View entering={FadeInDown.delay(300)} className="px-6 mb-10">
          {/* ... unchanged wealth composition code ... */}
        </Animated.View>

        {/* ⚡ Quick Actions */}
        <View className="flex-row justify-between px-8 mb-12">
          {[
            { n: "Transfer", i: "swap-horizontal", c: "#10b981", action: handleSendPress }, // ✅ new action
            { n: "Deposit", i: "add-circle", c: "#3b82f6", action: handleDepositPress }, // ✅ new action
            { n: "Invest", i: "trending-up", c: "#a855f7", action: handleInvestPress },
            { n: "Bills", i: "receipt", c: "#f59e0b", action: handleBillsPress },
          ].map((a) => (
            <TouchableOpacity
              key={a.n}
              onPress={a.action ?? (() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light))}
              className="items-center"
            >
              <View className="w-14 h-14 bg-slate-100 dark:bg-slate-900 rounded-[22px] items-center justify-center border border-slate-200 dark:border-white/10 mb-2">
                <Ionicons name={a.i as any} size={22} color={a.c} />
              </View>
              <Text className="text-slate-500 text-[9px] font-black uppercase tracking-tighter">
                {a.n}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 2. STATS SECTION */}
        <Animated.ScrollView horizontal entering={FadeInDown.delay(400)} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {stats.map((item, index) => (
            <StatCard key={item.title} title={item.title} value={item.value} index={index} />
          ))}
        </Animated.ScrollView>

        {/* 3. CHART & ACTIVITY SECTION */}
        <Animated.View entering={FadeInDown.delay(500)} className="px-5 mt-10">
          <BalanceChart />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600)} className="px-5 mt-10">
          <RecentActivity />
        </Animated.View>

      </Animated.ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}