import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Bienvenido a Inicio</Text>
      <Button 
        title="Ir a Usuario" 
        onPress={() => navigation.navigate('User')} 
        color="#007bff"
      />
    </SafeAreaView>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
});

