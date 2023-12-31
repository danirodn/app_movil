import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { database } from '../config/fb';

const SignupScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [sueldo, setSueldo] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSignup = async () => {
    try {
      const empleado = { id, nombre, cargo, correo, direccion, sueldo, telefono };
      const empleadoRef = doc(database, 'empleados', id);
      await setDoc(empleadoRef, empleado);
      console.log('Empleado registrado con el ID:', id);
      alert(`Nuevo empleado creado con ID: ${id}`);
    } catch (error) {
      console.error('Error al registrar el empleado', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        placeholder="Cédula"
        value={id}
        onChangeText={(text) => setId(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
        style={styles.input}
      />
      <Picker
  selectedValue={cargo}
  onValueChange={(itemValue, itemIndex) => setCargo(itemValue)}
  style={[styles.input, styles.picker]} // aplicando ambos estilos al componente
>
  <Picker.Item label="Mecánico" value="Mecánico" />
  <Picker.Item label="Gerente" value="Gerente" />
  <Picker.Item label="Vendedor" value="Vendedor" />
</Picker>
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
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    borderWidth: 2, // ancho del borde
    borderColor: 'black', // color del borde
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default SignupScreen;