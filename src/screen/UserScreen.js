import { signOut } from 'firebase/auth';
import React from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../services/firebaseConfig';

export default function UserScreen({ navigation }) {
  
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => {
        Alert.alert('Error al cerrar sesión', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/100' }} 
        style={styles.avatar} 
      />
      <Text style={styles.username}>Usuario: mg5mariano</Text>
      
      <Button 
        title="Volver a Home" 
        onPress={() => navigation.navigate('Home')} 
        color="#007bff"
      />

      <View style={{ marginTop: 20 }}>
        <Button 
          title="Cerrar sesión" 
          onPress={handleLogout} 
          color="#dc3545"
        />
      </View>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
});
