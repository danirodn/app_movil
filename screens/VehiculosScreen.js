import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, doc, setDoc } from 'firebase/firestore';
import { database } from '../config/fb';

const VehiculosScreen = ({ navigation }) => {
  const [clienteId, setClienteId] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [vehiculoId, setVehiculoId] = useState('');
  const [year, setYear] = useState('');

  const handleAddVehiculo = async () => {
    try {
      const vehiculo = { cliente_id: clienteId, marca, modelo, year };
      const vehiculoRef = doc(database, 'vehiculos', vehiculoId);
      await setDoc(vehiculoRef, vehiculo);
      console.log('Vehículo registrado con la matrícula:', vehiculoId);
    } catch (error) {
      console.error('Error al registrar el vehículo', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Vehículo</Text>
      <TextInput
        placeholder="ID del cliente"
        value={clienteId}
        onChangeText={(text) => setClienteId(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Marca"
        value={marca}
        onChangeText={(text) => setMarca(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Modelo"
        value={modelo}
        onChangeText={(text) => setModelo(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Matrícula"
        value={vehiculoId}
        onChangeText={(text) => setVehiculoId(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Año"
        value={year}
        onChangeText={(text) => setYear(text)}
        style={styles.input}
      />
      <Button title="Registrar" onPress={handleAddVehiculo} />
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