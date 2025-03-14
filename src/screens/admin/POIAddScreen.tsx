import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigation } from '@react-navigation/native';

export default function POIAddScreen() {
  const [name, setName] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const { addPOI } = useFirestore();
  const navigation = useNavigation();

  const handleAdd = async () => {
    await addPOI({
      name,
      latitude: parseFloat(coordinates.lat),
      longitude: parseFloat(coordinates.lng)
    });
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-xl font-bold mb-6">Add POI</Text>

      <View className="space-y-4">
        <View>
          <Text className="text-gray-700 mb-2">Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2"
            value={name}
            onChangeText={setName}
            placeholder="Enter POI name"
          />
        </View>

        <View>
          <Text className="text-gray-700 mb-2">Coordinates</Text>
          <View className="flex-row space-x-2">
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg p-2"
              value={coordinates.lat}
              onChangeText={(value) => setCoordinates(prev => ({ ...prev, lat: value }))}
              placeholder="Latitude"
              keyboardType="numeric"
            />
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg p-2"
              value={coordinates.lng}
              onChangeText={(value) => setCoordinates(prev => ({ ...prev, lng: value }))}
              placeholder="Longitude"
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity 
          className="bg-blue-500 p-4 rounded-lg mt-4"
          onPress={handleAdd}
        >
          <Text className="text-white text-center font-semibold">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
