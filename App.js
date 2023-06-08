import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Navigation from './Navigation';



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    // Aquí puedes verificar las credenciales del usuario
    if (username === 'usuario' && password === 'contraseña') {
      setIsLoggedIn(true);
    }
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={(text) => setUsername(text)} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
        </View>
        <Button title="Login" onPress={handleLogin} />
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
});