import { Pressable, Text, ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;   // ✅ allow inline style overrides
  className?: string;             // ✅ allow Tailwind className
};

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const base = "w-full py-4 rounded-xl flex-row items-center justify-center";

  const variants = {
    primary: { bg: "bg-orange-600", text: "text-white" },
    secondary: { bg: "bg-gray-200", text: "text-gray-800" },
  };

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      onPressIn={() => (scale.value = withSpring(0.97))}
      onPressOut={() => (scale.value = withSpring(1))}
      disabled={isDisabled}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 4,
          },
          style, // ✅ merge inline style overrides
        ]}
        className={`${base} ${variants[variant].bg} ${isDisabled ? "opacity-50" : ""} ${className ?? ""}`}
      >
        {loading && (
          <ActivityIndicator
            size="small"
            color={variant === "primary" ? "#fff" : "#000"}
            className="mr-2"
          />
        )}
        <Text className={`${variants[variant].text} font-semibold text-base`}>
          {loading ? "Signing In..." : title}
        </Text>
      </Animated.View>
    </Pressable>
  );
}