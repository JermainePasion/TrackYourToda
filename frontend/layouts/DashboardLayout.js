import "../global.css";
import { View } from 'react-native';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
export default function DashboardLayout({ children }) {
  return (
    <View className="flex-1 bg-[#f0f0f0]">
      <Header />
      <View className="flex-1 px-4">
        {children}
      </View>
      <Navbar />
    </View>
  );
}