import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, query, where, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { database } from '../config/fb';
import Icon from 'react-native-vector-icons/FontAwesome';

const ConsulVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [filteredVehiculos, setFilteredVehiculos] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const obtenerVehiculos = async () => {
    try {
      const vehiculosObtenidos = [];
      const q = query(collection(database, 'vehiculos'));
      const querySnapshot = await getDocs(q);
      for (const docRef of querySnapshot.docs) {
        const vehiculo = docRef.data();
        vehiculo.id = docRef.id;
        const clienteDocRef = doc(database, 'clientes', vehiculo.cliente_id);
        const clienteDocSnapshot = await getDoc(clienteDocRef);
        const cliente = clienteDocSnapshot.data();
        vehiculo.cliente = {
          id: cliente.id,
          nombre: cliente.nombre
        };
        vehiculosObtenidos.push(vehiculo);
      }
      setVehiculos(vehiculosObtenidos);
      setFilteredVehiculos(vehiculosObtenidos);
    } catch (error) {
      console.error('Error al obtener los vehículos', error);
    }
  };

  useEffect(() => {
    obtenerVehiculos();
  }, []);

  const handleSearch = (text) => {
    setSearchValue(text);
    if (text.trim() === '') {
      setFilteredVehiculos(vehiculos);
    } else {
      const filtered = vehiculos.filter((vehiculo) =>
        vehiculo.id.toLowerCase().includes(text.toLowerCase()) ||
        vehiculo.cliente_id.toLowerCase().includes(text.toLowerCase()) ||
        vehiculo.cliente.nombre.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredVehiculos(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(database, 'vehiculos', id));
      obtenerVehiculos();
      Alert.alert('Vehículo eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el vehículo', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.vehiculoContainer}>
      <Text>{`ID del vehículo: ${item.id}`}</Text>
      <Text>{`Cliente: ${item.cliente.nombre}`}</Text>
      <Text>{`Marca: ${item.marca}`}</Text>
      <Text>{`Modelo: ${item.modelo}`}</Text>
      <Text>{`Año: ${item.year}`}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Eliminar vehículo',
              `¿Está seguro que desea eliminar el vehículo con ID "${item.id}"?`,
              [
                {
                  text: 'Cancelar',
                  style: 'cancel'
                },
                {
                  text: 'Eliminar',
                  onPress: () => handleDelete(item.id)
                }
              ]
            );
          }}
          style={styles.buttonSmall}
        >
          <Icon name="trash" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.buttonSmall}>
          <Icon name="edit" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultar Vehículos</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#ccc" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por ID de vehículo, ID de cliente o nombre de cliente"
          value={searchValue}
          onChangeText={handleSearch}
        />
      </View>
      {filteredVehiculos.length > 0 ? (
        <FlatList
          data={filteredVehiculos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No se encontraron vehículos</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    
    marginBottom: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    
    marginTop: 10
  },
  buttonSmall: {
    backgroundColor: '#c0392b',
    padding: 5,
    borderRadius: 5,
    marginRight: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1
  }
});

export default ConsulVehiculos;