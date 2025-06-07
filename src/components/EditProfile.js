import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import { AuthContext } from '../Context/AuthContext';
import EditModal from './EditModal';
import ModalEditProfile from './ModalEditProfile';
import ModalImagePicker from './ModalImagePicker';

const EditProfile = () => {
  const navigation = useNavigation();
  const { user, updateUserProfile } = useContext(AuthContext);
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [imageUri, setImageUri] = useState(user?.profileImage || null);

  const [showNameModal, setShowNameModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleSave = () => {
    console.log('Guardar cambios pulsado');
    if (!name || !email) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    updateUserProfile({ name, email, profileImage: imageUri });

    Alert.alert(
      'Éxito',
      'Perfil actualizado correctamente',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('UserScreen'),
        },
      ],
      { cancelable: false }
    );
  };

  const handleChooseImage = () => {
    const dummyUri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO-a39UWuPWVx0JJGTribokvt_BoWFHrSN2A&s';
    setImageUri(dummyUri);
  };

  const handleSaveImage = () => {
    setShowImageModal(false);
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('UserScreen')}
      >
        <Ionicons name="arrow-back" size={24} color={colors.principal} />
      </TouchableOpacity>

      <Text style={styles.title}>Editar Perfil</Text>

      <TouchableOpacity onPress={() => setShowImageModal(true)} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={{ color: colors.TextoInactivo }}>Seleccionar Imagen</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Nombre</Text>
      <TouchableOpacity style={styles.inputButton} onPress={() => setShowNameModal(true)}>
        <Text style={styles.inputText}>{name || 'Editar nombre'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Correo electrónico</Text>
      <TouchableOpacity style={styles.inputButton} onPress={() => setShowEmailModal(true)}>
        <Text style={styles.inputText}>{email || 'Editar correo'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>

      <EditModal
        visible={showNameModal}
        title="Nombre"
        value={name}
        onChangeText={setName}
        onSave={() => setShowNameModal(false)}
        onCancel={() => setShowNameModal(false)}
        onBack={() => {
          setShowNameModal(false);
          navigation.navigate('UserScreen');
        }}
      />

      <ModalEditProfile
        visible={showEmailModal}
        title="Correo"
        value={email}
        onChangeText={setEmail}
        onSave={() => setShowEmailModal(false)}
        onCancel={() => setShowEmailModal(false)}
      />

      <ModalImagePicker
        visible={showImageModal}
        imageUri={imageUri}
        onChooseImage={handleChooseImage}
        onSave={handleSaveImage}
        onCancel={() => setShowImageModal(false)}
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.FondoClaro,
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.principal,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    color: colors.variante1,
  },
  inputButton: {
    borderWidth: 1,
    borderColor: colors.Borde,
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  inputText: {
    fontSize: 16,
    color: colors.variante1,
  },
  button: {
    backgroundColor: colors.principal,
    padding: 15,
    marginTop: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.TextoPrimario,
    fontSize: 16,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.Deshabilitado,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
