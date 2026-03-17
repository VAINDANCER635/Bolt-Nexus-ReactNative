import React, { useMemo } from "react";
import { View, Pressable, Dimensions, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");
const NAV_WIDTH = width - 48; 
const TAB_WIDTH = (NAV_WIDTH - 8) / 3; 

type Route = "/(tabs)/dashboard" | "/(tabs)/wallet" | "/(tabs)/settings";

type Tab = {
  id: number;
  name: string;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
  route: Route;
};

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs: Tab[] = useMemo(() => [
    { 
      id: 1, 
      name: "Home", 
      activeIcon: "home", 
      inactiveIcon: "home-outline", 
      route: "/(tabs)/dashboard" 
    },
    { 
      id: 2, 
      name: "Wallet", 
      activeIcon: "card", 
      inactiveIcon: "card-outline", 
      route: "/(tabs)/wallet" 
    },
    { 
      id: 3, 
      name: "Config", 
      activeIcon: "settings", 
      inactiveIcon: "settings-outline", 
      route: "/(tabs)/settings" 
    },
  ], []);

  const activeIndex = tabs.findIndex((tab) => tab.route === pathname);
  const safeIndex = activeIndex === -1 ? 0 : activeIndex;

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(safeIndex * TAB_WIDTH, {
          damping: 20,
          stiffness: 250,
        }),
      },
    ],
  }));

  const handlePress = (route: Route) => {
    if (pathname !== route) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      router.replace(route); 
    }
  };

  return (
    // ✅ Raised from bottom-10 to bottom-14 for better clearance
    <View className="absolute bottom-14 left-6 right-6 h-20 items-center">
      <BlurView
        intensity={Platform.OS === 'ios' ? 90 : 100}
        tint="light" 
        className="flex-row items-center rounded-[35px] border border-white/50 overflow-hidden"
        style={{
          width: NAV_WIDTH,
          height: 72,
          backgroundColor: 'rgba(255, 255, 255, 0.92)', // Slightly more opaque
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 15,
          elevation: 12,
        }}
      >
        {/* ⚪ The Floating Indicator */}
        <Animated.View
          style={[indicatorStyle, { width: TAB_WIDTH }]}
          className="absolute left-1 top-1 bottom-1 bg-white rounded-[30px] shadow-sm"
        />

        {tabs.map((tab) => {
          const isActive = pathname === tab.route;

          return (
            <Pressable
              key={tab.id}
              onPress={() => handlePress(tab.route)}
              className="flex-1 items-center justify-center h-full"
            >
              <View className="items-center justify-center">
                <Ionicons
                  name={isActive ? tab.activeIcon : tab.inactiveIcon}
                  size={isActive ? 24 : 24}
                  // ✅ Switched active color to Native Navy Blue (#0f172a)
                  color={isActive ? "#0f172a" : "#94a3b8"} 
                />
                
                {isActive && (
                  <Animated.Text 
                    entering={FadeInDown.springify().damping(12)}
                    className="text-slate-900 text-[9px] font-black uppercase tracking-[1px] mt-1"
                  >
                    {tab.name}
                  </Animated.Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}