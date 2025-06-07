import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

import EditProfile from '../components/EditProfile';
import { AuthContext } from '../Context/AuthContext';
import AuthStack from '../navigation/AuthStack';
import AlbumScreen from '../screen/AlbumScreen';
import HomeScreen from '../screen/HomeScreen';
import SongScreen from '../screen/SongScreen';
import SplashScreen from '../screen/SplashScreen';
import UserScreen from '../screen/UserScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="User" component={UserScreen} />
  </Tab.Navigator>
);

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />

      {user ? (
        [
          <Stack.Screen key="MainTabs" name="MainTabs" component={Tabs} />,
          <Stack.Screen key="AlbumScreen" name="AlbumScreen" component={AlbumScreen} />,
          <Stack.Screen key="SongScreen" name="SongScreen" component={SongScreen} />,
          <Stack.Screen
  key="EditProfile"
  name="EditProfile"
  component={EditProfile}
  options={{ headerShown: true, title: 'Editar perfil' }}
/>
        ]
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
