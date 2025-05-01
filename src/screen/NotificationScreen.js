import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import NotificationService from '../../services/NotificationService';
import colors from '../constants/colors';

const NotificationScreen = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const askPermission = async () => {
      const granted = await NotificationService.requestPermissionsAsync();
      if (!granted) {
        alert('Permiso para notificaciones no concedido.');
      }
    };

    askPermission();

    const subscription = NotificationService.listenForNotifications((notification) => {
      setNotification(notification);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleSendNotification = async () => {
    await NotificationService.scheduleNotificationAsync(
      '¡Hola!',
      'Esta es una notificación local de prueba 🚀'
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>

      <Button title="Enviar Notificación" onPress={handleSendNotification} />

      {notification && (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle}>
            {notification.request.content.title}
          </Text>
          <Text>{notification.request.content.body}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: colors.grayLight,
    borderRadius: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
