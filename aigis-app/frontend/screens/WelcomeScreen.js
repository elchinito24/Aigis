import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <View style={styles.content}>
        <Image 
          source={require('../assets/logo2.jpeg')} 
          style={styles.image}
        />
        <Text style={styles.title}>Welcome to IoT App</Text>
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.signupButton} 
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020617', // Aquí puedes cambiar el color de fondo
    padding: 16,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#334155',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  signupButton: {
    backgroundColor: '#94a3b8',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WelcomeScreen;
