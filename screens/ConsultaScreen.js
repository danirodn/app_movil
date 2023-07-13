import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from 'react-native';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { database } from '../config/fb';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NetInfo } from 'react-native';

const ConsultaScreen = ({ navigation }) => {
  const [datos, setDatos] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true); // Agrega el estado de loading
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedCorreo, setEditedCorreo] = useState('');
  const [editedNombre, setEditedNombre] = useState('');
  const [editedTelefono, setEditedTelefono] = useState('');

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
      cliente.correo.toLowerCase().includes(searchValue.toLowerCase()) ||
      cliente.idCliente.toLowerCase().includes(searchValue.toLowerCase()) // Buscar también por ID
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

  function handleEdit(id) {
    const cliente = getClienteById(id);
    if (cliente) {
      setSelectedCliente(cliente);
      setEditedCorreo(cliente.correo);
      setEditedNombre(cliente.nombre);
      setEditedTelefono(cliente.telefono);
      setModalVisible(true);
    }
  }

  async function saveEditedCliente() {
    try {
      const clienteRef = doc(database, 'clientes', selectedCliente.idCliente);
      await updateDoc(clienteRef, {
        correo: editedCorreo,
        nombre: editedNombre,
        telefono: editedTelefono,
      });

      const updatedCliente = {
        ...selectedCliente,
        correo: editedCorreo,
        nombre: editedNombre,
        telefono: editedTelefono,
      };

      const updatedDatos = datos.map((cliente) =>
        cliente.idCliente === selectedCliente.idCliente ? updatedCliente : cliente
      );
      setDatos(updatedDatos);
      setModalVisible(false);
    } catch (error) {
      console.error('Error al editar el cliente', error);
    }
  }

  // función auxiliar para obtener el objeto de cliente correspondiente a un ID
  function getClienteById(id) {
    return datos.find((cliente) => cliente.idCliente === id) || null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <Text style={styles.title}></Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Nombre/Correo/ID"
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

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Cliente</Text>
          <TextInput
            placeholder="Correo"
            placeholderTextColor="#aaa"
            value={editedCorreo}
            onChangeText={(text) => setEditedCorreo(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Nombre"
            placeholderTextColor="#aaa"
            value={editedNombre}
            onChangeText={(text) => setEditedNombre(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Teléfono"
            placeholderTextColor="#aaa"
            value={editedTelefono}
            onChangeText={(text) => setEditedTelefono(text)}
            style={styles.input}
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={saveEditedCliente}>
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  input: {
    flex: 1,
    color: '#000',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ConsultaScreen;
