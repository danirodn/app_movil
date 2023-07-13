import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { database } from '../config/fb';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ConsulV({ navigation }) {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [editando, setEditando] = useState(false);
  const [clienteId, setClienteId] = useState('');
  const [marca, setMarca] = useState('');
  const [nombre, setNombre] = useState('');
  const [vehiculoId, setVehiculoId] = useState('');
  const [year, setYear] = useState('');
  const [busqueda, setBusqueda] = useState('');


  const obtenerVehiculos = async () => {
    try {
      const vehiculosObtenidos = [];
      const querySnapshot = await getDocs(collection(database, 'vehiculos'));

      for (const docRef of querySnapshot.docs) {
        const vehiculo = docRef.data();
        vehiculo.id = docRef.id;
        vehiculosObtenidos.push(vehiculo);
      }

      setVehiculos(vehiculosObtenidos);
    } catch (error) {
      console.error('Error al obtener los vehiculos', error);
    }
  };

  useEffect(() => {
    obtenerVehiculos();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteDoc(doc(database, 'vehiculos', id));
      setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id)); // Eliminar el vehículo de la lista
    } catch (error) {
      console.error('Error al eliminar el vehiculo', error);
    }
  }

  async function handleEdit() {
    try {
      const data = {
        clienteId,
        marca,
        nombre,
        vehiculo_id: vehiculoId,
        year,
      };

      await updateDoc(doc(database, 'vehiculos', vehiculoSeleccionado.id), data);

      setVehiculos(
        vehiculos.map((vehiculo) => {
          if (vehiculo.id === vehiculoSeleccionado.id) {
            return {
              ...vehiculo,
              ...data,
            };
          } else {
            return vehiculo;
          }
        })
      );

      setEditando(false);
      setVehiculoSeleccionado(null);
      setClienteId('');
      setMarca('');
      setNombre('');
      setVehiculoId('');
      setYear('');
    } catch (error) {
      console.error('Error al editar el vehiculo', error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={busqueda}
        onChangeText={setBusqueda}
        placeholder="Buscar por placa"
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {vehiculos.length > 0 ? (
          vehiculos.map((vehiculo) => (
            <TouchableOpacity
              key={vehiculo.id}
              style={styles.vehiculoContainer}
              onPress={() => {
                setVehiculoSeleccionado(vehiculo);
                setEditando(true);
                setClienteId(vehiculo.clienteId);
                setMarca(vehiculo.marca);
                setNombre(vehiculo.nombre);
                setVehiculoId(vehiculo.vehiculo_id);
                setYear(vehiculo.year);
              }}
            >
              <View style={styles.vehiculoInfo}>
                <Text style={styles.vehiculoText}>{`Placa: ${vehiculo.id}`}</Text>
                <Text style={styles.vehiculoText}>{`Cliente ID: ${vehiculo.clienteId}`}</Text>
                <Text style={styles.vehiculoTitle}>{`Modelo: ${vehiculo.nombre} - ${vehiculo.marca} (${vehiculo.year})`}</Text>
              </View>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(vehiculo.id)}>
                <Icon name="trash-o" size={20} color="#FF0000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.editBtn} onPress={() => {
                setVehiculoSeleccionado(vehiculo);
                setEditando(true);
                setClienteId(vehiculo.clienteId);
                setMarca(vehiculo.marca);
                setNombre(vehiculo.nombre);
                setVehiculoId(vehiculo.vehiculo_id);
                setYear(vehiculo.year);
              }}>
                <Icon name="edit" size={20} color="#0000FF" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResults}>No se encontraron resultados</Text>
       )}
        <Modal visible={editando} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Vehículo</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setEditando(false)}>
                <Icon name="times" size={20} color="#FF0000" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Cliente ID:</Text>
                <TextInput
                  style={styles.input}
                  value={clienteId}
                  onChangeText={setClienteId}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Marca:</Text>
                <TextInput
                  style={styles.input}
                  value={marca}
                  onChangeText={setMarca}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Nombre:</Text>
                <TextInput
                  style={styles.input}
                  value={nombre}
                  onChangeText={setNombre}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>ID del vehículo:</Text>
                <TextInput
                  style={styles.input}
                  value={vehiculoId}
                  onChangeText={setVehiculoId}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Año:</Text>
                <TextInput
                  style={styles.input}
                  value={year}
                  onChangeText={setYear}
                />
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.editarBtn} onPress={handleEdit}>
                  <Text style={styles.editarText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelarBtn} onPress={() => setEditando(false)}>
                  <Text style={styles.cancelarText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  vehiculoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  vehiculoInfo: {
    flex: 1,
    marginRight: 10,
  },
  vehiculoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  vehiculoText: {
    fontSize: 14,
    color: '#555',
  },
  deleteBtn: {
    marginLeft: 10,
  },
  editBtn: {
    marginLeft: 10,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeBtn: {
    marginLeft: 10,
  },
  modalBody: {
    padding: 20,
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#555',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  editarBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  editarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelarBtn: {
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  cancelarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});