import * as ImagePicker from 'expo-image-picker';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { auth } from '../../services/firebaseConfig';
import ModalEditProfile from '../components/ModalEditProfile';
import ModalImagePicker from '../components/ModalImagePicker';
import colors from '../constants/colors';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dnjpuudn1/image/upload';
const UPLOAD_PRESET = 'IMAGEDANIEL';

const SettingsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const user = auth.currentUser;

  const handleEdit = (field) => {
    setFieldToEdit(field);
    setInputValue('');
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      if (fieldToEdit === 'Nombre') {
        await updateProfile(user, { displayName: inputValue });
      } else if (fieldToEdit === 'email') {
        await updateEmail(user, inputValue);
      } else if (fieldToEdit === 'password') {
        await updatePassword(user, inputValue);
      }

      showMessage({
        message: 'Datos actualizados correctamente',
        type: 'success',
      });
      setModalVisible(false);
    } catch (error) {
      showMessage({
        message: 'Error al actualizar',
        description: error.message,
        type: 'danger',
      });
    }
  };

  const handleChooseImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
 
      if (status !== 'granted') {
        showMessage({
          message: 'Permiso denegado',
          description: 'Se necesita permiso para acceder a la galería.',
          type: 'danger',
        });
        return;
      }
 
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
 
      if (result.canceled) {
        showMessage({
          message: 'Cancelado',
          description: 'No se seleccionó ninguna imagen.',
          type: 'info',
        });
        return;
      }
 
      setImageUri(result.assets[0].uri);
    } catch (error) {
      console.error('Error seleccionando la imagen:', error);
      showMessage({
        message: 'Error',
        description: 'Ocurrió un error al intentar seleccionar la imagen.',
        type: 'danger',
      });
    }
  };

  const uploadImage = async () => {
    if (!imageUri) return;

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    });
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();

      if (data.secure_url) {
        await updateProfile(user, { photoURL: data.secure_url });
        showMessage({
          message: 'Foto de perfil actualizada',
          type: 'success',
        });
        setImageModalVisible(false);
      }
    } catch (error) {
      console.error('Error al subir imagen:', error);
      showMessage({
        message: 'Error al subir imagen',
        description: error.message,
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <TouchableOpacity onPress={() => setImageModalVisible(true)}>
        <Image
          source={{ uri: user?.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handleEdit('Nombre')}>
        <Text style={styles.optionText}>Editar nombre</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handleEdit('email')}>
        <Text style={styles.optionText}>Editar email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handleEdit('password')}>
        <Text style={styles.optionText}>Cambiar contraseña</Text>
      </TouchableOpacity>

      <ModalEditProfile
        visible={modalVisible}
        title={`Editar ${fieldToEdit}`}
        value={inputValue}
        onChangeText={setInputValue}
        onSave={handleSave}
        onCancel={() => setModalVisible(false)}
      />

      <ModalImagePicker
        visible={imageModalVisible}
        imageUri={imageUri}
        onChooseImage={handleChooseImage}
        onSave={uploadImage}
        onCancel={() => setImageModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 30,
  },
  option: {
    backgroundColor: colors.primary, 
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
