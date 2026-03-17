// components/ui/card-container.tsx
import { View, ViewProps } from "react-native";

export default function CardContainer({ children, style, ...props }: ViewProps) {
  return (
    <View
      className="bg-white rounded-2xl p-4"
      style={[
        {
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
          elevation: 6,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}