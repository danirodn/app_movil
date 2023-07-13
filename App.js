import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from './config/fb';
import { collection, doc, setDoc } from 'firebase/firestore';
import { database } from './config/fb';
import Navigation from './Navigation';

import PantallaCliente from './PantallaCliente'; // Importar el nuevo componente usuario CLIENTE

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cedula, setCedula] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState(1);
  const [registrationComplete, setRegistrationComplete] = useState(false); // Nuevo estado

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('Error de inicio de sesión:', error);
      // Puedes mostrar un mensaje de error al usuario si el inicio de sesión falla.
    }
  }

  async function handleRegister() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const usuariosRef = collection(database, 'usuarios');
      const cedulaDoc = doc(usuariosRef, cedula);
      await setDoc(cedulaDoc, {
        nombre: name,
        apellido: lastName,
        cedula: cedula,
        telefono: phone,
        email: email,
        tipo_usuario: tipoUsuario,
      });

      setTipoUsuario(1); // Actualizar el estado de tipo_usuario
      setRegistrationComplete(true); // Nuevo estado establecido

      setIsLoggedIn(false); // Desactivar el inicio de sesión automático después del registro

    } catch (error) {
      console.log('Error de registro:', error);
      // Puedes mostrar un mensaje de error al usuario si el registro falla.
    }
  }

  // Agregar la siguiente comprobación para redirigir a la pantalla de inicio de sesión
  // después de que se haya completado el registro.
  if (registrationComplete) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Registro completado!</Text>
        <Button title="Volver al inicio" onPress={() => {
          setRegistrationComplete(false);
          setIsRegistering(false);
        }} />
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{isRegistering ? 'Registro' : 'Login'}</Text>
        {isRegistering && (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Cédula"
                value={cedula}
                onChangeText={(text) => setCedula(text)}
              />
            </View>
          </>
        )}
        {!isRegistering && (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Correo"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
            </View>
          </>
        )}
        {isRegistering ? (
          <Button title="Registrarse" onPress={handleRegister} />
        ) : (
          <Button title="Iniciar sesión" onPress={handleLogin} />
        )}
        <Text>  </Text>
        {!isRegistering && (
          <Button
            title="Registro"
            onPress={() => setIsRegistering(true)}
            style={styles.registerButton}
          />
        )}
      </View>
    );
  }

  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    marginTop: 10,
  },
});
