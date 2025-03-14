import request from 'supertest';
import express from 'express';
import searchRoutes from '../routes/search.js';
import { authenticateToken } from '../middleware/auth.js';

// Mock Firebase auth
jest.mock('../config/firebase.js', () => ({
  auth: () => ({
    verifyIdToken: jest.fn().mockResolvedValue({ uid: 'test-user-id' })
  })
}));

// Mock database responses
jest.mock('../config/database.js', () => ({
  execute: jest.fn().mockImplementation((query, params) => {
    if (query.includes('SELECT')) {
      return [
        [
          {
            id: '1',
            name: 'Main Library',
            type: 'building',
            location: 'Central Campus'
          }
        ]
      ];
    }
    return [{ affectedRows: 1 }];
  })
}));

const app = express();
app.use(express.json());
app.use('/api/search', searchRoutes);

describe('Search API', () => {
  describe('GET /api/search', () => {
    it('should return search results', async () => {
      const response = await request(app)
        .get('/api/search?q=library')
        .set('Authorization', 'Bearer test-token');

      expect(response.status).toBe(200);
      expect(response.body.results).toHaveLength(1);
      expect(response.body.results[0].name).toBe('Main Library');
    });

    it('should validate search parameters', async () => {
      const response = await request(app)
        .get('/api/search?q=')
        .set('Authorization', 'Bearer test-token');

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/search/recent', () => {
    it('should return recent searches', async () => {
      const response = await request(app)
        .get('/api/search/recent')
        .set('Authorization', 'Bearer test-token');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.results)).toBe(true);
    });
  });

  describe('POST /api/search/save', () => {
    it('should save search history', async () => {
      const response = await request(app)
        .post('/api/search/save')
        .set('Authorization', 'Bearer test-token')
        .send({
          query: 'library',
          type: 'building'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Search saved successfully');
    });
  });
});
