import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { database } from '../config/fb';
import Icon from 'react-native-vector-icons/FontAwesome';

const ConsulempScreen = ({ navigation }) => {
  const [datos, setDatos] = useState([]);
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const obtenerDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'empleados'));
      const datosObtenidos = [];
      querySnapshot.forEach((doc) => {
        datosObtenidos.push({ id: doc.id, ...doc.data() });
      });
      setDatos(datosObtenidos);
      setFilteredEmpleados(datosObtenidos.map((empleado) => empleado.id)); // almacenar solo los IDs
    } catch (error) {
      console.error('Error al obtener los datos', error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Consultar Empleados',
    });
  }, [navigation]);

  function handleSearch(searchValue) {
    setSearchValue(searchValue);
    const filteredEmpleados = datos.filter((empleado) =>
      empleado.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
      empleado.correo.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredEmpleados(filteredEmpleados.map((empleado) => empleado.id)); // almacenar solo los IDs
  }

  function handleSearchByCorreo() {
    const filteredEmpleados = datos.filter((empleado) =>
      empleado.correo.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredEmpleados(filteredEmpleados.map((empleado) => empleado.id)); // almacenar solo los IDs
  }

  async function handleDelete(id) {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas eliminar este empleado?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await deleteDoc(doc(database, 'empleados', id)); // eliminar el documento con el ID proporcionado

              const datosFiltrados = datos.filter((empleado) => empleado.id !== id);
              setDatos(datosFiltrados);
              setFilteredEmpleados(datosFiltrados.map((empleado) => empleado.id)); // actualizar solo los IDs
            } catch (error) {
              console.error('Error al eliminar el empleado', error);
            }
          },
          style: 'destructive',
        },
      ],
    );
  }

  // función auxiliar para obtener el objeto de empleado correspondiente a un ID
  function getEmpleadoById(id) {
    return datos.find((empleado) => empleado.id === id) || null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      
      {filteredEmpleados.map((empleadoId, index) => {
        const empleado = getEmpleadoById(empleadoId);
        if (!empleado) {
          return null; // Saltear el empleado si no se encuentra
        }
        return (
          <View key={index} style={styles.item}>
            <Text style={[styles.nombre, { marginRight: 5 }]}>{empleado.nombre}</Text>
            <Text style={styles.empleadoId}>Empleado ID: {empleadoId}</Text>
            <Text style={styles.correo}>Correo: {empleado.email}</Text>
            <Text style={styles.telefono}>Teléfono: {empleado.telefono}</Text>
            <Text style={styles.cargo}>Cargo: {empleado.cargo}</Text>
            <Text style={styles.direccion}>Dirección: {empleado.direccion}</Text>
            <Text style={styles.sueldo}>Sueldo: {empleado.sueldo}</Text>
            
            
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => handleDelete(empleado.id)}                style={[styles.button, { backgroundColor: 'red' }]}>
                <Icon name="trash" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEdit(cliente.idCliente)} style={styles.buttonSmall}>
                <Icon name="edit" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
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
    backgroundColor: 'blue',
  },
  input: {
    flex: 1,
    color:'#000'
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
    color: '#fff',
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

export default ConsulempScreen;