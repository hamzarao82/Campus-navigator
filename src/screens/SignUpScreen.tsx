import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Picker } from '@react-native-picker/picker';
import { UserRole } from '../types/user';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const { signup, loading, error } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const success = await signup(email, password, role);
    if (success) {
      navigation.navigate('Home');
    } else if (error) {
      Alert.alert('Error', error);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="items-center mb-8 mt-12">
        <View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center mb-4">
          <UserPlus className="text-white" size={32} />
        </View>
        <Text className="text-2xl font-semibold text-gray-800">Sign Up</Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-gray-600 mb-2">Email</Text>
          <TextInput
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text className="text-gray-600 mb-2">Password</Text>
          <TextInput
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View>
          <Text className="text-gray-600 mb-2">Confirm Password</Text>
          <TextInput
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <View>
          <Text className="text-gray-600 mb-2">Role</Text>
          <View className="bg-gray-50 rounded-lg border border-gray-200">
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue as UserRole)}
              className="h-12"
            >
              <Picker.Item label="Student" value="student" />
              <Picker.Item label="Faculty" value="faculty" />
              <Picker.Item label="Admin" value="admin" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity 
          className="bg-blue-600 py-4 rounded-lg mt-4"
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">
              Sign Up
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-blue-600">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
