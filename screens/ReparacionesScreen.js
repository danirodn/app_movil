import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { database } from '../config/fb';
import QRCode from 'react-native-qrcode-svg';

const ReparacionesScreen = ({ navigation }) => {
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('');
  const [vehiculoId, setVehiculoId] = useState('');
  const [qrVisible, setQrVisible] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const [fecha, setFecha] = useState(new Date().toLocaleDateString()); // Agrega el campo de fecha

  const handleRegistro = async () => {
    try {
      const reparacion = {
        descripcion,
        costo,
        vehiculoId,
        fechaReparacion: serverTimestamp(),
      };
      const docRef = await addDoc(collection(database, 'reparaciones'), reparacion);
      console.log('Reparación registrada con el ID:', docRef.id);
      setQrValue(docRef.id);
      setQrVisible(true);
      setFecha(new Date().toLocaleDateString()); // Actualiza la fecha al momento del registro
    } catch (error) {
      console.error('Error al registrar la reparación', error);
    }
  };

  const handleCloseQrModal = () => {
    setQrVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Reparaciones</Text>
      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.input}
      />
      <TextInput
        placeholder="Costo"
        value={costo}
        onChangeText={setCosto}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Vehículo ID"
        value={vehiculoId}
        onChangeText={setVehiculoId}
        style={styles.input}
      />
      <TextInput
        placeholder="Fecha"
        value={fecha}
        onChangeText={setFecha}
        style={styles.input}
        editable={false} // Deshabilita la edición del campo
      />
      <Button title="Registrar" onPress={handleRegistro} />
      <Modal visible={qrVisible} animationType="slide">
        <View style={styles.qrModalContainer}>
          <Text style={styles.qrTitle}>Código QR de la reparación</Text>
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={qrValue}
              size={200} // Aumenta el tamaño a 200
            />
          </View>
          <Button title="Cerrar" onPress={handleCloseQrModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  qrModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrCodeContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default ReparacionesScreen;