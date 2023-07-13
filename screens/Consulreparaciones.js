import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { database } from '../config/fb';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Consulreparaciones({ navigation }) {
  const [reparaciones, setReparaciones] = useState([]);
  const [nombresClientes, setNombresClientes] = useState({});

  const obtenerReparaciones = async () => {
    try {
      const reparacionesObtenidas = [];
      const querySnapshot = await getDocs(collection(database, 'reparaciones'));
      for (const docRef of querySnapshot.docs) {
        const reparacion = docRef.data();
        if (reparacion.fechaini) {
          reparacion.fechaini = reparacion.fechaini.toDate(); // Convertir de marca de tiempo a objeto de fecha
        } else {
          console.warn(`La reparación con ID ${docRef.id} no tiene una fecha de inicio`);
        }
        reparacion.id = docRef.id;

        const vehiculoDocRef = doc(database, 'vehiculos', reparacion.vehiculo_id);
        console.log('vehiculoDocRef', vehiculoDocRef.path);
        const vehiculoDoc = await getDoc(vehiculoDocRef);
        if (vehiculoDoc.exists()) {
          const vehiculo = vehiculoDoc.data();
          reparacion.vehiculo = { marca: vehiculo.marca, modelo: vehiculo.modelo, year: vehiculo.year, cliente_id: vehiculo.cliente_id };
          reparacion.vehiculo_id = vehiculo.vehiculo_id; // Utilizar vehiculo.vehiculo_id para asignar el ID del vehículo
          console.log('vehiculo', vehiculo);
          console.log('reparacion.vehiculo_id', reparacion.vehiculo_id);
        } else {
          console.error('No se encontró el vehículo con ID:', reparacion.vehiculo_id);
        }
        reparacionesObtenidas.push(reparacion);
      }
      setReparaciones(reparacionesObtenidas);

      const clientesSnapshot = await getDocs(collection(database, 'clientes'));
      const nombres = {};
      clientesSnapshot.forEach((clienteDoc) => {
        const cliente = clienteDoc.data();
        nombres[cliente.id] = cliente.nombre; // Asigna el nombre del cliente usando su ID
      });
      setNombresClientes(nombres);
    } catch (error) {
      console.error('Error al obtener las reparaciones', error);
    }
  };

  useEffect(() => {
    obtenerReparaciones();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteDoc(doc(database, 'reparaciones', id));
      const reparacionesFiltradas = reparaciones.filter((reparacion) => reparacion.id !== id);
      setReparaciones(reparacionesFiltradas);
    } catch (error) {
      console.error('Error al eliminar la reparación', error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {reparaciones.length > 0 ? (
        reparaciones.map((reparacion) => (
          <TouchableOpacity
            key={reparacion.id}
            style={styles.reparacionContainer}
            onPress={() => navigation.navigate('Detalle', { id: reparacion.id })}
          >
            <View style={styles.reparacionInfo}>
              <Text style={styles.reparacionTitle}>{reparacion.descripcion}</Text>
              {reparacion.fechaini && (
                <Text>
                  <Text style={styles.reparacionText}>Fecha inicio: {' '}</Text>
                  <Text style={styles.reparacionText}>{new Date(reparacion.fechaini).toLocaleDateString()}</Text>
                </Text>
              )}
              <Text style={styles.reparacionText}>{`Cliente: ${nombresClientes[reparacion.vehiculo.cliente_id]}`}</Text>
              <Text style={styles.reparacionText}>{`Vehículo: ${reparacion.vehiculo.marca} ${reparacion.vehiculo.modelo} (${reparacion.vehiculo.year})`}</Text>
              {reparacion.vehiculo_id && (
                <Text style={styles.reparacionText}>{`ID del vehículo: ${reparacion.vehiculo_id}`}</Text>
              )}
              <Text style={styles.reparacionText}>{`Costo: ${reparacion.costo}`}</Text>
            </View>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(reparacion.id)}>
              <Icon name="trash-o" size={20} color="#FF0000" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noResults}>No se encontraron resultados</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  reparacionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#AED6F1',
    padding: 20,
    marginBottom: 10,
  },
  reparacionInfo: {
    flex: 1,
  },
  reparacionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reparacionText: {
    fontSize: 16,
    marginBottom: 3,
  },
  deleteBtn: {
    marginLeft: 10,
  },
  noResults: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
