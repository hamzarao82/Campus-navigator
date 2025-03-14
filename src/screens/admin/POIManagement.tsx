import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationService } from '../../services/NavigationService';
import { POI } from '../../types/navigation';

export default function POIManagement() {
  const [pois, setPOIs] = useState<POI[]>([]);

  useEffect(() => {
    loadPOIs();
  }, []);

  const loadPOIs = async () => {
    const allPOIs = await NavigationService.getAllPOIs();
    setPOIs(allPOIs);
  };

  const handleAddPOI = () => {
    navigation.navigate('POIAddScreen');
  };

  const handleEditPOI = (poi: POI) => {
    navigation.navigate('POIEditScreen', { poi });
  };

  const handleDeletePOI = async (poiId: string) => {
    await NavigationService.deletePOI(poiId);
    loadPOIs();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPOI}>
        <Text style={styles.addButtonText}>Add New POI</Text>
      </TouchableOpacity>

      <FlatList
        data={pois}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.poiItem}>
            <Text style={styles.poiName}>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditPOI(item)}>
                <Text style={styles.actionButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletePOI(item.id)}>
                <Text style={[styles.actionButton, styles.deleteButton]}>Delete</Text>
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
    padding: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  poiItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  poiName: {
    fontSize: 16,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    color: '#007AFF',
    padding: 8,
  },
  deleteButton: {
    color: '#FF3B30',
  },
});
