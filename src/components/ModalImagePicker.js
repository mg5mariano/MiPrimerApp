import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';

const ModalImagePicker = ({ visible, onChooseImage, onSave, onCancel, imageUri }) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Editar foto de perfil</Text>

        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.preview} />
        ) : (
          <View style={styles.previewPlaceholder}>
            <Text style={{ color: colors.TextoInactivo }}>Sin imagen</Text>
          </View>
        )}

        <TouchableOpacity style={styles.chooseBtn} onPress={onChooseImage}>
          <Text style={styles.btnTxt}>Elegir Imagen</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
            <Text style={styles.btnTxt}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.btnTxt}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default ModalImagePicker;

const AVATAR_SIZE = 130;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: colors.FondoClaro,
    borderRadius: 14,
    padding: 24,
    shadowColor: colors.Sombra,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.variante2,
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  preview: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginVertical: 15,
  },
  previewPlaceholder: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.variante5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  chooseBtn: {
    backgroundColor: colors.Hover,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: colors.Exito,
    padding: 12,
    borderRadius: 10,
    marginRight: 6,
    alignItems: 'center',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: colors.error,
    padding: 12,
    borderRadius: 10,
    marginLeft: 6,
    alignItems: 'center',
  },
  btnTxt: {
    color: colors.TextoPrimario,
    fontWeight: 'bold',
  },
});
