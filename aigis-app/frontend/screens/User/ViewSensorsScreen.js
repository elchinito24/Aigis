import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import IP from '../../IP.js';

const ViewSensorsScreen = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const url = `http://${IP}:3000/sensor/`;
    try {
      const response = await axios.get(url);
      console.log(response.data.sensores); // Verifica la estructura de los datos
      setData(response.data.sensores); // Asegúrate de que response.data es un array
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => {
      setRefreshing(false);
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.tipo}</Text>
      <Text style={styles.details}>Price: {item.precio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Sensors</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
