import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';


import ConsulempScreen from "./ConsulempScreen";
const gradientStyle = {
  colors: ['#16222A', '#3A6073', '#16222A'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.helpButton} onPress={() => { navigation.navigate('QrScreen')}}>
        <FontAwesome name="qrcode" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
      <Button
        title={
          <>
            <FontAwesome5 name="toolbox" size={24} color="white" />
            <Text style={[styles.buttonTitleStyle, {fontSize: 18, marginLeft: 10}]}>Mantenimiento</Text>
          </>
        }
        onPress={() => { navigation.navigate('Consulservicios')}}
        ViewComponent={LinearGradient} // Agrega esta prop para usar LinearGradient en lugar de View
        linearGradientProps={gradientStyle} // Agrega esta prop para definir el estilo degradado
        buttonStyle={[styles.buttonStyle]}
        titleStyle={{ color: 'white' }} // Agrega esta prop para definir el estilo del texto del botón
      />

        <Button
          title={
            <>
              <FontAwesome5 name="users" size={24} color="white" />
              <Text style={[styles.buttonTitleStyle, {fontSize: 18, marginLeft: 10}]}>Clientes</Text>
            </>
          }
          onPress={() => navigation.navigate('ConsultaScreen')}
          ViewComponent={LinearGradient} // Agrega esta prop para usar LinearGradient en lugar de View
          linearGradientProps={gradientStyle} // Agrega esta prop para definir el estilo degradado
          buttonStyle={[styles.buttonStyle]}
          titleStyle={{ color: 'white' }} // Agrega esta prop para definir el estilo del texto del botón
        />

        <Button
          title={
            <>
              <FontAwesome name="car" size={24} color="white" />
              <Text style={[styles.buttonTitleStyle, {fontSize: 18, marginLeft: 10}]}>Vehículos</Text>
            </>
          }
          onPress={() => { navigation.navigate('ConsulV')}}
          ViewComponent={LinearGradient} // Agrega esta prop para usar LinearGradient en lugar de View
          linearGradientProps={gradientStyle} // Agrega esta prop para definir el estilo degradado
          buttonStyle={[styles.buttonStyle]}
          titleStyle={{ color: 'white' }} // Agrega esta prop para definir el estilo del texto del botón
        />

        <Button
          title={
            <>
              <FontAwesome name="id-card" size={24} color="white" />
              <Text style={[styles.buttonTitleStyle, {fontSize: 18, marginLeft: 10}]}>Empleados</Text>
            </>
          }
          onPress={() => navigation.navigate('Details')}
          ViewComponent={LinearGradient} // Agrega esta prop para usar LinearGradient en lugar de View
          linearGradientProps={gradientStyle} // Agrega esta prop para definir el estilo degradado
          buttonStyle={[styles.buttonStyle]}
          titleStyle={{ color: 'white' }} // Agrega esta prop para definir el estilo del texto del botón
        />

        <Button
          title={
            <>
              <FontAwesome name="wrench" size={24} color="white" />
              <Text style={[styles.buttonTitleStyle, {fontSize: 18, marginLeft: 10}]}>Reparaciones</Text>
            </>
          }
          onPress={() => { navigation.navigate('Consulreparaciones')}}
          ViewComponent={LinearGradient} // Agrega esta prop para usar LinearGradient en lugar de View
          linearGradientProps={gradientStyle} // Agrega esta prop para definir el estilo degradado
          buttonStyle={[styles.buttonStyle]}
          titleStyle={{ color: 'white' }} // Agrega esta prop para definir el estilo del texto del botón
        />
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
    position: 'relative',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    //maxWidth: 250, // Establece la anchura máxima del contenedor de botones
  },
  button: {
    flex: 1, // Distribuye el espacio disponible de manera equitativa
    marginHorizontal: 5,
    backgroundColor: 'blue',
    maxWidth: 120, // Establece la anchura máxima del botón
    flexShrink: 1, // Permite que el botón se reduzca para ajustarse al contenido
 
  },
  buttonTitleStyle: {
    color: 'white',
    textAlign: 'center',
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
    position: 'absolute',
    top: 10,
    right: 10,
  },
  helpButtonTitleStyle: {
    fontSize: 20,
    color: '#3B81A5',
    fontWeight: 'bold',
    textAlign: 'center',
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
    alignSelf: 'stretch',
    marginBottom: 20,
    width: 280,
  },
  buttonTitleStyle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  helpButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#E5E8E8',
    color: '#fff',
    cursor: 'pointer',
  }
});

export default HomeScreen;