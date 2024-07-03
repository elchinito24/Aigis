import axios from 'axios';
import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import IP from '../IP';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const url = `http://${IP}:3000/usuario/login`;
      const data = {
        correo: email,
        contrasena: password
      };
      const response = await axios.post(url, data);

      if (response.status === 200) {
        const user = response.data.user;
        const userRole = user.rol;
        Alert.alert('Welcome', `${user.nombre}`);

        if (userRole === 'administrador') {
          navigation.navigate('AdminStack');
        } else if (userRole === 'usuario') {
          navigation.navigate('UserStack');
        }
      } else {
        setErrorMessage('Login error');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login error');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/system.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
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
        <View style={styles.linksContainer}>
          <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('VSAT App')}>
            <Text style={styles.linkText}>Back to Welcome</Text>
          </TouchableOpacity>
        </View>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  overlay: {
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    marginTop: '-30%', 
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E53935',
    marginBottom: 20,
    backgroundColor: '#424242',
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
  linksContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  link: {
    marginBottom: 10,
  },
  linkText: {
    color: '#E53935',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
