import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const orders = [
  { id: '1', item: 'Sensor 1', status: 'Delivered' },
  { id: '2', item: 'Sensor 2', status: 'Pending' },
  // Agrega más pedidos según sea necesario
];

const OrdersScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.item}</Text>
      <Text style={styles.details}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
  },
});

export default OrdersScreen;
