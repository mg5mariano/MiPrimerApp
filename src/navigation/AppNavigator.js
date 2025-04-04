import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "../../src/Context/AuthContext";
import HomeScreen from "../screen/HomeScreen";
import UserScreen from "../screen/UserScreen";
import SplashScreen from "../screen/SplashScreen";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();

const MyTabNavigator = createBottomTabNavigator();

const Tabs = () => (
  <MyTabNavigator.Navigator>
    <MyTabNavigator.Screen name="Home" component={HomeScreen} />
    <MyTabNavigator.Screen name="User" component={UserScreen} />
  </MyTabNavigator.Navigator>
);

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user === null ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="MainTabs" component={Tabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
