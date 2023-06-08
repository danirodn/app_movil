import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome5 } from '@expo/vector-icons'; 


const gradientStyle = {
  colors: ['#000000', '#434343', '#000000'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};

export default function Consulservicios() {
  const [helpVisible, setHelpVisible] = useState(false);

  const handleHelpPress = () => {
    setHelpVisible(true);
  };

  const handleHelpClose = () => {
    setHelpVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.helpButton} onPress={handleHelpPress}>
        <FontAwesome name="qrcode" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
        <LinearGradient {...gradientStyle} style={styles.gradient}>
            <View style={styles.content}>
              <FontAwesome5 name="toolbox" size={24} color="white" />
              <Text style={styles.text}>Mantenimiento</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <LinearGradient {...gradientStyle} style={styles.gradient}>
            <View style={styles.content}>
              <FontAwesome name="users" size={24} color="white" />
              <Text style={styles.text}>Clientes</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <LinearGradient {...gradientStyle} style={styles.gradient}>
            <View style={styles.content}>
              <FontAwesome name="car" size={24} color="white" />
              <Text style={styles.text}>Vehículos</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <LinearGradient {...gradientStyle} style={styles.gradient}>
            <View style={styles.content}>
              <FontAwesome name="wrench" size={24} color="white" />
              <Text style={styles.text}>Reparaciones</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <LinearGradient {...gradientStyle} style={styles.gradient}>
            <View style={styles.content}>
              <FontAwesome name="id-card" size={24} color="white" />
              <Text style={styles.text}>Empleados</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {helpVisible && (
        <View style={styles.background}>
          <Modal visible={helpVisible} animationType="fade" transparent={true}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={handleHelpClose}
              >
                <TouchableOpacity onPress={handleHelpClose}>
  
</TouchableOpacity>
              </TouchableOpacity>
              <View style={styles.modalContent}>
                
                <Text style={styles.modalTitle}>Ayuda</Text>
                <View style={styles.modalTextContainer}>
                  <Text style={styles.modalText}>
                    Aquí va el mensaje de ayuda.
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleHelpClose}
                >
                  <Text style={styles.modalButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center', // Actualiza la propiedad justifyContent
    alignItems: 'center',
    zIndex: 1,
  },
  modalContainer: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    padding: 20,
    width: '70%',
    alignItems: 'center',
    zIndex: 2, // Agregar esta propiedad
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    marginTop: 70, // Actualiza el valor de marginTop
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTextContainer: {
    marginBottom: 20,
    marginTop: 40,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});