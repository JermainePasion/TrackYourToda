import "../global.css";
import { View } from "react-native";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";

export default function DashboardLayout({ children }) {
  const { theme } = useTheme(); // ✅ Use theme
  const isDark = theme === 'dark'; // ✅ Same logic as Settings

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />
      <View className="flex-1">
        {children}
      </View>
    </View>
  );
}
