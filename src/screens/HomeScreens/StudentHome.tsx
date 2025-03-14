import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function StudentHome() {
  const { logout } = useAuth();

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-6">Student Dashboard</Text>
      <View className="space-y-4">
        <TouchableOpacity className="bg-blue-100 p-4 rounded-lg">
          <Text className="text-blue-800 font-semibold">View Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-100 p-4 rounded-lg">
          <Text className="text-blue-800 font-semibold">Campus Navigation</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="bg-red-100 p-4 rounded-lg"
          onPress={logout}
        >
          <Text className="text-red-800 font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
