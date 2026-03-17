import { View, Text } from "react-native";

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mt-8 px-4">
      <Text className="text-lg font-semibold mb-4">
        {title}
      </Text>
      {children}
    </View>
  );
}
