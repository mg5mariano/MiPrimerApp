import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';
import { AuthContext } from '../Context/AuthContext';

export default function SplashScreen({ navigation, route }) {
  const { user } = useContext(AuthContext); 
  const splashMessage = route?.params?.message || 'Bienvenido';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(user ? 'MainTabs' : 'Auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, [user]);

  return (
    <LinearGradient colors={[colors.variante1, colors.variante3]} style={styles.container}>
      <Text style={styles.text}>{splashMessage}</Text>

      <Image
        source={require('../../assets/Logo_Musica2.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <ActivityIndicator size="large" color={colors.Exito} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
