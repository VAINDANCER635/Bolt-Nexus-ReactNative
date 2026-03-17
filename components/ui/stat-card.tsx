import { Text, View, Pressable } from "react-native";
import Animated, {
  FadeInRight, // Changed to Right for a smoother horizontal entrance
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

type Props = {
  title: string;
  value: string;
  index?: number;
};

export default function StatCard({ title, value, index = 0 }: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    // Removed w-[48%] to allow the card to size based on content/container
    <Animated.View
      entering={FadeInRight.delay(index * 100).springify()}
      className="min-w-[150px] mr-4" 
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            animatedStyle,
            {
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 8 },
              elevation: 8,
            },
          ]}
          // Increased rounding to 3xl and added a subtle border for depth
          className="bg-white dark:bg-slate-900 rounded-[28px] p-5 border border-slate-100 dark:border-slate-800"
        >
          {/* Futuristic Detail: Small indicator accent */}
          <View className="flex-row justify-between items-start mb-2">
             <Text className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
              {title}
            </Text>
            <View className="w-1.5 h-1.5 rounded-full bg-orange-500/40" />
          </View>

          <Text 
            numberOfLines={1} 
            adjustsFontSizeToFit // Prevents the text from breaking layout
            className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white"
          >
            {value}
          </Text>
          
          {/* Visual fluff for premium feel */}
          <View className="mt-2 h-[2px] w-8 bg-orange-500/20 rounded-full" />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}