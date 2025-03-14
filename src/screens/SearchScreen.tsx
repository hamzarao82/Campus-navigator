import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Building2, Filter, Clock } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import type { SearchResult } from '../services/searchService';

type FilterType = 'all' | 'building' | 'room' | 'poi';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { 
    results, 
    loading, 
    error, 
    recentSearches,
    performSearch, 
    loadRecentSearches 
  } = useSearch();

  useEffect(() => {
    loadRecentSearches();
  }, [loadRecentSearches]);

  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'All' },
    { type: 'building', label: 'Buildings' },
    { type: 'room', label: 'Rooms' },
    { type: 'poi', label: 'Points of Interest' },
  ];

  const handleSearch = async () => {
    await performSearch({
      query: searchQuery,
      type: activeFilter,
    });
  };

  const renderResultItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity 
      style={styles.resultItem}
      onPress={() => {
        // TODO: Navigate to detail view or map view
        console.log('Navigate to:', item);
      }}
    >
      <View style={styles.resultIcon}>
        {item.type === 'building' && <Building2 size={24} color="#4a90e2" />}
        {item.type === 'room' && <MapPin size={24} color="#4a90e2" />}
        {item.type === 'poi' && <MapPin size={24} color="#4a90e2" />}
      </View>
      <View style={styles.resultContent}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultLocation}>{item.location}</Text>
        <Text style={styles.resultDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecentSearches = () => (
    <View style={styles.recentSearches}>
      <View style={styles.recentHeader}>
        <Clock size={20} color="#666" />
        <Text style={styles.recentTitle}>Recent Searches</Text>
      </View>
      <FlatList
        data={recentSearches}
        renderItem={renderResultItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={handleSearch}>
            <Filter size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <FlatList
            data={filters}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  activeFilter === item.type && styles.filterButtonActive,
                ]}
                onPress={() => {
                  setActiveFilter(item.type);
                  if (searchQuery) handleSearch();
                }}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    activeFilter === item.type && styles.filterButtonTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.type}
          />
        </View>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4a90e2" />
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={renderResultItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.resultsList}
          ListHeaderComponent={!searchQuery ? renderRecentSearches : null}
          ListEmptyComponent={
            searchQuery ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No results found</Text>
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... Previous styles remain the same ...
  recentSearches: {
    padding: 16,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#666',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffebee',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
});
