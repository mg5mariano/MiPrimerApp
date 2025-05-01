import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

import AuthContext from "../Context/AuthContext";
import AuthStack from "../navigation/AuthStack";
import HomeScreen from "../screen/HomeScreen";
import UserScreen from "../screen/UserScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegación por pestañas (después de login)
const Tabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="User" component={UserScreen} />
  </Tab.Navigator>
);

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  // Puedes incluir un splash o una validación extra si deseas
  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainTabs" component={Tabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
