import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import IP from '../../IP.js';

const AddNewSensorScreen = ({ navigation }) => {
  const [tipo, setTipo] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = async () => {
    const url = `http://${IP}:3000/sensor/`;
    const newSensor = { tipo, precio, estado: 'inactivo' };

    if (!tipo || !precio) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axios.post(url, newSensor);
      if (response.status === 200) {
        Alert.alert("Éxito", "Sensor agregado correctamente");
        navigation.goBack(); // Navegar a la pantalla anterior
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al agregar el sensor");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Sensor</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={tipo}
        onChangeText={setTipo}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />
      <Button title="Agregar Sensor" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
});

export default AddNewSensorScreen;
