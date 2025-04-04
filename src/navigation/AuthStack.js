import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/auth/LoginScreen";
import RegisterScreen from "../screen/auth/RegisterScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "Iniciar Sesión" }} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: "Registro" }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
