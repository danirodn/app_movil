import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { database } from '../config/fb';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NetInfo } from 'react-native';

const ConsultaScreen = ({ navigation }) => {
  const [datos, setDatos] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true); // Agrega el estado de loading

  const obtenerDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'clientes'));
      const datosObtenidos = [];
      querySnapshot.forEach((doc) => {
        datosObtenidos.push({ idCliente: doc.id, ...doc.data() });
      });
      setDatos(datosObtenidos);
      setFilteredClientes(datosObtenidos.map((cliente) => cliente.idCliente)); // almacenar solo los IDs
      setLoading(false); // Cambia el valor de loading a false
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
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas eliminar este cliente?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await deleteDoc(doc(database, 'clientes', id)); // eliminar el documento con el ID proporcionado

              const datosFiltrados = datos.filter((cliente) => cliente.idCliente !== id);
              setDatos(datosFiltrados);
              setFilteredClientes(datosFiltrados.map((cliente) => cliente.idCliente)); // actualizar solo los IDs
            } catch (error) {
              console.error('Error al eliminar el cliente', error);
            }
          },
          style: 'destructive',
        },
      ],
    );
  }

  // función auxiliar para obtener el objeto de cliente correspondiente a un ID
  function getClienteById(id) {
    return datos.find((cliente) => cliente.idCliente === id) || null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? ( // Muestra el componente de loader si loading es true
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <Text style={styles.title}></Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Nombre/Correo"
              placeholderTextColor="#aaa"
              value={searchValue}
              onChangeText={(text) => handleSearch(text)}
              style={styles.input}
            />
            <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchValue)}>
              <Icon name="search" size={20} color="#fff" />
            </TouchableOpacity>
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
                <Text style={styles.vehiculo}>Cliente ID: {clienteId}</Text>

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
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:10,
    paddingBottom: 10,
  },
  title: {
    fontSize:18,
    textAlign: 'center',
   marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color:'#000'
  },
  searchButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
    color:'#fff'
  },
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    marginTop: 5,
  },
  buttonSmall: {
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginLeft: 5,
  },
});

export default ConsultaScreen;