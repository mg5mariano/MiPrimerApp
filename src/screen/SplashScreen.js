import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen({ navigation }) {
  const nav = navigation || useNavigation(); 
  useEffect(() => {
    setTimeout(() => {
      nav.replace('MainTabs'); 
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido</Text>
      <Image source={require("../../assets/Logo Slyterin1.png")} style={styles.logo} />
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});
