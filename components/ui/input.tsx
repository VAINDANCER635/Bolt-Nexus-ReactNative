import React, { useState } from "react";
import { TextInput, View, Text, TextInputProps } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerClassName?: string; // Allow external style injection
};

export default function Input({
  label,
  error,
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  containerClassName,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className={`w-full ${containerClassName}`}>
      {label && (
        <Text className="mb-2 text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">
          {label}
        </Text>
      )}

      <TextInput
        {...props}
        // Removed heavy padding/borders so it can sit inside icon wrappers cleanly
        className={`text-base text-white font-bold py-3 ${
          error ? "text-red-400" : ""
        }`}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#475569" // Matches our slate-600 theme
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        cursorColor="#10b981" // Emerald cursor for that premium touch
      />

      {error && (
        <Animated.Text 
          entering={FadeIn}
          className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase"
        >
          {error}
        </Animated.Text>
      )}
    </View>
  );
}