import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screen/HomeScreen";
import UserScreen from "../screen/UserScreen";
import SplashScreen from "../screen/SplashScreen";

// Creación de navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Definición del Tab Navigator
const MyTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{}} />
      <Tab.Screen name="User" component={UserScreen} options={{}} />
    </Tab.Navigator>
  );
};

// Definición del Stack Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MyTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
