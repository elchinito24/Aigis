import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const users = [
  { id: '1', name: 'User 1', email: 'user1@example.com', status: 'Active' },
  { id: '2', name: 'User 2', email: 'user2@example.com', status: 'Inactive' },
  // Agrega más usuarios según sea necesario
];

const ManageUsersScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>Email: {item.email}</Text>
      <Text style={styles.details}>Status: {item.status}</Text>
      <Button title="Edit" onPress={() => {}} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Users</Text>
      <FlatList
        data={users}
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

export default ManageUsersScreen;
