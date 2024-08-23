import { ensureAuthenticated } from '@src/auth';
import { getUsers } from '@src/user';
import { Router } from 'express';
import asyncHandler from 'express-async-handler';

const router = Router();

/**
 * Get all users from database
 */
router.get(
  '/',
  ensureAuthenticated(),
  asyncHandler(async (req, res) => {
    const users = await getUsers(req.user.organization);
    res.json(users);
  }),
);

/**
 * Get currently logged in user
 */
router.get('/me', ensureAuthenticated(), (req, res) => {
  res.json(req.user);
});

/**
 * Get all other users than the currently logged in user
 */
router.get(
  '/others',
  ensureAuthenticated(),
  asyncHandler(async (req, res) => {
    // Exclude logged in user from response
    const users = await getUsers(req.user.organization, [req.user.id]);
    res.json(users);
  }),
);

export default router;
