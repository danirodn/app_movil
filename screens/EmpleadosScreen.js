import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../config/fb';

const SignupScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [sueldo, setSueldo] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSignup = async () => {
    try {
      const empleado = { nombre, cargo, cedula, correo, direccion, sueldo, telefono };
      const docRef = await addDoc(collection(database, 'empleados'), empleado);
      console.log('Empleado registrado con el ID:', docRef.id);
    } catch (error) {
      console.error('Error al registrar el empleado', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
        style={styles.input}
      />
      <Picker
        selectedValue={cargo}
        onValueChange={(itemValue, itemIndex) => setCargo(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Mecánico" value="Mecánico" />
        <Picker.Item label="Gerente" value="Gerente" />
        <Picker.Item label="Vendedor" value="Vendedor" />
      </Picker>
      <TextInput
        placeholder="Cédula"
        value={cedula}
        onChangeText={(text) => setCedula(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={(text) => setCorreo(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Dirección"
        value={direccion}
        onChangeText={(text) => setDireccion(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Sueldo"
        value={sueldo}
        onChangeText={(text) => setSueldo(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={(text) => setTelefono(text)}
        style={styles.input}
      />
      <Button title="Registrar" onPress={handleSignup} />
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

export default SignupScreen;