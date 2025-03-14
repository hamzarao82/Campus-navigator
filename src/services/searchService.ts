import { auth } from '../utils/firebase';

export type SearchResult = {
  id: string;
  name: string;
  type: 'building' | 'room' | 'poi';
  location: string;
  description: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
};

export type SearchFilters = {
  type: 'all' | 'building' | 'room' | 'poi';
  query: string;
};

const API_URL = 'YOUR_API_URL'; // Replace with your actual API URL

export class SearchService {
  private static async getAuthToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (user) {
      return user.getIdToken();
    }
    return null;
  }

  static async search(filters: SearchFilters): Promise<SearchResult[]> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error('User not authenticated');
      }

      const queryParams = new URLSearchParams({
        q: filters.query,
        type: filters.type,
      });

      const response = await fetch(`${API_URL}/search?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  static async getRecentSearches(): Promise<SearchResult[]> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${API_URL}/search/recent`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recent searches');
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Recent searches error:', error);
      throw error;
    }
  }
}
