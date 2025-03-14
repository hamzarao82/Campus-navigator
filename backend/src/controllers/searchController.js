import pool from '../config/database.js';
import { logger } from '../utils/logger.js';

export const searchLocations = async (req, res) => {
  try {
    const { q, type = 'all' } = req.query;
    const userId = req.user.uid;

    let query = `
      SELECT 
        l.id,
        l.name,
        l.type,
        l.location,
        l.description,
        l.latitude,
        l.longitude
      FROM locations l
      WHERE 1=1
    `;

    const params = [];

    if (q) {
      query += ` AND (
        l.name LIKE ? OR 
        l.location LIKE ? OR 
        l.description LIKE ?
      )`;
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    if (type !== 'all') {
      query += ` AND l.type = ?`;
      params.push(type);
    }

    query += ` ORDER BY l.name ASC LIMIT 50`;

    const [results] = await pool.execute(query, params);

    // Save search to history
    if (q) {
      await saveSearchToHistory(userId, q, type);
    }

    res.json({ results });
  } catch (error) {
    logger.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecentSearches = async (req, res) => {
  try {
    const userId = req.user.uid;
    const [results] = await pool.execute(`
      SELECT 
        sh.query,
        sh.type,
        sh.created_at
      FROM search_history sh
      WHERE sh.user_id = ?
      ORDER BY sh.created_at DESC
      LIMIT 10
    `, [userId]);

    res.json({ results });
  } catch (error) {
    logger.error('Recent searches error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const saveSearch = async (req, res) => {
  try {
    const { query, type } = req.body;
    const userId = req.user.uid;

    await saveSearchToHistory(userId, query, type);
    res.json({ message: 'Search saved successfully' });
  } catch (error) {
    logger.error('Save search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function saveSearchToHistory(userId, query, type) {
  await pool.execute(`
    INSERT INTO search_history (user_id, query, type)
    VALUES (?, ?, ?)
  `, [userId, query, type]);
}
