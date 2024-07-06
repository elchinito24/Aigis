import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
    <View style={styles.overlay}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AdminHomeScreen')}>
          <Text style={styles.addButtonText}>Regresar</Text>
        </TouchableOpacity>
      <Text style={styles.title}>Add New Sensor</Text>
      <Text style={styles.nameField}>Tipo</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaa"
        value={tipo}
        onChangeText={setTipo}
      />
      <Text style={styles.nameField}>Precio</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaa"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Agregar Sensor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  nameField:{
    color: '#FFF',
    left: '3%',
    alignSelf: 'flex-start',
  },
  overlay: {
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#424242',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    color: '#FFF',
    borderColor: '#E53935',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#212121',
  },
  loginButton: {
    backgroundColor: '#E53935',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#E53935',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddNewSensorScreen;
