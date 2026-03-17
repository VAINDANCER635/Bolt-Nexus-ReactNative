import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const AVATARS = [
  { id: '1', label: 'Default', icon: 'person' },
  { id: '2', label: 'Cyborg', icon: 'hardware-chip' },
  { id: '3', label: 'Global', icon: 'globe' },
  { id: '4', label: 'Security', icon: 'shield' },
];

export default function IdentityScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black px-8">
      <View className="pt-4 flex-row justify-between items-center mb-10">
        <TouchableOpacity onPress={() => router.back()} className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center border border-white/5">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-black uppercase tracking-widest text-[10px]">Identity Protocol</Text>
        <View className="w-12" />
      </View>

      <Text className="text-white text-3xl font-black tracking-tight mb-2">Choose Persona</Text>
      <Text className="text-slate-500 font-bold mb-10">Select an avatar for your Nexus Node.</Text>

      <View className="flex-row flex-wrap gap-4 justify-between">
        {AVATARS.map((avatar) => (
          <TouchableOpacity 
            key={avatar.id}
            className="w-[47%] h-40 bg-slate-900/50 border border-white/10 rounded-[40px] items-center justify-center"
          >
            <View className="w-16 h-16 bg-white/5 rounded-full items-center justify-center mb-3">
               <Ionicons name={avatar.icon as any} size={30} color="white" />
            </View>
            <Text className="text-white font-bold">{avatar.label}</Text>
          </TouchableOpacity>
        ))}
        
        {/* Upload Button */}
        <TouchableOpacity className="w-full h-20 mt-4 border-2 border-dashed border-white/10 rounded-[30px] items-center justify-center flex-row">
          <Ionicons name="cloud-upload-outline" size={20} color="#475569" />
          <Text className="text-slate-500 font-black ml-3 uppercase text-xs tracking-widest">Upload Custom Asset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}