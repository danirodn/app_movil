import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { database } from '../config/fb';
import Icon from 'react-native-vector-icons/FontAwesome';

const ConsultaScreen = ({ navigation }) => {
  const [datos, setDatos] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const obtenerDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'clientes'));
      const datosObtenidos = [];
      querySnapshot.forEach((doc) => {
        datosObtenidos.push({ idCliente: doc.id, ...doc.data() });
      });
      setDatos(datosObtenidos);
      setFilteredClientes(datosObtenidos.map((cliente) => cliente.idCliente)); // almacenar solo los IDs
    } catch (error) {
      console.error('Error al obtener los datos', error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Consultar Clientes',
    });
  }, [navigation]);

  function handleSearch(searchValue) {
    setSearchValue(searchValue);
    const filteredClientes = datos.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
      cliente.correo.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredClientes(filteredClientes.map((cliente) => cliente.idCliente)); // almacenar solo los IDs
  }

  function handleSearchByCorreo() {
    const filteredClientes = datos.filter((cliente) =>
      cliente.correo.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredClientes(filteredClientes.map((cliente) => cliente.idCliente)); // almacenar solo los IDs
  }

  async function handleDelete(id) {
    try {
      await deleteDoc(collection(database, 'clientes', clienteId));

      const datosFiltrados = datos.filter((cliente) => cliente.idCliente !== id);
      setDatos(datosFiltrados);
      setFilteredClientes(datosFiltrados.map((cliente) => cliente.idCliente)); // actualizar solo los IDs
    } catch (error) {
      console.error('Error al eliminar el cliente', error);
    }
  }

  // función auxiliar para obtener el objeto de cliente correspondiente a un ID
  function getClienteById(id) {
    return datos.find((cliente) => cliente.idCliente === id) || null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}></Text>
      <TextInput
        placeholder="Nombre/Correo"
        placeholderTextColor="#aaa"
        value={searchValue}
        onChangeText={(text) => handleSearch(text)}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Buscar" onPress={handleSearchByCorreo} containerStyle={styles.button}/>
      </View>
      {filteredClientes.map((clienteId, index) => {
        const cliente = getClienteById(clienteId);
        if (!cliente) {
          return null; // Saltear el cliente si no se encuentra
        }
        return (
          <View key={index} style={styles.item}>
            <Text style={[styles.nombre, { marginRight: 5 }]}>{cliente.nombre}</Text>
            <Text style={styles.correo}>Correo: {cliente.correo}</Text>
            <Text style={styles.telefono}>Teléfono: {cliente.telefono}</Text>
            <Text style={styles.vehiculo}>Vehículo: {cliente.vehiculo}</Text>
            <Text style={styles.vehiculo}>Cedula: {cliente.cedula}</Text>
            
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => handleDelete(cliente.idCliente)} style={[styles.buttonSmall, { marginRight: 5 }]}>
                <Icon name="trash" size={15} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEdit(cliente.idCliente)} style={styles.buttonSmall}>
                <Icon name="edit" size={15} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      <View style={{ height: 200 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 22,
  },
  input: {
    backgroundColor: "white",
    color: "black",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  button: {
    marginHorizontal: 5,
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  correo: {
    fontSize: 14,
    marginBottom: 5,
  },
  telefono: {
    fontSize: 14,
    marginBottom: 5,
  },
  vehiculo: {
    fontSize: 14,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonSmall: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginBottom: 5,
    marginRight: 10,
  },
});

export default ConsultaScreen;