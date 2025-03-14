import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { useFirestore } from '../../hooks/useFirestore';

export default function UserPermissionScreen() {
  const [permissions, setPermissions] = useState({
    adminPanel: false,
    facultyPanel: false,
    studentPanel: false
  });
  const { updatePermissions } = useFirestore();

  const handleUpdate = async () => {
    await updatePermissions(permissions);
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-xl font-bold mb-6">User Permission</Text>
      
      <View className="space-y-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-700">Admin Panel</Text>
          <Switch
            value={permissions.adminPanel}
            onValueChange={(value) => 
              setPermissions(prev => ({ ...prev, adminPanel: value }))
            }
          />
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-700">Faculty Panel</Text>
          <Switch
            value={permissions.facultyPanel}
            onValueChange={(value) => 
              setPermissions(prev => ({ ...prev, facultyPanel: value }))
            }
          />
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-700">Student Panel</Text>
          <Switch
            value={permissions.studentPanel}
            onValueChange={(value) => 
              setPermissions(prev => ({ ...prev, studentPanel: value }))
            }
          />
        </View>

        <TouchableOpacity 
          className="bg-blue-500 p-4 rounded-lg mt-4"
          onPress={handleUpdate}
        >
          <Text className="text-white text-center font-semibold">Update & Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
