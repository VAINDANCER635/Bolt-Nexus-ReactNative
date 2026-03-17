import { Text, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  rightSlot,
}: Props) {
  return (
    <View className="mb-6 flex-row items-start justify-between">
      <View>
        <Text className="text-3xl font-bold tracking-tight dark:text-white">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-gray-500 dark:text-gray-300 mt-1">
            {subtitle}
          </Text>
        )}
        {/* 🔶 Orange accent dash */}
        <View className="mt-2 h-1 w-12 bg-orange-500 rounded-full" />
      </View>
      {rightSlot}
    </View>
  );
}