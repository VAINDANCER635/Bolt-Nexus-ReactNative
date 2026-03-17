import React, { useEffect } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/context/theme-context";

type ScreenProps = {
  children: React.ReactNode;
  className?: string;           // ✅ Tailwind support
  style?: StyleProp<ViewStyle>; // ✅ inline style overrides
};

export default function Screen({ children, className, style }: ScreenProps) {
  const { theme } = useTheme();
  const progress = useSharedValue(theme === "dark" ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(theme === "dark" ? 1 : 0, { duration: 300 });
  }, [theme]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["#000000", "#010101"] // gray-100 → black
    ),
  }));

  return (
    <Animated.View
      style={[{ flex: 1 }, animatedStyle, style]} // ✅ merge animated + inline styles
      className={`flex-1 px-6 pt-12 ${className ?? ""}`} // ✅ merge Tailwind classes
    >
      {children}
    </Animated.View>
  );
}