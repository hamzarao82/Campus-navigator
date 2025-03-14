import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AdminDashboard from '../screens/admin/AdminDashboard';
import POIManagement from '../screens/admin/POIManagement';
import UserManagement from '../screens/admin/UserManagement';

const Stack = createStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AdminDashboard" 
        component={AdminDashboard}
        options={{ title: 'Admin Dashboard' }}
      />
      <Stack.Screen 
        name="POIManagement" 
        component={POIManagement}
        options={{ title: 'POI Management' }}
      />
      <Stack.Screen 
        name="UserManagement" 
        component={UserManagement}
        options={{ title: 'User Management' }}
      />
    </Stack.Navigator>
  );
}
