import "../global.css";
import React from 'react';
import { Text, View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

export default function Header() {
  return (
    <View style={{ width: '100%', alignItems: 'center', marginVertical: 30 }}>
      <MaskedView
        style={{ height: 60, width: 300 }}
        maskElement={
          <Text
            className="text-5xl text-center tracking-widest"
            style={{
              fontFamily: 'BebasNeue_400Regular',
              color: 'black',
            }}
          >
            TRACK YOUR TODA
          </Text>
        }
      >
        <LinearGradient
          colors={['#ea2f14', '#fb9e3a', '#fb9e3a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </MaskedView>
    </View>
  );
}
