
import DashboardLayout from "../layouts/DashboardLayout";
import { View, Text, Button } from "react-native";

export default function Home({navigation}) {
  return (
    <DashboardLayout>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-2xl font-bebas text-primary">
          This is your Home Page!
        </Text>
        <Button
          title="Select Location"
          onPress={() => navigation.navigate("SelectLocation")}
        />
      </View>
    </DashboardLayout>
  );
}
