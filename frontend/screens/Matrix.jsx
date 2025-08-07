import "../global.css";
import React, { useState } from "react";
import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import DashboardLayout from "../layouts/DashboardLayout";
import { useTheme } from "../contexts/ThemeContext";

const images = [
  {
    url: '',
    props: {
      source: require("../assets/fareMatrix.png"),
    },
  },
];

export default function Matrix() {
  const [visible, setVisible] = useState(false);
  const toggleZoom = () => setVisible(!visible);
  const { theme } = useTheme();
  const isDark = theme === 'dark'; 

  return (
    <DashboardLayout>
      <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>


        {/* Tap to zoom image */}
        <TouchableOpacity onPress={toggleZoom}>
          <Image
            source={require("../assets/fareMatrix.png")}
            style={{
              width: 400,
              height: 500,
              alignSelf: "center",
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>

        {/* Fullscreen zoomable modal */}
        <Modal visible={visible} transparent={true}>
          <ImageViewer
            imageUrls={images}
            enableSwipeDown
            onSwipeDown={toggleZoom}
            onClick={toggleZoom} // tap to close
          />
        </Modal>
      </View>
    </DashboardLayout>
  );
}
