import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import HomeScreen from "./screens/HomeScreen";
import ClientesScreen from "./screens/ClientesScreen";
import ReparacionesScreen from "./screens/ReparacionesScreen";
import EmpleadosScreen from "./screens/EmpleadosScreen";
import ConsultaScreen from "./screens/ConsultaScreen";
import ConsulempScreen from "./screens/ConsulempScreen";

//INTENTO
import Consulservicios from "./screens/Consulservicios";
import Consulreparaciones from "./screens/Consulreparaciones";




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: '#CDCDCD',
        tabBarInactiveTintColor: '#EEE',
        tabBarStyle: {
          backgroundColor: '#008BFF',
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
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
              <MaterialIcons name="work" size={24} color="white" />
            ),
            headerShown: true,
          }}
        />
          <Tab.Screen
    name="Reparaciones"
    component={ReparacionesScreen}
    options={{
      tabBarLabel: 'Reparaciones',
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
               
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
export default Navigation;

