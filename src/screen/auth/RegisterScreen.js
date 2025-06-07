import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../../../services/firebaseConfig";
import colors from "../../constants/colors";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      console.log("Usuario registrado:", userCredential.user);

    } catch (error) {
      console.error("Error al registrarse:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Icon name="account" size={50} color={colors.Hover} style={{ marginBottom: 20 }} />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor={colors.TextoInactivo}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor={colors.TextoInactivo}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor={colors.TextoInactivo}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.FondoOscuro,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.TextoPrimario,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.Borde,
    borderRadius: 8,
    backgroundColor: colors.FondoClaro,
    color: colors.variante1,
  },
  button: {
    backgroundColor: colors.Hover,
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    shadowColor: colors.Sombra,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: colors.TextoPrimario,
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    marginTop: 15,
    color: colors.TextoSecundario,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
