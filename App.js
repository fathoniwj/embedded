import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function WebScreen({ navigation }) {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        style={[styles.webview, { marginTop: 0 }]}
        source={{ uri: 'https://travel.rajabiller.com/' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
        }}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="WebView" 
          component={WebScreen}
          options={{
            title: "Rajabiller",
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: 'black',
            headerTitle: () => (
              <Image
                source={require("./assets/images/rajabiller-logo.png")}
                style={{ width: 120, height: 120, resizeMode: 'contain', marginLeft: -16 }}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});
