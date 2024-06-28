import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      // URL de tu API de login
      const url = 'http://172.17.3.78:3000/usuario/login'; // Cambia esto por la IP de tu servidor

      // Datos de las credenciales de usuario
      const data = {
        correo: email,
        contrasena: password
      };

      // Hacer la solicitud POST
      const response = await axios.post(url, data);

      console.log('Respuesta del servidor:', response.data);

      
      // Manejar la respuesta
      if (response.status === 200) {
        //Alert.alert('Bienvenido', `${user.nombre}`);
        console.log('Login exitoso');

        // Verifica el rol del usuario
        const user = response.data.user;
        const userRole = user.rol; // Suponiendo que el rol viene en la respuesta

        // Redireccionar basado en el rol del usuario
        if (userRole === 'administrador') {
          navigation.navigate('AdminStack');
        } else if (userRole === 'usuario') {
          navigation.navigate('UserStack');
        }
      } else {
        console.log('Error en el login');
        setErrorMessage('Error en el login');
      }
    } catch (error) {
      // Manejar errores
      console.error('Error al realizar el login:', error);
      setErrorMessage(error.response?.data?.message || 'Error al realizar el login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupRedirect}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backToWelcome}
        onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backToWelcomeText}>Back to Welcome</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#3498db',
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
  signupRedirect: {
    marginTop: 20,
  },
  signupText: {
    color: '#3498db',
    fontSize: 16,
  },
  backToWelcome: {
    marginTop: 10,
  },
  backToWelcomeText: {
    color: '#3498db',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
