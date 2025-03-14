import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { MapPin, Plus, Trash } from 'lucide-react';
import { useNavigation } from '@react-navigation/native';
import { useFirestore } from '../../hooks/useFirestore';

export default function POIManageScreen() {
  const [points, setPoints] = useState([]);
  const navigation = useNavigation();
  const { fetchPOIs, deletePOI } = useFirestore();

  useEffect(() => {
    loadPOIs();
  }, []);

  const loadPOIs = async () => {
    const data = await fetchPOIs();
    setPoints(data);
  };

  const handleDelete = async (id) => {
    await deletePOI(id);
    loadPOIs();
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-xl font-bold">POI</Text>
        <TouchableOpacity 
          className="bg-blue-500 p-2 rounded-full"
          onPress={() => navigation.navigate('POIAdd')}
        >
          <Plus className="text-white" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={points}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center p-4 bg-gray-50 rounded-lg mb-2">
            <View className="flex-row items-center">
              <MapPin className="text-blue-500 mr-2" size={20} />
              <Text>{item.name}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Trash className="text-red-500" size={20} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity 
        className="bg-blue-500 p-4 rounded-lg mt-4"
        onPress={() => navigation.navigate('Maps')}
      >
        <Text className="text-white text-center font-semibold">Open in Maps</Text>
      </TouchableOpacity>
    </View>
  );
}
