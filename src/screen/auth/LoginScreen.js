import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../../../services/firebaseConfig";
import colors from "../../constants/colors";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("mariano@correo.com");
  const [password, setPassword] = useState("marianoarley");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa correo y contraseña");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario inició sesión");
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      Alert.alert("Error al iniciar sesión", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Icon name="account-circle" size={50} color={colors.Hover} style={{ marginBottom: 20 }} />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor={colors.TextoInactivo}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor={colors.TextoInactivo}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Ingresando..." : "Ingresar"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
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

export default LoginScreen;
