import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';

const EditModal = ({ visible, title, value, onChangeText, onSave, onCancel, onBack }) => (
  <Modal visible={visible} animationType="slide" transparent onRequestClose={onCancel}>
    <View style={styles.overlay}>
      <View style={styles.card}>

        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder={`Nuevo ${title.toLowerCase()}`}
          placeholderTextColor={colors.TextoInactivo}
          value={value}
          onChangeText={onChangeText}
          autoFocus
        />

        <View style={styles.row}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.btnTxt}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
            <Text style={styles.btnTxt}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default EditModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: colors.FondoClaro,
    borderRadius: 14,
    padding: 24,
    shadowColor: colors.Sombra,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backBtn: {
    marginRight: 15,
  },
  backArrow: {
    fontSize: 28,
    color: colors.principal,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.variante2,
    flex: 1,
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
  cancelBtn: {
    flex: 1,
    backgroundColor: colors.error,
    padding: 12,
    borderRadius: 10,
    marginRight: 6,
    alignItems: 'center',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: colors.Exito,
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
