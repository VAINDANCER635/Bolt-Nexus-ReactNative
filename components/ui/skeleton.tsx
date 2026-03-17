import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function Skeleton({ height = 20 }) {
  const opacity = useSharedValue(0.3);

  opacity.value = withRepeat(
    withTiming(1, { duration: 800 }),
    -1,
    true
  );

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          height,
          borderRadius: 8,
          backgroundColor: "#E5E7EB",
        },
      ]}
    />
  );
}
