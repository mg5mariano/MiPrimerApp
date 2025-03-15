import React, { useEffect } from 'react';
import { StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/colors';

export default function SplashScreen({ navigation }) {
  const nav = navigation || useNavigation(); 

  useEffect(() => {
    setTimeout(() => {
      nav.replace('MainTabs'); 
    }, 4000);
  }, []);

  return (
    <LinearGradient colors={[colors.variante1, colors.variante3]} style={styles.container}>
      <Text style={styles.text}>Bienvenido</Text>
      <Image source={require("../../assets/Logo_Musica2.png")} style={styles.logo} />
      <ActivityIndicator size="large" color={colors.Exito} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.TextoPrimario,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});
