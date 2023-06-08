import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { database } from '../config/fb';

const ClientesScreen = ({ navigation }) => {
  const [clienteId, setClienteId] = useState('');
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  

  const handleRegistro = async () => {
    try {
      const clienteRef = doc(database, 'clientes', clienteId);
      const clienteDoc = await getDoc(clienteRef);
      if (clienteDoc.exists()) {
        Alert.alert('Error', 'El ID del cliente ya está en uso');
        return;
      }
      const cliente = {
        id: clienteId,
        correo,
        nombre,
        telefono,
      };
      await setDoc(clienteRef, cliente);
      console.log('Cliente registrado con el ID:', clienteId);
      Alert.alert('Registro exitoso', `Cliente registrado con el ID: ${clienteId}`);
    } catch (error) {
      console.error('Error al registrar el cliente', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Clientes</Text>
      <TextInput
        placeholder="ID del cliente"
        value={clienteId}
        onChangeText={setClienteId}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Número de teléfono"
        value={telefono}
        onChangeText={setTelefono}
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