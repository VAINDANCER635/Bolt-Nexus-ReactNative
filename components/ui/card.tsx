import { View } from "react-native";
import { cn } from "@/lib/cn";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={cn(
        "bg-white dark:bg-gray-900 rounded-2xl p-4 mb-4",
        className
      )}
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
      }}
    >
      {children}
    </View>
  );
}
