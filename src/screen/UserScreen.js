import { signOut } from 'firebase/auth';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../services/firebaseConfig';
import colors from '../constants/colors';

export default function UserScreen({ navigation }) {
  const handleLogout = () => {
    navigation.replace('Splash', { message: 'Cerrando sesión...' });

    setTimeout(() => {
      signOut(auth)
        .then(() => {
          navigation.replace('Login');
        })
        .catch(error => {
          Alert.alert('Error al cerrar sesión', error.message);
        });
    }, 1500); 
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO-a39UWuPWVx0JJGTribokvt_BoWFHrSN2A&s' }} 
        style={styles.avatar} 
      />
      <Text style={styles.username}>Usuario: mg5mariano</Text>

      <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Volver a Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonEdit} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.buttonText}>Editar perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.FondoOscuro,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.Borde,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.TextoPrimario,
    marginBottom: 30,
  },
  buttonPrimary: {
    backgroundColor: colors.principal,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonEdit: {
    backgroundColor: '#FFA500', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonLogout: {
    backgroundColor: colors.error,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.TextoPrimario,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
