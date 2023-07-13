import { setDoc, doc } from 'firebase/firestore';
import { database } from '../config/fb';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

const VehiculosScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [year, setYear] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [marca, setMarca] = useState('');
  const [vehiculoId, setVehiculoId] = useState('');

  const handleRegistro = async () => {
    try {
      const reparacion = {
        nombre,
        marca,
        year,
        clienteId,
        vehiculo_id: vehiculoId,
      };
      const vehiculoDocRef = doc(database, 'vehiculos', vehiculoId);
      await setDoc(vehiculoDocRef, reparacion);
      console.log('Reparación registrada con el ID:', vehiculoId);
      Alert.alert('Reparación registrada', `Reparación registrada con el ID: ${vehiculoId}`);
    } catch (error) {
      console.error('Error al registrar la reparación', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Vehículos</Text>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Marca" value={marca} onChangeText={setMarca} style={styles.input} />
      <TextInput placeholder="Año" value={year} onChangeText={setYear} style={styles.input} />
      <TextInput placeholder="Cedula cliente" value={clienteId} onChangeText={setClienteId} style={styles.input} />
      <TextInput placeholder="Vehículo ID" value={vehiculoId} onChangeText={setVehiculoId} style={styles.input} />
      <Button title="Registrar" onPress={handleRegistro} />
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
});

export default VehiculosScreen;