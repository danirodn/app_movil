import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../config/fb';
import Icon from 'react-native-vector-icons/Feather';
import QRCode from 'react-native-qrcode-svg';

const ReparacionesScreen = ({ navigation }) => {
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('');
  const [fecha, setFecha] = useState('');
  const [vehiculoId, setVehiculoId] = useState('');
  const [tipoFormulario, setTipoFormulario] = useState('reparaciones');
  const [documentoId, setDocumentoId] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleRegistro = async () => {
    try {
      const data = {
        descripcion,
        costo,
        fecha,
        vehiculo_id: vehiculoId,
      };
      const docRef = await addDoc(collection(database, tipoFormulario), data);
      setDocumentoId(docRef.id);
      setMostrarModal(true);
      console.log(`${tipoFormulario} registrado con el ID:`, docRef.id);
    } catch (error) {
      console.error(`Error al registrar ${tipoFormulario}`, error);
    }
  };

  const handleNext = () => {
    setTipoFormulario(tipoFormulario === 'reparaciones' ? 'mantenimiento' : 'reparaciones');
    setDescripcion('');
    setCosto('');
    setFecha('');
    setVehiculoId('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registro de {tipoFormulario === 'reparaciones' ? 'Reparaciones' : 'Mantenimiento'}</Text>
        <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} style={styles.input} />
        <TextInput placeholder="Costo" value={costo} onChangeText={setCosto} style={styles.input} />
        <TextInput placeholder="Fecha" value={fecha} onChangeText={setFecha} style={styles.input} />
        <TextInput placeholder="Vehículo ID" value={vehiculoId} onChangeText={setVehiculoId} style={styles.input} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonNext} onPress={handleNext}>
        <Icon name="arrow-right-circle" size={30} color="#fff" />
      </TouchableOpacity>
      <Modal visible={mostrarModal} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <TouchableOpacity onPress={() => setMostrarModal(false)}>
            <Text style={styles.modalCerrar}>Cerrar</Text>
          </TouchableOpacity>
          <QRCode value={documentoId} size={200} />
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
  formContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'skyblue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonNext: {
    backgroundColor: 'skyblue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -(200/2)}, {translateY: -(200/2)}],
  },
  modalCerrar: {
    fontSize: 16,
   fontWeight: 'bold',
    color: 'skyblue',
    marginBottom: 20,
  },
});

export default ReparacionesScreen;