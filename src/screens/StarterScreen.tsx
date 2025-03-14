import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Navigation } from 'lucide-react';
import { useNavigation } from '@react-navigation/native';

export default function StarterScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center p-8">
        <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center mb-8">
          <Navigation className="text-white" size={48} />
        </View>
        
        <Text className="text-3xl font-bold text-gray-800 mb-4">
          Campus Navigator
        </Text>
        <Text className="text-gray-600 text-center mb-12">
          Your intelligent guide for seamless campus navigation
        </Text>

        <TouchableOpacity 
          className="w-full bg-blue-500 py-4 rounded-xl mb-4"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="w-full bg-white border-2 border-blue-500 py-4 rounded-xl"
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text className="text-blue-500 text-center font-semibold text-lg">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
