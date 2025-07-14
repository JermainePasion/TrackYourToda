import "../global.css";
import { View } from 'react-native';
import Header from "../components/Header";
import Navbar from "../components/Navbar";


export default function DashboardLayout({ children }) {
  return (
    <View className="flex-1 justify-between bg-white">
      <Header />
      <View className="flex-1">
        {children}
      </View>
      <Navbar />
    </View>
  );
}