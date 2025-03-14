import express from 'express';
import { searchLocations, getRecentSearches, saveSearch } from '../controllers/searchController.js';
import { validateSearch } from '../middleware/validation.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/locations', authenticateUser, validateSearch, searchLocations);
router.get('/recent', authenticateUser, getRecentSearches);
router.post('/save', authenticateUser, validateSearch, saveSearch);

export default router;
