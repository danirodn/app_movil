import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons'; 


//Screens
import HomeScreen from "./screens/HomeScreen";
import ClientesScreen from "./screens/ClientesScreen";
import ReparacionesScreen from "./screens/ReparacionesScreen";
import EmpleadosScreen from "./screens/EmpleadosScreen";
import ConsultaScreen from "./screens/ConsultaScreen";
import ConsulempScreen from "./screens/ConsulempScreen";
import Consulservicios from "./screens/Consulservicios";
import Consulreparaciones from "./screens/Consulreparaciones";
import VehiculosScreen from './screens/VehiculosScreen';
import QrScreen from './screens/QrScreen';

import ConsulV from './screens/ConsulV'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: '#D2B4DE',
        tabBarInactiveTintColor: '#EEE',
        tabBarStyle: {
          backgroundColor: '#1A5276',
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Consulta',
          tabBarIcon: ({ color, size}) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
            ),
            headerShown: true,
          }}
        />
        <Tab.Screen
        name="Vehiculos"
        component={VehiculosScreen}
        options={{
          tabBarLabel: 'Vehículos',
          tabBarIcon: ({ color, size}) => (
            <FontAwesome name="car" size={24} color={color} /> //2728282
            ),
            headerShown: true,
          }}
        />
          <Tab.Screen
          name="Clientes" 
          component={ClientesScreen}
          options={{
            tabBarLabel: 'Clientes',
            tabBarIcon: ({ color, size}) => (
              <MaterialIcons name="person-outline" size={24} color={color} /> // El color del icono se ajustará automáticamente al color de texto activo/inactivo
            ),
            headerShown: true,
    }}
  />
        <Tab.Screen 
          name="Empleados" 
          component={EmpleadosScreen}
          options={{
            tabBarLabel: 'Empleados',
            tabBarIcon: ({ color, size}) => (
              <MaterialIcons name="work" size={24} color={color} />
            ),
            headerShown: true,
          }}
        />
          <Tab.Screen
    name="Reparaciones"
    component={ReparacionesScreen}
    options={{
      tabBarLabel: 'Servicios',
      tabBarIcon: ({ color, size}) => (
        <MaterialIcons name="car-repair" size={24} color={color} /> // El color del icono se ajustará automáticamente al color de texto activo/inactivo
      ),
      headerShown: true,
    }}
  />
      </Tab.Navigator>
  );
}function Navigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MyTabs} 
          options={{ headerShown: false }}
          />
          <Stack.Screen name="Details" component={ConsulempScreen} />
          <Stack.Screen name="Consulservicios" component={Consulservicios} />
          <Stack.Screen name="Consulreparaciones" component={Consulreparaciones} />
          <Stack.Screen name="ConsultaScreen" component={ConsultaScreen} />
          <Stack.Screen name="QrScreen" component={QrScreen} />
          <Stack.Screen name="ConsulV" component={ConsulV} />
          
               
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
export default Navigation;

