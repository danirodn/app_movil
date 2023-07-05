import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../config/fb';

const ReparacionesScreen = ({ navigation }) => {
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('');
  const [fecha, setFecha] = useState('');
  const [vehiculoId, setVehiculoId] = useState('');

  const handleRegistro = async () => {
    try {
      const reparacion = {
        descripcion,
        costo,
        fecha,
        vehiculo_id: vehiculoId,
      };
      const docRef = await addDoc(collection(database, 'reparaciones'), reparacion);
      console.log('Reparación registrada con el ID:', docRef.id);
    } catch (error) {
      console.error('Error al registrar la reparación', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Reparaciones</Text>
      <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} style={styles.input} />
      <TextInput placeholder="Costo" value={costo} onChangeText={setCosto} style={styles.input} />
      <TextInput placeholder="Fecha" value={fecha} onChangeText={setFecha} style={styles.input} />
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

export default ReparacionesScreen;