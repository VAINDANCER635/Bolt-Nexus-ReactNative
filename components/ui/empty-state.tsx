import { Text, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
};

export default function EmptyState({ title, subtitle }: Props) {
  return (
    <View className="items-center py-12">
      <Text className="text-gray-800 font-semibold text-lg">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-gray-500 text-sm mt-2 text-center">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
