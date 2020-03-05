import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import "react-native-gesture-handler";
import CameraScreen from "./containers/CameraScreen";
import ProductsScreen from "./containers/ProductsScreen";
import ProductScreen from "./containers/ProductScreen";
import SplashScreen from "./containers/SplashScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <NavigationNativeContainer>
      <Stack.Navigator headerMode="none">
        {isLoading ? (
          <Stack.Screen options={{ header: () => null }} name="Splash">
            {() => <SplashScreen setIsLoading={setIsLoading} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="tab"
            options={{
              headerStyle: { backgroundColor: "#57BA6E" },
              headerBackTitleStyle: { color: "white" },
              headerTintColor: "white",
              title: ""
            }}
          >
            {() => (
              <Tab.Navigator
                option={{
                  headerMode: "none"
                }}
                screenOptions={({ route }) => {
                  return {
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      if (route.name === "favoris") {
                        iconName = "cards-heart";
                      } else if (route.name === "Camera") {
                        iconName = "barcode-scan";
                      } else {
                        iconName = "carrot";
                      }
                      return (
                        <MaterialCommunityIcons
                          name={iconName}
                          size={25}
                          color={color}
                        />
                      );
                    },
                    title: route.name === "undefined" ? "Products" : route.name
                  };
                }}
                tabBarOptions={{
                  showLabel: "false", // Pas d'impact à voir
                  showIcon: "true",
                  activeTintColor: "white",
                  inactiveTintColor: "gray",
                  tabStyle: {
                    marginTop: 45,
                    height: 70,
                    backgroundColor: "#5DCD71"
                  },
                  iconStyle: {
                    marginTop: 10
                  },
                  labelStyle: {
                    fontSize: 0.1
                  },
                  indicatorStyle: {
                    backgroundColor: "white",
                    height: 3
                  },
                  style: {
                    backgroundColor: "#5DCD71"
                  }
                }}
              >
                <Tab.Screen name="carotte">
                  {() => (
                    <Stack.Navigator headerMode="none">
                      <Stack.Screen
                        name="Products"
                        options={{ header: () => null }}
                      >
                        {() => <ProductsScreen />}
                      </Stack.Screen>
                      <Stack.Screen name="Product">
                        {() => <ProductScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Camera"
                        options={{ header: () => null }}
                      >
                        {() => <CameraScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="favoris">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Favoris"
                        options={{ header: () => null }}
                      >
                        {() => <FavoritesScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Product"
                        options={{ header: () => null }}
                      >
                        {() => <ProductScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}

// const styles = StyleSheet.carot({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

{
  /* <Stack.Screen name="deux">
          {() => {
            <SplashScreen />;
          }}
        </Stack.Screen> */
}
