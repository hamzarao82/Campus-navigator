import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      status: 'active'
    };

    setUsers([...users, newUser]);
    clearForm();
  };

  const handleEditUser = (user: User) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setEditingId(user.id);
  };

  const handleUpdateUser = () => {
    setUsers(users.map(user => 
      user.id === editingId 
        ? {
            ...user,
            name,
            email,
            role
          }
        : user
    ));
    clearForm();
  };

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id 
        ? {
            ...user,
            status: user.status === 'active' ? 'inactive' : 'active'
          }
        : user
    ));
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setRole('');
    setEditingId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Role"
          value={role}
          onChangeText={setRole}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={editingId ? handleUpdateUser : handleAddUser}
        >
          <Text style={styles.buttonText}>
            {editingId ? 'Update User' : 'Add User'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View>
              <Text style={styles.userName}>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>Role: {item.role}</Text>
              <Text>Status: {item.status}</Text>
            </View>
            <View style={styles.userActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleEditUser(item)}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, item.status === 'active' ? styles.deactivateButton : styles.activateButton]}
                onPress={() => handleToggleStatus(item.id)}
              >
                <Text style={styles.actionButtonText}>
                  {item.status === 'active' ? 'Deactivate' : 'Activate'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    padding: 5,
    marginLeft: 10,
  },
  deactivateButton: {
    backgroundColor: '#ff4444',
    borderRadius: 5,
    padding: 5,
  },
  activateButton: {
    backgroundColor: '#00C851',
    borderRadius: 5,
    padding: 5,
  },
  actionButtonText: {
    color: '#fff',
  },
});
