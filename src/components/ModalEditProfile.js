import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';

const ModalEditProfile = ({ visible, title, value, onChangeText, onSave, onCancel }) => (
  <Modal visible={visible} animationType="fade" transparent>
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>{title || 'Editar campo'}</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe aquí..."
          placeholderTextColor={colors.TextoInactivo}
          value={value}
          onChangeText={onChangeText}
        />

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

export default ModalEditProfile;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
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
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.variante2,
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.Borde,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: colors.variante2,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: colors.principal,
    padding: 12,
    borderRadius: 10,
    marginRight: 6,
    alignItems: 'center',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: colors.Borde,
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
