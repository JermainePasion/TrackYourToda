
import "../global.css";
import { View, Text } from 'react-native';

export default function Navbar() {
  return (
    <View className="flex-row justify-around py-4 bg-[#ffffff] border-t border-gray-300" style={{ marginBottom: 20}}>
      <Text className="text-gray-700 font-bebas text-lg">Home</Text>
      <Text className="text-gray-700 font-bebas text-lg">History</Text>
      <Text className="text-gray-700 font-bebas text-lg">Matrix</Text>
      <Text className="text-gray-700 font-bebas text-lg">Settings</Text>
    </View>
  );
}
