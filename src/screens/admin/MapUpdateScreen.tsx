import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useStorage } from '../../hooks/useStorage';

export default function MapUpdateScreen() {
  const [image, setImage] = useState(null);
  const { uploadMap } = useStorage();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (image) {
      await uploadMap(image);
      setImage(null);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-xl font-bold mb-6">Map Update</Text>

      <TouchableOpacity 
        className="bg-gray-100 p-4 rounded-lg items-center justify-center h-48 mb-4"
        onPress={pickImage}
      >
        {image ? (
          <Image 
            source={{ uri: image }} 
            className="w-full h-full rounded-lg"
            resizeMode="contain"
          />
        ) : (
          <Text className="text-gray-500">Tap to select map image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        className={`p-4 rounded-lg ${image ? 'bg-blue-500' : 'bg-gray-300'}`}
        onPress={handleUpload}
        disabled={!image}
      >
        <Text className="text-white text-center font-semibold">Upload</Text>
      </TouchableOpacity>
    </View>
  );
}
