import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
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
      empleado.cedula.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredEmpleados(filteredEmpleados.map((empleado) => empleado.id)); // almacenar solo los IDs
  }

  function handleSearchByCedula() {
    const filteredEmpleados = datos.filter((empleado) =>
      empleado.cedula.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredEmpleados(filteredEmpleados.map((empleado) => empleado.id)); // almacenar solo los IDs
  }

  async function handleDelete(id) {
    try {
      await deleteDoc(collection(database, 'empleados', empleadoId));

      const datosFiltrados = datos.filter((empleado) => empleado.id !== id);
      setDatos(datosFiltrados);
      setFilteredEmpleados(datosFiltrados.map((empleado) => empleado.id)); // actualizar solo los IDs
    } catch (error) {
      console.error('Error al eliminar el empleado', error);
    }
  }

  // función auxiliar para obtener el objeto de empleado correspondiente a un ID
  function getEmpleadoById(id) {
    return datos.find((empleado) => empleado.id === id) || null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}></Text>
      <TextInput
        placeholder="Nombre/Cedula"
        placeholderTextColor="#aaa"
        value={searchValue}
        onChangeText={(text) => handleSearch(text)}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Buscar" onPress={handleSearchByCedula} containerStyle={styles.button}/>
      </View>
      {filteredEmpleados.map((empleadoId, index) => {
        const empleado = getEmpleadoById(empleadoId);
        if (!empleado) {
          return null; // Saltear el empleado si no se encuentra
        }
        return (
          <View key={index} style={styles.item}>
            <Text style={[styles.nombre, { marginRight: 5 }]}>{empleado.nombre}</Text>
            <Text style={styles.cedula}>Cédula: {empleado.cedula}</Text>
            <Text style={styles.direccion}>Dirección: {empleado.direccion}</Text>
            <Text style={styles.telefono}>Teléfono: {empleado.telefono}</Text>
            <Text style={styles.cargo}>Cargo: {empleado.cargo}</Text>
            <Text style={styles.sueldo}>Sueldo: {empleado.sueldo}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => handleDelete(empleado.id)} style={[styles.buttonSmall, { marginRight: 5 }]}>
                <Icon name="trash" size={15} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEdit(empleado.id)} style={styles.buttonSmall}>
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
  cedula: {
    fontSize: 14,
    marginBottom: 5,
  },
  direccion: {
    fontSize: 14,
    marginBottom: 5,
  },
  telefono: {
    fontSize: 14,
    marginBottom: 5,
  },
  cargo: {
    fontSize: 14,
    marginBottom: 5,
  },
  sueldo: {
    fontSize: 14,
    marginBottom: 10,
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

export default ConsulempScreen;