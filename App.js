import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import { registerForPushNotificationsAsync } from './services/NotificationService';

import { AuthProvider } from './src/Context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    const setupNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      console.log('Token de notificación:', token);

      const subscription = Notifications.addNotificationReceivedListener(notification => {
        console.log('Notificación recibida:', notification);
      });

      return () => subscription.remove();
    };

    setupNotifications();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
        <FlashMessage position="top" />
      </NavigationContainer>
    </AuthProvider>
  );
}
