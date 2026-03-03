import { Router } from 'express';
const router = Router();

// GET route to test the endpoint
router.get('/', (req, res) => {
  res.send('Auth route works!');  // ✅ This will show in the browser
});

// Existing POST route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.json({ message: `Logged in ${username}` });
});

export default router;