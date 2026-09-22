const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, adminOnly } = require('../middleware/auth');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, active: true });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
});

router.post('/change-password', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.password = await bcrypt.hash(req.body.newPassword, 10);
  await user.save();
  res.json({ ok: true });
});

router.get('/team', auth, adminOnly, async (req, res) => {
  res.json(await User.find().select('-password'));
});

router.post('/team', auth, adminOnly, async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  res.json({ id: user._id });
});

router.delete('/team/:id', auth, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
