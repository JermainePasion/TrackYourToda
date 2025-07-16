import "../global.css";
import { View } from "react-native";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  return (
    <View className="flex-1 bg-white">
      <Header />
      <View className="flex-1">
        {children}
      </View>
    </View>
  );
}