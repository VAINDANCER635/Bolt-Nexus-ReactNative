import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryArea,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";

type TimeRange = "7d" | "1m" | "3m";

const chartData: Record<TimeRange, { x: string; y: number }[]> = {
  "7d": [
    { x: "Mon", y: 12100 }, { x: "Tue", y: 12200 }, { x: "Wed", y: 12150 },
    { x: "Thu", y: 12300 }, { x: "Fri", y: 12450 }, { x: "Sat", y: 12600 }, { x: "Sun", y: 12800 },
  ],
  "1m": [
    { x: "W1", y: 11500 }, { x: "W2", y: 11800 }, { x: "W3", y: 12100 }, { x: "W4", y: 12450 },
  ],
  "3m": [
    { x: "Mar", y: 10500 }, { x: "Apr", y: 11200 }, { x: "May", y: 12450 },
  ],
};

export default function BalanceChart() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("7d");
  const [containerWidth, setContainerWidth] = useState(0);

  const currentData = chartData[selectedRange];

  return (
    <View
      className="bg-white rounded-2xl p-4 shadow-sm"
      onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
    >
      {/* Header + Range Toggle */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-slate-800">Balance</Text>

        <View className="flex-row bg-slate-100 rounded-lg p-1">
          {(["7d", "1m", "3m"] as TimeRange[]).map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setSelectedRange(range)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 6,
                backgroundColor: selectedRange === range ? "white" : "transparent",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: selectedRange === range ? "#ea580c" : "#64748b",
                }}
              >
                {range.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Chart */}
      {containerWidth > 0 && (
        <VictoryChart
          height={220}
          width={containerWidth}
          padding={{ top: 20, bottom: 40, left: 45, right: 45 }}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => `$${datum.y.toLocaleString()}`}
              labelComponent={
                <VictoryTooltip
                  flyoutStyle={{ fill: "white", stroke: "#eb6e25", strokeWidth: 1 }}
                  style={{ fontSize: 12, fill: "#0f172a" }}
                  cornerRadius={6}
                  pointerLength={8}
                />
              }
            />
          }
        >
          <Defs>
            <LinearGradient id="gradientStroke" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#eb7425" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="#eb7425" stopOpacity="0.01" />
            </LinearGradient>
          </Defs>

          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              tickLabels: { fontSize: 10, fill: "#94a3b8" },
            }}
          />

          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `$${(x / 1000).toFixed(0)}k`}
            style={{
              axis: { stroke: "transparent" },
              grid: { stroke: "#f1f5f9", strokeDasharray: "4, 4" },
              tickLabels: { fontSize: 10, fill: "#94a3b8" },
            }}
          />

          <VictoryArea
            key={`area-${selectedRange}`}
            data={currentData}
            interpolation="natural"
            animate={{ duration: 1000, onLoad: { duration: 500 } }}
            style={{ data: { fill: "url(#gradientStroke)" } }}
          />

          <VictoryLine
            key={`line-${selectedRange}`}
            data={currentData}
            interpolation="natural"
            animate={{ duration: 400 }}
            style={{ data: { stroke: "#eb6e25", strokeWidth: 3 } }}
          />
        </VictoryChart>
      )}
    </View>
  );
}