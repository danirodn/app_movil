import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QrScreen() {
  return (
    <View style={styles.container}>
      
      <QRCode
        value="https://"
        size={200} // Aumenta el tamaño a 200
        style={styles.qrCode} // Agrega los estilos para centrar
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCode: {
    alignSelf: 'center', // Centra el código QR horizontalmente
    marginVertical: 20, // Agrega un espacio vertical
  },
});