import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { collection, doc, getDoc } from 'firebase/firestore';
import { database } from '../config/fb';

export default function QRScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [documentoData, setDocumentoData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const docRef = doc(database, 'reparaciones', data);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDocumentoData(docSnap.data());
    } else {
      console.log('No se encontró el documento');
    }
  };

  const handleScanButtonPress = () => {
    setScanned(false);
    setDocumentoData(null);
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {scanned ? (
        <>
          {documentoData ? (
            <>
              <Text>Costo: {documentoData.costo}</Text>
              <Text>Descripción: {documentoData.descripcion}</Text>
              <Text>Fecha: {documentoData.fecha}</Text>
              <Text>Vehículo ID: {documentoData.vehiculo_id}</Text>
            </>
          ) : (
            <Text>No se encontró el documento</Text>
          )}
          <Button title={'Scan Again'} onPress={handleScanButtonPress} />
        </>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});