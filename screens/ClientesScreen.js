import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../config/fb';

const ClientesScreen = ({ navigation }) => {
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [vehiculoId, setVehiculoId] = useState('');
  const [modeloVehiculo, setModeloVehiculo] = useState('');

  const handleRegistro = async () => {
    try {
      const cliente = {
        cedula,
        correo,
        nombre,
        telefono,
        vehiculo_id: vehiculoId,
        modelo_vehiculo: modeloVehiculo,
      };
      const docRef = await addDoc(collection(database, 'clientes'), cliente);
      console.log('Cliente registrado con el ID:', cedula);
    } catch (error) {
      console.error('Error al registrar el cliente', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Clientes</Text>
      <TextInput
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        style={styles.input}
      />
      <TextInput
        placeholder="Vehículo ID"
        value={vehiculoId}
        onChangeText={setVehiculoId}
        style={styles.input}
      />
      <TextInput
        placeholder="Modelo del vehículo"
        value={modeloVehiculo}
        onChangeText={setModeloVehiculo}
        style={styles.input}
      />
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

export default ClientesScreen;