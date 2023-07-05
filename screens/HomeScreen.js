import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import ConsulempScreen from "./ConsulempScreen";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botón de ayuda */}
      <Button
        title="?"
        buttonStyle={[styles.helpButtonStyle]}
        titleStyle={[styles.helpButtonTitleStyle]}
        onPress={() => {
          // Agrega aquí la lógica para mostrar la ayuda
        }}
      />

      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
          <View style={styles.gridColumn}>
            <Button
              title="Mantenimiento"
              buttonStyle={[styles.buttonStyle, {width: '100%'}]}
              titleStyle={[styles.buttonTitleStyle, {fontSize: 11}]}
              onPress={() => navigation.navigate('Consulservicios')}
            />
          </View>
          <View style={styles.gridColumn}>
            <Button
              title="Clientes"
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.buttonTitleStyle}
              onPress={() => {
                // Agrega aquí la lógica para redirigir al usuario a la pantalla de consulta de clientes
                navigation.navigate('ConsultaScreen');
              }}
            />
          </View>
        </View>
        <View style={styles.gridRow}>
          <View style={[styles.gridColumn, {width: '48%'}]}>
            <Button
              title="Vehículos"
              buttonStyle={styles.buttonStyle}
              titleStyle={[styles.buttonTitleStyle, {fontSize: 16}]}
              onPress={() => { navigation.navigate('Consulreparaciones')}}
            />
          </View>
          <View style={[styles.gridColumn, {width: '48%'}]}>
            <Button
              title="Empleados"
              buttonStyle={styles.buttonStyle}
              titleStyle={[styles.buttonTitleStyle, {fontSize: 15}]}
              onPress={() => navigation.navigate('Details')}
            />
          </View>
        </View>
        

        <View style={styles.gridRow}>
          <View style={[styles.gridColumn, {width: '100%', paddingLeft: 40, paddingRight: 40}]}>
            <Button
              title="Reparaciones"
              buttonStyle={[styles.buttonStyle, {fontSize: 20, alignSelf: 'center'}]}
              titleStyle={[styles.buttonTitleStyle, {fontSize: 18}]}
              onPress={() => { navigation.navigate('Consulreparaciones')}}
            />
          </View>
        </View>

      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#edf2fa",
    position: 'relative', // Agrega esta propiedad para que el botón de ayuda se posicione correctamente
  },
  gridContainer: {
    width: '80%',
    marginTop: 20,
  },
  helpButtonStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute', // Agrega esta propiedad para posicionar el botón
    top: 10, // Agrega estas propiedades para posicionar el botón en la esquina superior derecha
    right: 10,
  },
  helpButtonTitleStyle: {
    fontSize: 20,
    color: '#3B81A5',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridColumn: {
    width: '48%',
  },
  buttonStyle: {
    backgroundColor: '#3B81A5',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
   shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonTitleStyle: {
   fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;