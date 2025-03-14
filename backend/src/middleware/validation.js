import { z } from 'zod';

const searchSchema = z.object({
  q: z.string().min(1).max(100),
  type: z.enum(['all', 'building', 'room', 'poi']).default('all'),
});

export const validateSearchQuery = (req, res, next) => {
  try {
    const result = searchSchema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({ 
        error: 'Invalid search parameters',
        details: result.error.issues 
      });
    }
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};
