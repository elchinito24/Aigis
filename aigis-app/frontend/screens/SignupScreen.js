import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import IP from '../IP';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords don't match");
        return;
      }
    

      const url = `http://${IP}:3000/usuario/signup`;
      const data = {
        correo: email,
        contrasena: password
      };
      const response = await axios.post(url, data);
    
    // Simulate a registration process
    console.log('User registered with email:', email);

      if (response.status === 200) {
        Alert.alert('Registration Successful', 'You can now login with your credentials.');
        navigation.navigate('Login');
      } else {
        setErrorMessage('Signup error');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Signup error');
    }
  };
    // Navigate back to the Welcome screen
    navigation.navigate('Welcome');
  }  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.nameField}>Email</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.nameField}>Create a password</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.loginRedirect} 
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.backToWelcome} 
        onPress={() => navigation.navigate('VSAT App')}>
        <Text style={styles.backToWelcomeText}>Back to Welcome</Text>
      </TouchableOpacity>
    </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#424242',
    padding: 20,
  },
  nameField:{
    color: '#FFF',
    left: '3%',
    alignSelf: 'flex-start',
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
    color: '#FFF', // Color del texto dentro del input
    borderColor: '#ccc',
    borderColor: '#E53935',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#212121',
  },
  signupButton: {
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
  loginRedirect: {
    marginTop: 20,
  },
  loginText: {
    color: '#E53935',
    fontSize: 16,
  },
  backToWelcome: {
    marginTop: 10,
  },
  backToWelcomeText: {
    color: '#E53935',
    fontSize: 16,
  },
});

export default SignupScreen;