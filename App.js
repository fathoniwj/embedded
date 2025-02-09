import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function WebScreen({ navigation }) {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  return (
    <View style={{ flex: 6 }}>
      <WebView
        ref={webViewRef}
        style={[styles.webview, { marginTop: 0 }]}
        source={{ uri: 'https://travel.rajabiller.com/' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack); // Cek apakah bisa kembali ke halaman sebelumnya
        }}
      />

      {/* Tombol Back Navbar */}
      {/* {canGoBack && (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => webViewRef.current.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )} */}
    </View>
  );
}

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="WebView" 
        component={WebScreen}
        options={({ navigation }) => ({
          title: "Rajabiller",
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: 'black',
          headerTitle: () => (
            <Image
              source={require("./assets/images/rajabiller-logo.png")}
              style={{ width: 120, height: 120, resizeMode: 'contain', marginLeft:-16 }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
  backButton: {
    position: "absolute",
    top: -50,
    zIndex:50,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 20,
  },
});
