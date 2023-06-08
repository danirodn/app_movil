import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { database } from '../config/fb';
import Icon from 'react-native-vector-icons/FontAwesome';

const ConsulReparaciones = () => {
  const [reparaciones, setReparaciones] = useState([]);

  const obtenerReparaciones = async () => {
    try {
      const reparacionesObtenidas = [];
      const q = query(collection(database, 'reparaciones'));
      const querySnapshot = await getDocs(q);
      for (const docRef of querySnapshot.docs) {
        const reparacion = docRef.data();
        reparacion.id = docRef.id;
        reparacionesObtenidas.push(reparacion);
      }
      setReparaciones(reparacionesObtenidas);
    } catch (error) {
      console.error('Error al obtener las reparaciones', error);
    }
  };

  useEffect(() => {
    obtenerReparaciones();
  }, []);

  const eliminarReparacion = async (idReparacion) => {
    try {
      await deleteDoc(doc(database, 'reparaciones', idReparacion));
      setReparaciones(reparaciones.filter((reparacion) => reparacion.id !== idReparacion));
    } catch (error) {
      console.error('Error al eliminar la reparación', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.reparacionContainer}>
      <Text>{`Costo: ${item.costo}`}</Text>
      <Text>{`Descripción: ${item.descripcion}`}</Text>
      <Text>{`Fecha: ${item.fechaReparacion ? item.fechaReparacion.toDate().toLocaleDateString() : 'Fecha no disponible'}`}</Text>
      <Text>{`Placa: ${item.vehiculoId}`}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => eliminarReparacion(item.id)} style={[styles.button, { backgroundColor: 'red' }]}>
          <Icon name="trash" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.button}>
          <Icon name="edit" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultar Reparaciones</Text>
      {reparaciones.length > 0 ? (
        <FlatList
          data={reparaciones}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No se encontraron reparaciones</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reparacionContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    color: '#fff',
  },
});

export default ConsulReparaciones;