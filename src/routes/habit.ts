import { Router } from 'express';
import { HabitController } from '../controllers/habitController';
import { authenticatedToken } from '../middleware/authService';
// import { authenticateToken } from '../middleware/auth';

const router = Router();

// All habit routes require authentication
router.use(authenticatedToken);

// Habit CRUD operations
router.post('/', HabitController.createHabit);                    // POST /api/habits
router.get('/', HabitController.getUsersHabit);                   // GET /api/habits
router.get('/:id', HabitController.getHabit);                     // GET /api/habits/:id
router.put('/:id', HabitController.updateHabit);                  // PUT /api/habits/:id
router.patch('/:id/complete', HabitController.completeHabit);     // PATCH /api/habits/:id/complete
router.delete('/:id', HabitController.deleteHabit);               // DELETE /api/habits/:id

export default router;