import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const sensors = [
  { id: '1', name: 'Sensor 1', price: '$50' },
  { id: '2', name: 'Sensor 2', price: '$60' },
  // Agrega más sensores según sea necesario
];

const ViewSensorsScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>Price: {item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Sensors</Text>
      <FlatList
        data={sensors}
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

export default ViewSensorsScreen;
