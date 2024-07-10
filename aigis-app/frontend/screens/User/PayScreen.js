import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const PayScreen = ({ navigation }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardTitular, setCardTitular] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

const handlePayment = () => {
    console.log('Número de tarjeta:', cardNumber);
    console.log('Titular de la tarjeta:', cardTitular);
    console.log('Fecha de expiración:', expiryDate);
    console.log('CVV:', cvv);
};

return (
<ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Detalles de Pago</Text>
    <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de Tarjeta</Text>
        <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="1234 5678 9101 1121"
        value={cardNumber}
        onChangeText={setCardNumber}
        />
    </View>
    <View style={styles.inputContainer}>
    <Text style={styles.label}>Titular de la Tarjeta</Text>
        <TextInput
        style={styles.input}
        placeholder="Nombre en la tarjeta"
        value={cardTitular}
        onChangeText={setCar}
        />
    </View>
    <View style={styles.inputContainer}>
    <Text style={styles.label}>Fecha de Expiración</Text>
        <TextInput
        style={styles.input}
        placeholder="MM/AA"
        value={expiryDate}
        onChangeText={setExpiryDate}
        />
    </View>
    <View style={styles.inputContainer}>
    <Text style={styles.label}>CVV</Text>
        <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="123"
        secureTextEntry
        value={cvv}
        onChangeText={setCvv}
        />
    </View>
    <View style={styles.buttonContainer}>
        <Button title="Pagar" onPress={handlePayment} color="#E53935" />
        <Button title="Volver" onPress={() => navigation.goBack()} color="#757575" />
    </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
},
title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    alignSelf: 'center',
    marginBottom: 24,
},
inputContainer: {
    marginBottom: 16,
},
label: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 8,
},
input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
},
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
},
});

export default PayScreen;
